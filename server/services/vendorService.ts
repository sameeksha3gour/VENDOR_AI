import api from "./api";

// Get All Vendors
export const getVendors = async () => {
  const response = await api.get("/vendors");
  return response.data;
};

// Get Single Vendor
export const getVendorById = async (id: string) => {
  const response = await api.get(`/vendors/${id}`);
  return response.data;
};

// Create Vendor
export const createVendor = async (vendor: any) => {
  const response = await api.post("/vendors", vendor);
  return response.data;
};

// Update Vendor
export const updateVendor = async (
  id: string,
  vendor: any
) => {
  const response = await api.put(`/vendors/${id}`, vendor);
  return response.data;
};

// Delete Vendor
export const deleteVendor = async (id: string) => {
  const response = await api.delete(`/vendors/${id}`);
  return response.data;
};