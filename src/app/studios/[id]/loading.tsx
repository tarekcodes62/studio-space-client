export default function Loading() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 animate-pulse">
      {/* Back Button */}
      <div className="mb-6 h-5 w-32 rounded bg-muted" />

      {/* Studio Image */}
      <div className="h-64 w-full rounded-2xl bg-muted md:h-105" />

      {/* Studio Information */}
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="space-y-5 md:col-span-2">
          <div className="h-8 w-2/3 rounded bg-muted" />
          <div className="h-5 w-40 rounded bg-muted" />

          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted" />
          </div>

          <div className="h-6 w-40 rounded bg-muted" />
          <div className="h-20 w-full rounded bg-muted" />
        </div>

        {/* Booking Information */}
        <div className="space-y-5 rounded-xl border p-6">
          <div className="h-7 w-32 rounded bg-muted" />
          <div className="h-5 w-full rounded bg-muted" />
          <div className="h-5 w-3/4 rounded bg-muted" />
          <div className="h-11 w-full rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
