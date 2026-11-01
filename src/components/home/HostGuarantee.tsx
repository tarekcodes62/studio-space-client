import { ShieldCheck, BadgeCheck, Camera, Headset } from 'lucide-react';
import Image from 'next/image';

const guarantees = [
  {
    title: 'Liability Protection',
    description:
      'Enjoy added peace of mind with clear booking policies and protection information.',
    icon: ShieldCheck,
  },
  {
    title: 'Verified Profiles',
    description:
      'Connect with creators and hosts through verified profile information.',
    icon: BadgeCheck,
  },
  {
    title: 'Equipment Safety',
    description:
      'Find spaces with equipment details and safety guidelines before booking.',
    icon: Camera,
  },
  {
    title: '24/7 Host Support',
    description:
      'Get assistance whenever you need help with your booking or studio experience.',
    icon: Headset,
  },
];

export default function HostGuarantee() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Your Creative Journey Matters
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Host Guarantee &{' '}
              <span className="text-primary">Creator Support</span>
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              We want every creator and host to feel confident. Explore our
              platform&apos;s safety information, booking guidelines, and
              support resources.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {guarantees.map(item => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon size={24} />
                    </div>

                    <h3 className="font-semibold">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <Image
                width={222}
                height={222}
                src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1000&q=85"
                alt="Professional creative studio"
                className="h-125 w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 max-w-xs rounded-2xl border border-border bg-card p-5 shadow-xl sm:-left-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Headset size={22} />
                </div>

                <div>
                  <h4 className="font-semibold">We&apos;re Here to Help</h4>
                  <p className="text-xs text-muted-foreground">
                    Support for your creative journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
