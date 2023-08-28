## Classes

<dl>
<dt><a href="#Cascade">Cascade</a></dt>
<dd><p>Class to wrap REST calls to the Cascade Server API. 
This class operates in two modes, path or identifier. If on path mode, any path listed in the wrapper functions
or <code>APICall</code> function will use a path, with the site specified either in the constructor or utility function.
Otherwise it will use a Cascade asset ID. You can swap modes using the <a href="#Cascade+useId">useId</a> or 
<a href="#Cascade+usePath">usePath</a> methods.</p>
</dd>
<dt><a href="#CascadeAsset">CascadeAsset</a></dt>
<dd><p>Class to represent assets to submit into Cascade Server. These are generally used
when creating a new asset, as it makes it easier than creating the required 
properties from scratch.</p>
<p>Typically used to create new objects when using the <a href="#Cascade+createPage">createPage</a>, 
<a href="#Cascade+createFile">createFile</a>, and <a href="#Cascade+createFolder">createFolder</a> functions.</p>
<p>These are returned by the <a href="#Cascade+createBlankPage">createBlankPage</a>, 
<a href="#Cascade+createBlankFile">createBlankFile</a>, and <a href="#Cascade+createBlankFolder">createBlankFolder</a> methods.</p>
</dd>
</dl>

<a name="Cascade"></a>

## Cascade
Class to wrap REST calls to the Cascade Server API. 
This class operates in two modes, path or identifier. If on path mode, any path listed in the wrapper functions
or `APICall` function will use a path, with the site specified either in the constructor or utility function.
Otherwise it will use a Cascade asset ID. You can swap modes using the [useId](#Cascade+useId) or 
[usePath](#Cascade+usePath) methods.

**Kind**: global class  

* [Cascade](#Cascade)
    * [new Cascade(apiRoot, authentication, [site])](#new_Cascade_new)
    * [.usePath(siteName)](#Cascade+usePath)
    * [.useId()](#Cascade+useId)
    * [.createBlankPage()](#Cascade+createBlankPage) ⇒ [<code>CascadeAsset</code>](#CascadeAsset)
    * [.createBlankFile()](#Cascade+createBlankFile) ⇒ [<code>CascadeAsset</code>](#CascadeAsset)
    * [.createBlankBlockDataDef()](#Cascade+createBlankBlockDataDef) ⇒ [<code>CascadeAsset</code>](#CascadeAsset)
    * [.createBlankFolder()](#Cascade+createBlankFolder) ⇒ [<code>CascadeAsset</code>](#CascadeAsset)
    * [.APICall(operation, [type], [assetIDPath], [assetObject], [ajaxParameters])](#Cascade+APICall) ⇒ <code>Object</code>
    * [.readPage(path)](#Cascade+readPage) ⇒ <code>Object</code>
    * [.readFile(path)](#Cascade+readFile) ⇒ <code>Object</code>
    * [.readBlock(path)](#Cascade+readBlock) ⇒ <code>Object</code>
    * [.readFolder(path)](#Cascade+readFolder) ⇒ <code>Object</code>
    * [.deletePage(path)](#Cascade+deletePage) ⇒ <code>Object</code>
    * [.deleteFile(path)](#Cascade+deleteFile) ⇒ <code>Object</code>
    * [.deleteBlock(path)](#Cascade+deleteBlock) ⇒ <code>Object</code>
    * [.deleteFolder(path)](#Cascade+deleteFolder) ⇒ <code>Object</code>
    * [.editPage(assetObject)](#Cascade+editPage) ⇒ <code>Object</code>
    * [.editFile(assetObject)](#Cascade+editFile) ⇒ <code>Object</code>
    * [.editBlock(assetObject, [blockType])](#Cascade+editBlock) ⇒ <code>Object</code>
    * [.editFolder(assetObject)](#Cascade+editFolder) ⇒ <code>Object</code>
    * [.publishPage(path)](#Cascade+publishPage) ⇒ <code>Object</code>
    * [.publishFile(path)](#Cascade+publishFile) ⇒ <code>Object</code>
    * [.publishFolder(path)](#Cascade+publishFolder) ⇒ <code>Object</code>
    * [.createPage(assetObject)](#Cascade+createPage) ⇒ <code>Object</code>
    * [.createFile(assetObject)](#Cascade+createFile) ⇒ <code>Object</code>
    * [.createBlock(assetObject, [blockType])](#Cascade+createBlock) ⇒ <code>Object</code>
    * [.createFolder(assetObject)](#Cascade+createFolder) ⇒ <code>Object</code>
    * [.movePage(path, newName, folderPath)](#Cascade+movePage) ⇒ <code>Object</code>
    * [.moveFile(path, newName, folderPath)](#Cascade+moveFile) ⇒ <code>Object</code>
    * [.moveBlock(path, newName, folderPath)](#Cascade+moveBlock) ⇒ <code>Object</code>
    * [.moveFolder(path, newName, folderPath)](#Cascade+moveFolder) ⇒ <code>Object</code>
    * [.doMove(path, newName, folderPath, type)](#Cascade+doMove) ⇒ <code>Object</code>
    * [.copyPage(path, newName, folderPath)](#Cascade+copyPage) ⇒ <code>Object</code>
    * [.copyFile(path, newName, folderPath)](#Cascade+copyFile) ⇒ <code>Object</code>
    * [.copyBlock(path, newName, folderPath)](#Cascade+copyBlock) ⇒ <code>Object</code>
    * [.copyFolder(path, newName, folderPath)](#Cascade+copyFolder) ⇒ <code>Object</code>
    * [.makeCopy(path, newName, folderPath, type)](#Cascade+makeCopy) ⇒ <code>Object</code>
    * [.checkRelationshipsPage(path)](#Cascade+checkRelationshipsPage) ⇒ <code>Object</code>
    * [.checkRelationshipsFile(path)](#Cascade+checkRelationshipsFile) ⇒ <code>Object</code>
    * [.checkRelationshipsBlock(path)](#Cascade+checkRelationshipsBlock) ⇒ <code>Object</code>
    * [.checkRelationshipsFolder(path)](#Cascade+checkRelationshipsFolder) ⇒ <code>Object</code>

<a name="new_Cascade_new"></a>

### new Cascade(apiRoot, authentication, [site])
Create a new Cascade API object. This will build a REST query to the Cascade instance provided in the 
constructor. The class relies on one of two modes to operate in when making calls, paths, or identifiers,
if a site is listed in the constructor, it will use path, otherwise it will use identifier.


| Param | Type | Description |
| --- | --- | --- |
| apiRoot | <code>string</code> | Root URL of your Cascade instance |
| authentication | <code>Object</code> | Authentication object, should either have username and password properties or apiKey property |
| authentication.apiKey | <code>string</code> | API key to make the call with. Either this OR username/password must be included. |
| authentication.username | <code>string</code> | Username to make the call with. Either username & password OR apiKey must be included. |
| authentication.password | <code>string</code> | Password to make the call with. Either username & password OR apiKey must be included. |
| [site] | <code>string</code> | Site to use if using paths to identify assets. |

<a name="Cascade+usePath"></a>

### cascade.usePath(siteName)
Change the mode of the Cascade object to use paths.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  

| Param | Type | Description |
| --- | --- | --- |
| siteName | <code>string</code> | Name of the site to add to calls. |

<a name="Cascade+useId"></a>

### cascade.useId()
Change the mode of the Casade object to use ids.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
<a name="Cascade+createBlankPage"></a>

### cascade.createBlankPage() ⇒ [<code>CascadeAsset</code>](#CascadeAsset)
Return a blank page, this is helpful when creating new assets.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: [<code>CascadeAsset</code>](#CascadeAsset) - Blank page  
<a name="Cascade+createBlankFile"></a>

### cascade.createBlankFile() ⇒ [<code>CascadeAsset</code>](#CascadeAsset)
Return a blank file, this is helpful when creating new assets. This should either have information in the
`data` attribute, or text in the `text` attribute.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: [<code>CascadeAsset</code>](#CascadeAsset) - Blank file  
<a name="Cascade+createBlankBlockDataDef"></a>

### cascade.createBlankBlockDataDef() ⇒ [<code>CascadeAsset</code>](#CascadeAsset)
Return a blank XHTML/Data Definition block, this is helpful when creating new assets. This should either
have properly escaped XHTML in the `xhtml` attribute, or a structured data object in the `structuredData` attribute.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: [<code>CascadeAsset</code>](#CascadeAsset) - Blank block  
<a name="Cascade+createBlankFolder"></a>

### cascade.createBlankFolder() ⇒ [<code>CascadeAsset</code>](#CascadeAsset)
Return a blank folder, this is helpful when creating new assets.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: [<code>CascadeAsset</code>](#CascadeAsset) - Blank folder  
<a name="Cascade+APICall"></a>

### cascade.APICall(operation, [type], [assetIDPath], [assetObject], [ajaxParameters]) ⇒ <code>Object</code>
Make an API call. Using the pre-defined functions is generally preferred, but if not all APIs
have wrapper functions, this can be called directly. While most parameters are optional,
most calls will need some number of them to be included.

This function is asynchronous, and will either return an object, or throw an error if the call
did not succeed. The error should be caught on the front end.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Cascade response object. It could be either a system response for an operation like create or edit, or an object for an operation like read.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| operation | <code>string</code> |  | Name of the operation as defined in the Cascade API. |
| [type] | <code>string</code> | <code>false</code> | Optional. Required for calls where an identifier is needed (read, publish, etc). If not needed use default. |
| [assetIDPath] | <code>string</code> | <code>false</code> | Optional. Either the path or id of the asset, needed where an identifier is needed, like type. If not needed use default. |
| [assetObject] | <code>Object</code> | <code>false</code> | Optional. Asset to be acted upon, needed for some calls (create, edit). Must have an attribute for the asset type that's being acted upon (page, block, etc) |
| [ajaxParameters] | <code>Object</code> | <code>false</code> | Optional. Parameters to be added to the body, examples being copyParameters or moveParameters which are required for those operations. |

<a name="Cascade+readPage"></a>

### cascade.readPage(path) ⇒ <code>Object</code>
Read a page, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response. Page that was found will be in the .asset.page attribute  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of page to read |

<a name="Cascade+readFile"></a>

### cascade.readFile(path) ⇒ <code>Object</code>
Read a file, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response. Page that was found will be in the .asset.page attribute  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of file to read |

<a name="Cascade+readBlock"></a>

### cascade.readBlock(path) ⇒ <code>Object</code>
Read a block, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response. Block that was found will depend on what type of block it was  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of block to read |

<a name="Cascade+readFolder"></a>

### cascade.readFolder(path) ⇒ <code>Object</code>
Read a folder, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response. Page that was found will be in the .asset.page attribute  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of folder to read |

<a name="Cascade+deletePage"></a>

### cascade.deletePage(path) ⇒ <code>Object</code>
Delete a page, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of page to delete |

<a name="Cascade+deleteFile"></a>

### cascade.deleteFile(path) ⇒ <code>Object</code>
Delete a file, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of file to delete |

<a name="Cascade+deleteBlock"></a>

### cascade.deleteBlock(path) ⇒ <code>Object</code>
Delete a block, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of block to delete |

<a name="Cascade+deleteFolder"></a>

### cascade.deleteFolder(path) ⇒ <code>Object</code>
Delete a folder, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of folder to delete |

<a name="Cascade+editPage"></a>

### cascade.editPage(assetObject) ⇒ <code>Object</code>
Edit a page, given a Cascade page object. Typically the page to edit is read in via [readPage](#Cascade+readPage),
but it can be manually created as well.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| assetObject | <code>Object</code> | Cascade object representing the page. |

<a name="Cascade+editFile"></a>

### cascade.editFile(assetObject) ⇒ <code>Object</code>
Edit a file, given a Cascade file object. Typically the file to edit is read in via [readFile](#Cascade+readFile),
but it can be manually created as well.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| assetObject | <code>Object</code> | Cascade object representing the file. |

<a name="Cascade+editBlock"></a>

### cascade.editBlock(assetObject, [blockType]) ⇒ <code>Object</code>
Edit a block, given a Cascade block object. Typically the block to edit is read in via [readBlock](#Cascade+readBlock),
but it can be manually created as well.

Unlike other assets, blocks need to specify

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| assetObject | <code>Object</code> |  | Cascade object representing the block. |
| [blockType] | <code>string</code> | <code>&quot;xhtmlDataDefinitionBlock&quot;</code> | Type of the block to interact with, this defaults to an XHTML/Data Defintion Block |

<a name="Cascade+editFolder"></a>

### cascade.editFolder(assetObject) ⇒ <code>Object</code>
Edit a folder, given a Cascade folder object. Typically the folder to edit is read in via [readFolder](#Cascade+readFolder),
but it can be manually created as well.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| assetObject | <code>Object</code> | Cascade object representing the folder. |

<a name="Cascade+publishPage"></a>

### cascade.publishPage(path) ⇒ <code>Object</code>
Publish a page, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of page to publish. |

<a name="Cascade+publishFile"></a>

### cascade.publishFile(path) ⇒ <code>Object</code>
Publish a file, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of file to publish. |

<a name="Cascade+publishFolder"></a>

### cascade.publishFolder(path) ⇒ <code>Object</code>
Publish a folder, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of folder to publish. |

<a name="Cascade+createPage"></a>

### cascade.createPage(assetObject) ⇒ <code>Object</code>
Create a page, given a Cascade page object. Typically this is created using [createBlankPage](#Cascade+createBlankPage),
but it can be created manually as well.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| assetObject | <code>Object</code> | Cascade object representing the page. |

<a name="Cascade+createFile"></a>

### cascade.createFile(assetObject) ⇒ <code>Object</code>
Create a file, given a Cascade file object. Typically this is created using [createBlankFile](#Cascade+createBlankFile),
but it can be created manually as well.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| assetObject | <code>Object</code> | Cascade object representing the file. |

<a name="Cascade+createBlock"></a>

### cascade.createBlock(assetObject, [blockType]) ⇒ <code>Object</code>
Create a block, given a Cascade block object. Typically this is created using [createBlankBlockDataDef](#Cascade+createBlankBlockDataDef),
but it can be created manually as well.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| assetObject | <code>Object</code> |  | Cascade object representing the block. |
| [blockType] | <code>string</code> | <code>&quot;xhtmlDataDefinitionBlock&quot;</code> | Type of the block to interact with, this defaults to an XHTML/Data Defintion Block |

<a name="Cascade+createFolder"></a>

### cascade.createFolder(assetObject) ⇒ <code>Object</code>
Create a folder, given a Cascade folder object. Typically this is created using [createBlankFolder](#Cascade+createBlankFolder),
but it can be created manually as well.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| assetObject | <code>Object</code> | Cascade object representing the folder. |

<a name="Cascade+movePage"></a>

### cascade.movePage(path, newName, folderPath) ⇒ <code>Object</code>
Do a move operation on a page, given a path, name, and folder. Unlike the Move and Rename operations in Cascade,
which have separate functionality, this combines them into a single operation.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of the page to move. |
| newName | <code>string</code> | New name of the page. If the asset is being moved to a different folder, this can be the same as the current name. |
| folderPath | <code>string</code> | Path or ID of the folder to move to. If the asset is not being moved to a different folder, this can be the same as the current folder. |

<a name="Cascade+moveFile"></a>

### cascade.moveFile(path, newName, folderPath) ⇒ <code>Object</code>
Do a move operation on a file, given a path, name, and folder. Unlike the Move and Rename operations in Cascade,
which have separate functionality, this combines them into a single operation.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of the file to move. |
| newName | <code>string</code> | New name of the file. If the asset is being moved to a different folder, this can be the same as the current name. |
| folderPath | <code>string</code> | Path or ID of the folder to move to. If the asset is not being moved to a different folder, this can be the same as the current folder. |

<a name="Cascade+moveBlock"></a>

### cascade.moveBlock(path, newName, folderPath) ⇒ <code>Object</code>
Do a move operation on a block, given a path, name, and folder. Unlike the Move and Rename operations in Cascade,
which have separate functionality, this combines them into a single operation.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of the block to move. |
| newName | <code>string</code> | New name of the block. If the asset is being moved to a different folder, this can be the same as the current name. |
| folderPath | <code>string</code> | Path or ID of the block to move to. If the asset is not being moved to a different folder, this can be the same as the current folder. |

<a name="Cascade+moveFolder"></a>

### cascade.moveFolder(path, newName, folderPath) ⇒ <code>Object</code>
Do a move operation on a folder, given a path, name, and folder. Unlike the Move and Rename operations in Cascade,
which have separate functionality, this combines them into a single operation.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of the folder to move. |
| newName | <code>string</code> | New name of the folder. If the asset is being moved to a different folder, this can be the same as the current name. |
| folderPath | <code>string</code> | Path or ID of the folder to move to. If the asset is not being moved to a different folder, this can be the same as the current folder. |

<a name="Cascade+doMove"></a>

### cascade.doMove(path, newName, folderPath, type) ⇒ <code>Object</code>
Do a move operation on an asset, given a path, name, folder, and type. Unlike the Move and Rename operations in Cascade,
which have separate functionality, this combines them into a single operation.

This should generally not be called directly, and instead a wrapper function like [movePage](#Cascade+movePage) or [moveFile](#Cascade+moveFile) should
be used instead. But if you need to move or rename an asset that doesn't have a type this can be used.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of the asset to move. |
| newName | <code>string</code> | New name of the asset. If the asset is being moved to a different folder, this can be the same as the current name. |
| folderPath | <code>string</code> | Path or ID of the folder to move to. If the asset is not being moved to a different folder, this can be the same as the current folder. |
| type | <code>string</code> | Type of the asset being moved. |

<a name="Cascade+copyPage"></a>

### cascade.copyPage(path, newName, folderPath) ⇒ <code>Object</code>
Make a copy of a a page, given a path, type, new name, and folder.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of page to copy. |
| newName | <code>string</code> | New name of the page. If the asset is being copied to a different folder, this can be the same as the current name. |
| folderPath | <code>string</code> | Path or ID of the folder to copy to. If the asset is not being copied to a different folder, this can be the same as the current folder. |

<a name="Cascade+copyFile"></a>

### cascade.copyFile(path, newName, folderPath) ⇒ <code>Object</code>
Make a copy of a a file, given a path, type, new name, and folder.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of file to copy. |
| newName | <code>string</code> | New name of the file. If the asset is being copied to a different folder, this can be the same as the current name. |
| folderPath | <code>string</code> | Path or ID of the folder to copy to. If the asset is not being copied to a different folder, this can be the same as the current folder. |

<a name="Cascade+copyBlock"></a>

### cascade.copyBlock(path, newName, folderPath) ⇒ <code>Object</code>
Make a copy of a a block, given a path, type, new name, and folder.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of block to copy. |
| newName | <code>string</code> | New name of the block. If the asset is being copied to a different folder, this can be the same as the current name. |
| folderPath | <code>string</code> | Path or ID of the folder to copy to. If the asset is not being copied to a different folder, this can be the same as the current folder. |

<a name="Cascade+copyFolder"></a>

### cascade.copyFolder(path, newName, folderPath) ⇒ <code>Object</code>
Make a copy of a a folder, given a path, type, new name, and folder.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of folder to copy. |
| newName | <code>string</code> | New name of the folder. If the asset is being copied to a different folder, this can be the same as the current name. |
| folderPath | <code>string</code> | Path or ID of the folder to copy to. If the asset is not being copied to a different folder, this can be the same as the current folder. |

<a name="Cascade+makeCopy"></a>

### cascade.makeCopy(path, newName, folderPath, type) ⇒ <code>Object</code>
Make a copy of an asset, given a path, type, new name, and folder. This should generally not be called directly,
and instead a wrapper method like [copyPage](#Cascade+copyPage) or [copyFile](#Cascade+copyFile) should
be used. If the type doesn't have a wrapper function, this can be used instead.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of asset to copy. |
| newName | <code>string</code> | New name of the item to use. If the asset is being copied to a different folder, this can be the same as the current name. |
| folderPath | <code>string</code> | Path or ID of the folder to copy to. If the asset is not being copied to a different folder, this can be the same as the current folder. |
| type | <code>string</code> | Type of the asset being copied. |

<a name="Cascade+checkRelationshipsPage"></a>

### cascade.checkRelationshipsPage(path) ⇒ <code>Object</code>
Check relationships for a page, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of page to check. |

<a name="Cascade+checkRelationshipsFile"></a>

### cascade.checkRelationshipsFile(path) ⇒ <code>Object</code>
Check relationships for a file, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of file to check. |

<a name="Cascade+checkRelationshipsBlock"></a>

### cascade.checkRelationshipsBlock(path) ⇒ <code>Object</code>
Check relationships for a file, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of file to check. |

<a name="Cascade+checkRelationshipsFolder"></a>

### cascade.checkRelationshipsFolder(path) ⇒ <code>Object</code>
Check relationships for a folder, given a path or ID (depending on the mode of the Cascade object) and return a Cascade response.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path or ID of folder to check. |

<a name="CascadeAsset"></a>

## CascadeAsset
Class to represent assets to submit into Cascade Server. These are generally used
when creating a new asset, as it makes it easier than creating the required 
properties from scratch.

Typically used to create new objects when using the [createPage](#Cascade+createPage), 
[createFile](#Cascade+createFile), and [createFolder](#Cascade+createFolder) functions.

These are returned by the [createBlankPage](#Cascade+createBlankPage), 
[createBlankFile](#Cascade+createBlankFile), and [createBlankFolder](#Cascade+createBlankFolder) methods.

**Kind**: global class  
<a name="new_CascadeAsset_new"></a>

### new CascadeAsset([type])
Create a new CascadeAsset object.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>string</code> | <code>&quot;page&quot;</code> | Either page, file, or folder. Defaults to page. |

