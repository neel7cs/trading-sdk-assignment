// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Routes
const instrumentRoutes = require('./routes/instrumentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const tradeRoutes = require('./routes/tradeRoutes'); // Import the new trade routes

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Mount Routes
app.use('/api/v1/instruments', instrumentRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/portfolio', portfolioRoutes);
app.use('/api/v1/trades', tradeRoutes); // Mount trades at /api/v1/trades

// Start Server
app.listen(PORT, () => {
    console.log(`Trading Backend running on http://localhost:${PORT}`);
});