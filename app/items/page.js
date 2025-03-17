"use client";
import { useEffect, useState } from "react";

export default function Items() {
  const [items, setItems] = useState([]);
  const [hsnList, setHsnList] = useState([]); // Store available HSN details
  const [editingItem, setEditingItem] = useState(null);
  const [name, setName] = useState("");
  const [hsnId, setHsnId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchItems();
      fetchHsnDetails();
    }
  }, [token]); // Fetch when token is available

  async function fetchItems() {
    try {
      const response = await fetch("/api/items");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      let data = await response.json();
      console.log("Fetched Items:", data);

      if (!Array.isArray(data)) data = []; // Ensure it's an array
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    }
  }

  async function fetchHsnDetails() {
    try {
      if (!token) {
        console.error("No token found for authentication.");
        return;
      }

      const response = await fetch("/api/hsndetails", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      console.log("Fetched HSN Details:", data);

      if (!Array.isArray(data)) data = []; // Ensure it's an array
      setHsnList(data);
    } catch (error) {
      console.error("Error fetching HSN details:", error);
      setHsnList([]);
    }
  }

  async function addOrUpdateItems(e) {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    const itemData = { name, hsn: hsnId };
    const method = editingItem ? "PUT" : "POST";
    const endpoint = "/api/items";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          editingItem ? { ...itemData, id: editingItem._id } : itemData
        ),
      });

      const data = await response.json();
      if (response.ok) {
        alert(editingItem ? "Item updated!" : "Item added!");
        setEditingItem(null);
        resetForm();
        fetchItems();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  }

  async function deleteItem(id) {
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const response = await fetch("/api/items", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item deleted!");
        fetchItems();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  function resetForm() {
    setName("");
    setHsnId("");
  }

  function startEditing(item) {
    setEditingItem(item);
    setName(item.name);
    setHsnId(item.hsn?._id || ""); // Safe check for HSN
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Items Details</h1>

      <ul className="mb-6">
        {items.length === 0 ? (
          <p>No items available.</p>
        ) : (
          items.map((item) => (
            <li
              key={item._id}
              className="border p-3 my-2 rounded flex justify-between items-center"
            >
              <div>
                <strong>{item.name}</strong>
                {item.hsn ? (
                  <>
                    {" "}
                    (HSN: {item.hsn.hsn}, CGST: {item.hsn.cgst}%, SGST:{" "}
                    {item.hsn.sgst}%)
                  </>
                ) : (
                  " (No HSN Details)"
                )}
              </div>
              <div>
                <button
                  onClick={() => startEditing(item)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <h2 className="text-lg font-semibold">
        {editingItem ? "Edit Item" : "Add Item"}
      </h2>
      <form
        onSubmit={addOrUpdateItems}
        className="flex flex-col gap-3 max-w-md"
      >
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="border p-2 rounded"
          value={hsnId}
          onChange={(e) => setHsnId(e.target.value)}
          required
        >
          <option value="">Select HSN</option>
          {Array.isArray(hsnList) && hsnList.length > 0 ? (
            hsnList.map((hsn) => (
              <option key={hsn._id} value={hsn._id}>
                {hsn.hsn} (CGST: {hsn.cgst}%, SGST: {hsn.sgst}%)
              </option>
            ))
          ) : (
            <option disabled>No HSN available</option>
          )}
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingItem ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";

// export default function Items() {
//   const [items, setItems] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);
//   const [name, setName] = useState("");
//   const [hsn, setHsn] = useState("");
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     fetchItems();
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   async function fetchItems() {
//     try {
//       const response = await fetch("http://localhost:5000/items"); // Correct API URL

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       let data = await response.json();

//       console.log("Fetched Items Data:", data); // Debugging

//       // Ensure each item's HSN is populated correctly
//       const populatedItems = await Promise.all(
//         data.map(async (item) => {
//           if (item.hsn) {
//             const hsnResponse = await fetch(
//               `http://localhost:5000/hsndetails/${item.hsn}`
//             );
//             const hsnData = await hsnResponse.json();
//             item.hsnDetails = hsnData || {
//               hsn: "Unknown",
//               cgst: "-",
//               sgst: "-",
//             };
//           }
//           return item;
//         })
//       );

//       setItems(populatedItems);
//     } catch (error) {
//       console.error("Error fetching Items:", error);
//       setItems([]);
//     }
//   }

//   async function addOrUpdateItems(e) {
//     e.preventDefault();
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }

//     const itemData = {
//       name,
//       hsn,
//     };

//     const method = editingItem ? "PUT" : "POST";
//     const endpoint = editingItem
//       ? `http://localhost:5000/items/${editingItem._id}`
//       : "http://localhost:5000/items";

//     try {
//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(itemData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert(editingItem ? "Item updated!" : "Item added!");
//         setEditingItem(null);
//         resetForm();
//         fetchItems();
//       } else {
//         alert(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Error saving Items:", error);
//     }
//   }

//   async function deleteItem(id) {
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this item?")) {
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/items/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Item deleted!");
//         fetchItems();
//       } else {
//         alert(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   }

//   function resetForm() {
//     setName("");
//     setHsn("");
//   }

//   function startEditing(item) {
//     setEditingItem(item);
//     setName(item.name);
//     setHsn(item.hsn);
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Items Details</h1>

//       {/* List of Items */}
//       <ul className="mb-6">
//         {items.length === 0 ? (
//           <p>No items available.</p>
//         ) : (
//           items.map((item) => (
//             <li
//               key={item._id}
//               className="border p-3 my-2 rounded flex justify-between items-center"
//             >
//               <div>
//                 <strong>{item.name}</strong> (HSN: {item.hsnDetails.hsn}, CGST:{" "}
//                 {item.hsnDetails.cgst}%, SGST: {item.hsnDetails.sgst}%)
//               </div>
//               <div>
//                 <button
//                   onClick={() => startEditing(item)}
//                   className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteItem(item._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))
//         )}
//       </ul>

//       {/* Add or Edit Form */}
//       <h2 className="text-lg font-semibold">
//         {editingItem ? "Edit Item" : "Add Item"}
//       </h2>
//       <form
//         onSubmit={addOrUpdateItems}
//         className="flex flex-col gap-3 max-w-md"
//       >
//         <input
//           type="text"
//           placeholder="Name"
//           className="border p-2 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="HSN"
//           className="border p-2 rounded"
//           value={hsn}
//           onChange={(e) => setHsn(e.target.value)}
//           required
//         />

//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           {editingItem ? "Update" : "Add"}
//         </button>
//       </form>
//     </div>
//   );
// }
