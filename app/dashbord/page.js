"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "../utils/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() => router.push("/login"));
  }, []);

  return user ? (
    <div className="p-10">
      <h1 className="text-3xl">Welcome, {user.email}!</h1>
      <button
        onClick={() => {
          logoutUser();
          router.push("/login");
        }}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
