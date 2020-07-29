const fetch = require('node-fetch');

/**
 * Class to wrap the Cascade Server API.
 */
class Cascade
{
    /**
     * Create a new Cascade object.
     * @param {*} apiRoot Root URL of your Cascade instance
     * @param {*} authentication Authentication object, should either have username and password properties or apiKey property
     * @param {*} site Optional. Site to use if using paths to identify assets.
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
     * @param {*} siteName Name of the site to add to calls.
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
     */
    createBlankPage()
    {   
        return new CascadeAsset("page");
    }

    /**
     * Return a blank file, this is helpful when creating new assets.
     */
    createBlankFile()
    {
        return new CascadeAsset("file");
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
     * @param {*} operation Name of the operation as defined in the Cascade API.
     * @param {*} type Required for calls where an identifier is needed (read, publish, etc)
     * @param {*} assetIDPath Either the path or id of the asset, needed where an identifier is needed, like type
     * @param {*} assetObject Asset to be acted upon, needed for some calls (create, edit)
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
     * These functions all use the APICall function with various options, to make it easier to use.
     */
    async readPage(path)
    {
        return await this.APICall("read","page",path);
    }

    async readFile(path)
    {
        return await this.APICall("read","file",path);
    }

    async deletePage(path)
    {
        return await this.APICall("delete","page",path);
    }

    async deleteFile(path)
    {
        return await this.APICall("delete","file",path);
    }

    async editPage(assetObject)
    {
        return await this.APICall("edit","page",assetObject.path,{page: assetObject});
    }

    async editFile(assetObject)
    {
        return await this.APICall("edit","file",assetObject.path,{file: assetObject});
    }

    async publishPage(path)
    {
        return await this.APICall("publish","page",path);
    }

    async publishFile(path)
    {
        return await this.APICall("publish","file",path);
    }

    async createPage(assetObject)
    {
        return await this.APICall("create",false,false,{page: assetObject});
    }

    async createFile(assetObject)
    {
        return await this.APICall("create",false,false,{file: assetObject});
    }

}

/**
 * Class to represent assets to submit into Cascade Server. These are generally used
 * when creating a new asset, as it makes it easier than creating the required 
 * properties from scratch.
 */
class CascadeAsset
{
    /**
     * Create a new CascadeAsset object.
     * @param {*} type Either page or file, defaults to page.
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