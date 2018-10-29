////
/// @page users/get
/// @author Ankita Saini, Manpreet Kaur
/// @desc 
////
module.exports =async  ({ query, headers, parameters, body }, res) => {
    let session=await verify(headers);
    if(session){
        switch(query.method)
        
    }else{
        res.status(401);
        res.json('Unauthorized');
    }
}