
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query; 
  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

  if (!id) {
    return res.status(400).json({ error: 'Missing Order ID' });
  }

  const BASE_URL = "https://api-m.paypal.com";

  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const tokenResponse = await fetch(`${BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: { Authorization: `Basic ${auth}` },
    });
    const { access_token } = await tokenResponse.json();

    const captureResponse = await fetch(`${BASE_URL}/v2/checkout/orders/${id}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await captureResponse.json();
    
    if (data.status === "COMPLETED") {
      return res.status(200).json(data);
    } else {
      return res.status(400).json({ error: 'Capture failed', details: data });
    }
  } catch (err) {
    console.error("PayPal Capture Error:", err);
    return res.status(500).json({ error: 'Capture process failed' });
  }
}
