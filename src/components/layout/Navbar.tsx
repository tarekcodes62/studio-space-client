'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Aperture, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore Studios', href: '/studios' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About Us', href: '#about' },
];
interface NavbarProps {
  authMenu: React.ReactNode;
}

export default function Navbar({ authMenu }: NavbarProps) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/studios') return pathname.startsWith('/studios');
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-black">
            <Aperture size={25} />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Studio<span className="text-amber-500">Space</span>
            </h1>
            <p className="text-[10px] font-medium tracking-widest text-gray-500 dark:text-gray-400">
              CREATIVE MARKETPLACE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive(link.href)
                  ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-amber-600 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          {/* dark and lite mode */}
          <ThemeToggle />
          {authMenu}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-gray-700 dark:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white px-5 py-5 dark:border-gray-800 dark:bg-gray-950 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  isActive(link.href)
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-3 flex gap-3 border-t pt-4 dark:border-gray-800">
              {authMenu}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
