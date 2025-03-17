import { NextResponse } from "next/server";

const API_URL = "http://localhost:5000/hsndetails";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    console.log("Authorization Header:", authHeader); // Debugging

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - No Token" },
        { status: 403 }
      );
    }

    const token = authHeader.split(" ")[1]; // Extract token
    console.log("Extracted Token:", token); // Debugging

    const response = await fetch("http://localhost:5000/hsndetails", {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure proper format
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching HSN details:", error);
    return NextResponse.json(
      { error: "Failed to fetch HSN details" },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     const response = await fetch(API_URL);
//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch hsndetails" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req) {
  try {
    const { hsn, cgst, sgst } = await req.json();
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
      body: JSON.stringify({ hsn, cgst, sgst }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add hsndetails" },
      { status: 500 }
    );
  }
}

// ✅ Update Company (PUT)
export async function PUT(req) {
  try {
    const { id, hsn, cgst, sgst } = await req.json();
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
      body: JSON.stringify({ hsn, cgst, sgst }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update hsndetails" },
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
      { error: "Failed to delete hsndetails" },
      { status: 500 }
    );
  }
}
