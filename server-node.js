
/**
 * VERCEL POWER CASE - PAYPAL LIVE BACKEND
 * 
 * Instructions:
 * 1. Install dependencies: npm install express node-fetch dotenv
 * 2. Set environment variables: PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET
 * 3. Deploy to a secure server.
 */

const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const BASE_URL = "https://api-m.paypal.com"; // LIVE Endpoints

// Authentication helper
async function generateAccessToken() {
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
    const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const data = await response.json();
    return data.access_token;
}

// Endpoint: Create Order
app.post("/api/orders", async (req, res) => {
    try {
        const accessToken = await generateAccessToken();
        const response = await fetch(`${BASE_URL}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: "69.99",
                        },
                        description: "Vercel Core Premium Power Case",
                    },
                ],
            }),
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Endpoint: Capture Order
app.post("/api/orders/:id/capture", async (req, res) => {
    const { id } = req.params;
    try {
        const accessToken = await generateAccessToken();
        const response = await fetch(`${BASE_URL}/v2/checkout/orders/${id}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(8080, () => console.log("PayPal Gateway Active on port 8080"));
