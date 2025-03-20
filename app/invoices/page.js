"use client";
import { useState, useEffect } from "react";

export default function InvoicePage() {
  const API_URL = "http://localhost:5000/invoices"; // Direct Express API
  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState({
    sellerName: "",
    buyerId: "",
    buyer: {
      name: "",
      gstNo: "",
      panNo: "",
      address: {
        street: "",
        city: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
      },
    },
    items: [{ name: "", quantity: 1, price: 0 }],
    motorVehicleNo: "",
    date: new Date().toISOString().split("T")[0],
  });

  // ✅ Fetch Invoices
  useEffect(() => {
    async function loadInvoices() {
      const response = await fetch(API_URL);
      const data = await response.json();
      setInvoices(data);
    }
    loadInvoices();
  }, []);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle Buyer Selection
  const handleBuyerChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      buyerId: value,
      buyer: value ? {} : prev.buyer, // Reset new buyer fields if selecting existing
    }));
  };

  // ✅ Handle Buyer Address Changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      buyer: {
        ...prev.buyer,
        address: { ...prev.buyer.address, [name]: value },
      },
    }));
  };

  // ✅ Handle Item Changes
  const handleItemChange = (index, key, value) => {
    setFormData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index][key] =
        key === "quantity" || key === "price" ? parseFloat(value) || 0 : value;
      return { ...prev, items: updatedItems };
    });
  };

  // ✅ Add New Item
  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0 }],
    }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.items.some((item) => !item.name || item.name.trim() === "")) {
      alert("Item name cannot be empty!");
      return;
    }
    // if (formData.items.some((item) => !item.name.trim())) {
    //   alert("Item name cannot be empty!");
    //   return;
    // }

    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    alert(result.message || "Invoice Created");

    // ✅ Refresh Invoice List
    const updatedInvoices = await fetch(API_URL).then((res) => res.json());
    setInvoices(updatedInvoices);

    // ✅ Reset Form
    setFormData({
      sellerName: "",
      buyerId: "",
      buyer: {
        name: "",
        gstNo: "",
        panNo: "",
        address: {
          street: "",
          city: "",
          district: "",
          state: "",
          country: "",
          pincode: "",
        },
      },
      items: [{ name: "", quantity: 1, price: 0 }],
      motorVehicleNo: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ Seller Name */}
        <div>
          <label>Seller Name:</label>
          <input
            type="text"
            name="sellerName"
            value={formData.sellerName}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        {/* ✅ Buyer ID (Optional) */}
        <div>
          <label>Buyer ID (Leave empty for new buyer):</label>
          <input
            type="text"
            name="buyerId"
            value={formData.buyerId}
            onChange={handleBuyerChange}
            className="border p-2 w-full"
          />
        </div>

        {/* ✅ New Buyer Details (Only Show If No Buyer ID) */}
        {!formData.buyerId && (
          <>
            <h2 className="text-lg font-bold">New Buyer Details</h2>
            <input type="text" name="name" placeholder="Buyer Name" required />
            <input type="text" name="gstNo" placeholder="GST No" required />
            <input type="text" name="panNo" placeholder="PAN No" required />
            {["street", "city", "district", "state", "country", "pincode"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field}
                />
              )
            )}
          </>
        )}

        {/* ✅ Items Section */}
        <h2 className="text-lg font-bold">Items</h2>
        {formData.items.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <input type="text" placeholder="Item Name" required />
            <input type="number" placeholder="Quantity" required />
            <input type="number" placeholder="Price" required />
          </div>
        ))}
        <button type="button" onClick={addItem}>
          + Add Item
        </button>

        {/* ✅ Motor Vehicle No */}
        <div>
          <label>Motor Vehicle No:</label>
          <input
            type="text"
            name="motorVehicleNo"
            value={formData.motorVehicleNo}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Submit Invoice
        </button>
      </form>

      {/* ✅ Display Existing Invoices */}
      <h2 className="text-xl font-bold mt-6">Existing Invoices</h2>
      <ul className="list-disc pl-5">
        {invoices.map((invoice) => (
          <li key={invoice._id}>
            {invoice.invoiceNo} - {invoice.seller.name} - {invoice.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
}
// "use client";
// import { useState, useEffect } from "react";

// export default function InvoicePage() {
//   const [invoices, setInvoices] = useState([]);
//   const [formData, setFormData] = useState({
//     sellerName: "",
//     buyerId: "",
//     buyer: {
//       name: "",
//       gstNo: "",
//       panNo: "",
//       address: {
//         street: "",
//         city: "",
//         district: "",
//         state: "",
//         country: "",
//         pincode: "",
//       },
//     },
//     items: [{ name: "", quantity: 1, price: 0 }],
//     motorVehicleNo: "",
//     date: new Date().toISOString().split("T")[0],
//   });

//   useEffect(() => {
//     async function loadInvoices() {
//       try {
//         const response = await fetch("/api/invoices");
//         const data = await response.json();
//         console.log("Fetched Invoices:", data); // Debugging
//         setInvoices(data);
//       } catch (error) {
//         console.error("Error fetching invoices:", error);
//       }
//     }
//     loadInvoices();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "buyerId") {
//       setFormData({
//         ...formData,
//         buyerId: value,
//         buyer: value
//           ? { name: "", gstNo: "", panNo: "", address: {} }
//           : formData.buyer,
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleBuyerChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       buyer: { ...prev.buyer, [name]: value },
//     }));
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       buyer: {
//         ...prev.buyer,
//         address: { ...prev.buyer.address, [name]: value },
//       },
//     }));
//   };

//   const handleItemChange = (index, key, value) => {
//     setFormData((prev) => {
//       const updatedItems = [...prev.items];
//       updatedItems[index][key] =
//         key === "quantity" || key === "price" ? parseFloat(value) || 0 : value;
//       return { ...prev, items: updatedItems };
//     });
//   };

//   const addItem = () => {
//     setFormData((prev) => ({
//       ...prev,
//       items: [...prev.items, { name: "", quantity: 1, price: 0 }],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.items.some((item) => !item.name.trim())) {
//       alert("Item name cannot be empty!");
//       return;
//     }

//     try {
//       const response = await fetch("/api/invoices", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       console.log("Invoice Created:", result); // Debugging
//       alert(result.message || "Invoice Created");

//       // Reload invoices to reflect changes
//       const updatedInvoices = await fetch("/api/invoices");
//       setInvoices(await updatedInvoices.json());

//       setFormData({
//         sellerName: "",
//         buyerId: "",
//         buyer: {
//           name: "",
//           gstNo: "",
//           panNo: "",
//           address: {
//             street: "",
//             city: "",
//             district: "",
//             state: "",
//             country: "",
//             pincode: "",
//           },
//         },
//         items: [{ name: "", quantity: 1, price: 0 }],
//         motorVehicleNo: "",
//         date: new Date().toISOString().split("T")[0],
//       });
//     } catch (error) {
//       console.error("Error creating invoice:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-5">
//       <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label>Seller Name:</label>
//           <input
//             type="text"
//             name="sellerName"
//             value={formData.sellerName}
//             onChange={handleChange}
//             required
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Buyer ID (Leave empty for new buyer):</label>
//           <input
//             type="text"
//             name="buyerId"
//             value={formData.buyerId}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         {!formData.buyerId && (
//           <>
//             <h2 className="text-lg font-bold">New Buyer Details</h2>
//             <input
//               type="text"
//               name="name"
//               placeholder="Buyer Name"
//               value={formData.buyer.name}
//               onChange={handleBuyerChange}
//               className="border p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="gstNo"
//               placeholder="GST No"
//               value={formData.buyer.gstNo}
//               onChange={handleBuyerChange}
//               className="border p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="panNo"
//               placeholder="PAN No"
//               value={formData.buyer.panNo}
//               onChange={handleBuyerChange}
//               className="border p-2 w-full"
//               required
//             />

//             <h2 className="text-lg font-bold">Address</h2>
//             {["street", "city", "district", "state", "country", "pincode"].map(
//               (field) => (
//                 <input
//                   key={field}
//                   type="text"
//                   name={field}
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   value={formData.buyer.address[field] || ""}
//                   onChange={handleAddressChange}
//                   className="border p-2 w-full"
//                   required
//                 />
//               )
//             )}
//           </>
//         )}

//         <h2 className="text-lg font-bold">Items</h2>
//         {formData.items.map((item, index) => (
//           <div key={index} className="flex space-x-2">
//             <input
//               type="text"
//               placeholder="Item Name"
//               value={item.name}
//               onChange={(e) => handleItemChange(index, "name", e.target.value)}
//               className="border p-2 w-1/3"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Quantity"
//               value={item.quantity || ""}
//               onChange={(e) =>
//                 handleItemChange(index, "quantity", e.target.value)
//               }
//               className="border p-2 w-1/3"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={item.price || ""}
//               onChange={(e) => handleItemChange(index, "price", e.target.value)}
//               className="border p-2 w-1/3"
//               required
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addItem}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           + Add Item
//         </button>

//         <div>
//           <label>Motor Vehicle No:</label>
//           <input
//             type="text"
//             name="motorVehicleNo"
//             value={formData.motorVehicleNo}
//             onChange={handleChange}
//             className="border p-2 w-full"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-green-500 text-white p-2 rounded w-full"
//         >
//           Submit Invoice
//         </button>
//       </form>

//       <h2 className="text-xl font-bold mt-6">Existing Invoices</h2>
//       <ul className="list-disc pl-5">
//         {invoices.map((invoice) => (
//           <li key={invoice._id}>
//             {invoice.invoiceNo} - {invoice.seller.name} - {invoice.totalAmount}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect } from "react";

// export default function InvoicePage() {
//   const [invoices, setInvoices] = useState([]);
//   const [formData, setFormData] = useState({
//     sellerName: "",
//     buyerId: "",
//     buyer: {
//       name: "",
//       gstNo: "",
//       panNo: "",
//       address: {
//         street: "",
//         city: "",
//         district: "",
//         state: "",
//         country: "",
//         pincode: "",
//       },
//     },
//     items: [{ name: "", quantity: 1, price: 0 }],
//     motorVehicleNo: "",
//     date: new Date().toISOString().split("T")[0],
//   });

//   useEffect(() => {
//     async function loadInvoices() {
//       const response = await fetch("/api/invoices");
//       const data = await response.json();
//       setInvoices(data);
//     }
//     loadInvoices();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleItemChange = (index, key, value) => {
//     const updatedItems = [...formData.items];
//     updatedItems[index][key] = value;
//     setFormData({ ...formData, items: updatedItems });
//   };

//   const addItem = () => {
//     setFormData({
//       ...formData,
//       items: [...formData.items, { name: "", quantity: 1, price: 0 }],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("/api/invoices", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const result = await response.json();
//     alert(result.message || "Invoice Created");
//     setFormData({
//       sellerName: "",
//       buyerId: "",
//       buyer: {
//         name: "",
//         gstNo: "",
//         panNo: "",
//         address: {
//           street: "",
//           city: "",
//           district: "",
//           state: "",
//           country: "",
//           pincode: "",
//         },
//       },
//       items: [{ name: "", quantity: 1, price: 0 }],
//       motorVehicleNo: "",
//       date: new Date().toISOString().split("T")[0],
//     });
//   };

//   return (
//     <div className="container mx-auto p-5">
//       <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label>Seller Name:</label>
//           <input
//             type="text"
//             name="sellerName"
//             value={formData.sellerName}
//             onChange={handleChange}
//             required
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Buyer ID (Leave empty for new buyer):</label>
//           <input
//             type="text"
//             name="buyerId"
//             value={formData.buyerId}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         {!formData.buyerId && (
//           <>
//             <h2 className="text-lg font-bold">New Buyer Details</h2>
//             <input
//               type="text"
//               name="buyer.name"
//               placeholder="Buyer Name"
//               value={formData.buyer.name}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   buyer: { ...formData.buyer, name: e.target.value },
//                 })
//               }
//               className="border p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="buyer.gstNo"
//               placeholder="GST No"
//               value={formData.buyer.gstNo}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   buyer: { ...formData.buyer, gstNo: e.target.value },
//                 })
//               }
//               className="border p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="buyer.panNo"
//               placeholder="PAN No"
//               value={formData.buyer.panNo}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   buyer: { ...formData.buyer, panNo: e.target.value },
//                 })
//               }
//               className="border p-2 w-full"
//               required
//             />
//           </>
//         )}

//         <h2 className="text-lg font-bold">Address</h2>
//         <input
//           type="text"
//           name="street"
//           placeholder="Street"
//           value={formData.buyer.address.street}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               buyer: {
//                 ...formData.buyer,
//                 address: { ...formData.buyer.address, street: e.target.value },
//               },
//             })
//           }
//           className="border p-2 w-full"
//           required
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={formData.buyer.address.city}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               buyer: {
//                 ...formData.buyer,
//                 address: { ...formData.buyer.address, city: e.target.value },
//               },
//             })
//           }
//           className="border p-2 w-full"
//           required
//         />

//         <h2 className="text-lg font-bold">Items</h2>
//         {formData.items.map((item, index) => (
//           <div key={index} className="flex space-x-2">
//             <input
//               type="text"
//               placeholder="Item Name"
//               value={item.name}
//               onChange={(e) => handleItemChange(index, "name", e.target.value)}
//               className="border p-2 w-1/3"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Quantity"
//               value={item.quantity}
//               onChange={(e) =>
//                 handleItemChange(index, "quantity", parseInt(e.target.value))
//               }
//               className="border p-2 w-1/3"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={item.price}
//               onChange={(e) =>
//                 handleItemChange(index, "price", parseFloat(e.target.value))
//               }
//               className="border p-2 w-1/3"
//               required
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addItem}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           + Add Item
//         </button>

//         <div>
//           <label>Motor Vehicle No:</label>
//           <input
//             type="text"
//             name="motorVehicleNo"
//             value={formData.motorVehicleNo}
//             onChange={handleChange}
//             className="border p-2 w-full"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-green-500 text-white p-2 rounded w-full"
//         >
//           Submit Invoice
//         </button>
//       </form>

//       <h2 className="text-xl font-bold mt-6">Existing Invoices</h2>
//       <ul className="list-disc pl-5">
//         {invoices.map((invoice) => (
//           <li key={invoice._id}>
//             {invoice.invoiceNo} - {invoice.seller.name} - {invoice.totalAmount}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect } from "react";

// export default function InvoicePage() {
//   const [invoices, setInvoices] = useState([]);
//   const [formData, setFormData] = useState({
//     sellerName: "",
//     buyerId: "",
//     buyer: {
//       name: "",
//       gstNo: "",
//       panNo: "",
//       address: {
//         street: "",
//         city: "",
//         district: "",
//         state: "",
//         country: "",
//         pincode: "",
//       },
//     },
//     items: [{ name: "", quantity: 1, price: 0 }],
//     motorVehicleNo: "",
//     date: new Date().toISOString().split("T")[0],
//   });

//   // ✅ Load Invoices from API
//   useEffect(() => {
//     async function loadInvoices() {
//       try {
//         const response = await fetch("/api/invoices");
//         const data = await response.json();
//         console.log("Fetched Invoices:", data); // Debugging
//         setInvoices(data);
//       } catch (error) {
//         console.error("Error fetching invoices:", error);
//       }
//     }
//     loadInvoices();
//   }, []);

//   // ✅ Handle Input Changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "buyerId") {
//       // Reset buyer fields when selecting an existing buyer
//       setFormData({
//         ...formData,
//         buyerId: value,
//         buyer: {
//           name: "",
//           gstNo: "",
//           panNo: "",
//           address: {
//             street: "",
//             city: "",
//             district: "",
//             state: "",
//             country: "",
//             pincode: "",
//           },
//         },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // ✅ Handle Buyer Input Changes
//   const handleBuyerChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       buyer: { ...prev.buyer, [name]: value },
//     }));
//   };

//   // ✅ Handle Buyer Address Changes
//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       buyer: {
//         ...prev.buyer,
//         address: { ...prev.buyer.address, [name]: value },
//       },
//     }));
//   };

//   // ✅ Handle Item Changes
//   const handleItemChange = (index, key, value) => {
//     setFormData((prev) => {
//       const updatedItems = [...prev.items];
//       updatedItems[index][key] =
//         key === "quantity" || key === "price" ? parseFloat(value) || 0 : value;
//       return { ...prev, items: updatedItems };
//     });
//   };

//   // ✅ Add New Item
//   const addItem = () => {
//     setFormData((prev) => ({
//       ...prev,
//       items: [...prev.items, { name: "", quantity: 1, price: 0 }],
//     }));
//   };

//   // ✅ Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.items.some((item) => !item.name.trim())) {
//       alert("Item name cannot be empty!");
//       return;
//     }

//     try {
//       const response = await fetch("/api/invoices", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       console.log("Invoice Created:", result); // Debugging
//       alert(result.message || "Invoice Created");

//       // Reload invoices to reflect changes
//       const updatedInvoices = await fetch("/api/invoices");
//       setInvoices(await updatedInvoices.json());

//       // ✅ Reset Form
//       setFormData({
//         sellerName: "",
//         buyerId: "",
//         buyer: {
//           name: "",
//           gstNo: "",
//           panNo: "",
//           address: {
//             street: "",
//             city: "",
//             district: "",
//             state: "",
//             country: "",
//             pincode: "",
//           },
//         },
//         items: [{ name: "", quantity: 1, price: 0 }],
//         motorVehicleNo: "",
//         date: new Date().toISOString().split("T")[0],
//       });
//     } catch (error) {
//       console.error("Error creating invoice:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-5">
//       <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* ✅ Seller Name */}
//         <div>
//           <label>Seller Name:</label>
//           <input
//             type="text"
//             name="sellerName"
//             value={formData.sellerName}
//             onChange={handleChange}
//             required
//             className="border p-2 w-full"
//           />
//         </div>

//         {/* ✅ Buyer ID (Optional) */}
//         <div>
//           <label>Buyer ID (Leave empty for new buyer):</label>
//           <input
//             type="text"
//             name="buyerId"
//             value={formData.buyerId}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         {/* ✅ New Buyer Details (Only Show If No Buyer ID) */}
//         {!formData.buyerId && (
//           <>
//             <h2 className="text-lg font-bold">New Buyer Details</h2>
//             <input
//               type="text"
//               name="name"
//               placeholder="Buyer Name"
//               value={formData.buyer.name}
//               onChange={handleBuyerChange}
//               className="border p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="gstNo"
//               placeholder="GST No"
//               value={formData.buyer.gstNo}
//               onChange={handleBuyerChange}
//               className="border p-2 w-full"
//               required
//             />
//             <input
//               type="text"
//               name="panNo"
//               placeholder="PAN No"
//               value={formData.buyer.panNo}
//               onChange={handleBuyerChange}
//               className="border p-2 w-full"
//               required
//             />
//             <h2 className="text-lg font-bold">Address</h2>
//             {["street", "city", "district", "state", "country", "pincode"].map(
//               (field) => (
//                 <input
//                   key={field}
//                   type="text"
//                   name={field}
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   value={formData.buyer.address[field]}
//                   onChange={handleAddressChange}
//                   className="border p-2 w-full"
//                   required
//                 />
//               )
//             )}
//           </>
//         )}

//         {/* ✅ Items Section */}
//         <h2 className="text-lg font-bold">Items</h2>
//         {formData.items.map((item, index) => (
//           <div key={index} className="flex space-x-2">
//             <input
//               type="text"
//               placeholder="Item Name"
//               value={item.name}
//               onChange={(e) => handleItemChange(index, "name", e.target.value)}
//               className="border p-2 w-1/3"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Quantity"
//               value={item.quantity || ""}
//               onChange={(e) =>
//                 handleItemChange(index, "quantity", e.target.value)
//               }
//               className="border p-2 w-1/3"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={item.price || ""}
//               onChange={(e) => handleItemChange(index, "price", e.target.value)}
//               className="border p-2 w-1/3"
//               required
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addItem}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           + Add Item
//         </button>

//         {/* ✅ Motor Vehicle No */}
//         <div>
//           <label>Motor Vehicle No:</label>
//           <input
//             type="text"
//             name="motorVehicleNo"
//             value={formData.motorVehicleNo}
//             onChange={handleChange}
//             className="border p-2 w-full"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-green-500 text-white p-2 rounded w-full"
//         >
//           Submit Invoice
//         </button>
//       </form>
//     </div>
//   );
// }
