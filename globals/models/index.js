global.mongooseInstance=require("mongoose");
global.dbModels={
    //@index(F:\.js):${variable}: require(${relpath}),
    freelancer: require("./freelancer"),
    task: require("./task"),
    user: require("./user"),
    ///index
};