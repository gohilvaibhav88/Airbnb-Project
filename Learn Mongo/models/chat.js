const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    to :{
        type : String ,
        required: true 
    },
    from:{
        type :String,
        required : true 
    },
    msg:{
        type: String,
        maxLength: 50
    },
    created_At: {
        type: Date ,
        default : Date.now()
    }
})

const Chat = mongoose.model("Chat" , chatSchema);


module.exports = Chat;