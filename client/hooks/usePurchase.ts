"use client";

import { useEffect, useState } from "react";

import {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
  updatePaymentStatus,
} from "@/services/purchaseService";

import {
  Purchase,
  CreatePurchase,
  UpdatePurchase,
} from "@/types/purchase";

export default function usePurchase() {
  const [purchases, setPurchases] =
    useState<Purchase[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadPurchases = async () => {
    try {
      setLoading(true);

      const data = await getPurchases();

      setPurchases(
        data.purchases || []
      );
    } catch (error) {
      console.error(
        "Purchase Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  const addPurchase = async (
    purchase: CreatePurchase
  ) => {
    await createPurchase(purchase);
    await loadPurchases();
  };

  const editPurchase = async (
    id: string,
    purchase: UpdatePurchase
  ) => {
    await updatePurchase(
      id,
      purchase
    );

    await loadPurchases();
  };

  const changePaymentStatus = async (
    id: string,
    status:
      | "Pending"
      | "Partially Paid"
      | "Paid"
  ) => {
    await updatePaymentStatus(
      id,
      status
    );

    await loadPurchases();
  };

  const removePurchase = async (
    id: string
  ) => {
    await deletePurchase(id);
    await loadPurchases();
  };

  return {
    purchases,
    loading,
    addPurchase,
    editPurchase,
    changePaymentStatus,
    removePurchase,
    refresh: loadPurchases,
  };
}