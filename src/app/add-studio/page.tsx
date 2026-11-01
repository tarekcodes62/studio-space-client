import AddStudioForm from '@/components/studios/AddStudioForm';
import { auth } from '@/lib/auth';
import { Camera } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const AddStudioPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-primary">
            <Camera size={22} />
            <span className="text-sm font-semibold">STUDIO MANAGEMENT</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            List Your Studio
          </h1>

          <p className="text-muted-foreground">
            Share your creative space with the community. Provide accurate
            details to attract more bookings.
          </p>
        </div>

        <AddStudioForm
          user={{
            name: session.user.name,
            email: session.user.email,
          }}
        />
      </div>
    </main>
  );
};

export default AddStudioPage;
