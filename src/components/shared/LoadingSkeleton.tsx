export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto space-y-6 p-6 animate-pulse">
      <div className="h-8 w-48 rounded-lg bg-muted" />

      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map(item => (
          <div key={item} className="space-y-3">
            <div className="h-48 rounded-xl bg-muted" />
            <div className="h-5 w-3/4 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
