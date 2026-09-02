const express = require('express');
const app = express();
const PORT = 3000;

// simple get route
app.get('/', (req, res) => {
    res.send('Welcome, to the workshop management system');
});

// start server on set port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})