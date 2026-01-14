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

export async function POST(_: Request, { params }: any) {
  const access = await token();
  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${params.orderID}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${access}` },
  });
  return NextResponse.json(await res.json());
}
