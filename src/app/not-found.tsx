import Link from 'next/link';
import { Camera, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center p-5">
      {/* Studio Illustration */}
      <div className="relative mb-8 flex h-52 w-52 items-center justify-center rounded-full bg-primary/10">
        <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-primary/15">
          <Camera className="h-20 w-20 text-primary" strokeWidth={1.2} />
        </div>

        <span className="absolute right-5 top-5 h-4 w-4 rounded-full bg-primary" />
        <span className="absolute bottom-5 left-5 h-6 w-6 rounded-full bg-primary/40" />
      </div>

      {/* Error Content */}
      <h1 className="text-7xl font-extrabold tracking-tight text-primary">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
        Oops! Studio Not Found
      </h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        Looks like this creative space doesn&apos;t exist. The page you&apos;re
        looking for may have been moved or removed.
      </p>

      {/* Return Home */}
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
      >
        <Home className="h-4 w-4" />
        Return to Home
      </Link>
    </div>
  );
}
