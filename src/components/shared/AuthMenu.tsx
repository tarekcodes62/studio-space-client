import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

import Link from 'next/link';
import UserDropdown from './UserDropdown';

export default async function AuthMenu() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // User is not authenticated
  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/sign-in"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Sign In
        </Link>

        <Link
          href="/sign-up"
          className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-600"
        >
          Register
        </Link>
      </div>
    );
  }

  // User is authenticated
  return (
    <UserDropdown
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
    />
  );
}
