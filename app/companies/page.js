// app/companies/page.js (For App Router)
async function fetchBuyerCompanies() {
  const res = await fetch(`${process.env.API_URL}/companies`, {
    cache: "no-store", // Ensures fresh data every request
  });
  if (!res.ok) throw new Error("Failed to fetch companies");
  return res.json();
}

export default async function CompaniesPage() {
  const companies = await fetchBuyerCompanies();

  return (
    <div className="p-10">
      <h1 className="text-3xl">Companies</h1>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
}
// "use client";
// import { useEffect, useState } from "react";
// import { fetchBuyerCompanies } from "../utils/companies"; // ✅ Correct import

// export default function CompaniesPage() {
//   const [companies, setCompanies] = useState([]);

//   useEffect(() => {
//     fetchBuyerCompanies()
//       .then((data) => setCompanies(data))
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl">Companies</h1>
//       <ul>
//         {companies.map((company) => (
//           <li key={company._id}>{company.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
