
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query; 
  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

  if (!id) {
    return res.status(400).json({ error: 'Invalid Session: Missing Order ID' });
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

    // Capture the payment
    const captureResponse = await fetch(`${BASE_URL}/v2/checkout/orders/${id}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await captureResponse.json();
    
    if (data.status === "COMPLETED") {
      return res.status(200).json({ success: true, details: data });
    } else {
      return res.status(400).json({ error: 'Transaction not completed', details: data });
    }
  } catch (err) {
    console.error("Capture Failed:", err);
    return res.status(500).json({ error: 'Payment capture system failure' });
  }
}
