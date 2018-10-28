////
/// @page controllers/otp
/// @author Nikhil Saini
/// @desc Swagger route controller for OTP module
////

//module exports
module.exports.post = async ({ query, headers }, res) => {
  //target receiver in db
  var receiver;
  var user = dbModels.user;
  var freelancer = dbModels.freelancer;

  //check app of request origin. Get entry of the user/freelancer accordingly if in database, if not available create one
  switch (headers["x-app-identifier"]) {
    case "com.skiller.client":
      receiver = await user.findOne({ phoneNumber: query.phone });
      if (!receiver)
        receiver = await user.create({
          phoneNumber: query.phone
        });
      break;
    case "com.skiller.freelancer":
      receiver = await freelancer.findOne({
        phoneNumber: query.phone
      });
      if (!receiver)
        receiver = await freelancer.create({
          phoneNumber: query.phone
        });
      break;
    default:
      res.status(401);
      res.json("Invalid App");
  }

  //initiate sms
  if (receiver) {
    var otp = randomString("111111");
    var { response, error } = await smsProvider.message(
      [query.phone],
      smsConfig.otp.prepend + otp
    );
    true
      ? (async () => {
          receiver
            .updateOne({ otp: otp })
            .then(() => {
              res.status(200);
              res.json("Success");
            })
            .catch(() => {
              res.status(500);
              res.json("Server error");
            });
        })()
      : (() => {
          res.status(500);
          res.json("Server error");
        })();
  }
};
