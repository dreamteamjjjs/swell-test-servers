const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('A new client connected!');
  ws.send('Welcome to the WebSocket server!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Echo the message back to the client
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', function () {
    console.log('A client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
