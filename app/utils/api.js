// const API_URL = process.env.API_URL; // Secure backend API URL
// const INVOICE_API_URL = process.env.INVOICE_API_URL; // Invoice backend

// // ✅ Backend API Request Function
// export const fetchWithAuth = async (endpoint, options = {}) => {
//   const token = process.env.API_TOKEN || ""; // Use secure backend token if available

//   const res = await fetch(`${API_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     cache: "no-store", // Prevent caching to always get fresh data
//   });

//   if (!res.ok) {
//     throw new Error(`Error: ${res.status} - ${res.statusText}`);
//   }

//   return res.json();
// };

// // ✅ Invoice API Request Function
// export const fetchInvoiceAPI = async (endpoint, options = {}) => {
//   const token = process.env.API_TOKEN || ""; // Secure token for backend calls

//   const res = await fetch(`${INVOICE_API_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error(`Error: ${res.status} - ${res.statusText}`);
//   }

//   return res.json();
// };
// import axios from "axios";
// import Cookies from "js-cookie";

// // Backend URLs
// const API_BASE = process.env.NEXT_PUBLIC_API_URL; // easy-invoice
// const INVOICE_API = process.env.NEXT_PUBLIC_INVOICE_API_URL; // invoicepackage

// // Create Axios instance for authentication & API calls
// const api = axios.create({
//   baseURL: API_BASE,
//   headers: { "Content-Type": "application/json" },
// });

// // Attach JWT token from cookies to every request
// api.interceptors.request.use((config) => {
//   const token = Cookies.get("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

// // Separate function to call invoice package API
// export const invoiceApi = axios.create({
//   baseURL: INVOICE_API,
//   headers: { "Content-Type": "application/json" },
// });
