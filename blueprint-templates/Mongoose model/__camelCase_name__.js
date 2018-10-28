////
///@ author Nikhil Saini
///@ desc database model and hooks for {{camelCase name}}
////

//{{camelCase name}} Schema
// using global "mongooseInstance"
var {{camelCase name}}Schema = mongooseInstance.Schema({

});

//event hooks for {{camelCase name}}Schema
{{camelCase name}}Schema.pre('save', async function () {}, console.log);

{{camelCase name}}Schema.pre('updateOne', async function () {}, console.log);

//{{camelCase name}} model
var {{camelCase name}}Model = mongooseInstance.model('{{camelCase name}}', {{camelCase name}}Schema);

//exports
module.exports = {{camelCase name}}Model;