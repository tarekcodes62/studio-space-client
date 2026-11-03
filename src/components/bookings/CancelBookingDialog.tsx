'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, X } from 'lucide-react';
import { toast } from 'sonner';

import { Booking } from './MyBookingsList';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { getTokenFromClient } from '@/lib/getTokenFromClient';

interface Props {
  booking: Booking;
}

const CancelBookingDialog = ({ booking }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    const token = await getTokenFromClient();
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}/cancel`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to cancel booking');
      }

      toast.success('Booking cancelled successfully');

      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <button className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700">
          Cancel Booking
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md rounded-2xl p-6">
        {/* Close Button */}
        <AlertDialogCancel
          disabled={loading}
          className="absolute right-4 top-4 h-8 w-8 rounded-full border-0 bg-transparent p-0 shadow-none hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>

        <AlertDialogHeader>
          <div className="flex items-start gap-3 pr-7">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div className="space-y-1 text-left">
              <AlertDialogTitle className="text-lg font-bold">
                Confirm Booking Cancellation
              </AlertDialogTitle>

              <p className="text-xs font-semibold text-rose-600">
                Irreversible Action
              </p>
            </div>
          </div>

          <AlertDialogDescription className="pt-4 text-left text-sm leading-6">
            Are you sure you want to cancel your booking for{' '}
            <span className="font-bold text-foreground">
              &quot;{booking.studioName}&quot;
            </span>
            ? This booking will be marked as Cancelled.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 flex-row justify-end gap-3">
          <AlertDialogCancel disabled={loading} className="mt-0">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={event => {
              event.preventDefault();
              handleCancel();
            }}
            className="bg-rose-600 text-white shadow-lg shadow-rose-600/20 hover:bg-rose-700"
          >
            {loading ? 'Cancelling...' : 'Cancel Booking'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelBookingDialog;
