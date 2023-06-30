# Folder Functions

## Read Folder

```javascript
cascadeAPI.readFolder("/test")
.then(response=>{
    console.log("Success reading folder:");
    console.log(response);
})
.catch(error=>{
    console.error("Erroring reading folder:");
    console.error(error);
});
```

## Edit Folder

```javascript
cascadeAPI.readFolder("/test/test2")
.then(response=>{
    console.log("Success reading folder:");
    const foundFolder = response.asset.folder;
    foundFolder.metadata.displayName = "New Display Name";
    cascadeAPI.editFolder(foundFolder)
    .then(response=>{
        console.log("Success editing folder:");
        console.log(response);
    })
    .catch(error => {
        console.errer("Error editing folder:");
        console.errer(error);
    });
})
.catch(error=>{
    console.error("Error reading folder:");
    console.error(error);
});
```

## Create Folder
The same as creating a new page, an asset must be sent when creating a new folder. There is a `createBlankFolder()` helper function for this as well. Unlike a page the only things that are required are `siteName`, `parentFolderPath` and `name`.

The asset ID of the newly created folder will be returned on success.
```javascript
const newFolder = cascadeAPI.createBlankFolder();
newFolder.siteName = cascadeAPI.site;
newFolder.parentFolderPath = "/test";
newFolder.name = "test2";
console.log(newFolder);
cascadeAPI.createFolder(newFolder)
.then(response=>{
    console.log("Success creating folder:");
    console.log(response);
})
.catch(error=>{
    console.error("Error creating folder:");
    console.error(error);
});
```

## Delete Folder

```javascript
cascadeAPI.deleteFolder("/test/test2")
.then(response=>{
    console.log("Success deleting folder:");
    console.log(response);
})
.catch(error=>{
    console.error("Error deleting folder:");
    console.error(error);
});
```

## Publish Folder

```javascript
cascadeAPI.publishFolder("/test/test2")
.then(response=>{
    console.log("Success publishing folder:");
    console.log(response);
})
.catch(error=>{
    console.error("Error publishing folder:");
    console.error(error);
});
```

## Check Folder Relationships

```javascript
cascadeAPI.checkRelationshipsFolder("/test")
.then(response=>{
    console.log("Success getting relationships:");
    console.log(response);
})
.catch(error=>{
    console.error("Error getting relationships:");
    console.error(error);
});
```