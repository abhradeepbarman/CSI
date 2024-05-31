const http = require('http');
const fs = require('fs');
const path = require('path');

// Helper function to send response
const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const filePath = path.join(__dirname, 'files', url);

  if (method === 'GET') {
    // Read file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          sendResponse(res, 404, { message: 'File not found' });
        } else {
          sendResponse(res, 500, { message: 'Server error' });
        }
      } else {
        sendResponse(res, 200, { message: 'File content', data: data });
      }
    });
  } else if (method === 'POST') {
    // Create file
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      fs.writeFile(filePath, body, 'utf8', err => {
        if (err) {
          sendResponse(res, 500, { message: 'Server error' });
        } else {
          sendResponse(res, 201, { message: 'File created' });
        }
      });
    });
  } else if (method === 'DELETE') {
    // Delete file
    fs.unlink(filePath, err => {
      if (err) {
        if (err.code === 'ENOENT') {
          sendResponse(res, 404, { message: 'File not found' });
        } else {
          sendResponse(res, 500, { message: 'Server error' });
        }
      } else {
        sendResponse(res, 200, { message: 'File deleted' });
      }
    });
  } else {
    sendResponse(res, 405, { message: 'Method not allowed' });
  }
});

// Ensure the files directory exists
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
