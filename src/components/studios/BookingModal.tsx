'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { getTokenFromClient } from '@/lib/getTokenFromClient';

interface BookingModalProps {
  id: string;
  studioName: string;
  hourlyRate: number;
  image: string;
  name: string;
}

export default function BookingModal({
  studioName,
  hourlyRate,
  image,
  name,
  id,
}: BookingModalProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('1');

  const totalPrice = hourlyRate * Number(duration);
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookingData = {
      userId: session?.user.id,
      studioId: id,
      studioName: name,
      studioImage: image,
      bookingDate: date,
      startTime: startTime,
      duration: duration,
      totalPrice: totalPrice,
      status: 'Pending',
      createdAt: new Date(),
    };
    const token = await getTokenFromClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success('Booking successful!');
      router.push('/my-bookings');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          onClick={() => {
            if (!session?.user) {
              router.push(
                `/sign-in?callbackURL=${encodeURIComponent(window.location.pathname)}`,
              );
            }
          }}
          className="w-full bg-amber-500 text-white hover:bg-amber-600"
        >
          Book Workspace Now
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Your Workspace</DialogTitle>
          <DialogDescription>
            Select your preferred date and time for {studioName}.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleBooking}>
          <div className="space-y-2">
            <Label htmlFor="booking-date">Booking Date</Label>
            <Input
              id="booking-date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start-time">Start Time</Label>
            <Input
              id="start-time"
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (Hours)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="12"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              required
            />
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between text-sm">
              <span>Hourly Rate</span>
              <span>৳{hourlyRate.toLocaleString('en-BD')}</span>
            </div>

            <div className="mt-2 flex justify-between font-semibold">
              <span>Estimated Total</span>
              <span>৳{totalPrice.toLocaleString('en-BD')}</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!date || !startTime || Number(duration) < 1}
            className="w-full bg-amber-500 text-white hover:bg-amber-600"
          >
            Continue to Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
