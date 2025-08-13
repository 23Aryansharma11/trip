"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { AuthSheetContent } from "@/features/auth/components/auth-sheet-content";
import { Session } from "next-auth";
import { githubLogin, googleLogin, logout } from "@/lib/auth-actions";
import { MapIcon, Menu, X } from "lucide-react";

export function Navbar({ session }: { session: Session | null }) {
  const links = [
    { label: "Planner", href: "/trips" },
    { label: "Globe", href: "/globe" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="border-b border-orange-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <MapIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TripCraft</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="group relative text-gray-600 font-medium transition-colors hover:text-orange-600"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 rounded transition-all group-hover:w-full" />
              </a>
            ))}

            {session ? (
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300"
              >
                Sign Out
              </Button>
            ) : (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 bg-transparent"
                  >
                    Sign In
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-2xl py-4">
                  <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold text-gray-900">Welcome to TripCraft</h2>
                      <p className="text-gray-600">Sign in to start planning your next adventure</p>
                    </div>

                    <div className="space-y-4 w-full max-w-sm">
                      <Button
                        onClick={googleLogin}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                        size="lg"
                      >
                        Continue with Google
                      </Button>
                      <Button
                        onClick={githubLogin}
                        variant="outline"
                        className="w-full border-gray-300 hover:bg-gray-50 bg-transparent"
                        size="lg"
                      >
                        Continue with GitHub
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm border-t border-orange-100 shadow-lg z-50 px-4 py-6 space-y-4">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={closeMobileMenu}
                className="block text-gray-600 font-medium hover:text-orange-600 py-2 transition-colors"
              >
                {label}
              </a>
            ))}

            <div className="pt-4 border-t border-orange-100 space-y-3">
              {session ? (
                <Button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      googleLogin();
                      closeMobileMenu();
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                    size="sm"
                  >
                    Sign in with Google
                  </Button>
                  <Button
                    onClick={() => {
                      githubLogin();
                      closeMobileMenu();
                    }}
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50"
                    size="sm"
                  >
                    Sign in with GitHub
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
