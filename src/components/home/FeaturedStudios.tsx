import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Studio } from '@/types/studio';

export default async function FeaturedStudios() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/featured-studios`,
  );
  const studios: Studio[] = await res.json();
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 font-medium text-primary">EXPLORE OUR SPACES</p>

            <h2 className="text-3xl font-bold md:text-4xl">Featured Studios</h2>

            <p className="mt-3 text-muted-foreground">
              Discover the perfect space for your next creative project.
            </p>
          </div>

          <Link
            href="/studios"
            className="hidden items-center gap-2 font-medium text-primary sm:flex"
          >
            View All Studios <ArrowRight size={18} />
          </Link>
        </div>

        {studios.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No studios available right now.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map(studio => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={studio.images?.[0] || '/placeholder.jpg'}
                    alt={studio.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                    {studio.category}
                  </span>

                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {studio.rating}
                  </span>
                </div>

                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold">{studio.name}</h3>

                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    {studio.location?.area}, {studio.location?.city}
                  </p>

                  <div className="flex items-center justify-between border-t pt-4">
                    <p className="text-lg font-bold">
                      ${studio.hourlyRate}
                      <span className="text-sm font-normal text-muted-foreground">
                        {' '}
                        / hr
                      </span>
                    </p>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/studios"
          className="mt-8 flex items-center justify-center gap-2 font-medium text-primary sm:hidden"
        >
          View All Studios <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
