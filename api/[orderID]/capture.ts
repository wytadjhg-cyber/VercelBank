import type { VercelRequest, VercelResponse } from "@vercel/node";

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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const orderID = req.query.orderID as string;
    const accessToken = await getAccessToken();

    const paypalRes = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await paypalRes.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Capture failed" });
  }
}
