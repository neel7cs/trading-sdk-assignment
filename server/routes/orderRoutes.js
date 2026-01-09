// server/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../data/mockData');

// --- Helper Logic for Trading ---

// 1. Logic to update the portfolio
const updatePortfolio = (trade, side) => {
    const { symbol, quantity, price } = trade;

    if (!db.portfolio[symbol]) {
        db.portfolio[symbol] = { quantity: 0, averagePrice: 0, currentValue: 0 };
    }

    let holding = db.portfolio[symbol];

    if (side === 'BUY') {
        const totalValue = (holding.quantity * holding.averagePrice) + (quantity * price);
        holding.quantity += quantity;
        holding.averagePrice = totalValue / holding.quantity;
    } else if (side === 'SELL') {
        holding.quantity -= quantity;
        if(holding.quantity < 0) holding.quantity = 0;
    }
    
    // Update current value
    holding.currentValue = holding.quantity * price; 
};

// 2. Logic to execute the trade
const executeTrade = (order) => {
    const instrument = db.instruments.find(i => i.symbol === order.symbol);
    const currentPrice = instrument ? instrument.lastPrice : order.price;
    const executionPrice = order.price || currentPrice;
    
    const trade = {
        tradeId: `TRD-${Date.now()}`,
        orderId: order.orderId,
        symbol: order.symbol,
        quantity: order.quantity,
        price: executionPrice,
        timestamp: new Date()
    };
    
    // Save to shared DB
    db.trades.push(trade);
    updatePortfolio(trade, order.side);
    return trade;
};

// --- API Endpoints ---

// POST /api/v1/orders
router.post('/', (req, res) => {
    const { symbol, quantity, price, side, type } = req.body;

    // Validation
    if (!symbol || !quantity || quantity <= 0 || !side || !type) {
        return res.status(400).json({ success: false, message: "Invalid order details" });
    }
    if (type === 'LIMIT' && !price) {
        return res.status(400).json({ success: false, message: "Price required for LIMIT order" });
    }

    const orderId = `ORD-${Date.now()}`;
    
    const newOrder = {
        orderId,
        symbol,
        quantity,
        price: price || null, 
        side, 
        type, 
        status: 'EXECUTED', // Auto-execute for simulation
        timestamp: new Date()
    };

    db.orders.push(newOrder);
    
    // Trigger Execution
    executeTrade(newOrder);

    res.status(201).json({ success: true, message: "Order placed", data: newOrder });
});

// GET /api/v1/orders/:orderId
router.get('/:orderId', (req, res) => {
    const order = db.orders.find(o => o.orderId === req.params.orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
});

module.exports = router;