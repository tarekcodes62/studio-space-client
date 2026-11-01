'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  LayoutDashboard,
  Plus,
  Building2,
  CalendarDays,
  LogOut,
} from 'lucide-react';

interface UserDropdownProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Add New Studio',
    href: '/add-studio',
    icon: Plus,
  },
  {
    title: 'My Studio Listings',
    href: '/my-listings',
    icon: Building2,
  },
  {
    title: 'My Bookings',
    href: '/my-bookings',
    icon: CalendarDays,
  },
];

export default function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || 'Logout failed');
        return;
      }

      toast.success('Logged out successfully');

      router.push('/');
      router.refresh();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <DropdownMenu>
      {/* User Avatar Trigger */}
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:bg-gray-800">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user.image || ''} alt={user.name} />

          <AvatarFallback>
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>

        <span className="hidden max-w-32 truncate text-sm font-medium sm:block">
          {user.name.split(' ')[0]}
        </span>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent align="end" className="w-60">
        {/* User Information */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-900 dark:text-white">
                {user.name}
              </span>

              <span className="truncate text-xs font-normal text-muted-foreground">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Navigation Items */}
        <DropdownMenuGroup>
          {menuItems.map(item => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <DropdownMenuItem
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`cursor-pointer ${
                  isActive
                    ? 'bg-amber-50 text-amber-600 focus:bg-amber-50 focus:text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                    : ''
                }`}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-500/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
