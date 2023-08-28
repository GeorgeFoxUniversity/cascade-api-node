# Block Functions

## Read Block

```javascript
cascadeAPI.readBlock("/test/test-block")
.then(response=>{
    console.log("Success reading block:");
    console.log(response);
})
.catch(error=>{
    console.log("Error reading block:");
    console.log(error);
});
```

## Edit Block
This example uses a data definition block, which is the default type, but if a different type of block needs to be edited an optional
`blockType` parameter can be sent in to the read function. If the block is a data defintion block, the `structuredData` property should
be updated instead of the `xhtml` property that is changed here.
```javascript
cascadeAPI.readBlock("/test/test-block")
.then(response=>{
    console.log("Success reading block:");
    const foundBlock = response.asset.xhtmlDataDefinitionBlock;
    foundBlock.xhtml = "<p>New content</p>";
    cascadeAPI.editBlock(foundBlock)
    .then(response=>{
        console.log("Success editing block:");
        console.log(response);
    })
    .catch(error => {
        console.errer("Error editing block:");
        console.errer(error);
    });
})
.catch(error=>{
    console.error("Error reading block:");
    console.error(error);
});
```

## Create Block
When creating a new block, you must send Cascade the asset you'd like to create. You can use the `createBlankBlockDataDef()` helper function to return a blank asset that you can then edit with the values you want. You can also manually create the object if you need a block of a different type, or if
you just want to work with it manually.

This example uses a data definition block, which is the default type, but if a different type of block needs to be edited an optional
`blockType` parameter can be sent in to the read function. If the block is a data defintion block, the `structuredData` property should
be updated instead of the `xhtml` property that is changed here.

The asset ID of the newly created page will be returned on success.
```javascript
const newBlock = cascadeAPI.createBlankBlockDataDef();
newBlock.siteName = cascadeAPI.site;
newBlock.parentFolderPath = "/test";
newBlock.name = "test-block";
newBlock.metadataSetPath = "Default";
newBlock.xhtml = "<p>Test content</p>";
console.log(newBlock);
cascadeAPI.createBlock(newBlock)
.then(response=>{
    console.log("Success creating block:");
    console.log(response);
})
.catch(error=>{
    console.error("Error creating block:");
    console.error(error);
});
```

## Delete Block

```javascript
cascadeAPI.deleteBlock("/test/test-block")
.then(response=>{
    console.log("Success deleting block:");
    console.log(response);
})
.catch(error=>{
    console.error("Error deleting block:");
    console.error(error);
});
```

## Check Block Relationships

```javascript
cascadeAPI.checkRelationshipsBlock("/test/block")
.then(response=>{
    console.log("Success getting relationships:");
    console.log(response);
})
.catch(error=>{
    console.error("Error getting relationships:");
    console.error(error);
});
```