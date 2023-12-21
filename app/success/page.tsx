import Image from "next/image";
import Link from "next/link";
import { paymentMethods } from "@/constants/payment";
import { Check } from "lucide-react";

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

export default function Success({
  searchParams,
}: {
  searchParams: { payment: keyof typeof paymentMethods };
}) {
  const paymentMethod = paymentMethods[searchParams.payment];
  const products = useProductStore.getState().products.products;
  const totalPrice = products
    .reduce((total, product) => total + product.price, 0)
    .toFixed(2);
  const deliveryDate = new Date(
    Date.now() + 2 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="min-h-screen px-4 py-10 md:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center space-y-6">
          <Check className="h-24 w-24 text-green-500" />
          <h2 className="text-center text-3xl">Payment Successful</h2>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold">Items Purchased:</h3>
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
                <h3 className="text-lg font-semibold">Payment Method:</h3>
                <p className="text-sm">{paymentMethod}</p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold">Total Amount:</h3>
                <p className="text-sm">${totalPrice}</p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold">Shipping Address:</h3>
                <p className="text-sm">IIIT Vadodara</p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold">
                  Estimated Delivery Date:
                </h3>
                <p className="text-sm">{deliveryDate}</p>
              </div>
            </CardContent>
          </Card>
          <Link
            href="/checkout"
            className={buttonVariants({ variant: "default" })}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
