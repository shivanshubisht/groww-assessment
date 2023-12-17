import type { z } from "zod";
import { create } from "zustand";

import type { productSchema } from "@/lib/schema";

type TData = z.infer<typeof productSchema>;

type ProductStore = {
  data: TData;
  setData: (data: TData) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  data: {
    products: [],
    paymentMethods: [],
  },
  setData: (data) => set({ data }),
}));
