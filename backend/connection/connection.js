const mongoose = require("mongoose");
var mongoURL = 'mongodb+srv://sharma29ranjana:123shruti@cluster0.23eyb.mongodb.net/FastTrack'
mongoose.connect(mongoURL )
var connection = mongoose.connection
connection.on('error',()=>{
    console.log('mongodb connection failed')
})
connection.on('connected',()=>{
    console.log('mongodb connection successful')
})
module.exports = mongoose
