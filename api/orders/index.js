
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method Not Allowed',
      message: 'This endpoint requires a POST request from the application UI.' 
    });
  }

  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    return res.status(500).json({ error: 'System configuration error: Missing PayPal Credentials in Vercel.' });
  }

  // Use 'api-m.paypal.com' for Live, or 'api-m.sandbox.paypal.com' for testing
  const BASE_URL = "https://api-m.paypal.com"; 

  try {
    // 1. Get Access Token from PayPal
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const tokenResponse = await fetch(`${BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: { Authorization: `Basic ${auth}` },
    });
    
    if (!tokenResponse.ok) throw new Error("Failed to authenticate with PayPal");
    const { access_token } = await tokenResponse.json();

    // 2. Create the Order
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
    console.error("Order Creation Failed:", err);
    return res.status(500).json({ error: "Checkout Gateway Error", details: err.message });
  }
}
