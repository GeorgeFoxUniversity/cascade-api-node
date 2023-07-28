// This should either be a relative path to the JavaScript file, or you should install the package,
// at which point it would be require("cascade-api-node").
const Cascade = require("./cascade.js");

// Replace values with your Cascade API URL, password, and site
const cascadeAPI = new Cascade("https://cascade.georgefox.edu",{apiKey: "API_KEY"},"www Redesign");

// Example reading a page
/*
cascadeAPI.readPage("/test/test")
.then(response=>{
    console.log("Success reading page:");
    console.log(response);
})
.catch(error=>{
    console.log("Error reading page:");
    console.log(error);
});
*/

// Example reading a page with ID
// Make sure to either not initialize or remove the site before accessing
/*
cascadeAPI.site = "";
cascadeAPI.readPage("96dc63ca0a0a008468d68542746cfd37")
.then(response=>{
    console.log("Success reading page:");
    console.log(response);
})
.catch(error=>{
    console.log("Error reading page:");
    console.log(error);
});
*/

// Example reading a file
/*
cascadeAPI.readFile("/template/t1/css/main.css")
.then(response=>{
    console.log("Success reading file:");
    console.log(response);
})
.catch(error=>{
    console.log("Error reading file:");
    console.log(error);
});
*/

// Exmaple reading a folder
/*
cascadeAPI.readFolder("/test")
.then(response=>{
    console.log("Success reading folder:");
    console.log(response);
})
.catch(error=>{
    console.error("Erroring reading folder:");
    console.error(error);
});
*/

// Create New Page
/*
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
*/

// Delete Page
/*
cascadeAPI.deletePage("/test/test")
.then(response=>{
    console.log("Success deleting page:");
    console.log(response);
})
.catch(error=>{
    console.log("Error deleting page:");
    console.log(error);
});
*/

// Create New File
/*
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
*/

// Delete File
/*
cascadeAPI.deleteFile("/test/test.txt")
.then(response=>{
    console.log("Success deleting file:");
    console.log(response);
})
.catch(error=>{
    console.log("Error deleting file:");
    console.log(error);
});
*/

// Example creating a folder
/*
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
*/

// Delete Folder
/*
cascadeAPI.deleteFolder("/test/test2")
.then(response=>{
    console.log("Success deleting folder:");
    console.log(response);
})
.catch(error=>{
    console.error("Error deleting folder:");
    console.error(error);
});
*/

// Example editing a page
/*
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
*/

// Example editing a file
/*
cascadeAPI.readFile("/test/test.txt")
.then(response=>{
    console.log("Success reading file:");
    const foundFile = response.asset.file;
    foundFile.text = "New content!asdasd";
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
*/

// Example editing a folder
/*
cascadeAPI.readFolder("/test/test2")
.then(response=>{
    console.log("Success reading folder:");
    const foundFolder = response.asset.folder;
    foundFolder.name = "new-name";
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
*/

// Example publishing a page
/*
cascadeAPI.publishPage("/test/test")
.then(response=>{
    console.log("Success publishing page:");
    console.log(response);
})
.catch(error=>{
    console.log("Error publishing page:");
    console.log(error);
});
*/

// Example publishing a file
/*
cascadeAPI.publishFile("/test/test.txt")
.then(response=>{
    console.log("Success publishing file:");
    console.log(response);
})
.catch(error=>{
    console.log("Error publishing file:");
    console.log(error);
});
*/

// Example publishing a folder
/*
cascadeAPI.publishFolder("/test/test2")
.then(response=>{
    console.log("Success publishing folder:");
    console.log(response);
})
.catch(error=>{
    console.error("Error publishing folder:");
    console.error(error);
});
*/

// Example checking relationships on a page
/*
cascadeAPI.checkRelationshipsPage("/test/page-1")
.then(response=>{
    console.log("Success getting relationships:");
    console.log(response);
})
.catch(error=>{
    console.error("Error getting relationships:");
    console.error(error);
});
*/

// Example checking relationships on a file
/*
cascadeAPI.checkRelationshipsFile("/test/_assets-image-file-test/images/airplane.png")
.then(response=>{
    console.log("Success getting relationships:");
    console.log(response);
})
.catch(error=>{
    console.error("Error getting relationships:");
    console.error(error);
});
*/

// Example checking relationships on a folder
/*
cascadeAPI.checkRelationshipsFolder("/test")
.then(response=>{
    console.log("Success getting relationships:");
    console.log(response);
})
.catch(error=>{
    console.error("Error getting relationships:");
    console.error(error);
});
*/

// Example copying a page
/*
cascadeAPI.copyPage("/test/page","page-copy",{path:"/test"})
.then(response=>{
    console.log("Copy succeeded");
    console.log(response);
})
.catch(error=>{
    console.log("Copy failed");
    console.log(error);
});
*/

// Example copying a file
/*
cascadeAPI.copyFile("/test/test-banner.jpg","test-banner-copy.jpg",{path:"/test"})
.then(response=>{
    console.log("Copy succeeded");
    console.log(response);
})
.catch(error=>{
    console.log("Copy failed");
    console.log(error);
});
*/

// Example copying a folder
/*
cascadeAPI.copyFolder("/test/subfolder","subfolder-copy",{path:"/test"})
.then(response=>{
    console.log("Copy succeeded");
    console.log(response);
})
.catch(error=>{
    console.log("Copy failed");
    console.log(error);
});
*/

// Example moving a page
/*
cascadeAPI.movePage("/test/page","page-new",{path:"/test"})
.then(response=>{
    console.log("Move succeeded");
    console.log(response);
})
.catch(error=>{
    console.log("Move failed");
    console.log(error);
});
*/

// Example moving a file
/*
cascadeAPI.moveFile("/test/test-banner.jpg","test-banner-new.jpg",{path:"/test"})
.then(response=>{
    console.log("Move succeeded");
    console.log(response);
})
.catch(error=>{
    console.log("Move failed");
    console.log(error);
});
*/

// Example moving a folder
/*
cascadeAPI.moveFolder("/test/subfolder","subfolder-new",{path:"/test"})
.then(response=>{
    console.log("Move succeeded");
    console.log(response);
})
.catch(error=>{
    console.log("Move failed");
    console.log(error);
});
*/

// Example making a direct API call
/*
cascadeAPI.APICall("readAccessRights","page","/counseling-programs/index")
.then(response=>{
    console.log("Call succeeded");
    console.log(response);
})
.catch(error=>{
    console.log("Call failed");
    console.log(error);
});
*/