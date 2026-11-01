export default function FormSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-pulse">
      <div className="h-8 w-48 rounded bg-muted" />

      {[1, 2, 3, 4].map(item => (
        <div key={item} className="space-y-2">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-11 w-full rounded-lg bg-muted" />
        </div>
      ))}

      <div className="h-11 w-32 rounded-lg bg-muted" />
    </div>
  );
}
