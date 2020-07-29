# Node Wrapper for Cascade Server API

This wraps the [REST API implementation](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html) of [Cascade Server CMS](https://www.hannonhill.com/cascadecms/latest/index.html) into a Node module. While operations have easy to use functions, currently not all APIs do. There is also a generic API Call, which you can use to complete any operation, an example is provided later on.

# Usage
You can either install it as a node module, adding it to your project dependencies, or directly import the JS file.

## Node Module
In your project directory folder run `npm install ../path-to-folder`. Then in your project you can create a new instance:
```javascript
const Cascade = require("./cascade-api-node");
const cascadeAPI = new Cascade("https://cascade.example.edu","username","password","siteName");
```

## Direct JavaScript
In your project, reference the JavaScript directly, using a relative path.
```javascript
const Cascade = require("../path-to-folder/cascade.js");
const cascadeAPI = new Cascade("https://cascade.example.edu","username","password","siteName");
```

## Return Values

### On Success
JSON object will be returned, with a success flag. Depending on the operation an asset is also returned. For example, a read operation for a file might look like:

```javascript
{
  asset: {
    file: {
      
      ...

      name: 'main.css',
      id: '785d1da90a0a008468d68542058754f1'
    }
  },
  success: true
}
```
*For a page, the asset object attribute will change to page, and for an edit or publish, no asset will be returned.*

### On Failure
An error will be thrown, which should be caught client side. An object will be returned with the error message included:

```javascript
{
  success: false,
  message: 'Unable to identify an entity based on provided ' +
    "entity path 'template/t1/css/test.css' and type " +
    "'file'"
}
```

## Examples

Examples will use the variable `cascadeAPI` from above. Most examples will be referring to items by site/path, but one example will show the difference when using IDs.

* [Read Page](#read-page)
* [Read File](#read-file)
* [Edit Page](#edit-page)
* [Edit File](#edit-file)
* [Create Page](#create-page)
* [Create File](#create-file)
* [Delete Page](#delete-page)
* [Delete File](#delete-file)
* [Publish Page](#publish-page)
* [Publish File](#publish-file)
* [Other API Use](#other-api)
* [Path vs ID](#path-vs-id)

<a name="read-page"/>

### Read Page

```javascript
cascadeAPI.readPage("/test/test")
.then(response=>{
    console.log("Success reading page:");
    console.log(response);
})
.catch(error=>{
    console.log("Error reading page:");
    console.log(error);
});
```

<a name="read-file"/>

### Read File

```javascript
cascadeAPI.readFile("/test/test.txt")
.then(response=>{
    console.log("Success reading file:");
    console.log(response);
})
.catch(error=>{
    console.log("Error reading file:");
    console.log(error);
});
```

<a name="edit-page"/>

### Edit Page

```javascript
cascadeAPI.readPage("/test/test")
.then(response=>{
    console.log("Success reading page:");
    const foundPage = response.asset.page;
    foundPage.metadata.displayName = "New Display Name";
    cascadeAPI.editPage(foundPage)
    .then(response=>{
        console.log("Success editing page:");
        console.log(response);
    })
    .catch(error => {
        console.log("Error editing page:");
        console.log(error);
    });
})
.catch(error=>{
    console.log("Error reading page:");
    console.log(error);
});
```

<a name="edit-file"/>

### Edit File

```javascript
cascadeAPI.readFile("/test/test.txt")
.then(response=>{
    console.log("Success reading file:");
    const foundFile = response.asset.file;
    foundFile.text = "New content!";
    cascadeAPI.editFile(foundFile)
    .then(response=>{
        console.log("Success editing file:");
        console.log(response);
    })
    .catch(error => {
        console.log("Error editing file:");
        console.log(error);
    });
})
.catch(error=>{
    console.log("Error reading file:");
    console.log(error);
});
```

<a name="create-page"/>

### Create Page

```javascript
const newPage = cascadeAPI.createBlankPage();
newPage.siteName = cascadeAPI.site;
newPage.parentFolderPath = "/test";
newPage.name = "test";
newPage.contentTypeId = "5d2be6a80a0a00840dccbc502d7d6505";
newPage.xhtml = "<div>Test</div>";
newPage.metadata.title = "New Title";
newPage.metadata.displayName = "New Display Name";
console.log(newPage);
cascadeAPI.createPage(newPage)
.then(response=>{
    console.log("Success creating page:");
    console.log(response);
})
.catch(error=>{
    console.log("Error creating page:");
    console.log(error);
});
```

<a name="create-file"/>

### Create File

```javascript
const newFile = cascadeAPI.createBlankFile();
newFile.siteName = cascadeAPI.site;
newFile.parentFolderPath = "/test";
newFile.name = "test.txt";
newFile.text = "Test";
console.log(newFile);
cascadeAPI.createFile(newFile)
.then(response=>{
    console.log("Success creating file:");
    console.log(response);
})
.catch(error=>{
    console.log("Error creating file:");
    console.log(error);
});
```

<a name="delete-page"/>

### Delete Page

```javascript
cascadeAPI.deletePage("/test/test")
.then(response=>{
    console.log("Success deleting page:");
    console.log(response);
})
.catch(error=>{
    console.log("Error deleting page:");
    console.log(error);
});
```

<a name="delete-file"/>

### Delete File

```javascript
cascadeAPI.deleteFile("/test/test.txt")
.then(response=>{
    console.log("Success deleting file:");
    console.log(response);
})
.catch(error=>{
    console.log("Error deleting file:");
    console.log(error);
});
```

<a name="publish-page"/>

### Publish Page

```javascript
cascadeAPI.publishPage("/test/test")
.then(response=>{
    console.log("Success publishing page:");
    console.log(response);
})
.catch(error=>{
    console.log("Error publishing page:");
    console.log(error);
});
```

<a name="publish-file"/>

### Publish File

```javascript
cascadeAPI.publishFile("/test/test.txt")
.then(response=>{
    console.log("Success publishing file:");
    console.log(response);
})
.catch(error=>{
    console.log("Error publishing file:");
    console.log(error);
});
```

<a name="other-api"/>

### Other API Use

If an operation isn't specified, you can call the `APICall` function directly to acces it. This one lists subscribers for a page: 

```javascript
cascadeAPI.APICall("listSubscribers","page","/counseling-programs/index")
.then(response=>{
    console.log("Call succeeded");
    console.log(response);
})
.catch(error=>{
    console.log("Call failed");
    console.log(error);
});
```

If the operation requires an asset to be included with it, an object should be sent in as a 4th parameter.

<a name="path-vs-id"/>

### Path vs ID

To be added.

```javascript

```
