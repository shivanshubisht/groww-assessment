import { useProductStore } from "@/lib/store";

export default function PaymentPage() {
  const data = useProductStore.getState().products;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(data)}
    </main>
  );
}
