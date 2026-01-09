// server/routes/tradeRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../data/mockData');

// GET /api/v1/trades
router.get('/', (req, res) => {
    res.json({ 
        success: true, 
        count: db.trades.length, 
        data: db.trades 
    });
});

module.exports = router;