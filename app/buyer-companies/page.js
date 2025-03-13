import { fetchBuyerCompanies } from "../utils/companies";
import ClientCompanyForm from "./clientcompanyform"; // ✅ Import Client Component

async function getBuyerCompanies() {
  return await fetchBuyerCompanies(); // ✅ Fetch data server-side
}

export default async function BuyerCompanies() {
  const companies = await getBuyerCompanies(); // ✅ Fetch on the server

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Buyer Companies</h1>
      <ClientCompanyForm companies={companies} /> {/* ✅ Client Component */}
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import {
//   fetchBuyerCompanies,
//   addBuyerCompany,
//   updateBuyerCompany,
//   deleteBuyerCompany,
// } from "../utils/companies";

// export default function BuyerCompanies() {
//   const [companies, setCompanies] = useState([]);
//   const [newCompany, setNewCompany] = useState({
//     name: "",
//     gstNo: "",
//     panNo: "",
//     address: "",
//   });
//   const [editingCompany, setEditingCompany] = useState(null);

//   useEffect(() => {
//     fetchBuyerCompanies()
//       .then((data) => setCompanies(data))
//       .catch(console.error);
//   }, []);

//   // ✅ Handle form change
//   const handleChange = (e) => {
//     setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
//   };

//   // ✅ Add or Update a company
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingCompany) {
//       await updateBuyerCompany(editingCompany._id, newCompany);
//     } else {
//       await addBuyerCompany(newCompany);
//     }
//     setNewCompany({ name: "", gstNo: "", panNo: "", address: "" });
//     setEditingCompany(null);
//     fetchBuyerCompanies().then(setCompanies);
//   };

//   // ✅ Edit a company
//   const handleEdit = (company) => {
//     setEditingCompany(company);
//     setNewCompany(company);
//   };

//   // ✅ Delete a company
//   const handleDelete = async (companyId) => {
//     await deleteBuyerCompany(companyId);
//     fetchBuyerCompanies().then(setCompanies);
//   };

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl mb-6">Buyer Companies</h1>

//       {/* Add/Edit Form */}
//       <form onSubmit={handleSubmit} className="mb-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Company Name"
//           value={newCompany.name}
//           onChange={handleChange}
//           className="p-2 border rounded mb-2 w-full"
//           required
//         />
//         <input
//           type="text"
//           name="gstNo"
//           placeholder="GST No"
//           value={newCompany.gstNo}
//           onChange={handleChange}
//           className="p-2 border rounded mb-2 w-full"
//           required
//         />
//         <input
//           type="text"
//           name="panNo"
//           placeholder="PAN No"
//           value={newCompany.panNo}
//           onChange={handleChange}
//           className="p-2 border rounded mb-2 w-full"
//           required
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={newCompany.address}
//           onChange={handleChange}
//           className="p-2 border rounded mb-2 w-full"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded"
//         >
//           {editingCompany ? "Update Company" : "Add Company"}
//         </button>
//       </form>

//       {/* Company List */}
//       <ul>
//         {companies.map((company) => (
//           <li
//             key={company._id}
//             className="p-3 border-b flex justify-between items-center"
//           >
//             <div>
//               <strong>{company.name}</strong> - {company.address}
//             </div>
//             <div>
//               <button
//                 onClick={() => handleEdit(company)}
//                 className="bg-yellow-500 text-white p-2 rounded mr-2"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(company._id)}
//                 className="bg-red-500 text-white p-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
