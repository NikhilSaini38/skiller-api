////
/// @page globals/config
/// @author Nikhil Saini
/// @desc Global variable for configuration
////


//Configurations for database
global.dbConfig={
    urls:{
        dev:"mongodb://localhost/dev",
        test:"mongodb://localhost/test",
        stage:"mongodb://localhost/stage",
        prod:"mongodb://localhost/prod",
    }
}

//configurations for server
global.serverConfig={
    port:4000
}

//configurations for sms provider
global.smsProvider = telstra;
global.smsConfig={
    client:{
        id:"wyiR7yI673ArHAu0sK1jnO0w0dLv1HlG",
        secret:"uvR3AZhGzKzH8zRz"
    },
    otp:{
        prepend:"Your Skiller OTP is: "
    }
}

//global instances of libraries used at multiple occasions
global.moment=require("moment");

//axios library made async await compatible
global.axios=async (params)=>{
    var response,error;
    await require("axios")(params).then(res=>{response=res}).catch(err=>{error=err});
    return {response,error};
}

//jwt library
global.jwt=require('jsonwebtoken');