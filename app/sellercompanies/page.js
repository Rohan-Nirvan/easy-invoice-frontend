"use client";
import { useEffect, useState } from "react";

export default function SellerCompanies() {
  const [companies, setCompanies] = useState([]);
  const [banks, setBanks] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [editingBank, setEditingBank] = useState(null);

  // Seller Company State
  const [name, setName] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [mo, setMo] = useState("");
  const [bankDetail, setBankDetail] = useState("");

  // Address State
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  // Bank Detail State
  const [bankName, setBankName] = useState("");
  const [acNo, setAcNo] = useState("");
  const [branch, setBranch] = useState("");
  const [ifsc, setIfsc] = useState("");

  const [token, setToken] = useState("");

  useEffect(() => {
    fetchCompanies();
    fetchBanks();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // ✅ Fetch Seller Companies
  async function fetchCompanies() {
    try {
      const response = await fetch("/api/sellercompanies");
      const data = await response.json();
      setCompanies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching seller companies:", error);
      setCompanies([]);
    }
  }

  // ✅ Fetch Bank Details
  async function fetchBanks() {
    try {
      const response = await fetch("/api/bankdetails");
      const data = await response.json();
      setBanks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setBanks([]);
    }
  }

  // ✅ Add or Update Seller Company
  async function addOrUpdateCompany(e) {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    const companyData = {
      name,
      gstNo,
      panNo,
      mo,
      address: { street, city, district, state, country, pincode },
      bankDetail,
    };

    const method = editingCompany ? "PUT" : "POST";
    const endpoint = editingCompany
      ? `/api/sellercompanies`
      : "/api/sellercompanies";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...companyData, id: editingCompany?._id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(editingCompany ? "Company updated!" : "Company added!");
        setEditingCompany(null);
        resetCompanyForm();
        fetchCompanies();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding/updating company:", error);
    }
  }

  // ✅ Add or Update Bank Detail
  async function addOrUpdateBank(e) {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    const bankData = { bankName, acNo, branch, ifsc };
    const method = editingBank ? "PUT" : "POST";
    const endpoint = editingBank ? `/api/bankdetails` : "/api/bankdetails";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...bankData, id: editingBank?._id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(editingBank ? "Bank detail updated!" : "Bank detail added!");
        setEditingBank(null);
        resetBankForm();
        fetchBanks();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding/updating bank detail:", error);
    }
  }

  // ✅ Delete a Seller Company
  async function deleteCompany(id) {
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this company?")) {
      return;
    }

    try {
      const response = await fetch(`/api/sellercompanies`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Company deleted!");
        fetchCompanies();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  }

  // ✅ Reset Forms
  function resetCompanyForm() {
    setName("");
    setGstNo("");
    setPanNo("");
    setMo("");
    setStreet("");
    setCity("");
    setDistrict("");
    setState("");
    setCountry("");
    setPincode("");
    setBankDetail("");
  }

  function resetBankForm() {
    setBankName("");
    setAcNo("");
    setBranch("");
    setIfsc("");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seller Companies</h1>

      {/* ✅ List of Seller Companies */}
      <ul className="mb-6">
        {companies.map((company) => (
          <li key={company._id} className="border p-3 my-2 rounded">
            <div>
              <strong>{company.name}</strong> (GST: {company.gstNo})
              <p>📞 {company.mo}</p>
              <p>🏦 Bank: {company.bankInfo?.bankName || "N/A"}</p>
            </div>
            <button
              onClick={() => deleteCompany(company._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* ✅ Add/Edit Bank Details */}
      <h2 className="text-lg font-semibold">Bank Details</h2>
      <form onSubmit={addOrUpdateBank} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Bank Name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Account No"
          value={acNo}
          onChange={(e) => setAcNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="IFSC Code"
          value={ifsc}
          onChange={(e) => setIfsc(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingBank ? "Update Bank" : "Add Bank"}
        </button>
      </form>
    </div>
  );
}
