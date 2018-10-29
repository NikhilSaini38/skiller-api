////
/// @author Gurpreet Kaur, Ankita Saini, Manpreet Kaur
/// @page controllers/login
/// @desc A controller that returns a signed jwt if user is valid
/// 
////
module.exports.get = async ({ headers, query }, res) => {
    // get needed variables
    var { freelancer, user, admin } = dbModels;
    var receiver,payload;

    //check origin app of request
    switch (headers['x-app-identifier']) {
        case "com.skiller.client":

            //find client
            receiver = await user.findOne({ phoneNumber: query.phone });
            payload= {role:"client"};
            break;

        case "com.skiller.freelancer":

            //find freelancer
            receiver = await freelancer.findOne({ phoneNumber: query.phone });
            payload= {role:"freelancer"};
            break;
        
        case "admin-panel":
            receiver = await admin.findOne({ userName: query.user });
            payload= {role:"admin"};
            break;

        default:
            res.status(403);
            res.json("Forbidden");
    }

    //match otp or password
    if(receiver&&(receiver.otp||receiver.password)){
        if (receiver.otp === query.otp||receiver.password===query.password) {
    
            //send jwt or show error
            jwt.sign( payload , receiver.authToken, {},async function (err, token) {
                if (token) {
                    if(receiver.otp){
                        console.log(receiver.otp);
                        receiver.otp=undefined;
                        await receiver.save();
                    }
                    res.status(200);
                    res.json({ "x-id": receiver._id, "x-token": token });
                } else {
                    res.status(500);
                    res.json("Server Error");
                }
            });
        } else {
            // otp not matchingInvalid User or OTP
            res.status(401);
            res.json("Invalid User or OTP");
        }
    }else{
        //password or otp is undefined
        res.status(404);
        res.json("Not Found");
    }
}