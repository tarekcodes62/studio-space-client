'use client';

import Image from 'next/image';
import { CalendarDays, Clock, Wallet } from 'lucide-react';
import CancelBookingDialog from './CancelBookingDialog';

export interface Booking {
  _id: string;
  studioName: string;
  studioImage: string;
  bookingDate: string;
  startTime: string;
  duration: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

interface Props {
  bookings: Booking[];
}

const statusStyles = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const MyBookingsList = ({ bookings }: Props) => {
  if (!bookings.length) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-12 text-center dark:bg-gray-900">
        <CalendarDays className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
        <h2 className="text-xl font-semibold">No bookings found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You have not booked any studio yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {bookings.map(booking => (
        <div
          key={booking._id}
          className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md dark:bg-gray-900"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Studio Image */}
            <div className="relative h-52 w-full sm:h-auto sm:w-64 sm:shrink-0">
              <Image
                src={booking.studioImage}
                alt={booking.studioName}
                fill
                sizes="(max-width: 640px) 100vw, 256px"
                className="object-cover"
              />
            </div>

            {/* Booking Information */}
            <div className="flex flex-1 flex-col justify-between gap-5 p-5">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-bold">{booking.studioName}</h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Booking Date
                      </p>
                      <p className="text-sm font-medium">
                        {new Date(
                          `${booking.bookingDate}T00:00:00`,
                        ).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Start Time
                      </p>
                      <p className="text-sm font-medium">{booking.startTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">
                        {booking.duration} Hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 border-t pt-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="mt-1 flex items-center gap-1 text-xl font-bold">
                    <Wallet className="h-5 w-5 text-primary" />৳
                    {booking.totalPrice.toLocaleString('en-BD')}
                  </p>
                </div>

                {booking.status === 'Pending' && (
                  <CancelBookingDialog booking={booking} />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookingsList;
