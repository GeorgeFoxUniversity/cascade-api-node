const fetch = require('node-fetch');

/**
 * Class to wrap REST calls to the Cascade Server API. 
 * This class operates in two modes, path or identifier. If on path mode, any path listed in the wrapper functions
 * or `APICall` function will use a path, with the site specified either in the constructor or utility function.
 * Otherwise it will use a Cascade asset ID. You can swap modes using the [useId]{@link Cascade#useId} or 
 * [usePath]{@link Cascade#usePath} methods.
 * 
 */
class Cascade
{
    /**
     * Create a new Cascade API object. This will build a REST query to the Cascade instance provided in the 
     * constructor. The class relies on one of two modes to operate in when making calls, paths, or identifiers,
     * if a site is listed in the constructor, it will use path, otherwise it will use identifier.
     * @param {string} apiRoot Root URL of your Cascade instance
     * @param {Object} authentication Authentication object, should either have username and password properties or apiKey property
     * @param {string} authentication.apiKey API key to make the call with. Either this OR username/password must be included.
     * @param {string} authentication.username Username to make the call with. Either username & password OR apiKey must be included.
     * @param {string} authentication.password Password to make the call with. Either username & password OR apiKey must be included.
     * @param {string} [site] Site to use if using paths to identify assets.
     */
    constructor(apiRoot, authentication, site="")
    {
        this.apiRoot = apiRoot;
        this.site = site;
        if(site != "")
        {
            this.identificationMode = "path";
        }
        else
        {
            this.identificationMode = "id";
        }
        this.authentication = authentication;
        this.ajaxOptions = {method:"POST"};
        this.ajaxURL = "";
    }

    /**** Mode Functions ****/

    /**
     * Change the mode of the Cascade object to use paths.
     * @param {string} siteName Name of the site to add to calls.
     */
    usePath(siteName)
    {
        this.site = siteName;
        this.identificationMode = "path";
    }

    /**
     * Change the mode of the Casade object to use ids.
     */
    useId()
    {
        this.identificationMode = "id";
    }

    /**** Utility Functions ****/

    /**
     * Return a blank page, this is helpful when creating new assets.
     * @returns {CascadeAsset} Blank page
     */
    createBlankPage()
    {   
        return new CascadeAsset("page");
    }

    /**
     * Return a blank file, this is helpful when creating new assets.
     * @returns {CascadeAsset} Blank file
     */
    createBlankFile()
    {
        return new CascadeAsset("file");
    }

    /**
     * Return a blank folder, this is helpful when creating new assets.
     * @returns {CascadeAsset} Blank folder
     */
    createBlankFolder()
    {
        return new CascadeAsset("folder");
    }

    /**** API Functions ****/

    /**
     * Make an API call. Using the pre-defined functions is generally preferred, but if not all APIs
     * have wrapper functions, this can be called directly. While most parameters are optional,
     * most calls will need some number of them to be included.
     * 
     * This function is asynchronous, and will either return an object, or throw an error if the call
     * did not succeed. The error should be caught on the front end.
     * 
     * @param {string} operation Name of the operation as defined in the Cascade API.
     * @param {string} [type=false] Optional. Required for calls where an identifier is needed (read, publish, etc). If not needed use default.
     * @param {string} [assetIDPath=false] Optional. Either the path or id of the asset, needed where an identifier is needed, like type. If not needed use default.
     * @param {Object} [assetObject=false] Optional. Asset to be acted upon, needed for some calls (create, edit). Must have an attribute for the asset type that's being acted upon (page, block, etc)
     * @returns {Object} Cascade response object. It could be either a system response for an operation like create or edit, or an object for an operation like read.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async APICall(operation,type=false,assetIDPath=false,assetObject=false)
    {
        // Build the url to call
        this.ajaxURL = this.apiRoot+"/api/v1/"+operation;
        
        // Add type if included
        if(type !== false)
        {
            this.ajaxURL += "/"+type;
        }

        // If using paths, add site
        if(this.identificationMode == "path")
        {
            this.ajaxURL += "/"+encodeURIComponent(this.site);
        }

        // If an ID or path was included, add it
        if(assetIDPath !== false)
        {
            if(assetIDPath.startsWith("/"))
            {
                this.ajaxURL += assetIDPath;
            }
            else
            {
                this.ajaxURL += "/"+assetIDPath;
            }
        }

        // Do a post, incluing the authentication in the body
        this.ajaxOptions = {method:"POST"};
        this.ajaxOptions.body = {};
        this.ajaxOptions.body.authentication = this.authentication;

        // If we're including an asset, add it to the body
        if(assetObject !== false)
        {
            if("page" in assetObject && "xhtml" in assetObject.page && assetObject.page.xhtml != "")
            {
                assetObject.page.xhtml = "<system-xml>"+assetObject.page.xhtml+"</system-xml>";
            }
            this.ajaxOptions.body.asset = assetObject;
        }

        // Turn the body message into a JSON string to send it along
        this.ajaxOptions.body = JSON.stringify(this.ajaxOptions.body);

        // Make the API call, waiting for the result
        const readResult = await fetch(this.ajaxURL, this.ajaxOptions);
        const readData = await readResult.json();
        
        // Return the value on a success, or throw an error if not
        if(readData.success === true)
        {
            return readData;
        }
        else
        {
            throw(readData);
        }
    }

    /**** Wrapper functions ****/
    
    /**
     * Read a page, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of page to read
     * @returns {Object} Object representing the Cascade response. Page that was found will be in the .asset.page attribute
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async readPage(path)
    {
        return await this.APICall("read","page",path);
    }

    /**
     * Read a file, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of file to read
     * @returns {Object} Object representing the Cascade response. Page that was found will be in the .asset.page attribute
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async readFile(path)
    {
        return await this.APICall("read","file",path);
    }

    /**
     * Read a folder, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of folder to read
     * @returns {Object} Object representing the Cascade response. Page that was found will be in the .asset.page attribute
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async readFolder(path)
    {
        return await this.APICall("read","folder",path);
    }

    /**
     * Delete a page, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of page to delete
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async deletePage(path)
    {
        return await this.APICall("delete","page",path);
    }

    /**
     * Delete a file, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of file to delete
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async deleteFile(path)
    {
        return await this.APICall("delete","file",path);
    }

    /**
     * Delete a folder, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of folder to delete
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async deleteFolder(path)
    {
        return await this.APICall("delete","folder",path);
    }

    /**
     * Edit a page, given a Cascade page object. Typically the page to edit is read in via [readPage]{@link Cascade#readPage},
     * but it can be manually created as well.
     * @param {Object} assetObject Cascade object representing the page.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async editPage(assetObject)
    {
        return await this.APICall("edit","page",assetObject.path,{page: assetObject});
    }

    /**
     * Edit a file, given a Cascade file object. Typically the page to edit is read in via [readFile]{@link Cascade#readFile},
     * but it can be manually created as well.
     * @param {Object} assetObject Cascade object representing the file.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async editFile(assetObject)
    {
        return await this.APICall("edit","file",assetObject.path,{file: assetObject});
    }

    /**
     * Edit a folder, given a Cascade folder object. Typically the page to edit is read in via [readFolder]{@link Cascade#readFolder},
     * but it can be manually created as well.
     * @param {Object} assetObject Cascade object representing the folder.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async editFolder(assetObject)
    {
        return await this.APICall("edit","folder",assetObject.path,{folder: assetObject});
    }

    /**
     * Publish a page, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of page to publish.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async publishPage(path)
    {
        return await this.APICall("publish","page",path);
    }

    /**
     * Publish a file, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of file to publish.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async publishFile(path)
    {
        return await this.APICall("publish","file",path);
    }

    /**
     * Publish a folder, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of folder to publish.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async publishFolder(path)
    {
        return await this.APICall("publish","folder",path);
    }

    /**
     * Create a page, given a Cascade page object. Typically this is created using [createBlankPage]{@link Cascade#createBlankPage},
     * but it can be created manually as well.
     * @param {Object} assetObject Cascade object representing the page.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async createPage(assetObject)
    {
        return await this.APICall("create",false,false,{page: assetObject});
    }

    /**
     * Create a file, given a Cascade file object. Typically this is created using [createBlankFile]{@link Cascade#createBlankFile},
     * but it can be created manually as well.
     * @param {Object} assetObject Cascade object representing the file.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async createFile(assetObject)
    {
        return await this.APICall("create",false,false,{file: assetObject});
    }

    /**
     * Create a folder, given a Cascade folder object. Typically this is created using [createBlankFolder]{@link Cascade#createBlankFolder},
     * but it can be created manually as well.
     * @param {Object} assetObject Cascade object representing the folder.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async createFolder(assetObject)
    {
        return await this.APICall("create",false,false,{folder: assetObject});
    }

}

/**
 * Class to represent assets to submit into Cascade Server. These are generally used
 * when creating a new asset, as it makes it easier than creating the required 
 * properties from scratch.
 * 
 * Typically used to create new objects when using the [createPage]{@link Cascade#createPage}, 
 * [createFile]{@link Cascade#createFile}, and [createFolder]{@link Cascade#createFolder} functions.
 * 
 * These are returned by the [createBlankPage]{@link Cascade#createBlankPage}, 
 * [createBlankFile]{@link Cascade#createBlankFile}, and [createBlankFolder]{@link Cascade#createBlankFolder} methods.
 */
class CascadeAsset
{
    /**
     * Create a new CascadeAsset object.
     * @param {string} [type=page] Either page, file, or folder. Defaults to page.
     */
    constructor(type="page")
    {
        this.name = "";
        this.parentFolderPath = "";
        this.siteName = "";

        if(type == "page")
        {
            this.xhtml = "";
            this.contentTypeId = "";
            this.metadata = {
                        title: "",
                        displayName: ""
                    };
        }
        else if(type == "file")
        {
            this.data = [];
            this.text = "";
        }
    }
}

module.exports = Cascade;