
/**
 * VERCEL API: /api/orders
 * Creates a new PayPal order using secret keys.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
  const BASE_URL = "https://api-m.paypal.com"; // Change to sandbox if testing: https://api-m.sandbox.paypal.com

  try {
    // 1. Get Access Token
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const tokenResponse = await fetch(`${BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: { Authorization: `Basic ${auth}` },
    });
    const { access_token } = await tokenResponse.json();

    // 2. Create Order
    const orderResponse = await fetch(`${BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
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

    const data = await orderResponse.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("PayPal Create Order Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
