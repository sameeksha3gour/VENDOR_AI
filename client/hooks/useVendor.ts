"use client";

import { useEffect, useState } from "react";

import {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
} from "@/services/vendorService";

import {
  Vendor,
  CreateVendor,
  UpdateVendor,
} from "@/types/vendor";

export default function useVendor() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(data.vendors || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  // Create Vendor
  const addVendor = async (vendor: any) => {
    await createVendor(vendor);
    await loadVendors();
  };

  // Update Vendor
  const editVendor = async (
    id: string,
    vendor: UpdateVendor
  ) => {
    await updateVendor(id, vendor);
    await loadVendors();
  };

  // Delete Vendor
  const removeVendor = async (id: string) => {
    await deleteVendor(id);
    await loadVendors();
  };

  return {
    vendors,
    loading,
    addVendor,
    editVendor,
    removeVendor,
    refresh: loadVendors,
  };
}