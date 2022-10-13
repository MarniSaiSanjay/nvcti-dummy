const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    enrolledEvents: [{
        type : String
    }]
})

userSchema.plugin(passportLocalMongoose); // this will add on 'username' and 'passwords' fields for our schema. Apart from those two we need to add on what we need in 'userSchema'. 
module.exports = mongoose.model('User', userSchema);