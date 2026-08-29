export interface PurchaseVendor {
  _id: string;
  businessName: string;
  gstNumber?: string;
  phone?: string;
}

export interface PurchaseProduct {
  _id: string;
  productName: string;
  sku?: string;
  purchasePrice?: number;
  sellingPrice?: number;
}

export interface PurchaseItem {
  product: string | PurchaseProduct;
  quantity: number;
  purchasePrice: number;
  gstRate: number;
  total: number;
}

export interface Purchase {
  _id?: string;

  purchaseNumber: string;

  vendor: string | PurchaseVendor;

  purchaseDate: string;

  items: PurchaseItem[];

  subtotal: number;

  gstAmount: number;

  grandTotal: number;

  paymentStatus:
    | "Pending"
    | "Partially Paid"
    | "Paid";

  remarks?: string;

  createdAt?: string;

  updatedAt?: string;
}

export interface CreatePurchase {
  vendor: string;

  purchaseDate: string;

  items: {
    product: string;
    quantity: number;
    purchasePrice: number;
    gstRate: number;
    total?: number;
  }[];

  subtotal: number;

  gstAmount: number;

  grandTotal: number;

  paymentStatus:
    | "Pending"
    | "Partially Paid"
    | "Paid";

  remarks?: string;

  purchaseNumber?: string;
}

export interface UpdatePurchase
  extends Partial<CreatePurchase> {}