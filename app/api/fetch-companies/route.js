export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}/companies`); // Calls backend API
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
// import axios from "axios";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL; // Express backend URL

// export async function GET() {
//   try {
//     const response = await axios.get(`${API_BASE}/companies`);
//     return Response.json(response.data, { status: 200 });
//   } catch (error) {
//     return Response.json(
//       { error: "Failed to fetch companies" },
//       { status: 500 }
//     );
//   }
// }
