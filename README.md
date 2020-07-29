# Node Wrapper for Cascade Server API

This wraps the [REST API implementation](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html) of [Cascade Server CMS](https://www.hannonhill.com/cascadecms/latest/index.html) into a Node module. While operations have easy to use functions, currently not all APIs do. There is also a generic API Call, which you can use to complete any operation, an example is provided later on.

# Setup
You can either install it as a node module, adding it to your project dependencies, or directly import the JS file.

## Node Module
In your project directory folder run `npm install ./path-to-folder`. Then in your project you can create a new instance:
```javascript
const Cascade = require("./cascade-api-node");
const cascadeAPI = new Cascade("https://cascade.example.edu",{username:"username",password:"password"},"siteName");
```

## Direct JavaScript
In your project, reference the JavaScript directly, using a relative path.
```javascript
const Cascade = require("../path-to-folder/cascade.js");
const cascadeAPI = new Cascade("https://cascade.example.edu",{username:"username",password:"password"},"siteName");
```

# Usage

## Authentication
The second parameter is an authentication object, it can either take in a username and password, or an authentication token.
```javascript
const cascadeAPI = new Cascade("https://cascade.example.edu",{username:"username",password:"password"},"siteName");
const cascadeAPI = new Cascade("https://cascade.example.edu",{apiKey:"27c03f58-7c79-45d1-aa8f-76d697bbb10d"},"siteName");
```

## Using Path vs Using Id
The site name parameter in the constructor is optional. If left off, all api calls will be done using ids instead.

### With Path
```javascript
const cascadeAPI = new Cascade("https://cascade.example.edu",{username:"username",password:"password"},"siteName");
cascadeAPI.readPage("/test/test")
.then(response=>{ console.log("Success reading page:"); })
.catch(error=>{ console.log("Error reading page:"); });
```

### With Id
```javascript
const cascadeAPI = new Cascade("https://cascade.example.edu",{username:"username",password:"password"});
cascadeAPI.readPage("96dc63ca0a0a008468d68542746cfd37")
.then(response=>{ console.log("Success reading page:"); })
.catch(error=>{ console.log("Error reading page:"); });
```

### Switching Modes
You can switch between the modes by calling the `usePath()` or `useId()` helper functions.
```javascript
const cascadeAPI = new Cascade("https://cascade.example.edu",{username:"username",password:"password"});
cascadeAPI.readPage("96dc63ca0a0a008468d68542746cfd37")
.then(response=>{ console.log("Success reading page:"); })
.catch(error=>{ console.log("Error reading page:"); });

cascadeAPI.usePath("siteName");

cascadeAPI.readPage("/test/test")
.then(response=>{ console.log("Success reading page:"); })
.catch(error=>{ console.log("Error reading page:"); });
```

## Return Values

### On Success
JSON object will be returned, with a success flag. Depending on the operation an asset or response might also returned. If an asset is returned, it is contained in a property named after the type. For example, a read operation for a file might look like:

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

Examples will use the variable `cascadeAPI` from above. These examples use paths, but ids can be used instead, as shown in the usage section.

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
Files need to either have something in the `text` property or the `data` property. The `data` property needs to be an array, so if you're reading in via a node buffer, you need to convert it to an array.

#### Update Via Text
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

#### Update via node buffer
```javascript
cascadeAPI.readFile("/test/test.txt")
.then(response=>{
    console.log("Success reading file:");
    const foundFile = response.asset.file;
    
    const fs = require('fs');
    // This converts the node buffer to an array
    const updateFile = [...fs.readFileSync("./test.txt")];

    foundFile.data = updateFile;
    
    // Make sure to blank out the text field, if using the data property
    foundFile.text = "";

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
When creating a new page, you must send Cascade the asset you'd like to create. You can use the `createBlankPage()` helper function to return a blank asset that you can then edit with the values you want. You can also manually create the object if you prefer.
```javascript
const newPage = cascadeAPI.createBlankPage();
newPage.siteName = cascadeAPI.site;
newPage.parentFolderPath = "/test";
newPage.name = "test";
newPage.contentTypeId = "5d2be6a80a0a00840dccbc502d7d6505";
newPage.xhtml = "<div>Test</div>";
newPage.metadata.title = "New Title";
newPage.metadata.displayName = "New Display Name";
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
The same as creating a new page, an asset must be sent when creating a new file. There is a `createBlankFile()` helper function for this as well.
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