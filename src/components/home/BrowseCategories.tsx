import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { studioCategories } from '../constants/studioCategories';

export default function BrowseCategories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Explore Categories
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Browse by Studio Categories
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Find the perfect creative space for your next project.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {studioCategories.map(category => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/studios?category=${category.slug}`}
                className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="mb-2 text-lg font-semibold">{category.name}</h3>

                <p className="mb-5 text-sm text-muted-foreground">
                  {category.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  Explore Studios
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
