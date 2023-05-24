const moongoose = require('mongoose');
const { Schema } = moongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true}
    ,
    email: {
        type: String,
        required: true},
    password: {
        type: String,
        required: true},
}, { timestamps: true });
const User = moongoose.model('User', userSchema,"Users");
module.exports = User;
