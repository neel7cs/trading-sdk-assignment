# Trading Platform & SDK Wrapper - Bajaj Broking Assignment

A backend system design and SDK implementation for a simulated stock trading platform. This project demonstrates modular API design, separation of concerns, and core trading workflows like order placement and portfolio calculation.

## 📂 Project Structure


bajaj-trading-project/
├── sdk/                # Client Wrapper Library (The "Consumer")
│   └── tradingSDK.js   # Abstracts Axios calls into simple methods
├── server/             # Backend API (The "Provider")
│   ├── data/           # In-memory data store (Simulating a DB)
│   ├── routes/         # Modularized API Endpoints
│   └── server.js       # Express App Entry Point
├── tests/              # Verification Scripts
│   └── demo.js         # Simulation script to test the full flow
└── README.md

Method,Endpoint,Description,Payload / Params
GET,/instruments,Fetch list of tradable assets,None
POST,/orders,Place a new Buy/Sell order,"{ symbol: ""TCS"", quantity: 10, side: ""BUY"", type: ""MARKET"" }"
GET,/orders/:id,Check the status of an order,orderId in URL path
GET,/trades,View executed trade history,None
GET,/portfolio,View current holdings & value,None
