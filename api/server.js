const express = require('express');
const app = express();
const PORT = 5001;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser= require('body-parser');
const config = require('./DB.js');
const studentRoute = require('./route');
const userRoute= require('./routes/user')
const socket= require('socket.io');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/student', studentRoute);
app.use('/user', userRoute);


const server= app.listen(PORT,  function(req, res){
    console.log(`server running, ${PORT}`);
})

// Set up socket.io
const io = socket(server);
let online = 0;

io.on('connection', (socket) => {
  online++;
  console.log(`Socket ${socket.id} connected.`);
  console.log(`Online: ${online}`);
  io.emit('visitor enters', online);

  socket.on('add', data => socket.broadcast.emit('add', data));
  socket.on('update', data => socket.broadcast.emit('update', data));
  socket.on('delete', data => socket.broadcast.emit('delete', data));

  socket.on('disconnect', () => {
    online--;
    console.log(`Socket ${socket.id} disconnected.`);
    console.log(`Online: ${online}`);
    io.emit('visitor exits', online);
  });
});