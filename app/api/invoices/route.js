import { NextResponse } from "next/server";

const API_URL = "http://localhost:5000/invoices"; // Express.js backend

// ✅ GET Invoices
export async function GET() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ POST Create Invoice
export async function POST(req) {
  try {
    const invoiceData = await req.json();
    console.log("📩 Sending Invoice Data:", invoiceData); // Debugging

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    console.log("✅ Invoice Created:", data); // Debugging
    return NextResponse.json(data);
  } catch (error) {
    console.error("🚨 Error Creating Invoice:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// import { NextResponse } from "next/server";

// const API_URL = "http://localhost:5000"; // Express.js backend

// // ✅ GET Invoices
// export async function GET() {
//   try {
//     const response = await fetch(`${API_URL}/invoices`);
//     if (!response.ok) throw new Error(`Error: ${response.statusText}`);
//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // ✅ POST Create Invoice
// export async function POST(req) {
//   try {
//     const invoiceData = await req.json();
//     const response = await fetch(`${API_URL}/invoices`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(invoiceData),
//     });

//     if (!response.ok) throw new Error(`Error: ${response.statusText}`);
//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
