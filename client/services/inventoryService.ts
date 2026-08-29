import api from "./api";

import {
  Inventory,
  CreateInventory,
  UpdateInventory,
} from "@/types/inventory";

// ==========================================
// GET ALL INVENTORY
// ==========================================

export const getInventory = async () => {
  const response = await api.get("/inventory");

  return response.data;
};

// ==========================================
// GET SINGLE PRODUCT
// ==========================================

export const getInventoryById = async (
  id: string
) => {
  const response = await api.get(
    `/inventory/${id}`
  );

  return response.data;
};

// ==========================================
// CREATE PRODUCT
// ==========================================

export const createInventory = async (
  inventory: CreateInventory
) => {
  const response = await api.post(
    "/inventory",
    inventory
  );

  return response.data;
};

// ==========================================
// UPDATE PRODUCT
// ==========================================

export const updateInventory = async (
  id: string,
  inventory: UpdateInventory
) => {
  const response = await api.put(
    `/inventory/${id}`,
    inventory
  );

  return response.data;
};

// ==========================================
// DELETE PRODUCT
// ==========================================

export const deleteInventory = async (
  id: string
) => {
  const response = await api.delete(
    `/inventory/${id}`
  );

  return response.data;
};