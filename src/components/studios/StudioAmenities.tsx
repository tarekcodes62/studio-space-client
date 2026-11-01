import { CheckCircle2 } from 'lucide-react';

interface StudioAmenitiesProps {
  amenities: string[];
}

export default function StudioAmenities({ amenities }: StudioAmenitiesProps) {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold">Studio Amenities</h2>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {amenities.map(amenity => (
          <div key={amenity} className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
