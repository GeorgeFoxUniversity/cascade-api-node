# Other API Uses

If an operation isn't specified, you can call the `APICall` function directly to access it. This one lists subscribers for a page: 

```javascript
cascadeAPI.APICall("listSubscribers","page","/test/test")
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