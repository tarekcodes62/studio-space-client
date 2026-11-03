import EditStudioForm from '@/components/studios/EditStudioForm';
import { auth } from '@/lib/auth';
import { getTokenFromServer } from '@/lib/getTokenFromServer';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const EditStudioPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const token = await getTokenFromServer();

  // Get logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}?email=${encodeURIComponent(
      session.user.email,
    )}`,
    {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch studio');
  }

  const studio = await response.json();
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Edit Your Studio</h1>
          <p className="text-muted-foreground mt-1">
            Update your studio information and keep your listing up to date.
          </p>
        </div>
        <EditStudioForm studio={studio} />
      </div>
    </div>
  );
};

export default EditStudioPage;
