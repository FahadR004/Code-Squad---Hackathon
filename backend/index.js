const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Define your port

// Middleware for parsing JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the Node.js backend!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 