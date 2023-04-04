# Node Wrapper for Cascade Server API

This wraps the [REST API implementation](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html) of [Cascade Server CMS](https://www.hannonhill.com/cascadecms/latest/index.html) into a Node.js module. While some operations have easy to use functions, currently not all do. In addition to the wrapper functions, there is also a generic API Call, which you can use to complete any operation, an example is provided later on.

# Setup
This is installed as a node module in your project. In your node project, run the following command:

`npm install cascade-api-node`

You can also clone or download the files, and install them locally.

`npm install ./local-folder-path`

# Usage
Once it's installed, require it in your node project and create a new Cascade object. Then you can call functions on that object.
```javascript
const Cascade = require("cascade-api-node");
const cascadeAPI = new Cascade("https://cascade.example.edu",{apiKey:"API-KEY-HERE"},"siteName");
```

## Authentication
The second parameter is an authentication object, while use of an [API Key](https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html#APIKey) is recommended, it can also accept a username and password.
```javascript
const cascadeAPI = new Cascade("https://cascade.example.edu",{username:"username",password:"password"},"siteName");
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

* [Page Functions](documentation/page-functions.md)
* [File Functions](documentation/file-functions.md)
* [Other API Uses](documentation/other-api.md)

## Full Documentation

Full documentation for every function available [in the JSDocs](documentation/cascade-api.md).