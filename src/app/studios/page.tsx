import { studioCategories } from '@/components/constants/studioCategories';
import Link from 'next/link';
import type { Studio } from '@/types/studio';
import StudioList from '@/components/studios/StudioList';

interface StudiosPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function StudiosPage({ searchParams }: StudiosPageProps) {
  const { category } = await searchParams;

  const query = category ? `?category=${encodeURIComponent(category)}` : '';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios${query}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch studios');
  }

  const studios: Studio[] = await response.json();

  const selectedCategory =
    studioCategories.find(item => item.slug === category)?.slug ?? 'all';

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Explore Studios</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/studios"
          className={`rounded-full border px-5 py-2 transition-colors ${
            selectedCategory === 'all'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          All Studios
        </Link>

        {studioCategories.map(item => (
          <Link
            key={item.slug}
            href={`/studios?category=${item.slug}`}
            className={`rounded-full border px-5 py-2 transition-colors ${
              selectedCategory === item.slug
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Studio Cards */}
      <StudioList studios={studios} />
    </main>
  );
}
