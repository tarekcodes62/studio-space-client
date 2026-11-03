import { Skeleton } from '@/components/ui/skeleton';

export default function BookingsLoading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Booking Cards */}
      <div className="space-y-7">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-3xl border md:flex-row"
          >
            {/* Studio Image */}
            <Skeleton className="h-64 w-full rounded-none md:h-auto md:min-h-77.5 md:w-96.25 shrink-0" />

            {/* Booking Details */}
            <div className="flex-1 space-y-8 bg-card p-6 md:p-8">
              {/* Title & Status */}
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-7 w-64 max-w-[70%]" />
                <Skeleton className="h-9 w-24 rounded-full" />
              </div>

              {/* Booking Information */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t pt-6 space-y-3">
                <Skeleton className="h-4 w-28" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-7 w-7 rounded-md" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
