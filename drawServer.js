require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();





const route = require('./routes/router.js')

app.use(cors());
app.use(route);



app.listen(4000);




// const http = require('http');
// const server = http.createServer(app);

// const socket = require('socket.io');
// const io = socket(server);

// io.on('connection', onConnection);

// function onConnection(socket){
//     console.log("Asd");
//   socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
// }

// const port = 8080;
// server.listen(port, () => console.log(`server is running on port ${port}`));





