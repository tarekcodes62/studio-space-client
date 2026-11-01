import type { Studio } from '@/types/studio';
import StudioCard from './StudioCard';

interface StudioListProps {
  studios: Studio[];
}

export default function StudioList({ studios }: StudioListProps) {
  if (!studios || studios.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-semibold">No Studios Found</h3>
        <p className="mt-2 text-muted-foreground">
          No studios available in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map(studio => (
        <StudioCard key={studio._id || studio.slug} studio={studio} />
      ))}
    </div>
  );
}
