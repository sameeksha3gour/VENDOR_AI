"use client";

import { useState } from "react";

interface Props {
  onSubmit: (data: any) => void;
}

export default function VendorForm({
  onSubmit,
}: Props) {

  const [formData, setFormData] = useState({

    businessName: "",

    ownerName: "",

    email: "",

    phone: "",

    gstNumber: "",

    category: "",

    creditLimit: 0,

  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    onSubmit(formData);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        name="businessName"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="ownerName"
        placeholder="Owner Name"
        value={formData.ownerName}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="gstNumber"
        placeholder="GST Number"
        value={formData.gstNumber}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="creditLimit"
        placeholder="Credit Limit"
        value={formData.creditLimit}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <button
        className="bg-blue-600 text-white px-5 py-3 rounded-lg w-full"
      >
        Save Vendor
      </button>

    </form>

  );

}