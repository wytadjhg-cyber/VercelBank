
export default async function handler(req, res) {
  // If user visits the URL in a browser (GET), show a status message instead of a scary error
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: "Operational",
      service: "Vercel Order Gateway",
      message: "The API is active. To place an order, please use the Buy Now button on the main website.",
      environment: process.env.PAYPAL_CLIENT_ID ? "Configured" : "Missing Credentials"
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    return res.status(500).json({ error: 'System configuration error: Missing PayPal Credentials in Vercel.' });
  }

  const BASE_URL = "https://api-m.paypal.com"; 

  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const tokenResponse = await fetch(`${BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: { Authorization: `Basic ${auth}` },
    });
    
    if (!tokenResponse.ok) throw new Error("Failed to authenticate with PayPal");
    const { access_token } = await tokenResponse.json();

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
