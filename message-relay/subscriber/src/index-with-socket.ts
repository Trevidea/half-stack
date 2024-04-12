import express from 'express';

const app = express();
const server = app.listen(5000, () => {
  console.log('running 5000');
});

const io = require('socket.io')(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket: any) => {
  console.log('connection with socket');
  io.emit('hello', 'hello');
  socket.on('message', (data: any) => {
    console.log(data);
  });
});
