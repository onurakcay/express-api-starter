const mongoose = require('mongoose');

const user = mongoose.Schema({
    name : {type:String,required:true},
    mail : {type:String,unique:true},
    password : {type:String,required:true},
});

const user_model = mongoose.model("user",user);

module.exports = user_model;