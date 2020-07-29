const fetch = require('node-fetch');

class Cascade
{
    constructor(apiRoot, username, password, site="")
    {
        this.apiRoot = apiRoot;
        this.site = site;
        this.authentication = {
            username:username,
            password:password
        };
        this.ajaxOptions = {method:"POST"};
        this.ajaxURL = "";
        this.blankAsset = {
            name: "",
            parentFolderPath: "",
            siteName: "",
            xhtml: "",
            metadata: {
                title: "",
                displayName: ""
            }
        }
    }

    async APICall(operation,type=false,assetIDPath=false,assetObject=false)
    {
        this.ajaxURL = this.apiRoot+"/api/v1/"+operation;
        
        if(type !== false)
        {
            this.ajaxURL += "/"+type;
        }

        if(this.site != "")
        {
            this.ajaxURL += "/"+encodeURIComponent(this.site);
        }

        if(assetIDPath !== false)
        {
            this.ajaxURL += "/"+assetIDPath;
        }

        this.ajaxOptions = {method:"POST"};
        this.ajaxOptions.body = {};
        this.ajaxOptions.body.authentication = this.authentication;

        if(assetObject !== false)
        {
            this.ajaxOptions.body.asset = assetObject;
        }

        this.ajaxOptions.body = JSON.stringify(this.ajaxOptions.body);

        const readResult = await fetch(this.ajaxURL, this.ajaxOptions);
        const readData = await readResult.json();
        
        if(readData.success === true)
        {
            return readData;
        }
        else
        {
            throw(readData);
        }
    }

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

    createBlankPage()
    {
        const page = this.blankAsset;
        page.contentTypeId = "";
        return page;
    }

    createBlankFile()
    {
        const file = this.blankAsset;
        file.data = [];
        return file;
    }
}

module.exports = Cascade;