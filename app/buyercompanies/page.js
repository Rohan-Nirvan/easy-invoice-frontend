"use client";
import { useEffect, useState } from "react";

export default function BuyerCompanies() {
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [name, setName] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [panNo, setPanNo] = useState("");

  // Address State
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  const [token, setToken] = useState("");

  useEffect(() => {
    fetchCompanies();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  async function fetchCompanies() {
    const response = await fetch("/api/buyercompanies");
    const data = await response.json();
    setCompanies(data);
  }

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
      address: { street, city, district, state, country, pincode },
    };

    const method = editingCompany ? "PUT" : "POST";
    const endpoint = editingCompany
      ? `/api/buyercompanies?id=${editingCompany._id}`
      : "/api/buyercompanies";

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
      resetForm();
      fetchCompanies();
    } else {
      alert(`Error: ${data.error}`);
    }
  }

  async function deleteCompany(id) {
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this company?")) {
      return;
    }

    const response = await fetch(`/api/buyercompanies`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Company deleted!");
      fetchCompanies();
    } else {
      alert(`Error: ${data.error}`);
    }
  }

  function resetForm() {
    setName("");
    setGstNo("");
    setPanNo("");
    setStreet("");
    setCity("");
    setDistrict("");
    setState("");
    setCountry("");
    setPincode("");
  }

  function startEditing(company) {
    setEditingCompany(company);
    setName(company.name);
    setGstNo(company.gstNo);
    setPanNo(company.panNo);
    setStreet(company.address?.street || "");
    setCity(company.address?.city || "");
    setDistrict(company.address?.district || "");
    setState(company.address?.state || "");
    setCountry(company.address?.country || "");
    setPincode(company.address?.pincode || "");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buyer Companies</h1>

      <ul className="mb-6">
        {companies.map((company) => (
          <li
            key={company._id}
            className="border p-3 my-2 rounded flex justify-between items-center"
          >
            <div>
              <strong>{company.name}</strong> (GST: {company.gstNo})
              {/* <p className="text-sm">
                📍 {company.address?.street}, {company.address?.city},{" "}
                {company.address?.district}, {company.address?.state},{" "}
                {company.address?.country} - {company.address?.pincode}
              </p> */}
            </div>
            <div>
              <button
                onClick={() => startEditing(company)}
                className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCompany(company._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold">
        {editingCompany ? "Edit Company" : "Add Company"}
      </h2>
      <form
        onSubmit={addOrUpdateCompany}
        className="flex flex-col gap-3 max-w-md"
      >
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="GST No"
          className="border p-2 rounded"
          value={gstNo}
          onChange={(e) => setGstNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="PAN No"
          className="border p-2 rounded"
          value={panNo}
          onChange={(e) => setPanNo(e.target.value)}
          required
        />

        <h2 className="text-lg font-semibold">Address Details:</h2>
        <input
          type="text"
          placeholder="Street"
          className="border p-2 rounded"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          className="border p-2 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="District"
          className="border p-2 rounded"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="State"
          className="border p-2 rounded"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country"
          className="border p-2 rounded"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          className="border p-2 rounded"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingCompany ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";

// export default function BuyerCompanies() {
//   const [companies, setCompanies] = useState([]);
//   const [name, setName] = useState("");
//   const [gstNo, setGstNo] = useState("");
//   const [panNo, setPanNo] = useState("");

//   // Address State (Nested Fields)
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");
//   const [district, setDistrict] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [pincode, setPincode] = useState("");

//   const [token, setToken] = useState("");

//   useEffect(() => {
//     fetchCompanies();
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   async function fetchCompanies() {
//     const response = await fetch("/api/buyercompanies");
//     const data = await response.json();
//     setCompanies(data);
//   }

//   async function addCompany(e) {
//     e.preventDefault();
//     if (!token) {
//       alert("You must be logged in to add a company!");
//       return;
//     }

//     const response = await fetch("/api/buyercompanies", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         name,
//         gstNo,
//         panNo,
//         address: {
//           street,
//           city,
//           district,
//           state,
//           country,
//           pincode,
//         },
//       }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       alert("Company added!");
//       fetchCompanies();
//     } else {
//       alert(`Error: ${data.error}`);
//     }
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Buyer Companies</h1>

//       {/* Company List */}
//       <ul className="mb-6">
//         {companies.map((company) => (
//           <li key={company._id} className="border p-3 my-2 rounded">
//             <strong>{company.name}</strong> (GST: {company.gstNo})
//           </li>
//         ))}
//       </ul>

//       {/* Add Company Form */}
//       <form onSubmit={addCompany} className="flex flex-col gap-3 max-w-md">
//         <h2 className="text-lg font-semibold">Company Details:</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           className="border p-2 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="GST No"
//           className="border p-2 rounded"
//           value={gstNo}
//           onChange={(e) => setGstNo(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="PAN No"
//           className="border p-2 rounded"
//           value={panNo}
//           onChange={(e) => setPanNo(e.target.value)}
//           required
//         />

//         <h2 className="text-lg font-semibold">Address Details:</h2>
//         <input
//           type="text"
//           placeholder="Street"
//           className="border p-2 rounded"
//           value={street}
//           onChange={(e) => setStreet(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="border p-2 rounded"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="District"
//           className="border p-2 rounded"
//           value={district}
//           onChange={(e) => setDistrict(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="State"
//           className="border p-2 rounded"
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Country"
//           className="border p-2 rounded"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Pincode"
//           className="border p-2 rounded"
//           value={pincode}
//           onChange={(e) => setPincode(e.target.value)}
//           required
//         />

//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Add Company
//         </button>
//       </form>
//     </div>
//   );
// }
