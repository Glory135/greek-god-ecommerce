import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AddressData {
  firstname: string;
  lastname: string;
  address: string;
  appartment?: string;
  city: string;
  phone: string;
}

export interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  [key: string]: unknown;
}

interface CheckoutState {
  addressData: AddressData | null;
  orderTotal: number | null;
  products: CheckoutProduct[];
  setAddressData: (data: AddressData) => void;
  setOrderTotal: (total: number) => void;
  setProducts: (products: CheckoutProduct[]) => void;
  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      addressData: null,
      orderTotal: null,
      products: [],
      setAddressData: (data) => set({ addressData: data }),
      setOrderTotal: (total) => set({ orderTotal: total }),
      setProducts: (products) => set({ products }),
      clearCheckout: () => set({ addressData: null, orderTotal: null, products: [] }),
    }),
    {
      name: "greekgod-checkout-storage",
      partialize: (state) => ({
        addressData: state.addressData,
        orderTotal: state.orderTotal,
        products: state.products,
      }),
    }
  )
); 