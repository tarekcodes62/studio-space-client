import {
  Search,
  Clock,
  CalendarCheck,
  Clapperboard,
  ArrowRight,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discover Spaces',
    description:
      'Explore unique studios and find the perfect creative space for your project.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Select Shoot Hours',
    description:
      'Choose your preferred date, available time slots, and booking duration.',
    icon: Clock,
  },
  {
    number: '03',
    title: 'Book Instantly',
    description:
      'Confirm your booking with a simple and secure reservation process.',
    icon: CalendarCheck,
  },
  {
    number: '04',
    title: 'Create & Produce',
    description:
      'Show up, get creative, and bring your ideas to life in your chosen studio.',
    icon: Clapperboard,
  },
];

export default function HowBookingWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Simple Process
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            How Booking Works
          </h2>

          <p className="mt-4 text-muted-foreground">
            Booking your perfect creative space is easier than ever. Just follow
            these four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon size={28} />
                    </div>

                    <span className="text-3xl font-bold text-muted-foreground/30">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>

                  <p className="text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                {index !== steps.length - 1 && (
                  <ArrowRight className="absolute -right-6 top-1/2 hidden -translate-y-1/2 text-primary lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
