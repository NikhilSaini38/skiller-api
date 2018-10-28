////
///@ author Nikhil Saini
///@ desc database model and hooks for task
////

//task Schema
// using global "mongooseInstance"
var taskSchema = mongooseInstance.Schema({

});

//event hooks for taskSchema
taskSchema.pre('save', async function () {}, console.log);

taskSchema.pre('updateOne', async function () {}, console.log);

//task model
var taskModel = mongooseInstance.model('task', taskSchema);

//exports
module.exports = taskModel;