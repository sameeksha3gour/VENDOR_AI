export interface Vendor {
  _id: string;

  businessName: string;
  ownerName: string;

  email: string;
  phone: string;

  gstNumber: string;

  address: string;

  category?: string;

  city?: string;
  state?: string;
  pincode?: string;

  vendorRating: number;

  riskLevel: "Low" | "Medium" | "High";

  isPreferred: boolean;

  outstandingAmount: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface CreateVendor {
  businessName: string;
  ownerName: string;

  email: string;
  phone: string;

  gstNumber: string;

  address: string;

  category?: string;
}

export interface UpdateVendor extends CreateVendor {}