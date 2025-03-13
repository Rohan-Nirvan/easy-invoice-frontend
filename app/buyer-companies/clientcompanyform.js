"use client"; // ✅ Ensures this runs on the frontend

import { useState } from "react";
import {
  fetchBuyerCompanies,
  addBuyerCompany,
  updateBuyerCompany,
  deleteBuyerCompany,
} from "../utils/companies";

export default function ClientCompanyForm({ companies }) {
  const [companyList, setCompanyList] = useState(companies);
  const [newCompany, setNewCompany] = useState({
    name: "",
    gstNo: "",
    panNo: "",
    address: "",
  });
  const [editingCompany, setEditingCompany] = useState(null);

  // ✅ Handle form change
  const handleChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update a company
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCompany) {
      await updateBuyerCompany(editingCompany._id, newCompany);
    } else {
      await addBuyerCompany(newCompany);
    }
    setNewCompany({ name: "", gstNo: "", panNo: "", address: "" });
    setEditingCompany(null);

    // ✅ Refresh Data (Refetch from Backend)
    const updatedCompanies = await fetchBuyerCompanies();
    setCompanyList(updatedCompanies);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={newCompany.name}
          onChange={handleChange}
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {editingCompany ? "Update Company" : "Add Company"}
        </button>
      </form>

      <ul>
        {companyList.map((company) => (
          <li
            key={company._id}
            className="p-3 border-b flex justify-between items-center"
          >
            <strong>{company.name}</strong>
          </li>
        ))}
      </ul>
    </>
  );
}
