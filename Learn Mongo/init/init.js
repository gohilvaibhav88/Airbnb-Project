const mongoose = require('mongoose');
const Chat = require("../models/chat")



main().then(() => {
    console.log('Connection successful');
  }).catch(err => console.log(err));

  async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  }


  const allChats = [
    {
        "from": "neha",
        "to": "Boby",
        "msg": "Hey, how's it going?"
      },
      {
        "from": "Bob",
        "to": "Alice",
        "msg": "Not bad, thanks! What about you?"
      },
      {
        "from": "Charli",
        "to": "Davi",
        "msg": "Hello, long time no see!"
      },
      {
        "from": "David",
        "to": "Charlie",
        "msg": "Yeah, it's been a while! What have you been up to?"
      },
      {
        "from": "Eva",
        "to": "Fra",
        "msg": "Hi there! Ready for the weekend?"
      },
      {
        "from": "Frank",
        "to": "Evay",
        "msg": "Absolutely! Any exciting plans?"
      },
      {
        "from": "Grace",
        "to": "Harry",
        "msg": "Hey, did you catch the latest movie?"
      },
      {
        "from": "Har",
        "to": "Grac",
        "msg": "Not yet, is it any good?"
      },
      {
        "from": "Ivvy",
        "to": "Jacky",
        "msg": "Good morning! How's your day starting?"
      },
      {
        "from": "Jack",
        "to": "Ivy",
        "msg": "Morning! It's going well, thanks. How about yours?"
      }
  ]

Chat.insertMany(allChats)
