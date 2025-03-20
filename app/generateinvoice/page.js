"use client";
import { useEffect, useState } from "react";

export default function GenerateInvoice() {
  const [sellerCompanies, setSellerCompanies] = useState([]);
  const [buyerCompanies, setBuyerCompanies] = useState([]);
  const [items, setItems] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "",
    date: new Date().toISOString().split("T")[0], // Default today's date
    buyerOrderNo: "",
    despatchDocNo: "",
    despatchedThrough: "",
    billOfLadingNo: "",
    destination: "",
    items: [],
  });

  useEffect(() => {
    fetchSellers();
    fetchBuyers();
    fetchItems();
    fetchNextInvoiceNo();
  }, []);

  async function fetchSellers() {
    const response = await fetch("/api/sellercompanies");
    const data = await response.json();
    setSellerCompanies(data);
  }

  async function fetchBuyers() {
    const response = await fetch("/api/buyercompanies");
    const data = await response.json();
    setBuyerCompanies(data);
  }

  async function fetchItems() {
    const response = await fetch("/api/items");
    const data = await response.json();
    setItems(data);
  }

  async function fetchNextInvoiceNo() {
    const response = await fetch("/api/invoices");
    const data = await response.json();
    const lastInvoice = data[data.length - 1];
    if (lastInvoice) {
      const lastNumber = parseInt(lastInvoice.invoiceNo.replace("T", ""), 10);
      setInvoiceNo(`T${lastNumber + 1}`);
    } else {
      setInvoiceNo("T00001");
    }
  }

  function handleSellerChange(e) {
    const seller = sellerCompanies.find((s) => s._id === e.target.value);
    setSelectedSeller(seller);
  }

  function handleBuyerChange(e) {
    const buyer = buyerCompanies.find((b) => b._id === e.target.value);
    setSelectedBuyer(buyer);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const invoiceDetails = {
      ...invoiceData,
      invoiceNo,
      seller: selectedSeller,
      buyer: selectedBuyer,
    };

    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceDetails),
    });

    if (response.ok) {
      alert("Invoice created successfully!");
      fetchNextInvoiceNo();
    } else {
      alert("Error creating invoice");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Generate Invoice</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Invoice Number */}
        <div>
          <label className="block">Invoice No</label>
          <input
            type="text"
            value={invoiceNo}
            readOnly
            className="border p-2 w-full"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block">Date</label>
          <input
            type="date"
            value={invoiceData.date}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, date: e.target.value })
            }
            className="border p-2 w-full"
          />
        </div>

        {/* Seller Information */}
        <div className="col-span-2">
          <label className="block">Seller</label>
          <select onChange={handleSellerChange} className="border p-2 w-full">
            <option value="">Select Seller</option>
            {sellerCompanies.map((seller) => (
              <option key={seller._id} value={seller._id}>
                {seller.name}
              </option>
            ))}
          </select>
          {selectedSeller && (
            <div className="mt-2 border p-2">
              <p>
                <strong>GST No:</strong> {selectedSeller.gstNo}
              </p>
              <p>
                <strong>PAN No:</strong> {selectedSeller.panNo}
              </p>
              <p>
                <strong>Address:</strong> {selectedSeller.address.street},{" "}
                {selectedSeller.address.city}
              </p>
            </div>
          )}
        </div>

        {/* Buyer Information */}
        <div className="col-span-2">
          <label className="block">Buyer</label>
          <select onChange={handleBuyerChange} className="border p-2 w-full">
            <option value="">Select Buyer</option>
            {buyerCompanies.map((buyer) => (
              <option key={buyer._id} value={buyer._id}>
                {buyer.name}
              </option>
            ))}
          </select>
          {selectedBuyer && (
            <div className="mt-2 border p-2">
              <p>
                <strong>GST No:</strong> {selectedBuyer.gstNo}
              </p>
              <p>
                <strong>PAN No:</strong> {selectedBuyer.panNo}
              </p>
              <p>
                <strong>Address:</strong> {selectedBuyer.address.street},{" "}
                {selectedBuyer.address.city}
              </p>
            </div>
          )}
        </div>

        {/* Order & Dispatch Details */}
        <input
          type="text"
          placeholder="Buyer's Order No"
          className="border p-2 w-full"
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, buyerOrderNo: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Despatch Document No"
          className="border p-2 w-full"
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, despatchDocNo: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Despatched Through"
          className="border p-2 w-full"
          onChange={(e) =>
            setInvoiceData({
              ...invoiceData,
              despatchedThrough: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Bill of Lading/LR RR No"
          className="border p-2 w-full"
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, billOfLadingNo: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Destination"
          className="border p-2 w-full"
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, destination: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded col-span-2"
        >
          Generate Invoice
        </button>
      </form>
    </div>
  );
}
