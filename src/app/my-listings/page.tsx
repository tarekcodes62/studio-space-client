import StudioActions from '@/components/listings/StudioActions';
import { auth } from '@/lib/auth';
import { Studio } from '@/types/studio';
import { Camera, MapPin, Plus } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const ListingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${encodeURIComponent(
      session.user.email,
    )}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }

  const listings: Studio[] = await response.json();

  console.log(listings);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Studio Listings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your studio spaces and listings.
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-16 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Camera className="h-10 w-10 text-primary" />
          </div>

          <h2 className="text-2xl font-bold">No Studios Found</h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            You haven&apos;t added any studios yet. Start creating your creative
            space and share it with others.
          </p>

          <Link
            href="/add-studio"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Your First Studio
          </Link>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map(studio => (
            <div
              key={studio._id}
              className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Studio Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  src={studio.images?.[0] || '/placeholder.jpg'}
                  alt={studio.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Category Badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow backdrop-blur">
                    {studio.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow backdrop-blur">
                  <span className="text-yellow-500">★</span>
                  {studio.rating}
                  <span className="text-xs text-gray-500">
                    ({studio.totalReviews})
                  </span>
                </div>
              </div>

              {/* Studio Information */}
              <div className="p-5">
                <div className="mb-3">
                  <h2 className="line-clamp-1 text-xl font-bold tracking-tight">
                    {studio.name}
                  </h2>

                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {studio.location.area}, {studio.location.city}
                  </p>
                </div>

                {/* Studio Details */}
                <div className="mb-5 grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Studio Size</p>
                    <p className="mt-1 font-semibold">
                      {studio.specifications.size}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="mt-1 font-semibold">
                      {studio.specifications.capacity} People
                    </p>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between gap-3 border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Hourly Rate</p>
                    <p className="text-xl font-bold">
                      ৳{studio.hourlyRate.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-muted-foreground">
                        {' '}
                        / hour
                      </span>
                    </p>
                  </div>

                  <StudioActions studioId={studio._id as string} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ListingsPage;
