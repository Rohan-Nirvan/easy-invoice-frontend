"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token"); // Get JWT token from cookies
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      setUser({ email: "user@example.com" }); // Replace with actual user data
    }
  }, [router]);

  if (!user) return <h1 className="text-center text-2xl">Loading...</h1>;

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-3xl mb-6">Welcome, {user.email}!</h1>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => router.push("/buyer-companies")}
          className="bg-blue-500 text-white p-4 rounded"
        >
          Buyer Companies
        </button>
        <button
          onClick={() => router.push("/seller-companies")}
          className="bg-green-500 text-white p-4 rounded"
        >
          Seller Companies
        </button>
        <button
          onClick={() => router.push("/bank-details")}
          className="bg-yellow-500 text-white p-4 rounded"
        >
          Bank Details
        </button>
        <button
          onClick={() => router.push("/hsn-details")}
          className="bg-purple-500 text-white p-4 rounded"
        >
          HSN Details
        </button>
        <button
          onClick={() => router.push("/items")}
          className="bg-indigo-500 text-white p-4 rounded"
        >
          Items
        </button>
        <button
          onClick={() => router.push("/previous-bills")}
          className="bg-gray-500 text-white p-4 rounded"
        >
          Previous Bills
        </button>
        <button
          onClick={() => router.push("/generate-bill")}
          className="bg-red-500 text-white p-4 rounded"
        >
          Generate Bill
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          Cookies.remove("token");
          router.push("/login");
        }}
        className="mt-6 bg-black text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
