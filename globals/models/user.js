////
///@ author Nikhil Saini
///@ desc database model and hooks for users
////

//User Schema
// using global "mongooseInstance"http://localhost:4000/otp?phone=%2B61431448633
var userSchema = mongooseInstance.Schema({
    otp: 'string',
    authToken: 'string',
    firstName: 'string',
    lastName: 'string',
    phoneNumber: 'string',
    cards: {
        type: 'map',
        of: 'string'
    },
    addresses: [],
    transactions: [],
    __verified: "boolean",
    __active: "boolean",
    __created: "date",
    __modified: "date"
});

//event hooks for userSchema
userSchema.pre('save', async function () {
    if (this.isNew) {
        this.authToken = randomString("########################################");
        this.__active = true;
        this.__verified = false;
        this.__created = moment();
    }
    this.__modified = moment();
}, console.log);

userSchema.pre('updateOne', async function () {
    this.update({}, { $set: { __modified: moment() } });
}, console.log);

//user model
var userModel = mongooseInstance.model('user', userSchema);

//exports
module.exports = userModel;