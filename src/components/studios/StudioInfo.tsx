import { MapPin, Star } from 'lucide-react';

interface StudioInfoProps {
  name: string;
  category: string;
  description: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  location: {
    city: string;
    area: string;
    address: string;
  };
}

export default function StudioInfo({
  name,
  category,
  description,
  hourlyRate,
  rating,
  totalReviews,
  location,
}: StudioInfoProps) {
  return (
    <div className="space-y-4">
      <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
        {category}
      </span>

      <h1 className="text-3xl font-bold md:text-4xl">{name}</h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin size={17} />
          <span>
            {location.area}, {location.city}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Star size={17} className="fill-amber-400 text-amber-400" />
          <span className="font-medium text-foreground">{rating}</span>
          <span>({totalReviews} reviews)</span>
        </div>
      </div>

      <p className="leading-7 text-muted-foreground">{description}</p>

      <p className="text-2xl font-bold">
        ৳{hourlyRate.toLocaleString('en-BD')}
        <span className="text-base font-normal text-muted-foreground">
          {' '}
          / hour
        </span>
      </p>
    </div>
  );
}
