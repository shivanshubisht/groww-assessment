import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { productSchema } from "@/lib/schema";
import { useProductStore } from "@/lib/store";
import { Avatar } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import EmptyCart from "@/components/empty-cart";

export const runtime = "edge";

export default async function Checkout() {
  const response = await fetch(
    `https://groww-intern-assignment.vercel.app/v1/api/order-details`,
    {
      cache: "no-cache",
    },
  );
  const data = productSchema.parse(await response.json());

  const totalPrice = Number(
    data.products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2),
  );

  const delivery = Number((totalPrice * 0.05).toFixed(2));

  const finalPrice = Number((totalPrice + delivery).toFixed(2));

  /** @see https://github.com/pmndrs/zustand/discussions/2200#discussioncomment-7879890 */
  useProductStore.setState({ products: data });
  console.log(data.products);

  return (
    <>
      {data.products.length !== 0 ? (
        <>
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold md:text-xl lg:text-4xl">
              Checkout
            </h1>
          </div>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-6">
            <div className="flex flex-col gap-6 md:col-span-4 lg:col-span-3 xl:col-span-4">
              {data.products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle>
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      alt={product.title}
                      className="h-48 w-full rounded-lg object-cover"
                      height="200"
                      src={product.image}
                      style={{
                        aspectRatio: "400/200",
                        objectFit: "cover",
                      }}
                      width="400"
                    />
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold">{product.title}</h2>
                      <p className="text-gray-600">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-gray-600">${product.price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-3 xl:col-span-2">
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
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div>Subtotal</div>
                    <div>${totalPrice}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Delivery (5%)</div>
                    <div>${delivery}</div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <div>Total</div>
                    <div>${finalPrice}</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Link
                    href="/payment"
                    className={buttonVariants({
                      variant: "default",
                    })}
                  >
                    Complete Checkout
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
