const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./models/chat")


app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

main().then(() => {
  console.log('Connection successful');
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// const chat1 = new Chat({
//     from: "Vaibhav",
//     to: "ojas",
//     msg:"Hello how are you"
// })

// chat1.save().then((res)=>console.log(res)).catch((err)=>console.log(err))

app.get('/index' ,async function(req , res ){
    let result = await Chat.find();
    res.render("chats.ejs" , {result})
    
})

//new
app.get('/chats/newChat' , async function(req, res){
    res.render('newChat.ejs')
})



app.get('/', (req, res) => {
  // Render a view (e.g., home.ejs) from the 'views' directory
  res.render('home');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
