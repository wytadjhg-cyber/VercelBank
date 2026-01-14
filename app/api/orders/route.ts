import { NextResponse } from "next/server";

const PAYPAL_API = "https://api-m.paypal.com";

async function token() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded` },
    body: "grant_type=client_credentials",
  });
  return (await res.json()).access_token;
}

export async function POST() {
  const access = await token();
  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${access}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: "USD", value: "10.00" } }]
    }),
  });
  return NextResponse.json(await res.json());
}
