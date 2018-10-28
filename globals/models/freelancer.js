////
///@ author Nikhil Saini
///@ desc database model and hooks for freelancers
////

//freelancer Schema
// using global "mongooseInstance"
var freelancerSchema = mongooseInstance.Schema({
    otp: "string",
    authToken: "string",
    firstName: "string",
    lastName: "string",
    phoneNumber: "string",
    accounts: {
        type: 'map',
        of: 'string'
    },
    transactions: [mongooseInstance.Schema.Types.ObjectId],
    __verified: "boolean",
    __active: "boolean",
    __created: "date",
    __modified: "date"
});

//event hooks for freelancerSchema
freelancerSchema.pre('save', async function () {
    if (this.isNew) {
        this.authToken = randomString("########################################");
        this.__active = true;
        this.__verified = false;
        this.__created = moment();
        this.__modified = moment();
    }
}, console.log);
freelancerSchema.pre('updateOne', async function () {
    this.update({}, { $set: { __modified: moment() } });
}, console.log);

//freelancer model
var freelancerModel = mongooseInstance.model("freelancer", freelancerSchema);

//exports
module.exports = freelancerModel;
