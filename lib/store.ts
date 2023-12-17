import type { z } from "zod";
import { create } from "zustand";

import type { productSchema } from "@/lib/schema";

type TProducts = z.infer<typeof productSchema>;

type ProductStore = {
  products: TProducts;
  setProducts: (products: TProducts) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: {
    products: [],
    paymentMethods: [],
  },
  setProducts: (products) => set({ products }),
}));
