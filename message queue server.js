const http = require('http');

// Create an array to store incoming messages
const messageQueue = [];

// Create an HTTP server to listen on port 8081
const server = http.createServer((req, res) => {
  // Allow requests from all origins (you can customize this as needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight requests (OPTIONS) for CORS
    res.statusCode = 204; // No Content
    res.end();
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      // Parse the incoming JSON message
      try {
        const message = JSON.parse(body);
        messageQueue.push(message.body);
        console.log(`Received message: ${message}`);
      } catch (error) {
        console.error('Failed to parse incoming message:', error);
      }

      res.statusCode = 200;
      res.end('Message received successfully');
    });
  } else {
    res.statusCode = 405; // Method Not Allowed
    res.end('Only POST requests are allowed');
  }
});

// Start the server on port 8081
server.listen(8081, 'localhost', () => {
  console.log('Message queue server listening on port 8081');
});

// Periodically log messages from the queue every 5000ms
setInterval(() => {
  if (messageQueue.length > 0) {
    const message = messageQueue.shift(); // Remove the first message from the queue
    console.log(`Message logged and removed from queue: ${message}`);
  } else {
    console.log('No messages in the queue.');
  }
}, 5000);
