import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";

import { useProductStore } from "@/lib/store";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Failed() {
  const products = useProductStore.getState().products.products;
  const totalPrice = products
    .reduce((total, product) => total + product.price, 0)
    .toFixed(2);
  return (
    <div className="min-h-screen px-4 py-10 md:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center space-y-6">
          <CrossIcon className="h-24 w-24 text-red-500" />
          <h2 className="text-center text-3xl">Transaction Failed</h2>
          <Card>
            <CardHeader>
              <CardTitle>Payment Pending</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="w-[100px]">Quantity</TableHead>
                      <TableHead className="w-[100px]">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Image
                            alt={product.title}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={product.image}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.title}
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>
                          ${(product.price * product.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold">Total Amount:</h3>
                <p className="text-sm">${totalPrice}</p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold">Shipping Address:</h3>
                <p className="text-sm">IIIT Vadodara</p>
              </div>
            </CardContent>
          </Card>
          <Link
            href="/checkout"
            className={buttonVariants({ variant: "default" })}
          >
            Retry Payment
          </Link>
        </div>
      </div>
    </div>
  );
}

function CrossIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
