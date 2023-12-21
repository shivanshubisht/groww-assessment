"use client";

import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <ShoppingCartIcon className="h-24 w-24 text-gray-400" />
        <h2 className="text-2xl">Your Cart is Empty</h2>
        <h6 className="text-center text-gray-500">
          You haven't added anything to your cart yet.
        </h6>
        <Button className="mb-24 mt-4 w-full" onClick={() => router.refresh()}>
          Start Shopping
        </Button>
      </div>
    </div>
  );
}
