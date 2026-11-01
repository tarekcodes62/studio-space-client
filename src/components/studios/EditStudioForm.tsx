'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  Loader2,
  Camera,
  MapPin,
  ImagePlus,
  Settings2,
  UserRound,
  Building2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface Studio {
  _id: string;
  name: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  location: {
    city: string;
    area: string;
    address: string;
  };
  images: string[];
  amenities: string[];
  description: string;
  specifications: {
    size: string;
    capacity: number;
    availableHours: string;
    equipment: string[];
  };
  host: {
    name: string;
    email: string;
    image?: string;
  };
}

interface Props {
  studio: Studio;
}

const categories = [
  'Photo Studios',
  'Podcast Rooms',
  'Music Suites',
  'Art Workshops',
  'Sound Stages',
];

const availableAmenities = [
  'Wi-Fi',
  'Air Conditioning',
  'Parking',
  'Soundproof',
  'Lighting Equipment',
  'Makeup Room',
  'Restroom',
  'Kitchen',
  'Waiting Room',
];

const EditStudioForm = ({ studio }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [amenities, setAmenities] = useState<string[]>(studio.amenities || []);

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setAmenities(prev =>
      checked ? [...prev, amenity] : prev.filter(item => item !== amenity),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const category = String(formData.get('category') || '');

    const images = String(formData.get('images') || '')
      .split('\n')
      .map(url => url.trim())
      .filter(Boolean);

    const equipment = String(formData.get('equipment') || '')
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);

    const studioData = {
      name: String(formData.get('name') || ''),
      category,
      categorySlug: category.toLowerCase().replaceAll(' ', '-'),

      hourlyRate: Number(formData.get('hourlyRate')),
      securityDeposit: Number(formData.get('securityDeposit')),

      location: {
        city: String(formData.get('city') || ''),
        area: String(formData.get('area') || ''),
        address: String(formData.get('address') || ''),
      },

      images,
      amenities,

      description: String(formData.get('description') || ''),

      specifications: {
        size: String(formData.get('size') || ''),
        capacity: Number(formData.get('capacity')),
        availableHours: String(formData.get('availableHours') || ''),
        equipment,
      },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${studio._id}?email=${encodeURIComponent(
          studio.host.email,
        )}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studioData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update studio');
      }

      toast.success('Studio updated successfully!');

      router.push('/my-listings');
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  const sectionClass = 'space-y-5 rounded-2xl border bg-card p-5 sm:p-7';

  const labelClass = 'text-sm font-medium';

  return (
    <div className="mx-auto max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Host Information */}
        <section className={sectionClass}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <UserRound size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Host Information</h2>
              <p className="text-sm text-muted-foreground">
                Your account information
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className={labelClass}>Host Name</label>
              <Input value={studio.host.name} readOnly />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Host Email</label>
              <Input value={studio.host.email} readOnly />
            </div>
          </div>
        </section>

        {/* Basic Information */}
        <section className={sectionClass}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Building2 size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Studio Information</h2>
              <p className="text-sm text-muted-foreground">
                Basic details about your studio
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className={labelClass}>
              Studio Name
            </label>

            <Input
              id="name"
              name="name"
              defaultValue={studio.name}
              placeholder="e.g. Urban Portrait Studio"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className={labelClass}>
              Studio Category
            </label>

            <select
              id="category"
              name="category"
              required
              defaultValue={studio.category}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="" disabled>
                Select studio category
              </option>

              {!categories.includes(studio.category) && (
                <option value={studio.category}>{studio.category}</option>
              )}

              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="hourlyRate" className={labelClass}>
                Hourly Rate
              </label>

              <Input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                min="1"
                defaultValue={studio.hourlyRate}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="securityDeposit" className={labelClass}>
                Security Deposit
              </label>

              <Input
                id="securityDeposit"
                name="securityDeposit"
                type="number"
                min="0"
                defaultValue={studio.securityDeposit ?? 0}
                required
              />
            </div>
          </div>
        </section>

        {/* Location */}
        <section className={sectionClass}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <MapPin size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Studio Location</h2>
              <p className="text-sm text-muted-foreground">
                Where is your studio located?
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="city" className={labelClass}>
                City
              </label>

              <Input
                id="city"
                name="city"
                defaultValue={studio.location.city}
                placeholder="Dhaka"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="area" className={labelClass}>
                Area
              </label>

              <Input
                id="area"
                name="area"
                defaultValue={studio.location.area}
                placeholder="Gulshan"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className={labelClass}>
              Full Address
            </label>

            <Input
              id="address"
              name="address"
              defaultValue={studio.location.address}
              placeholder="Road 45, Gulshan 2, Dhaka"
              required
            />
          </div>
        </section>

        {/* Specifications */}
        <section className={sectionClass}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Settings2 size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Studio Specifications</h2>
              <p className="text-sm text-muted-foreground">
                Space, capacity and availability
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="size" className={labelClass}>
                Studio Size
              </label>

              <Input
                id="size"
                name="size"
                defaultValue={studio.specifications.size}
                placeholder="900 sq ft"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="capacity" className={labelClass}>
                Maximum Capacity
              </label>

              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                defaultValue={studio.specifications.capacity}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="availableHours" className={labelClass}>
              Available Hours
            </label>

            <Input
              id="availableHours"
              name="availableHours"
              defaultValue={studio.specifications.availableHours}
              placeholder="10 AM - 9 PM"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="equipment" className={labelClass}>
              Studio Equipment
            </label>

            <Textarea
              id="equipment"
              name="equipment"
              defaultValue={studio.specifications.equipment.join(', ')}
              placeholder="DSLR Camera, Softbox Lighting, Tripod"
              rows={3}
              required
            />

            <p className="text-xs text-muted-foreground">
              Separate each equipment with a comma.
            </p>
          </div>
        </section>

        {/* Images */}
        <section className={sectionClass}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <ImagePlus size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Studio Images</h2>
              <p className="text-sm text-muted-foreground">
                Update your studio images
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="images" className={labelClass}>
              Image URLs
            </label>

            <Textarea
              id="images"
              name="images"
              defaultValue={studio.images.join('\n')}
              placeholder={`https://example.com/studio-1.jpg
https://example.com/studio-2.jpg`}
              rows={4}
              required
            />

            <p className="text-xs text-muted-foreground">
              Add one image URL per line.
            </p>
          </div>
        </section>

        {/* Amenities */}
        <section className={sectionClass}>
          <div>
            <h2 className="text-lg font-semibold">Studio Amenities</h2>

            <p className="text-sm text-muted-foreground">
              Select all facilities available in your studio.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {availableAmenities.map(amenity => (
              <label
                key={amenity}
                className="flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm transition-colors hover:bg-muted"
              >
                <Checkbox
                  checked={amenities.includes(amenity)}
                  onCheckedChange={checked =>
                    handleAmenityChange(amenity, checked === true)
                  }
                />

                {amenity}
              </label>
            ))}
          </div>
        </section>

        {/* Description */}
        <section className={sectionClass}>
          <div>
            <h2 className="text-lg font-semibold">Detailed Overview</h2>

            <p className="text-sm text-muted-foreground">
              Tell visitors what makes your studio special.
            </p>
          </div>

          <Textarea
            name="description"
            defaultValue={studio.description}
            placeholder="Describe your studio, facilities, atmosphere and ideal uses..."
            rows={6}
            required
          />
        </section>

        {/* Submit */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="sm:flex-1"
            disabled={loading}
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <Button type="submit" className="sm:flex-1" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Studio...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Update Studio
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditStudioForm;
