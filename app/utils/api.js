import axios from "axios";
import Cookies from "js-cookie";

// Backend URLs
const API_BASE = process.env.NEXT_PUBLIC_API_URL; // easy-invoice
const INVOICE_API = process.env.NEXT_PUBLIC_INVOICE_API_URL; // invoicepackage

// Create Axios instance for authentication & API calls
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token from cookies to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Separate function to call invoice package API
export const invoiceApi = axios.create({
  baseURL: INVOICE_API,
  headers: { "Content-Type": "application/json" },
});
