"use client";
import { useEffect, useState } from "react";

export default function BankDetails() {
  const [bankdetails, setBankdetails] = useState([]);
  const [editingBankdetail, setEditingBankdetail] = useState(null);
  const [bankName, setBankName] = useState("");
  const [acNo, setAcNo] = useState("");
  const [branch, setBranch] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    fetchBankdetails();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  async function fetchBankdetails() {
    try {
      const response = await fetch("/api/bankdetails");
      const data = await response.json();
      console.log("Fetched Data:", data); // Debugging
      setBankdetails(data);
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  }

  async function addOrUpdateBankdetail(e) {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    const bankdetailData = {
      bankName,
      acNo,
      branch,
      ifsc,
    };

    const method = editingBankdetail ? "PUT" : "POST";
    const endpoint = editingBankdetail
      ? `/api/bankdetails?id=${editingBankdetail._id}`
      : "/api/bankdetails";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...bankdetailData, id: editingBankdetail?._id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(
          editingBankdetail ? "Bank detail updated!" : "Bank detail added!"
        );
        setEditingBankdetail(null);
        resetForm();
        fetchBankdetails();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving bank detail:", error);
    }
  }

  async function deleteBankdetail(id) {
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this bank detail?")) {
      return;
    }

    try {
      const response = await fetch(`/api/bankdetails`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Bank detail deleted!");
        fetchBankdetails();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting bank detail:", error);
    }
  }

  function resetForm() {
    setBankName("");
    setAcNo("");
    setBranch("");
    setIfsc("");
  }

  function startEditing(bankdetail) {
    setEditingBankdetail(bankdetail);
    setBankName(bankdetail.bankName);
    setAcNo(bankdetail.acNo);
    setBranch(bankdetail.branch);
    setIfsc(bankdetail.ifsc);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bank Details</h1>

      {/* List of Bank Details */}
      <ul className="mb-6">
        {bankdetails.map((bankdetail) => (
          <li
            key={bankdetail._id}
            className="border p-3 my-2 rounded flex justify-between items-center"
          >
            <div>
              <strong>{bankdetail.bankName}</strong> (Ac No: {bankdetail.acNo})
            </div>
            <div>
              <button
                onClick={() => startEditing(bankdetail)}
                className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBankdetail(bankdetail._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add or Edit Form */}
      <h2 className="text-lg font-semibold">
        {editingBankdetail ? "Edit Bank Detail" : "Add Bank Detail"}
      </h2>
      <form
        onSubmit={addOrUpdateBankdetail}
        className="flex flex-col gap-3 max-w-md"
      >
        <input
          type="text"
          placeholder="Bank Name"
          className="border p-2 rounded"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Account No"
          className="border p-2 rounded"
          value={acNo}
          onChange={(e) => setAcNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Branch"
          className="border p-2 rounded"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="IFSC Code"
          className="border p-2 rounded"
          value={ifsc}
          onChange={(e) => setIfsc(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingBankdetail ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
