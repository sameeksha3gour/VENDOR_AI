"use client";

import { useEffect, useState } from "react";

import {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from "@/services/inventoryService";

import {
  Inventory,
  CreateInventory,
  UpdateInventory,
} from "@/types/inventory";

export default function useInventory() {
  const [inventory, setInventory] =
    useState<Inventory[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadInventory = async () => {
    try {
      setLoading(true);

      const data = await getInventory();

      setInventory(
        data.inventory || []
      );
    } catch (error) {
      console.error(
        "Load Inventory Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const addInventory = async (
    product: CreateInventory
  ) => {
    await createInventory(product);

    await loadInventory();
  };

  const editInventory = async (
    id: string,
    product: UpdateInventory
  ) => {
    await updateInventory(
      id,
      product
    );

    await loadInventory();
  };

  const removeInventory = async (
    id: string
  ) => {
    await deleteInventory(id);

    await loadInventory();
  };

  return {
    inventory,
    loading,
    addInventory,
    editInventory,
    removeInventory,
    refresh: loadInventory,
  };
}