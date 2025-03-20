// "use client";
// import { useEffect, useState } from "react";

// export default function HsnDetails() {
//   const [hsndetails, setHsndetails] = useState([]);
//   const [editingHsndetail, setEditingHsndetail] = useState(null);
//   const [hsn, setHsn] = useState("");
//   const [cgst, setCgst] = useState("");
//   const [sgst, setSgst] = useState("");
//   const [token, setToken] = useState("");

//   // ✅ Get Token Once
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     } else {
//       console.error("No token found. Please log in.");
//     }
//   }, []);

//   // ✅ Fetch HSN Details After Token is Set
//   useEffect(() => {
//     if (token) {
//       fetchHsndetails();
//     }
//   }, [token]); // Runs when `token` changes

//   async function fetchHsndetails() {
//     try {
//       const response = await fetch("/api/hsndetails", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // ✅ Ensure proper format
//         },
//       });

//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       let data = await response.json();
//       console.log("Fetched HSN Details:", data);
//       setHsndetails(data); // ✅ Fixed the state update
//     } catch (error) {
//       console.error("Error fetching HSN details:", error);
//       setHsndetails([]); // ✅ Fixed typo (previously `setHsnList`)
//     }
//   }

//   async function addOrUpdateHsndetail(e) {
//     e.preventDefault();
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }

//     const hsndetailData = { hsn, cgst, sgst };
//     const method = editingHsndetail ? "PUT" : "POST";
//     const endpoint = editingHsndetail
//       ? `/api/hsndetails?id=${editingHsndetail._id}`
//       : "/api/hsndetails";

//     try {
//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ...hsndetailData, id: editingHsndetail?._id }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert(editingHsndetail ? "HSN detail updated!" : "HSN detail added!");
//         resetForm();
//         setEditingHsndetail(null);
//         fetchHsndetails(); // ✅ Fetch updated data
//       } else {
//         alert(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Error saving HSN detail:", error);
//     }
//   }

//   async function deleteHsndetail(id) {
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this HSN detail?")) {
//       return;
//     }

//     try {
//       const response = await fetch(`/api/hsndetails/${id}`, {
//         // ✅ Pass id in URL
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("HSN detail deleted!");
//         fetchHsndetails();
//       } else {
//         alert(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Error deleting HSN detail:", error);
//     }
//   }

//   // async function deleteHsndetail(id) {
//   //   if (!token) {
//   //     alert("You must be logged in!");
//   //     return;
//   //   }

//   //   if (!window.confirm("Are you sure you want to delete this HSN detail?")) {
//   //     return;
//   //   }

//   //   try {
//   //     const response = await fetch(`/api/hsndetails`, {
//   //       method: "DELETE",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify({ id }),
//   //     });

//   //     const data = await response.json();
//   //     if (response.ok) {
//   //       alert("HSN detail deleted!");
//   //       fetchHsndetails();
//   //     } else {
//   //       alert(`Error: ${data.error}`);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error deleting HSN detail:", error);
//   //   }
//   // }

//   function resetForm() {
//     setHsn("");
//     setCgst("");
//     setSgst("");
//   }

//   function startEditing(hsndetail) {
//     setEditingHsndetail(hsndetail);
//     setHsn(hsndetail.hsn);
//     setCgst(hsndetail.cgst);
//     setSgst(hsndetail.sgst);
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">HSN Details</h1>

//       {/* HSN List */}
//       {hsndetails.length === 0 ? (
//         <p className="text-gray-500">No HSN details available.</p>
//       ) : (
//         <ul className="mb-6">
//           {hsndetails.map((hsndetail) => (
//             <li
//               key={hsndetail._id}
//               className="border p-3 my-2 rounded flex justify-between items-center"
//             >
//               <div>
//                 <strong>{hsndetail.hsn}</strong> (CGST: {hsndetail.cgst}, SGST:{" "}
//                 {hsndetail.sgst})
//               </div>
//               <div>
//                 <button
//                   onClick={() => startEditing(hsndetail)}
//                   className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteHsndetail(hsndetail._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Add or Edit Form */}
//       <h2 className="text-lg font-semibold">
//         {editingHsndetail ? "Edit HSN Detail" : "Add HSN Detail"}
//       </h2>
//       <form
//         onSubmit={addOrUpdateHsndetail}
//         className="flex flex-col gap-3 max-w-md"
//       >
//         <input
//           type="text"
//           placeholder="HSN Code"
//           className="border p-2 rounded"
//           value={hsn}
//           onChange={(e) => setHsn(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="CGST"
//           className="border p-2 rounded"
//           value={cgst}
//           onChange={(e) => setCgst(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="SGST"
//           className="border p-2 rounded"
//           value={sgst}
//           onChange={(e) => setSgst(e.target.value)}
//           required
//         />

//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           {editingHsndetail ? "Update" : "Add"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";

export default function HsnDetails() {
  const [hsndetails, setHsndetails] = useState([]);
  const [editingHsndetail, setEditingHsndetail] = useState(null);
  const [hsn, setHsn] = useState("");
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchHsndetails(storedToken);
    }
  }, []);

  //
  async function fetchHsndetails() {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch("/api/hsndetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`, // Ensure proper format
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      let data = await response.json();
      console.log("Fetched HSN Details:", data);
      setHsndetails(data); // <-- Corrected this line
    } catch (error) {
      console.error("Error fetching HSN details:", error);
      setHsndetails([]); // <-- Corrected this line
    }
  }

  // async function fetchHsndetails(authToken) {
  //   try {
  //     const response = await fetch("http://localhost:5000/hsndetails", {
  //       headers: { Authorization: `Bearer ${authToken}` },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Fetched Data:", data);
  //     setHsndetails(Array.isArray(data) ? data : []); // Ensure it's always an array
  //   } catch (error) {
  //     console.error("Error fetching HSN details:", error);
  //     setHsndetails([]); // Set empty array on error
  //   }
  // }

  async function addOrUpdateHsndetail(e) {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    const hsndetailData = { hsn, cgst, sgst };
    const method = editingHsndetail ? "PUT" : "POST";
    const endpoint = editingHsndetail
      ? `/api/hsndetails?id=${editingHsndetail._id}`
      : "/api/hsndetails";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...hsndetailData, id: editingHsndetail?._id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(editingHsndetail ? "HSN detail updated!" : "HSN detail added!");
        resetForm();
        setEditingHsndetail(null);
        fetchHsndetails(token);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving HSN detail:", error);
    }
  }

  async function deleteHsndetail(id) {
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this HSN detail?")) {
      return;
    }

    try {
      const response = await fetch(`/api/hsndetails`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("HSN detail deleted!");
        fetchHsndetails(token);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting HSN detail:", error);
    }
  }

  function resetForm() {
    setHsn("");
    setCgst("");
    setSgst("");
  }

  function startEditing(hsndetail) {
    setEditingHsndetail(hsndetail);
    setHsn(hsndetail.hsn);
    setCgst(hsndetail.cgst);
    setSgst(hsndetail.sgst);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">HSN Details</h1>

      {/* HSN List */}
      {hsndetails.length === 0 ? (
        <p className="text-gray-500">No HSN details available.</p>
      ) : (
        <ul className="mb-6">
          {hsndetails.map((hsndetail) => (
            <li
              key={hsndetail._id}
              className="border p-3 my-2 rounded flex justify-between items-center"
            >
              <div>
                <strong>{hsndetail.hsn}</strong> (CGST: {hsndetail.cgst}, SGST:{" "}
                {hsndetail.sgst})
              </div>
              <div>
                <button
                  onClick={() => startEditing(hsndetail)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHsndetail(hsndetail._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add or Edit Form */}
      <h2 className="text-lg font-semibold">
        {editingHsndetail ? "Edit HSN Detail" : "Add HSN Detail"}
      </h2>
      <form
        onSubmit={addOrUpdateHsndetail}
        className="flex flex-col gap-3 max-w-md"
      >
        <input
          type="text"
          placeholder="HSN Code"
          className="border p-2 rounded"
          value={hsn}
          onChange={(e) => setHsn(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CGST"
          className="border p-2 rounded"
          value={cgst}
          onChange={(e) => setCgst(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="SGST"
          className="border p-2 rounded"
          value={sgst}
          onChange={(e) => setSgst(e.target.value)}
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingHsndetail ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
