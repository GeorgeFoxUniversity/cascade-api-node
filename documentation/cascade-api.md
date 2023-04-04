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
<p>Typically used to create new objects when using the <a href="#Cascade+createPage">createPage</a> and 
<a href="#Cascade+createFile">createFile</a> functions.</p>
<p>These are returned by the <a href="#Cascade+createBlankPage">createBlankPage</a> and 
<a href="#Cascade+createBlankFile">createBlankFile</a> methods.</p>
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
    * [.APICall(operation, [type], [assetIDPath], [assetObject])](#Cascade+APICall) ⇒ <code>Object</code>
    * [.readPage(path)](#Cascade+readPage) ⇒ <code>Object</code>
    * [.readFile(path)](#Cascade+readFile) ⇒ <code>Object</code>
    * [.deletePage(path)](#Cascade+deletePage) ⇒ <code>Object</code>
    * [.deleteFile(path)](#Cascade+deleteFile) ⇒ <code>Object</code>
    * [.editPage(assetObject)](#Cascade+editPage) ⇒ <code>Object</code>
    * [.editFile(assetObject)](#Cascade+editFile) ⇒ <code>Object</code>
    * [.publishPage(path)](#Cascade+publishPage) ⇒ <code>Object</code>
    * [.publishFile(path)](#Cascade+publishFile) ⇒ <code>Object</code>
    * [.createPage(assetObject)](#Cascade+createPage) ⇒ <code>Object</code>
    * [.createFile(assetObject)](#Cascade+createFile) ⇒ <code>Object</code>

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
Return a blank file, this is helpful when creating new assets.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: [<code>CascadeAsset</code>](#CascadeAsset) - Blank file  
<a name="Cascade+APICall"></a>

### cascade.APICall(operation, [type], [assetIDPath], [assetObject]) ⇒ <code>Object</code>
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
Edit a file, given a Cascade file object. Typically the page to edit is read in via [readFile](#Cascade+readFile),
but it can be manually created as well.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| assetObject | <code>Object</code> | Cascade object representing the file. |

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
Create a file, given a Cascade file object. Typically this is created using [createBlanFile](#Cascade+createBlankFile),
but it can be created manually as well.

**Kind**: instance method of [<code>Cascade</code>](#Cascade)  
**Returns**: <code>Object</code> - Object representing the Cascade response.  
**Throws**:

- Will throw an error if the Cascade API operation was not successful.


| Param | Type | Description |
| --- | --- | --- |
| assetObject | <code>Object</code> | Cascade object representing the file. |

<a name="CascadeAsset"></a>

## CascadeAsset
Class to represent assets to submit into Cascade Server. These are generally used
when creating a new asset, as it makes it easier than creating the required 
properties from scratch.

Typically used to create new objects when using the [createPage](#Cascade+createPage) and 
[createFile](#Cascade+createFile) functions.

These are returned by the [createBlankPage](#Cascade+createBlankPage) and 
[createBlankFile](#Cascade+createBlankFile) methods.

**Kind**: global class  
<a name="new_CascadeAsset_new"></a>

### new CascadeAsset([type])
Create a new CascadeAsset object.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>string</code> | <code>&quot;page&quot;</code> | Either page or file, defaults to page. |

