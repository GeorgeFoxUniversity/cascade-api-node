# Other API Uses

If an operation doesn't have a wrapper function listed for it, you can call the `APICall` function directly to access it. This one reads access rights for a page: 

```javascript
cascadeAPI.APICall("readAccessRights","page","/test/test")
.then(response=>{
    console.log("Call succeeded");
    console.log(response);
})
.catch(error=>{
    console.log("Call failed");
    console.log(error);
});
```

## Parameters

The `APICall` function has multiple function parameters, not all of which are used on every call. See full documentation in the [class documentation](cascade-api.md#Cascade+APICall).