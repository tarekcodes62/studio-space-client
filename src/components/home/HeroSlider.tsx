'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    id: 1,
    subtitle: 'YOUR CREATIVE JOURNEY STARTS HERE',
    title: 'Find Your Space. Create Something Amazing.',
    description:
      'Discover inspiring photography studios, podcast rooms, and creative spaces designed to bring your ideas to life.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=90',
  },
  {
    id: 2,
    subtitle: 'A SPACE FOR EVERY CREATOR',
    title: 'Turn Your Creative Vision Into Reality.',
    description:
      'From professional photography studios to music recording rooms, find the perfect environment for your next project.',
    image:
      'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=2000&q=90',
  },
  {
    id: 3,
    subtitle: 'SHARE YOUR CREATIVE SPACE',
    title: 'Your Studio. Your Opportunity.',
    description:
      'List your creative space, connect with passionate creators, and turn your studio into a growing business.',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=90',
  },
];

export default function HeroSlider() {
  return (
    <section className="px-4 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="hero-swiper"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative flex min-h-[480px] items-center bg-cover bg-center px-6 py-16 sm:min-h-[550px] sm:px-12 lg:px-20"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* Content */}
                <div className="relative z-10 max-w-2xl text-white">
                  <p className="mb-5 text-xs font-bold tracking-[0.2em] text-amber-400 sm:text-sm">
                    {slide.subtitle}
                  </p>

                  <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mb-8 max-w-xl text-sm leading-7 text-gray-200 sm:text-base">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/studios"
                      className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-black transition hover:bg-amber-400"
                    >
                      Explore Studios
                      <ArrowRight size={18} />
                    </Link>

                    <Link
                      href="/studios"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
                    >
                      Host Your Space
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
