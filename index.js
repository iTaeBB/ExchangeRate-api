const express = require('express');
const app = express();
const PORT = 3000;

const exchangeRoutes = require('./routes/index');

app.get('/', (req, res) => {
    res.send('Hello Express.js!');
});

app.use('/api', exchangeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});