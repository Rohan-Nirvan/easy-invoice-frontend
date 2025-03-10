import api from "./api";

// ✅ Fetch all companies (correcting the path)
export const fetchCompanies = async () => {
  try {
    const response = await api.get("/companies"); // ✅ Correct path
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching companies:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// // ✅ Fetch a single invoice by ID
// export const fetchInvoiceById = async (invoiceId) => {
//   try {
//     const response = await api.get(`/invoices/${invoiceId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching invoice ${invoiceId}:`, error);
//     throw error;
//   }
// };

// // ✅ Create a new invoice
// export const createInvoice = async (invoiceData) => {
//   try {
//     const response = await api.post("/invoices", invoiceData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating invoice:", error);
//     throw error;
//   }
// };

// // ✅ Update an existing invoice
// export const updateInvoice = async (invoiceId, invoiceData) => {
//   try {
//     const response = await api.put(`/invoices/${invoiceId}`, invoiceData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating invoice ${invoiceId}:`, error);
//     throw error;
//   }
// };

// // ✅ Delete an invoice
// export const deleteInvoice = async (invoiceId) => {
//   try {
//     await api.delete(`/invoices/${invoiceId}`);
//     return { message: "Invoice deleted successfully" };
//   } catch (error) {
//     console.error(`Error deleting invoice ${invoiceId}:`, error);
//     throw error;
//   }
// };
