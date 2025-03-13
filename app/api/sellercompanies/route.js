import { NextResponse } from "next/server";

const API_URL = "http://localhost:5000/sellercompanies";

export async function GET() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, gstNo, panNo, mo, bankDetail, address } = await req.json();
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
      body: JSON.stringify({ name, gstNo, panNo, mo, bankDetail, address }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add company" },
      { status: 500 }
    );
  }
}

// ✅ Update Company (PUT)
export async function PUT(req) {
  try {
    const { id, name, gstNo, panNo, mo, bankDetail, address } =
      await req.json();
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
      body: JSON.stringify({ name, gstNo, panNo, mo, bankDetail, address }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update company" },
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
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
}
