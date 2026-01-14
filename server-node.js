import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PAYPAL_API = "https://api-m.paypal.com";

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
}

app.post("/api/orders", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const order = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: "USD", value: "10.00" },
          },
        ],
      }),
    });

    const data = await order.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("PayPal order creation failed");
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const capture = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${req.params.orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await capture.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("PayPal capture failed");
  }
});

export default app;
