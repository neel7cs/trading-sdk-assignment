const axios = require('axios');

class TradingSDK {
    constructor(baseURL = 'http://localhost:3000') {
        this.client = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Fetch list of tradable instruments
     * Endpoint: GET /api/v1/instruments
     */
    async getInstruments() {
        try {
            const response = await this.client.get('/api/v1/instruments');
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Place a New Order
     * Endpoint: POST /api/v1/orders
     * @param {string} symbol - e.g., "RELIANCE"
     * @param {number} quantity - Must be > 0
     * @param {string} side - "BUY" or "SELL"
     * @param {string} type - "MARKET" or "LIMIT"
     * @param {number} [price] - Required if type is LIMIT
     */
    async placeOrder(symbol, quantity, side, type, price = null) {
        try {
            const payload = { symbol, quantity, side, type };
            if (price) payload.price = price;

            const response = await this.client.post('/api/v1/orders', payload);
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Fetch Order Status
     * Endpoint: GET /api/v1/orders/{orderId}
     */
    async getOrderStatus(orderId) {
        try {
            const response = await this.client.get(`/api/v1/orders/${orderId}`);
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Fetch list of executed trades
     * Endpoint: GET /api/v1/trades
     */
    async getTrades() {
        try {
            const response = await this.client.get('/api/v1/trades');
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Fetch current portfolio holdings
     * Endpoint: GET /api/v1/portfolio
     */
    async getPortfolio() {
        try {
            const response = await this.client.get('/api/v1/portfolio');
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    // Helper to format errors nicely
    _handleError(error) {
        if (error.response) {
            // Server responded with a status code outside 2xx
            throw new Error(`API Error [${error.response.status}]: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error("Network Error: No response received from server.");
        } else {
            // Something happened in setting up the request
            throw new Error(`SDK Error: ${error.message}`);
        }
    }
}

module.exports = TradingSDK;