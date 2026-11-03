import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import {
  Building2,
  CalendarDays,
  Clock,
  DollarSign,
  Plus,
  ArrowUpRight,
  MapPin,
  ChevronRight,
  Camera,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import { getTokenFromServer } from '@/lib/getTokenFromServer';

type DashboardData = {
  stats: {
    totalStudios: number;
    totalBookings: number;
    pendingBookings: number;
    totalEarnings: number;
  };
  recentBookings: {
    _id: string;
    userId: string;
    studioId: string;
    studioName: string;
    studioImage: string;
    bookingDate: string;
    startTime: string;
    duration: string;
    totalPrice: number;
    status: string;
  }[];
  recentStudios: {
    _id: string;
    name: string;
    category: string;
    hourlyRate: number;
    images: string[];
    location: {
      city: string;
      area: string;
      address: string;
    };
  }[];
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const statusStyle: Record<string, string> = {
  Confirmed:
    'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400',
  Pending:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400',
  Cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  Completed: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const token = await getTokenFromServer();

  if (!session?.user) redirect('/sign-in');

  const params = new URLSearchParams({
    email: session.user.email,
    userId: session.user.id,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard?${params}`,
    { cache: 'no-store', headers: { Authorization: `Bearer ${token}` } },
  );

  if (!res.ok) {
    throw new Error('Failed to load dashboard data');
  }

  const data: DashboardData = await res.json();

  const stats = [
    {
      title: 'Total Studios',
      value: data.stats.totalStudios,
      icon: Building2,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'Total Bookings',
      value: data.stats.totalBookings,
      icon: CalendarDays,
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      title: 'Pending Bookings',
      value: data.stats.pendingBookings,
      icon: Clock,
      color: 'bg-amber-500/10 text-amber-500',
    },
    {
      title: 'Total Earnings',
      value: `৳${data.stats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500/10 text-green-500',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-4 py-8 text-gray-900 transition-colors dark:bg-[#111315] dark:text-gray-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Workspace / Dashboard
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard Overview
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Welcome back, {session.user.name}!
            </p>
          </div>

          <Link
            href="/add-studio"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#242424] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <Plus size={18} />
            Add New Studio
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(stat => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors dark:border-[#292d30] dark:bg-[#1a1d20]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>

                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                </div>

                <h2 className="mt-5 text-3xl font-bold">{stat.value}</h2>

                <p className="mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <TrendingUp size={14} />
                  Live database statistics
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'Add New Studio',
                description: 'List your creative space',
                href: '/add-studio',
                icon: Plus,
              },
              {
                title: 'My Listings',
                description: 'Manage your studios',
                href: '/my-listings',
                icon: Building2,
              },
              {
                title: 'My Bookings',
                description: 'Manage reservations',
                href: '/my-bookings',
                icon: CalendarDays,
              },
            ].map(item => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-400 dark:border-[#292d30] dark:bg-[#1a1d20] dark:hover:border-gray-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-[#f4f1eb] p-3 text-gray-800 dark:bg-[#292d30] dark:text-gray-200">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold">{item.title}</h3>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-gray-400 transition group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent Bookings */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Recent Bookings</h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Latest reservations for your studios
              </p>
            </div>

            <Link
              href="/my-bookings"
              className="flex items-center gap-1 text-sm font-semibold hover:underline"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-[#292d30] dark:bg-[#1a1d20]">
            <table className="w-full min-w-187.5 text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-gray-500 dark:border-[#292d30] dark:bg-[#222629] dark:text-gray-400">
                <tr>
                  {[
                    'Studio',
                    'Customer ID',
                    'Booking Date',
                    'Amount',
                    'Status',
                  ].map(title => (
                    <th key={title} className="px-5 py-4 font-medium">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-[#292d30]">
                {data.recentBookings.length ? (
                  data.recentBookings.map(booking => (
                    <tr
                      key={booking._id}
                      className="transition hover:bg-gray-50 dark:hover:bg-[#222629]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            width={44}
                            height={44}
                            src={booking.studioImage}
                            alt={booking.studioName}
                            className="h-11 w-11 rounded-lg object-cover"
                          />

                          <span className="font-semibold">
                            {booking.studioName}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                        {booking.userId.slice(-8)}
                      </td>

                      <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                        {formatDate(booking.bookingDate)}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        ৳{Number(booking.totalPrice).toLocaleString()}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            statusStyle[booking.status] ||
                            'bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-gray-500 dark:text-gray-400"
                    >
                      No bookings found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Studios */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Recent Studio Listings</h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Your recently added creative spaces
              </p>
            </div>

            <Link
              href="/my-listings"
              className="flex items-center gap-1 text-sm font-semibold hover:underline"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {data.recentStudios.length ? (
              data.recentStudios.map(studio => (
                <div
                  key={studio._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors dark:border-[#292d30] dark:bg-[#1a1d20]"
                >
                  <div className="relative h-48 bg-gray-100 dark:bg-[#292d30]">
                    {studio.images?.[0] ? (
                      <Image
                        width={400}
                        height={192}
                        src={studio.images[0]}
                        alt={studio.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Camera size={35} className="text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {studio.category}
                    </p>

                    <h3 className="mt-2 font-bold">{studio.name}</h3>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-[#292d30]">
                      <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin size={15} />
                        {studio.location?.city || 'Location unavailable'}
                      </span>

                      <span className="font-bold">
                        ৳{studio.hourlyRate.toLocaleString()}/hr
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-[#292d30] dark:bg-[#1a1d20] sm:col-span-2">
                <Building2 className="mx-auto text-gray-400" size={35} />

                <h3 className="mt-3 font-semibold">No studios yet</h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Start by listing your first creative space.
                </p>

                <Link
                  href="/add-studio"
                  className="mt-4 inline-block rounded-lg bg-black px-5 py-2 text-sm text-white dark:bg-white dark:text-black"
                >
                  Add Studio
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
