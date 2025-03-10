"use client";
import { useEffect, useState } from "react";
import { fetchCompanies } from "../utils/companies"; // Using fetchCompanies function

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies()
      .then((data) => setCompanies(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">Companies</h1>
      <ul>
        {companies.map((company) => (
          <li key={company._id} className="p-3 border-b">
            <strong>{company.name}</strong> - {company.address.city},{" "}
            {company.address.state}
          </li>
        ))}
      </ul>
    </div>
  );
}
