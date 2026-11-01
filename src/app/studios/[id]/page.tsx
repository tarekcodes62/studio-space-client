import { notFound } from 'next/navigation';

import StudioGallery from '@/components/studios/StudioGallery';
import StudioInfo from '@/components/studios/StudioInfo';
import StudioSpecifications from '@/components/studios/StudioSpecifications';
import StudioAmenities from '@/components/studios/StudioAmenities';
import HostDetails from '@/components/studios/HostDetails';
import StudioReviews, { type Review } from '@/components/studios/StudioReviews';
import BookingModal from '@/components/studios/BookingModal';

interface Studio {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  hourlyRate: number;
  rating: number;
  totalReviews: number;

  location: {
    city: string;
    area: string;
    address: string;
  };

  specifications: {
    size: string;
    capacity: number;
    availableHours: string;
    equipment: string[];
  };

  amenities: string[];

  host?: {
    name: string;
    email?: string;
    image?: string | null;
  };

  reviews?: Review[];
}

async function getStudio(id: string): Promise<Studio | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseUrl}/studios/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    notFound();
  }

  const result = await response.json();

  return result;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StudioDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const studio = await getStudio(id);
  if (!studio) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Gallery */}
        <StudioGallery images={studio.images} name={studio.name} />

        {/* Studio Details */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_350px]">
          <div className="space-y-10">
            <StudioInfo
              name={studio.name}
              category={studio.category}
              description={studio.description}
              hourlyRate={studio.hourlyRate}
              rating={studio.rating}
              totalReviews={studio.totalReviews}
              location={studio.location}
            />

            <div className="border-t pt-8">
              <StudioSpecifications specifications={studio.specifications} />
            </div>

            <div className="border-t pt-8">
              <StudioAmenities amenities={studio.amenities} />
            </div>

            <div className="border-t pt-8">
              <HostDetails host={studio.host} />
            </div>

            <div className="border-t pt-8">
              <StudioReviews
                reviews={studio.reviews ?? []}
                rating={studio.rating}
                totalReviews={studio.totalReviews}
              />
            </div>
          </div>

          {/* Booking Card */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="space-y-5 rounded-2xl border p-6 shadow-sm">
              <div>
                <p className="text-sm text-muted-foreground">Starting from</p>

                <p className="mt-1 text-3xl font-bold">
                  ৳{studio.hourlyRate.toLocaleString('en-BD')}
                  <span className="text-base font-normal text-muted-foreground">
                    {' '}
                    / hour
                  </span>
                </p>
              </div>

              <BookingModal
                studioName={studio.name}
                hourlyRate={studio.hourlyRate}
                image={studio.images[0]}
                name={studio.name}
                id={studio._id}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
