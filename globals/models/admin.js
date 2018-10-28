////
///@ author Nikhil Saini
///@ desc database model and hooks for admin
////

//admin Schema
// using global "mongooseInstance"
var adminSchema = mongooseInstance.Schema({

});

//event hooks for adminSchema
adminSchema.pre('save', async function () {}, console.log);

adminSchema.pre('updateOne', async function () {}, console.log);

//admin model
var adminModel = mongooseInstance.model('admin', adminSchema);

//exports
module.exports = adminModel;