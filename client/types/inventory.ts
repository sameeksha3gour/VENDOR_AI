export interface Inventory {
  _id?: string;
  productName: string;
  sku: string;
  barcode?: string;
  hsnCode?: string;
  gstRate: number;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  minimumStock: number;
  maximumStock: number;
  warehouse: string;
  supplier?: string;
  batchNumber?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  status?: string;
}

export type CreateInventory = Omit<
  Inventory,
  "_id"
>;

export type UpdateInventory = Partial<CreateInventory>;