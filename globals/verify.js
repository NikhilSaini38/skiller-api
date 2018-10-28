////
/// @page models/verify
/// @author Sher Gurungg
/// @desc This function verifies the token in headers of the request
///       and returns the session payload if it is authorized
////
global.verify = async (headers)=>{

    //initial variables
    var target;
    var {user,freelancers,admin} = dbModels;

    //identify app of origin of request and get suitable data
    switch(headers['x-app-identifier']){
        case 'com.skiller.client':
            target = await user.findOne({_id:headers['x-id']});
            break;
        case 'com.skiller.freelancer':
            target = await freelancers.findOne({_id:headers['x-id']});
            break;
        case 'admin-panel':
            target = await admin.findOne({_id:headers['x-id']});
            break;
        default:
            return undefined;
    };

    // check if database entry exists
    if(target){

        //verify with authToken (per user private key)
        return jwt.verify(headers['x-token'],target.authToken);
        
    }else{
        return undefined;
    }
}