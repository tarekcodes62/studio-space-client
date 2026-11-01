'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StudioGalleryProps {
  images: string[];
  name: string;
}

export default function StudioGallery({ images, name }: StudioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images?.length) {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl bg-muted">
        No images available
      </div>
    );
  }

  const previousImage = () => {
    setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      <div className="relative h-[350px] overflow-hidden rounded-2xl md:h-[480px]">
        <Image
          src={images[activeIndex]}
          alt={name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow"
            >
              <ChevronRight />
            </button>
          </>
        )}

        <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 ${
                activeIndex === index
                  ? 'border-amber-500'
                  : 'border-transparent'
              }`}
            >
              <Image
                src={image}
                alt={`${name} image ${index + 1}`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
