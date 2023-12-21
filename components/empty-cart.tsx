"use client";

import { useRouter } from "next/navigation";
import { ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center bg-[var(--background-groww)]">
      <div className="flex flex-col items-center justify-center gap-4">
        <ShoppingCartIcon className="h-24 w-24 bg-[var(--foreground-groww)]" />
        <h2 className="bg-[var(--foreground-groww)] text-2xl">
          Your Cart is Empty
        </h2>
        <h6 className="bg-[var(--foreground-groww)] text-center">
          You haven't added anything to your cart yet.
        </h6>
        <Button
          className="mb-24 mt-4 w-full bg-[var(--primary-groww)]"
          onClick={() => router.refresh()}
        >
          Start Shopping
        </Button>
      </div>
    </div>
  );
}
