
# Vercel PayPal LIVE Integration Guide

## Deployment Instructions

### 1. Backend Setup (Node.js)
1.  **Environment Variables**: Create a `.env` file in your server root:
    ```env
    PAYPAL_CLIENT_ID=your_live_client_id
    PAYPAL_CLIENT_SECRET=your_live_client_secret
    ```
2.  **Dependencies**: Run `npm install express node-fetch dotenv`.
3.  **Run**: Execute `node server-node.js`.

### 2. Frontend Configuration
1.  Open `components/PurchaseFlow.tsx`.
2.  Update `PAYPAL_CLIENT_ID` with your **Live Client ID**.
3.  Update `BACKEND_API_BASE` to point to your deployed backend URL.

### 3. Verification Steps
1.  **Model Selection**: Choose your iPhone variant.
2.  **Logistics**: Click "Proceed to Payment" (permissive mode allows skipping input).
3.  **Settlement**:
    -   **Card Fields**: Type your card details directly into the Vercel-styled fields.
    -   **PayPal Button**: Click the yellow button for express checkout.
4.  **Authorization**: Upon success, a full-screen "Authorized" message will confirm the order.

### 4. Handling Security Restrictions
If testing in a restricted environment (like some IDE previews), the SDK may block the encrypted iframe. In this case, the app will automatically display a **"Launch Secure Portal"** button. This opens the site in a standard window to bypass origin-reading restrictions.
