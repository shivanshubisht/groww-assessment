import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-[var(--foreground-groww)] md:text-xl lg:text-4xl dark:text-[var(--foreground-groww)]">
          Checkout
        </h1>
      </div>
      <div className="flex flex-col gap-6 md:grid md:grid-cols-6">
        <div className="flex flex-col gap-6 md:col-span-4 lg:col-span-3 xl:col-span-4">
          <Skeleton className="h-96 w-full rounded-lg object-cover" />
          <Skeleton className="mt-4 h-96" />
        </div>
        <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-3 xl:col-span-2">
          <Skeleton className="h-56" />
          <Skeleton className="h-72" />
        </div>
      </div>
    </>
  );
}
