var express = require('express');
var db = express();
const mongoose = require('mongoose');

const url='mongodb://localhost:27017/conFusion';
//const connect = mongoose.connect(url);
const connect = mongoose.connect( url, { useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);


connect.then((db)=>{
    console.log('Connected Correctly to server');
  },(err)=>{
     console.log(err);
  });
  
module.exports = connectDB;