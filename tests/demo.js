const TradingSDK = require('../sdk/tradingSDK');

// Initialize SDK
const sdk = new TradingSDK();

async function runSimulation() {
    console.log("=== STARTING TRADING SIMULATION ===\n");

    try {
        // Step 1: View Instruments
        console.log("1. Fetching Market Instruments...");
        const instruments = await sdk.getInstruments();
        console.table(instruments.data);

        // Step 2: Place a BUY Order (Market)
        console.log("\n2. Placing BUY Order for RELIANCE (10 Qty)...");
        const buyOrder = await sdk.placeOrder("RELIANCE", 10, "BUY", "MARKET");
        console.log("Order Response:", buyOrder.message, "| ID:", buyOrder.data.orderId);

        // Step 3: Place a BUY Order (Limit)
        console.log("\n3. Placing BUY Order for TCS (5 Qty at 3100)...");
        const buyLimit = await sdk.placeOrder("TCS", 5, "BUY", "LIMIT", 3100);
        console.log("Order Response:", buyLimit.message, "| ID:", buyLimit.data.orderId);

        // Step 4: Check Portfolio
        console.log("\n4. Checking Portfolio...");
        const portfolio = await sdk.getPortfolio();
        console.table(portfolio.data);

        // Step 5: View Executed Trades
        console.log("\n5. Fetching Trade History...");
        const trades = await sdk.getTrades();
        console.log(`Total Trades: ${trades.count}`);
        // console.table(trades.data); // Uncomment to see full trade logs

    } catch (error) {
        console.error("Simulation Error:", error.message);
    }
}

runSimulation();