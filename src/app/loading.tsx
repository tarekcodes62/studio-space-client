import { LoaderCircle } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <LoaderCircle className="h-9 w-9 animate-spin text-primary" />
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold tracking-wide">Studio Space</h2>

        <p className="text-sm text-muted-foreground">
          Creating spaces for your next big idea...
        </p>
      </div>

      <div className="h-1.5 w-36 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
      </div>
    </div>
  );
}
