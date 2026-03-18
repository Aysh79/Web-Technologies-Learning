const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from VS Code server!');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});