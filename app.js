const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'public' folder
app.use(express.static('public'));

// Route to serve JSON data
app.get('/api/data', (req, res) => {
    // Read JSON file and send its content as response
    fs.readFile('./data/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Parse JSON data and send as response
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
});

app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/public/products.html');
});

app.get('/categories', (req, res) => {
    res.sendFile(__dirname + '/public/categories.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
