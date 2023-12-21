"use client";

import { CheckIcon, CircleDollarSign, CreditCardIcon, Truck, Wallet } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function PaymentSection({
  subTotal,
  delivery,
  totalPrice,
  availableMethods,
}: {
  subTotal: number;
  delivery: number;
  totalPrice: number;
  // loose autocomplete hack
  // eslint-disable-next-line @typescript-eslint/ban-types
  availableMethods: ("UPI" | "CARDS" | (string & {}))[];
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathName = usePathname();
  const selectedPayment = params.get("payment");
  const handleClick = (value: string) => {
    params.set("payment", value);
    router.replace(`${pathName}?${params.toString()}` as Route);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Choose your preferred payment method.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>Subtotal</div>
            <div>{subTotal}</div>
          </div>
          <div className="flex justify-between">
            <div>Delivery (5%)</div>
            <div>{delivery}</div>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <div>Total</div>
            <div>{totalPrice}</div>
          </div>
          <div
            className="flex items-center gap-4 rounded-lg border p-2"
            onClick={() => handleClick("card")}
          >
            <CreditCardIcon className="h-6 w-6" />
            <span className="flex-grow">Card</span>
            {selectedPayment === "card" && (
              <CheckIcon className="h-6 w-6 text-green-500" />
            )}
          </div>
          <div
            className="flex items-center gap-4 rounded-lg border p-2"
            onClick={() => handleClick("upi")}
          >
            <CircleDollarSign className="h-6 w-6" />
            <span className="flex-grow">UPI</span>
            {selectedPayment === "upi" && (
              <CheckIcon className="h-6 w-6 text-green-500" />
            )}
          </div>
          <div
            className="flex items-center gap-4 rounded-lg border p-2"
            onClick={() => handleClick("ewallet")}
          >
            <Wallet className="h-6 w-6" />
            <span className="flex-grow">E-Wallet</span>
            {selectedPayment === "ewallet" && (
              <CheckIcon className="h-6 w-6 text-green-500" />
            )}
          </div>
          <div
            className="flex items-center gap-4 rounded-lg border p-2"
            onClick={() => handleClick("cod")}
          >
            <Truck className="h-6 w-6" />
            <span className="flex-grow">Cash on Delivery</span>
            {selectedPayment === "cod" && (
              <CheckIcon className="h-6 w-6 text-green-500" />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link
            className={buttonVariants({
              variant: "default",
            })}
            href={
              Math.random() > 0.5
                ? `/success?${params.toString()}`
                : "/failed?${params.toString()}"
            }
          >
            Complete Payment
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
