export interface CheckoutCustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface WhatsAppOrderItem {
  name: string;
  quantity: number;
  configuration: string;
  unitPrice: number;
  subtotal: number;
}

export interface WhatsAppOrderPayload {
  customer: CheckoutCustomerInfo;
  items: WhatsAppOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: string;
}
