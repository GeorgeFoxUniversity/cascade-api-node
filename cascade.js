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
     * Return a blank file, this is helpful when creating new assets. This should either have information in the
     * `data` attribute, or text in the `text` attribute.
     * @returns {CascadeAsset} Blank file
     */
    createBlankFile()
    {
        return new CascadeAsset("file");
    }

    /**
     * Return a blank XHTML/Data Definition block, this is helpful when creating new assets. This should either
     * have properly escaped XHTML in the `xhtml` attribute, or a structured data object in the `structuredData` attribute.
     * @returns {CascadeAsset} Blank block
     */
    createBlankBlockDataDef()
    {
        return new CascadeAsset("xhtmlDataDefinition");
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
     * @param {Object} [ajaxParameters=false] Optional. Parameters to be added to the body, examples being copyParameters or moveParameters which are required for those operations.
     * @returns {Object} Cascade response object. It could be either a system response for an operation like create or edit, or an object for an operation like read.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async APICall(operation,type=false,assetIDPath=false,assetObject=false,ajaxParameters=false)
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

        // CHeck to see if there are additional parameters that need to be added to the body, and add them if needed.
        if(typeof ajaxParameters === "object")
        {
            this.ajaxOptions.body = { ...this.ajaxOptions.body, ...ajaxParameters }
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
     * Read a block, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of block to read
     * @returns {Object} Object representing the Cascade response. Block that was found will depend on what type of block it was
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async readBlock(path)
    {
        return await this.APICall("read","block",path);
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
     * Delete a block, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of block to delete
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async deleteBlock(path)
    {
        return await this.APICall("delete","block",path);
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
     * Edit a file, given a Cascade file object. Typically the file to edit is read in via [readFile]{@link Cascade#readFile},
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
     * Edit a block, given a Cascade block object. Typically the block to edit is read in via [readBlock]{@link Cascade#readBlock},
     * but it can be manually created as well.
     * 
     * Unlike other assets, blocks need to specify 
     * 
     * @param {Object} assetObject Cascade object representing the block.
     * @param {string} [blockType=xhtmlDataDefinitionBlock] Type of the block to interact with, this defaults to an XHTML/Data Defintion Block
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async editBlock(assetObject, blockType="xhtmlDataDefinitionBlock")
    {
        return await this.APICall("edit","block",assetObject.path,{[blockType]: assetObject});
    }

    /**
     * Edit a folder, given a Cascade folder object. Typically the folder to edit is read in via [readFolder]{@link Cascade#readFolder},
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
     * Create a block, given a Cascade block object. Typically this is created using [createBlankBlockDataDef]{@link Cascade#createBlankBlockDataDef},
     * but it can be created manually as well.
     * @param {Object} assetObject Cascade object representing the block.
     * @param {string} [blockType=xhtmlDataDefinitionBlock] Type of the block to interact with, this defaults to an XHTML/Data Defintion Block
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async createBlock(assetObject, blockType="xhtmlDataDefinitionBlock")
    {
        return await this.APICall("create",false,false,{[blockType]: assetObject});
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

    /**
     * Do a move operation on a page, given a path, name, and folder. Unlike the Move and Rename operations in Cascade,
     * which have separate functionality, this combines them into a single operation.
     * 
     * @param {string} path Path or ID of the page to move.
     * @param {string} newName New name of the page. If the asset is being moved to a different folder, this can be the same as the current name.
     * @param {string} folderPath Path or ID of the folder to move to. If the asset is not being moved to a different folder, this can be the same as the current folder.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async movePage(path,newName,folderPath)
    {
        return await this.doMove(path,newName,folderPath, "page");
    }

    /**
     * Do a move operation on a file, given a path, name, and folder. Unlike the Move and Rename operations in Cascade,
     * which have separate functionality, this combines them into a single operation.
     * 
     * @param {string} path Path or ID of the file to move.
     * @param {string} newName New name of the file. If the asset is being moved to a different folder, this can be the same as the current name.
     * @param {string} folderPath Path or ID of the folder to move to. If the asset is not being moved to a different folder, this can be the same as the current folder.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async moveFile(path,newName,folderPath)
    {
        return await this.doMove(path,newName,folderPath, "file");
    }

    /**
     * Do a move operation on a block, given a path, name, and folder. Unlike the Move and Rename operations in Cascade,
     * which have separate functionality, this combines them into a single operation.
     * 
     * @param {string} path Path or ID of the block to move.
     * @param {string} newName New name of the block. If the asset is being moved to a different folder, this can be the same as the current name.
     * @param {string} folderPath Path or ID of the block to move to. If the asset is not being moved to a different folder, this can be the same as the current folder.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async moveBlock(path,newName,folderPath)
    {
        return await this.doMove(path,newName,folderPath, "block");
    }

    /**
     * Do a move operation on a folder, given a path, name, and folder. Unlike the Move and Rename operations in Cascade,
     * which have separate functionality, this combines them into a single operation.
     * 
     * @param {string} path Path or ID of the folder to move.
     * @param {string} newName New name of the folder. If the asset is being moved to a different folder, this can be the same as the current name.
     * @param {string} folderPath Path or ID of the folder to move to. If the asset is not being moved to a different folder, this can be the same as the current folder.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async moveFolder(path,newName,folderPath)
    {
        return await this.doMove(path,newName,folderPath, "folder");
    }

    /**
     * Do a move operation on an asset, given a path, name, folder, and type. Unlike the Move and Rename operations in Cascade,
     * which have separate functionality, this combines them into a single operation.
     * 
     * This should generally not be called directly, and instead a wrapper function like [movePage]{@link Cascade#movePage} or [moveFile]{@link Cascade#moveFile} should
     * be used instead. But if you need to move or rename an asset that doesn't have a type this can be used.
     * 
     * @param {string} path Path or ID of the asset to move.
     * @param {string} newName New name of the asset. If the asset is being moved to a different folder, this can be the same as the current name.
     * @param {string} folderPath Path or ID of the folder to move to. If the asset is not being moved to a different folder, this can be the same as the current folder.
     * @param {string} type Type of the asset being moved.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async doMove(path,newName,folderPath, type)
    {
        const moveParameters = {
            "destinationContainerIdentifier": {
                "type": "folder"
            },
            "doWorkflow": "false",
            "newName": newName
        };

        if(folderPath.hasOwnProperty("path") && !folderPath.hasOwnProperty("siteName") && this.identificationMode === "path")
        {
            folderPath.siteName = this.site;
        }
        
        if(folderPath.hasOwnProperty("path"))
        {
            moveParameters.destinationContainerIdentifier.path = folderPath;
        }
        else if(folderPath.hasOwnProperty("id"))
        {
            moveParameters.destinationContainerIdentifier.id = folderPath.id;
        }

        return await this.APICall("move", type, path, false, {"moveParameters": moveParameters});
    }

    /**
     * Make a copy of a a page, given a path, type, new name, and folder.
     * @param {string} path Path or ID of page to copy.
     * @param {string} newName New name of the page. If the asset is being copied to a different folder, this can be the same as the current name.
     * @param {string} folderPath Path or ID of the folder to copy to. If the asset is not being copied to a different folder, this can be the same as the current folder.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async copyPage(path,newName,folderPath)
    {
        return await this.makeCopy(path,newName,folderPath,"page");
    }

    /**
     * Make a copy of a a file, given a path, type, new name, and folder.
     * @param {string} path Path or ID of file to copy.
     * @param {string} newName New name of the file. If the asset is being copied to a different folder, this can be the same as the current name.
     * @param {string} folderPath Path or ID of the folder to copy to. If the asset is not being copied to a different folder, this can be the same as the current folder.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async copyFile(path,newName,folderPath)
    {
        return await this.makeCopy(path,newName,folderPath,"file");
    }

    /**
     * Make a copy of a a block, given a path, type, new name, and folder.
     * @param {string} path Path or ID of block to copy.
     * @param {string} newName New name of the block. If the asset is being copied to a different folder, this can be the same as the current name.
     * @param {string} folderPath Path or ID of the folder to copy to. If the asset is not being copied to a different folder, this can be the same as the current folder.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async copyBlock(path,newName,folderPath)
    {
        return await this.makeCopy(path,newName,folderPath,"block");
    }

    /**
     * Make a copy of a a folder, given a path, type, new name, and folder.
     * @param {string} path Path or ID of folder to copy.
     * @param {string} newName New name of the folder. If the asset is being copied to a different folder, this can be the same as the current name.
     * @param {string} folderPath Path or ID of the folder to copy to. If the asset is not being copied to a different folder, this can be the same as the current folder.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async copyFolder(path,newName,folderPath)
    {
        return await this.makeCopy(path,newName,folderPath,"folder");
    }

    /**
     * Make a copy of an asset, given a path, type, new name, and folder. This should generally not be called directly,
     * and instead a wrapper method like [copyPage]{@link Cascade#copyPage} or [copyFile]{@link Cascade#copyFile} should
     * be used. If the type doesn't have a wrapper function, this can be used instead.
     * @param {string} path Path or ID of asset to copy.
     * @param {string} newName New name of the item to use. If the asset is being copied to a different folder, this can be the same as the current name.
     * @param {string} folderPath Path or ID of the folder to copy to. If the asset is not being copied to a different folder, this can be the same as the current folder.
     * @param {string} type Type of the asset being copied.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async makeCopy(path,newName,folderPath, type)
    {
        const copyParameters = {
            "destinationContainerIdentifier": {
                "type": "folder"
            },
            "doWorkflow": "false",
            "newName": newName
        };

        if(folderPath.hasOwnProperty("path") && !folderPath.hasOwnProperty("siteName") && this.identificationMode === "path")
        {
            folderPath.siteName = this.site;
        }
        
        if(folderPath.hasOwnProperty("path"))
        {
            copyParameters.destinationContainerIdentifier.path = folderPath;
        }
        else if(folderPath.hasOwnProperty("id"))
        {
            copyParameters.destinationContainerIdentifier.id = folderPath.id;
        }

        return await this.APICall("copy", type, path, false, {"copyParameters": copyParameters});
    }

    /**
     * Check relationships for a page, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of page to check.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async checkRelationshipsPage(path)
    {
        return await this.APICall("listSubscribers","page",path);
    }

    /**
     * Check relationships for a file, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of file to check.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async checkRelationshipsFile(path)
    {
        return await this.APICall("listSubscribers","file",path);
    }

    /**
     * Check relationships for a file, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of file to check.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async checkRelationshipsBlock(path)
    {
        return await this.APICall("listSubscribers","block",path);
    }

    /**
     * Check relationships for a folder, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.
     * @param {string} path Path or ID of folder to check.
     * @returns {Object} Object representing the Cascade response.
     * @throws Will throw an error if the Cascade API operation was not successful.
     */
    async checkRelationshipsFolder(path)
    {
        return await this.APICall("listSubscribers","folder",path);
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
        else if(type == "xhtmlDataDefinitionBlock")
        {
            this.metadataSetId = "";
            this.metadataSetPath = "";
            this.xhtml = "";
            this.structuredData = {};
        }
        else if(type == "file")
        {
            this.data = [];
            this.text = "";
        }
    }
}

module.exports = Cascade;