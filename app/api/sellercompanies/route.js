import { NextResponse } from "next/server";

const API_URL = "http://localhost:5000/sellercompanies";

// ✅ Fetch All Seller Companies
export async function GET(req) {
  try {
    const token = req.headers.get("authorization"); // Get token

    const response = await fetch(API_URL, {
      method: "GET",
      headers: token ? { Authorization: token } : {}, // Add token if available
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching seller companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch seller companies", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ Add New Seller Company
export async function POST(req) {
  try {
    const { name, gstNo, panNo, mo, address, bankDetail } = await req.json();
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
      body: JSON.stringify({ name, gstNo, panNo, mo, address, bankDetail }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error adding seller company:", error);
    return NextResponse.json(
      { error: "Failed to add seller company", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ Update Seller Company
export async function PUT(req) {
  try {
    const { id, name, gstNo, panNo, mo, address, bankDetail } =
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
      body: JSON.stringify({ name, gstNo, panNo, mo, address, bankDetail }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error updating seller company:", error);
    return NextResponse.json(
      { error: "Failed to update seller company", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ Delete Seller Company
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
    console.error("Error deleting seller company:", error);
    return NextResponse.json(
      { error: "Failed to delete seller company", details: error.message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// const API_URL = "http://localhost:5000/sellercompanies";

// // ✅ Fetch All Seller Companies
// export async function GET() {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch seller companies" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Add New Seller Company
// export async function POST(req) {
//   try {
//     const { name, gstNo, panNo, mo, address, bankDetail } = await req.json();
//     const token = req.headers.get("authorization");

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify({ name, gstNo, panNo, mo, address, bankDetail }),
//     });

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to add seller company" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Update Seller Company
// export async function PUT(req) {
//   try {
//     const { id, name, gstNo, panNo, mo, address, bankDetail } =
//       await req.json();
//     const token = req.headers.get("authorization");

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const response = await fetch(`${API_URL}/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify({ name, gstNo, panNo, mo, address, bankDetail }),
//     });

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update seller company" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Delete Seller Company
// export async function DELETE(req) {
//   try {
//     const { id } = await req.json();
//     const token = req.headers.get("authorization");

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const response = await fetch(`${API_URL}/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: token,
//       },
//     });

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to delete seller company" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";

// const API_URL = "http://localhost:5000/sellercompanies";

// export async function GET() {
//   try {
//     const response = await fetch(API_URL);
//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch sellercompanies" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     const { name, gstNo, panNo, mo, address, bankDetail } = await req.json();
//     const token = req.headers.get("authorization");

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify({ name, gstNo, panNo, mo, address, bankDetail }),
//     });

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to add sellercompany" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Update Company (PUT)
// export async function PUT(req) {
//   try {
//     const { id, name, gstNo, panNo, mo, address, bankDetail } =
//       await req.json();
//     const token = req.headers.get("authorization");

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const response = await fetch(`${API_URL}/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify({ name, gstNo, panNo, mo, address, bankDetail }),
//     });

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update sellercompany" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Delete Company (DELETE)
// export async function DELETE(req) {
//   try {
//     const { id } = await req.json();
//     const token = req.headers.get("authorization");

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const response = await fetch(`${API_URL}/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: token,
//       },
//     });

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to delete sellercompany" },
//       { status: 500 }
//     );
//   }
// }
