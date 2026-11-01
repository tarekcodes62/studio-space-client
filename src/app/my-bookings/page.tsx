import MyBookingsList from '@/components/bookings/MyBookingsList';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const BookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${session?.user.id}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const bookings = await res.json();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">YOUR BOOKINGS</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            My Bookings
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage and track all your studio reservations.
          </p>
        </div>

        <MyBookingsList bookings={bookings} />
      </div>
    </main>
  );
};

export default BookingsPage;
