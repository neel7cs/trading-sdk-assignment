// server/routes/instrumentRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../data/mockData'); // Import the shared data

// GET /api/v1/instruments
router.get('/', (req, res) => {
    res.json({ 
        success: true, 
        data: db.instruments 
    });
});

module.exports = router;