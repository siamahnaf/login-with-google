const { Schema, model } = require("mongoose");

module.exports.User = model('User', Schema({
    name: String,
    email: String,
    avatar: String,
    provider: String,
    providerId: String
}, { timestamps: true }));