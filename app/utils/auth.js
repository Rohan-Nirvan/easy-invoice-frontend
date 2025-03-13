// import api from "./api"; // ✅ Correct import
// import Cookies from "js-cookie";

// // ✅ Signup API Call
// export const signupUser = async (userData) => {
//   try {
//     const response = await api.post("/signup", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Signup Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // ✅ Login API Call
// export const loginUser = async (email, password) => {
//   try {
//     const response = await api.post("/login", { email, password });

//     if (response.data.token) {
//       Cookies.set("token", response.data.token, { expires: 1 }); // Store JWT token
//     }

//     return response.data;
//   } catch (error) {
//     console.error("Login Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // ✅ Logout Function
// export const logoutUser = () => {
//   Cookies.remove("token"); // Remove JWT token
// };
// // import api from "./api";
// // import Cookies from "js-cookie";

// // // ✅ Signup API Call
// // export const signupUser = async (userData) => {
// //   try {
// //     const response = await api.post("/signup", userData);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Signup Error:", error.response?.data || error.message);
// //     throw error;
// //   }
// // };

// // // ✅ Login API Call
// // export const loginUser = async (email, password) => {
// //   try {
// //     const response = await api.post("/login", { email, password });

// //     if (response.data.token) {
// //       Cookies.set("token", response.data.token, { expires: 1 }); // Store JWT token
// //     }

// //     return response.data;
// //   } catch (error) {
// //     console.error("Login Error:", error.response?.data || error.message);
// //     throw error;
// //   }
// // };

// // // ✅ Logout Function
// // export const logoutUser = () => {
// //   Cookies.remove("token"); // Remove JWT token
// // };
