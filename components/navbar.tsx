"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { AuthSheetContent } from "@/features/auth/components/auth-sheet-content";
import { Session } from "next-auth";
import { logout } from "@/lib/auth-actions";

export function Navbar({ session }: { session: Session | null }) {
  const links = [
    { label: "Planner", href: "/trips" },
    { label: "Globe", href: "/globe" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu function for reuse
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-background text-foreground border-b border-border shadow-sm max-h-16">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image alt="logo" src="/logo.svg" width={30} height={30} />
          <span className="hidden md:inline text-2xl font-bold text-foreground">
            Trip
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-medium text-foreground transition-colors duration-200 hover:text-primary"
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary rounded transition-all duration-200 group-hover:w-full"
                style={{ transitionProperty: "width" }}
              />
            </Link>
          ))}

          {session ? (
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className=" cursor-pointer"
            >
              Sign Out
            </Button>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="sm" className=" cursor-pointer">
                  Get Started
                </Button>
              </SheetTrigger>
              <AuthSheetContent />
            </Sheet>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-ring rounded"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6 text-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav Links */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-medium text-foreground hover:text-primary"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="w-full cursor-pointer"
                variant="default"
                size="sm"
                onClick={closeMobileMenu}
              >
                Get Started
              </Button>
            </SheetTrigger>
            <AuthSheetContent />
          </Sheet>
        </div>
      )}
    </nav>
  );
}
