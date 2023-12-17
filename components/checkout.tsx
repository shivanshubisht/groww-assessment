import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { merchantSchema, productSchema } from "@/lib/schema";
import { useProductStore } from "@/lib/store";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Avatar } from "./ui/avatar";

export async function Checkout() {
  const response = await fetch(
    `https://groww-intern-assignment.vercel.app/v1/api/order-details`,
    {
      cache: "no-cache",
    },
  );
  const data = productSchema.parse(await response.json());

  console.log(data);

  const merchantDetails = await fetch(
    `https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata`,
  );

  const merchantData = merchantSchema.parse(await merchantDetails.json());

  const totalPrice = Number(
    data.products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2),
  );

  const delivery = Number((totalPrice * 0.05).toFixed(2));

  const finalPrice = Number((totalPrice + delivery).toFixed(2));

  useProductStore.setState({ products: data });
  console.log(useProductStore.getState().products);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-background/40 dark:bg-background/40 lg:block">
        <div className="sticky top-0 flex flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Image
                src={merchantData.merchantLogo}
                alt="logo"
                width="24"
                height="24"
              />
              <span>{merchantData.merchantName}</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-background px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-background dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Checkout
              </Link>
            </nav>
          </div>
        </div>
      </aside>
      <div className="relative flex min-h-screen flex-col">
        <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background/40 px-6 backdrop-blur-md dark:bg-background/40 lg:h-[60px]">
          <Link className="lg:hidden" href="#">
            <Image
              src={merchantData.merchantLogo}
              alt="logo"
              width="24"
              height="24"
            />
            <span className="sr-only">{merchantData.merchantName}</span>
          </Link>
        </header>
        <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold md:text-xl">Checkout</h1>
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
        </main>
      </div>
    </div>
  );
}

function HomeIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ShoppingCartIcon(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
