
const express = require("express");
const app = express();
const port = 8002;
var server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const path = require('path');

const cors = require("cors");
const mongoose = require('mongoose');
const {Schema} = mongoose;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/fe', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://elkanios:robotka@cluster0-wcjwo.mongodb.net/DBchat`,{ useUnifiedTopology: true, useNewUrlParser: true });

var clients = {};

const usersSchema = new Schema({
    id: Number,
    name: String,
})

var User = mongoose.model('users', usersSchema);

io.on("connection", function(client) {
  client.on("sign-in", e => {
    let user_id = e.id;
    if (!user_id) return;
    client.user_id = user_id;
    if (clients[user_id]) {
      clients[user_id].push(client);
    } else {
      clients[user_id] = [client];
    }
  });

  client.on("message", e => {
    let targetId = e.to;
    let sourceId = client.user_id;
    if(targetId && clients[targetId]) {
      clients[targetId].forEach(cli => {
        cli.emit("message", e);
      });
    }

    if(sourceId && clients[sourceId]) {
      clients[sourceId].forEach(cli => {
        cli.emit("message", e);
      });
    }
  });

  client.on("disconnect", function() {
    if (!client.user_id || !clients[client.user_id]) {
      return;
    }
    let targetClients = clients[client.user_id];
    for (let i = 0; i < targetClients.length; ++i) {
      if (targetClients[i] == client) {
        targetClients.splice(i, 1);
      }
    }
  });
});

app.get("/users", (req, res) => {
   User.find({}, function (err, userss) {
        if(err){
            res.send("something is really wrong");
            next();
        }
       res.json(userss); 
    }); 
}),

app.post("/users", (req, res) => {
    console.log("BackEnd "+req.body);
    var user = new User(req.body);
    user.save(function(err,user){
        res.json(user);
    });
}),
        
 app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

server.listen(port, () =>
  console.log(`APP listening on port ${port}!`)
);
