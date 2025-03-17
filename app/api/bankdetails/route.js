import { NextResponse } from "next/server";

const API_URL = "http://localhost:5000/bankdetails";

export async function GET() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bankdetails" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { bankName, acNo, branch, ifsc } = await req.json();
    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ bankName, acNo, branch, ifsc }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add bankdetails" },
      { status: 500 }
    );
  }
}

// ✅ Update Company (PUT)
export async function PUT(req) {
  try {
    const { id, bankName, acNo, branch, ifsc } = await req.json();
    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ bankName, acNo, branch, ifsc }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update bankdetails" },
      { status: 500 }
    );
  }
}

// ✅ Delete Company (DELETE)
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete bankdetails" },
      { status: 500 }
    );
  }
}
