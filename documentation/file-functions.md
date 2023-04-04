# File Functions

## Read File

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

## Edit File
Files need to either have something in the `text` property or the `data` property. The `data` property needs to be an array, so if you're reading in via a node buffer, you need to convert it to an array.

### Update Via Text
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

### Update via node buffer
```javascript
cascadeAPI.readFile("/test/test.txt")
.then(response=>{
    console.log("Success reading file:");
    const foundFile = response.asset.file;
    
    // Read local file into a node buffer
    const fs = require('fs');
    const fileSystemFile = fs.readFileSync("./test.txt");
    // Converts the node buffer to an array
    const updateFile = [...fileSystemFile];

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

## Create File
The same as creating a new page, an asset must be sent when creating a new file. There is a `createBlankFile()` helper function for this as well.

The asset ID of the newly created file will be returned on success.
```javascript
const newFile = cascadeAPI.createBlankFile();
newFile.siteName = cascadeAPI.site;
newFile.parentFolderPath = "/test";
newFile.name = "test.txt";
newFile.text = "Test";
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

## Delete File

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

## Publish File

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