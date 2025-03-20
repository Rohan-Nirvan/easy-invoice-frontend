"use client";
import { useEffect, useState } from "react";

export default function SellerCompanies() {
  const [sellerCompanies, setSellerCompanies] = useState([]);
  const [bankDetailList, setBankDetailList] = useState([]);
  const [editingSellerCompany, setEditingSellerCompany] = useState(null);
  const [token, setToken] = useState("");

  // Seller Company State
  const [name, setName] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [mo, setMo] = useState("");

  // Address State
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  const [bankDetailId, setBankDetailId] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchSellerCompanies(storedToken);
      fetchBankDetails(storedToken);
    }
  }, []);

  async function fetchSellerCompanies(token) {
    try {
      const response = await fetch("/api/sellercompanies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setSellerCompanies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching seller companies:", error);
    }
  }

  async function fetchBankDetails(token) {
    try {
      const response = await fetch("/api/bankdetails", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setBankDetailList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  }

  async function addOrUpdateSellerCompany(e) {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    const sellerCompanyData = {
      name,
      gstNo,
      panNo,
      mo,
      address: { street, city, district, state, country, pincode },
      bankDetail: bankDetailId,
    };

    const method = editingSellerCompany ? "PUT" : "POST";
    const endpoint = "/api/sellercompanies";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          editingSellerCompany
            ? { ...sellerCompanyData, id: editingSellerCompany._id }
            : sellerCompanyData
        ),
      });

      if (response.ok) {
        alert(
          editingSellerCompany
            ? "Seller company updated!"
            : "Seller company added!"
        );
        setEditingSellerCompany(null);
        resetSellerCompanyForm();
        fetchSellerCompanies(token);
      } else {
        alert("Error while saving seller company.");
      }
    } catch (error) {
      console.error("Error saving seller company:", error);
    }
  }

  async function deleteSellerCompany(id) {
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    if (
      !window.confirm("Are you sure you want to delete this seller company?")
    ) {
      return;
    }

    try {
      const response = await fetch("/api/sellercompanies", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Seller company deleted!");
        fetchSellerCompanies(token);
      } else {
        alert("Error while deleting seller company.");
      }
    } catch (error) {
      console.error("Error deleting seller company:", error);
    }
  }

  function resetSellerCompanyForm() {
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
    setBankDetailId("");
  }

  function startEditing(sellerCompany) {
    setEditingSellerCompany(sellerCompany);
    setName(sellerCompany.name);
    setGstNo(sellerCompany.gstNo);
    setPanNo(sellerCompany.panNo);
    setMo(sellerCompany.mo);
    setStreet(sellerCompany.address.street || "");
    setCity(sellerCompany.address.city || "");
    setDistrict(sellerCompany.address.district || "");
    setState(sellerCompany.address.state || "");
    setCountry(sellerCompany.address.country || "");
    setPincode(sellerCompany.address.pincode || "");
    setBankDetailId(sellerCompany.bankDetail?._id || ""); // Safe check
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seller Companies</h1>

      <ul className="mb-6">
        {sellerCompanies.length === 0 ? (
          <p>No seller companies available.</p>
        ) : (
          sellerCompanies.map((sellerCompany) => (
            <li
              key={sellerCompany._id}
              className="border p-3 my-2 rounded flex justify-between items-center"
            >
              <div>
                <strong>{sellerCompany.name}</strong> (GST:{" "}
                {sellerCompany.gstNo}), (PAN: {sellerCompany.panNo})
                {sellerCompany.bankDetail ? (
                  <>
                    {" "}
                    (Bank: {sellerCompany.bankDetail.bankName}, A/C:{" "}
                    {sellerCompany.bankDetail.acNo}, Branch:{" "}
                    {sellerCompany.bankDetail.branch}, IFSC:{" "}
                    {sellerCompany.bankDetail.ifsc})
                  </>
                ) : (
                  " (No Bank Details)"
                )}
              </div>
              <div>
                <button
                  onClick={() => startEditing(sellerCompany)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSellerCompany(sellerCompany._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <h2 className="text-lg font-semibold">
        {editingSellerCompany ? "Edit Seller Company" : "Add Seller Company"}
      </h2>
      <form
        onSubmit={addOrUpdateSellerCompany}
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
        <input
          type="text"
          placeholder="Mobile No"
          className="border p-2 rounded"
          value={mo}
          onChange={(e) => setMo(e.target.value)}
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
        <h2 className="text-lg font-semibold">Bank Details:</h2>
        <select
          className="border p-2 rounded"
          value={bankDetailId}
          onChange={(e) => setBankDetailId(e.target.value)}
          required
        >
          <option value="">Select Bank Detail</option>
          {bankDetailList.map((bank) => (
            <option key={bank._id} value={bank._id}>
              {bank.bankName} (A/C: {bank.acNo}, IFSC: {bank.ifsc})
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingSellerCompany ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
// "use client";
// import { useEffect, useState } from "react";

// export default function SellerCompanies() {
//   const [sellerCompanies, setSellerCompanies] = useState([]);
//   const [bankDetailList, setBankDetailList] = useState([]);
//   const [editingSellerCompany, setEditingSellerCompany] = useState(null);
//   const [token, setToken] = useState("");

//   // Seller Company State
//   const [name, setName] = useState("");
//   const [gstNo, setGstNo] = useState("");
//   const [panNo, setPanNo] = useState("");
//   const [mo, setMo] = useState("");

//   // Address State
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");
//   const [district, setDistrict] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [pincode, setPincode] = useState("");

//   const [bankDetailId, setBankDetailId] = useState("");

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//       fetchSellerCompanies(storedToken);
//       fetchBankDetails(storedToken);
//     }
//   }, []);

//   async function fetchSellerCompanies(token) {
//     try {
//       const response = await fetch("/api/sellercompanies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       setSellerCompanies(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching seller companies:", error);
//     }
//   }

//   async function fetchBankDetails(token) {
//     try {
//       const response = await fetch("/api/bankdetails", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       setBankDetailList(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching bank details:", error);
//     }
//   }

//   async function addOrUpdateSellerCompany(e) {
//     e.preventDefault();
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }

//     const sellerCompanyData = {
//       name,
//       gstNo,
//       panNo,
//       mo,
//       address: { street, city, district, state, country, pincode },
//       bankDetail: bankDetailId,
//     };

//     const method = editingSellerCompany ? "PUT" : "POST";
//     const endpoint = "/api/sellercompanies";

//     try {
//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(
//           editingSellerCompany
//             ? { ...sellerCompanyData, id: editingSellerCompany._id }
//             : sellerCompanyData
//         ),
//       });

//       if (response.ok) {
//         alert(
//           editingSellerCompany
//             ? "Seller company updated!"
//             : "Seller company added!"
//         );
//         setEditingSellerCompany(null);
//         resetSellerCompanyForm();
//         fetchSellerCompanies(token);
//       } else {
//         alert("Error while saving seller company.");
//       }
//     } catch (error) {
//       console.error("Error saving seller company:", error);
//     }
//   }

//   async function deleteSellerCompany(id) {
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }

//     if (
//       !window.confirm("Are you sure you want to delete this seller company?")
//     ) {
//       return;
//     }

//     try {
//       const response = await fetch("/api/sellercompanies", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (response.ok) {
//         alert("Seller company deleted!");
//         fetchSellerCompanies(token);
//       } else {
//         alert("Error while deleting seller company.");
//       }
//     } catch (error) {
//       console.error("Error deleting seller company:", error);
//     }
//   }

//   function resetSellerCompanyForm() {
//     setName("");
//     setGstNo("");
//     setPanNo("");
//     setMo("");
//     setStreet("");
//     setCity("");
//     setDistrict("");
//     setState("");
//     setCountry("");
//     setPincode("");
//     setBankDetailId("");
//   }

//   function startEditing(sellerCompany) {
//     setEditingSellerCompany(sellerCompany);
//     setName(sellerCompany.name);
//     setGstNo(sellerCompany.gstNo);
//     setPanNo(sellerCompany.panNo);
//     setMo(sellerCompany.mo);
//     setStreet(sellerCompany.address.street || "");
//     setCity(sellerCompany.address.city || "");
//     setDistrict(sellerCompany.address.district || "");
//     setState(sellerCompany.address.state || "");
//     setCountry(sellerCompany.address.country || "");
//     setPincode(sellerCompany.address.pincode || "");
//     setBankDetailId(sellerCompany.bankDetail?._id || ""); // Safe check
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Seller Companies</h1>

//       <ul className="mb-6">
//         {sellerCompanies.length === 0 ? (
//           <p>No seller companies available.</p>
//         ) : (
//           sellerCompanies.map((sellerCompany) => (
//             <li
//               key={sellerCompany._id}
//               className="border p-3 my-2 rounded flex justify-between items-center"
//             >
//               <div>
//                 <strong>{sellerCompany.name}</strong> (GST:{" "}
//                 {sellerCompany.gstNo}), (PAN: {sellerCompany.panNo})
//                 {sellerCompany.bankDetail ? (
//                   <>
//                     {" "}
//                     (Bank: {sellerCompany.bankDetail.bankName}, A/C:{" "}
//                     {sellerCompany.bankDetail.acNo}, Branch:{" "}
//                     {sellerCompany.bankDetail.branch}, IFSC:{" "}
//                     {sellerCompany.bankDetail.ifsc})
//                   </>
//                 ) : (
//                   " (No Bank Details)"
//                 )}
//               </div>
//               <div>
//                 <button
//                   onClick={() => startEditing(sellerCompany)}
//                   className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteSellerCompany(sellerCompany._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))
//         )}
//       </ul>

//       <h2 className="text-lg font-semibold">
//         {editingSellerCompany ? "Edit Seller Company" : "Add Seller Company"}
//       </h2>
//       <form
//         onSubmit={addOrUpdateSellerCompany}
//         className="flex flex-col gap-3 max-w-md"
//       >
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

//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           {editingSellerCompany ? "Update" : "Add"}
//         </button>
//       </form>
//     </div>
//   );
// }
// "use client";
// import { useEffect, useState } from "react";

// export default function SellerCompanies() {
//   const [sellerCompanies, setSellerCompanies] = useState([]);
//   const [bankDetailList, setBankDetailList] = useState([]);
//   const [editingSellerCompany, setEditingSellerCompany] = useState(null);
//   const [token, setToken] = useState("");

//   // Seller Company State
//   const [name, setName] = useState("");
//   const [gstNo, setGstNo] = useState("");
//   const [panNo, setPanNo] = useState("");
//   const [mo, setMo] = useState("");

//   // Address State
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");
//   const [district, setDistrict] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [pincode, setPincode] = useState("");

//   const [bankDetailId, setBankDetailId] = useState("");

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//       fetchSellerCompanies();
//       fetchBankDetails();
//     }
//   }, []);

//   // ✅ Fetch Seller Companies
//   async function fetchSellerCompanies() {
//     try {
//       const response = await fetch("/api/sellercompanies");
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       setSellerCompanies(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching seller companies:", error);
//     }
//   }

//   // ✅ Fetch Bank Details
//   async function fetchBankDetails() {
//     try {
//       const response = await fetch("/api/bankdetails");
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       setBankDetailList(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching bank details:", error);
//     }
//   }

//   // ✅ Add or Update Seller Company
//   async function addOrUpdateSellerCompany(e) {
//     e.preventDefault();
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }

//     const sellerCompanyData = {
//       name,
//       gstNo,
//       panNo,
//       mo,
//       address: { street, city, district, state, country, pincode },
//       bankDetail: bankDetailId,
//     };

//     const method = editingSellerCompany ? "PUT" : "POST";
//     const endpoint = "/api/sellercompanies";

//     try {
//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(
//           editingSellerCompany
//             ? { ...sellerCompanyData, id: editingSellerCompany._id }
//             : sellerCompanyData
//         ),
//       });

//       if (response.ok) {
//         alert(
//           editingSellerCompany
//             ? "Seller company updated!"
//             : "Seller company added!"
//         );
//         setEditingSellerCompany(null);
//         resetSellerCompanyForm();
//         fetchSellerCompanies();
//       } else {
//         alert("Error while saving seller company.");
//       }
//     } catch (error) {
//       console.error("Error saving seller company:", error);
//     }
//   }

//   // ✅ Delete Seller Company
//   async function deleteSellerCompany(id) {
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }

//     if (
//       !window.confirm("Are you sure you want to delete this seller company?")
//     ) {
//       return;
//     }

//     try {
//       const response = await fetch("/api/sellercompanies", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (response.ok) {
//         alert("Seller company deleted!");
//         fetchSellerCompanies();
//       } else {
//         alert("Error while deleting seller company.");
//       }
//     } catch (error) {
//       console.error("Error deleting seller company:", error);
//     }
//   }

//   function resetSellerCompanyForm() {
//     setName("");
//     setGstNo("");
//     setPanNo("");
//     setMo("");
//     setStreet("");
//     setCity("");
//     setDistrict("");
//     setState("");
//     setCountry("");
//     setPincode("");
//     setBankDetailId("");
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Seller Companies</h1>
//       <ul>
//         {sellerCompanies.map((company) => (
//           <li key={company._id}>
//             <strong>{company.name}</strong> (GST: {company.gstNo}) - Bank:{" "}
//             {company.bankDetail?.bankName || "N/A"}
//             <button onClick={() => deleteSellerCompany(company._id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";

// export default function SellerCompanies() {
//   const [sellercompanies, setSellercompanies] = useState([]);
//   const [bankDetailList, setBankDetailList] = useState([]);
//   const [editingSellercompany, setEditingSellercompany] = useState(null);
//   // const [editingBank, setEditingBank] = useState(null);

//   // Seller Company State
//   const [name, setName] = useState("");
//   const [gstNo, setGstNo] = useState("");
//   const [panNo, setPanNo] = useState("");
//   const [mo, setMo] = useState("");

//   // Address State
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");
//   const [district, setDistrict] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [pincode, setPincode] = useState("");

//   const [bankDetailId, setBankDetailId] = useState("");

//   // // Bank Detail State
//   // const [bankName, setBankName] = useState("");
//   // const [acNo, setAcNo] = useState("");
//   // const [branch, setBranch] = useState("");
//   // const [ifsc, setIfsc] = useState("");

//   const [token, setToken] = useState("");

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       fetchItems();
//       fetchBankDetails();
//     }
//   }, [token]); // Fetch when token is available

//   // ✅ Fetch Seller Companies
//   async function fetchSellerCompanies() {
//     try {
//       const response = await fetch("/api/sellercompanies");
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       let data = await response.json();
//       console.log("Fetched Sellercompanies:", data);

//       if (!Array.isArray(data)) data = []; // Ensure it's an array
//       setSellercompanies(data);
//     } catch (error) {
//       console.error("Error fetching Sellercompanies:", error);
//       setSellercompanies([]);
//     }
//   }

//   // ✅ Fetch Bank Details
//   async function fetchBankDetails() {
//     try {
//       if (!token) {
//         console.error("No token found for authentication.");
//         return;
//       }

//       const response = await fetch("/api/bankdetails");
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the token
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     let data = await response.json();
//     console.log("Fetched Bank Details:", data);

//     if (!Array.isArray(data)) data = []; // Ensure it's an array
//     setBankDetailList(data);
//   } catch (error) {
//     console.error("Error fetching Bank details:", error);
//     setBankDetailList([]);
//   }
// }

//   // ✅ Add or Update Seller Company
//   async function addOrUpdateSellercompany(e) {
//     e.preventDefault();
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }

//     const sellercompanyData = {
//       name,
//       gstNo,
//       panNo,
//       mo,
//       address: { street, city, district, state, country, pincode },
//       bankDetail: bankDetailId,
//     };

//     const method = editingSellercompany ? "PUT" : "POST";
//     const endpoint = editingSellercompany
//       ? `/api/sellercompanies`
//       : "/api/sellercompanies";

//     try {
//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ...sellercompanyData, id: editingSellercompany._id } : sellercompanyData ),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert(editingCompany ? "Sellercompany updated!" : "Sellercompany added!");
//         setEditingSellercompany(null);
//         resetSellercompanyForm();
//         fetchSellercompanies();
//       } else {
//         alert(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Error adding/updating company:", error);
//     }
//   }

//   // // ✅ Add or Update Bank Detail
//   // async function addOrUpdateBank(e) {
//   //   e.preventDefault();
//   //   if (!token) {
//   //     alert("You must be logged in!");
//   //     return;
//   //   }

//   //   const bankData = { bankName, acNo, branch, ifsc };
//   //   const method = editingBank ? "PUT" : "POST";
//   //   const endpoint = editingBank ? `/api/bankdetails` : "/api/bankdetails";

//   //   try {
//   //     const response = await fetch(endpoint, {
//   //       method,
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify({ ...bankData, id: editingBank?._id }),
//   //     });

//   //     const data = await response.json();
//   //     if (response.ok) {
//   //       alert(editingBank ? "Bank detail updated!" : "Bank detail added!");
//   //       setEditingBank(null);
//   //       resetBankForm();
//   //       fetchBanks();
//   //     } else {
//   //       alert(`Error: ${data.error}`);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error adding/updating bank detail:", error);
//   //   }
//   // }

//   // ✅ Delete a Seller Company
//   async function deleteSellercompany(id) {
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this company?")) {
//       return;
//     }

//     try {
//       const response = await fetch(`/api/sellercompanies`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Sellercompany deleted!");
//         fetchSellercompanies();
//       } else {
//         alert(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Error deleting company:", error);
//     }
//   }

//   // ✅ Reset Forms
//   function resetSellercompanyForm() {
//     setName("");
//     setGstNo("");
//     setPanNo("");
//     setMo("");
//     setStreet("");
//     setCity("");
//     setDistrict("");
//     setState("");
//     setCountry("");
//     setPincode("");
//     setBankDetailId("");
//   }

//   // function resetBankForm() {
//   //   setBankName("");
//   //   setAcNo("");
//   //   setBranch("");
//   //   setIfsc("");
//   // }

//   function startEditing(sellercompany) {
//     setEditingSellercompany(sellercompany);
//     setName(sellercompany.name);
//     setGstNo(sellercompany.gstNo);
//     setPanNo(sellercompany.panNo);
//     setMo(sellercompany.mo);
//     setStreet(sellercompany.address.street || "");
//     setCity(sellercompany.address.city || "");
//     setDistrict(sellercompany.address.district) || "";
//     setState(sellercompany.address.state || "");
//     setCountry(sellercompany.address.country || "");
//     setPincode(sellercompany.address.pincode || "");
//     setBankDetailId(sellercompany.bankDetail?._id || ""); // Safe check for HSN
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Seller Companies</h1>

//       {/* ✅ List of Seller Companies */}
//       <ul className="mb-6">
//         {sellercompanies.length === 0 ? (
//           <p>No sellercompanies available.</p>
//         ) : (
//           sellercompanies.map((sellercompany) => (
//             <li
//               key={sellercompany._id}
//               className="border p-3 my-2 rounded flex justify-between items-center"
//             >
//               <div>
//                 <strong>{sellercompany.name}</strong> (GST: {sellercompany.gstNo}), (PAN: {sellercompany.panNo})
//                 {sellercompany.bankDetail ? (
//                   <>
//                     {" "}
//                     (bankName: {sellercompany.bankDetail.bankName}, acNo: {sellercompany.bankDetail.acNo}%, branch:{" "}
//                     {sellercompany.bankDetail.branch},ifsc: {sellercompany.bankDetail.ifsc}%)
//                   </>
//                 ) : (
//                   " (No bank Details)"
//                 )}
//               </div>
//               <div>
//                 <button
//                   onClick={() => startEditing(sellercompany)}
//                   className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteSellercompany(sellercompany._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))
//         )}
//       </ul>

//       <h2 className="text-lg font-semibold">
//         {editingSellercompany ? "Edit Sellercompany" : "Add SellerCompany"}
//       </h2>
//       <form
//         onSubmit={addOrUpdateSellercompanies}
//         className="flex flex-col gap-3 max-w-md"
//       >
//         <input
//           type="text"
//           placeholder="Name"
//           className="border p-2 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

// <input
//           type="text"
//           placeholder="Name"
//           className="border p-2 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

// <input
//           type="text"
//           placeholder="GstNo"
//           className="border p-2 rounded"
//           value={gstNo}
//           onChange={(e) => setGstNo(e.target.value)}
//           required
//         />

// <input
//           type="text"
//           placeholder="PanNo"
//           className="border p-2 rounded"
//           value={panNo}
//           onChange={(e) => setPanNo(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Mo"
//           className="border p-2 rounded"
//           value={mo}
//           onChange={(e) => setMo(e.target.value)}
//           required
//         />

// <h2 className="text-lg font-semibold">Address Details:</h2>
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

//         <select
//           className="border p-2 rounded"
//           value={bankDetailId}
//           onChange={(e) => setbankDetailId(e.target.value)}
//           required
//         >
//           <option value="">Select bankDetail</option>
//           {Array.isArray(bankDetailList) && bankDetailList.length > 0 ? (
//             bankDetailList.map((bankDetail) => (
//               <option key={bankDetail._id} value={bankDetail._id}>
//                 {bankDetail.bankName} (ACNO: {bankDetail.acNo}%, branch: {bankDetail.branch}%, ifsc: {bankDetail.ifsc}%)
//               </option>
//             ))
//           ) : (
//             <option disabled>No bankDetail available</option>
//           )}
//         </select>

//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           {editingSellercompany ? "Update" : "Add"}
//         </button>
//       </form>
//     </div>
//   );
// }
