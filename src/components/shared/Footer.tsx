import Link from 'next/link';
import { Camera, ArrowRight, Mail } from 'lucide-react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';

import { FaXTwitter } from 'react-icons/fa6';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore Studios', href: '/studios' },
  { name: 'Add Your Studio', href: '/add-studio' },
  { name: 'About Us', href: '#about' },
];

const categories = [
  'Photo Studios',
  'Podcast Rooms',
  'Music Suites',
  'Art Workshops',
  'Sound Stages',
];

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 pt-14 pb-8">
        {/* Main Footer */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Camera size={22} />
              </div>
              <span className="text-xl font-bold">StudioSpace</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
              Discover, create, and share inspiring spaces. We connect creative
              minds with the perfect studios to bring their ideas to life.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                className="rounded-full border p-2.5 transition hover:bg-primary hover:text-primary-foreground"
              >
                <FaFacebookF size={18} />
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="rounded-full border p-2.5 transition hover:bg-primary hover:text-primary-foreground"
              >
                <FaInstagram size={18} />
              </Link>

              <Link
                href="https://x.com"
                target="_blank"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border text-lg font-semibold transition hover:bg-primary hover:text-primary-foreground"
              >
                <FaXTwitter size={18} />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                className="rounded-full border p-2.5 transition hover:bg-primary hover:text-primary-foreground"
              >
                <FaLinkedinIn size={18} />
              </Link>

              <Link
                href="https://youtube.com"
                target="_blank"
                aria-label="YouTube"
                className="rounded-full border p-2.5 transition hover:bg-primary hover:text-primary-foreground"
              >
                <FaYoutube size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold text-lg">Quick Links</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 font-semibold text-lg">Popular Categories</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {categories.map(category => (
                <li key={category}>
                  <Link
                    href="/studios"
                    className="transition hover:text-primary"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 font-semibold text-lg">Stay Connected</h3>

            <p className="mb-4 text-sm leading-6 text-muted-foreground">
              Subscribe to our newsletter for updates, creative inspiration, and
              exclusive offers.
            </p>

            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-center text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition hover:text-primary">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-primary">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
