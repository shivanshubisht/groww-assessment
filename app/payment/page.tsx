import Image from "next/image";
import Link from "next/link";
import {
  BitcoinIcon,
  CheckIcon,
  CreditCardIcon,
  MapPin,
  Phone,
} from "lucide-react";

import { useProductStore } from "@/lib/store";
import { Avatar } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaymentSection } from "@/components/payment-section";

export default function PaymentPage() {
  const data = useProductStore.getState().products;

  const subTotal = Number(
    data.products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2),
  );

  const delivery = Number((subTotal * 0.05).toFixed(2));

  const totalPrice = Number((subTotal + delivery).toFixed(2));
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-[var(--foreground-groww)] md:text-xl lg:text-4xl dark:text-[var(--foreground-groww)]">
          Payments
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
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
                  {data.products.map((product) => (
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
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>${product.price * product.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Subtotal</TableCell>
                    <TableCell>${subTotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>Delivery</TableCell>
                    <TableCell>${delivery}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} className="font-bold">
                      Total
                    </TableCell>
                    <TableCell className="font-bold">${totalPrice}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <PaymentSection
            subTotal={subTotal}
            delivery={delivery}
            totalPrice={totalPrice}
            availableMethods={data.paymentMethods}
          />
          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="bg-primary/50" />
                <div className="flex flex-col">
                  <span className="font-semibold">Shivanshu Bisht</span>
                  <span className="text-sm text-gray-500">
                    social@shivanshu.in
                  </span>
                </div>
              </div>
            </CardContent>
            <CardContent>
              <div className="flex flex-col gap-4 px-2">
                <div className="flex flex-row gap-4">
                  <MapPin />
                  IIIT Vadodara
                </div>
                <div className="flex flex-row gap-4">
                  <Phone />
                  +91 99992 14924
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
