const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;

const app = express();
const pathBundle = path.join(__dirname, '/build/');

app.use(express.static(pathBundle));

app.get('/ping', (request, response) => {
    return response.send('Hello world');
});

app.get('/', (request, response) => {
    response.sendFile(pathBundle);
});

app.listen(port, () => console.log('server is running on port ', port));
