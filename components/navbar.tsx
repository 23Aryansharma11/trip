"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { AuthSheetContent } from "@/features/auth/components/auth-sheet-content";
import { Session } from "next-auth";
import { logout } from "@/lib/auth-actions";

export function Navbar({ session }: { session: Session | null }) {
  const links = [
    { label: "Planner", href: "/trips" },
    { label: "Globe", href: "/globe" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-background text-foreground border-b border-border shadow-sm z-50 relative">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <Image alt="logo" src="/logo.svg" width={30} height={30} />
          <span className="hidden md:inline text-2xl font-bold">Trip</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="group relative text-foreground font-medium transition-colors hover:text-primary"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary rounded transition-all group-hover:w-full" />
            </Link>
          ))}

          {session ? (
            <Button onClick={logout} variant="outline" size="sm">
              Sign Out
            </Button>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="sm">
                  Get Started
                </Button>
              </SheetTrigger>
              <AuthSheetContent />
            </Sheet>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-t border-border shadow-md z-50 px-4 py-6 space-y-4">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMobileMenu}
              className="block text-foreground font-medium hover:text-primary"
            >
              {label}
            </Link>
          ))}

          {session ? (
            <Button
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Sign Out
            </Button>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="sm" className="w-full">
                  Get Started
                </Button>
              </SheetTrigger>
              <AuthSheetContent />
            </Sheet>
          )}
        </div>
      )}
    </nav>
  );
}
