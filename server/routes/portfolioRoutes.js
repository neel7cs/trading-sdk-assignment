// server/routes/portfolioRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../data/mockData');

// GET /api/v1/portfolio
router.get('/', (req, res) => {
    // Convert portfolio object (Map-like) to an Array for the user
    const portfolioArray = Object.keys(db.portfolio).map(symbol => ({
        symbol,
        ...db.portfolio[symbol]
    })).filter(p => p.quantity > 0); // Only return active holdings

    res.json({ success: true, data: portfolioArray });
});

// GET /api/v1/trades
// (Note: Sometimes trade history is grouped with portfolio or orders, 
// but based on your structure, placing it here or in a separate trades route is fine)
router.get('/history', (req, res) => {
    res.json({ success: true, count: db.trades.length, data: db.trades });
});

module.exports = router;