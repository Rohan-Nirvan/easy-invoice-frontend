const API_URL = process.env.API_URL; // ✅ Ensure Backend API URL is set

// ✅ Fetch all buyer companies
export const fetchBuyerCompanies = async () => {
  try {
    const response = await fetch(`${API_URL}/companies`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch companies");
    return await response.json();
  } catch (error) {
    console.error("Error fetching buyer companies:", error.message);
    throw error;
  }
};

// ✅ Add a new company (Fix the Missing Export)
export const addBuyerCompany = async (companyData) => {
  try {
    const response = await fetch(`${API_URL}/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(companyData),
    });
    if (!response.ok) throw new Error("Failed to add company");
    return await response.json();
  } catch (error) {
    console.error("Error adding company:", error.message);
    throw error;
  }
};

// ✅ Update a company
export const updateBuyerCompany = async (companyId, companyData) => {
  try {
    const response = await fetch(`${API_URL}/companies/${companyId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(companyData),
    });
    if (!response.ok) throw new Error("Failed to update company");
    return await response.json();
  } catch (error) {
    console.error("Error updating company:", error.message);
    throw error;
  }
};

// ✅ Delete a company
export const deleteBuyerCompany = async (companyId) => {
  try {
    const response = await fetch(`${API_URL}/companies/${companyId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete company");
    return { message: "Company deleted successfully" };
  } catch (error) {
    console.error("Error deleting company:", error.message);
    throw error;
  }
};

// import api from "./api";

// // ✅ Fetch all buyer companies
// export const fetchBuyerCompanies = async () => {
//   try {
//     const response = await api.get("/companies");
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error fetching buyer companies:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// // ✅ Add a new company
// export const addBuyerCompany = async (companyData) => {
//   try {
//     const response = await api.post("/companies", companyData);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error adding company:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// // ✅ Update a company
// export const updateBuyerCompany = async (companyId, companyData) => {
//   try {
//     const response = await api.put(`/companies/${companyId}`, companyData);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error updating company:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// // ✅ Delete a company
// export const deleteBuyerCompany = async (companyId) => {
//   try {
//     await api.delete(`/companies/${companyId}`);
//     return { message: "Company deleted successfully" };
//   } catch (error) {
//     console.error(
//       "Error deleting company:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };
