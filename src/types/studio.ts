export interface Studio {
  _id?: string;
  name: string;
  slug: string;
  category:
    | 'Photo Studios'
    | 'Sound Stages'
    | 'Podcast Rooms'
    | 'Music Suites'
    | 'Art Workshops';

  description: string;
  images: string[];

  hourlyRate: number;
  rating: number;
  totalReviews: number;

  location: {
    city: string;
    area: string;
    address: string;
  };

  specifications: {
    size: string;
    capacity: number;
    availableHours: string;
    equipment: string[];
  };

  amenities: string[];

  createdAt?: Date;
  updatedAt?: Date;
  host?: {
    name: string;
    email?: string;
    image?: string | null;
  };
}
