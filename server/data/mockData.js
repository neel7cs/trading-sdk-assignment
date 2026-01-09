// server/data/mockData.js

const db = {
    instruments: [
        { symbol: 'RELIANCE', exchange: 'NSE', type: 'EQUITY', lastPrice: 2400.50 },
        { symbol: 'TCS', exchange: 'NSE', type: 'EQUITY', lastPrice: 3200.00 },
        { symbol: 'INFY', exchange: 'NSE', type: 'EQUITY', lastPrice: 1450.75 },
        { symbol: 'HDFCBANK', exchange: 'NSE', type: 'EQUITY', lastPrice: 1600.25 }
    ],
    orders: [],      // Shared orders array
    trades: [],      // Shared executed trades array
    portfolio: {}    // Shared portfolio object
};

module.exports = db;