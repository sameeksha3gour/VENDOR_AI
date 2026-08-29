import api from "./api";

import {
  CreatePurchase,
  UpdatePurchase,
} from "@/types/purchase";

// ==========================================
// GET ALL PURCHASES
// ==========================================

export const getPurchases = async () => {
  const response = await api.get("/purchase");

  return response.data;
};

// ==========================================
// GET SINGLE PURCHASE
// ==========================================

export const getPurchase = async (
  id: string
) => {
  const response = await api.get(
    `/purchase/${id}`
  );

  return response.data;
};

// ==========================================
// CREATE PURCHASE
// ==========================================

export const createPurchase = async (
  purchase: CreatePurchase
) => {
  const response = await api.post(
    "/purchase",
    purchase
  );

  return response.data;
};

// ==========================================
// UPDATE PURCHASE
// ==========================================

export const updatePurchase = async (
  id: string,
  purchase: UpdatePurchase
) => {
  const response = await api.put(
    `/purchase/${id}`,
    purchase
  );

  return response.data;
};

// ==========================================
// UPDATE PAYMENT STATUS
// ==========================================

export const updatePaymentStatus = async (
  id: string,
  paymentStatus:
    | "Pending"
    | "Partially Paid"
    | "Paid"
) => {
  const response = await api.patch(
    `/purchase/${id}/payment`,
    {
      paymentStatus,
    }
  );

  return response.data;
};

// ==========================================
// DELETE PURCHASE
// ==========================================

export const deletePurchase = async (
  id: string
) => {
  const response = await api.delete(
    `/purchase/${id}`
  );

  return response.data;
};