"use client";

import type React from "react";
import {
  MapIcon,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { githubLogin, googleLogin } from "@/lib/auth-actions";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="z-10 relative mx-auto px-4 container">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 bg-orange-100 mb-6 px-4 py-2 rounded-full font-medium text-orange-700 text-sm">
                <Star className="fill-current w-4 h-4" />
                Trusted by travelers worldwide
              </div>
              <h1 className="bg-clip-text bg-gradient-to-r from-gray-900 via-orange-800 to-amber-700 mb-6 font-bold text-transparent text-5xl md:text-7xl leading-tight">
                Craft unforgettable journeys with ease
              </h1>
              <p className="mx-auto mb-10 max-w-3xl text-gray-600 text-xl md:text-2xl leading-relaxed">
                Transform your travel dreams into perfectly organized
                adventures. Plan, collaborate, and explore with the most
                intuitive trip planning platform.
              </p>
              <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 hover:from-orange-600 to-amber-500 hover:to-amber-600 shadow-lg hover:shadow-xl px-8 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300"
                  onClick={googleLogin}
                >
                  Start Planning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="flex justify-center items-center gap-8 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Free forever plan
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Setup in {"<"}1 minute
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mx-auto mt-16 px-4 max-w-6xl">
            <div className="relative">
              <Image
                width={1000}
                height={1000}
                src="/dashboard.png"
                alt="TripCraft Dashboard Preview"
                className="z-50 shadow-2xl border border-gray-200 rounded-2xl w-full"
                priority
              />
              <div className="z-40 absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Background Elements */}
          <div className="top-20 left-10 absolute bg-orange-200 opacity-20 rounded-full w-20 h-20 animate-pulse"></div>
          <div className="right-10 bottom-20 z-40 absolute bg-amber-200 opacity-20 rounded-full w-32 h-32 animate-pulse delay-1000"></div>
        </section>
        {/* Social Proof Section */}

        {/* Call to Action Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-20 md:py-32 overflow-hidden">
          <div className="z-10 relative mx-auto px-4 text-center container">
            <h2 className="mb-6 font-bold text-white text-4xl md:text-6xl">
              Your next adventure awaits
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-orange-100 text-xl md:text-2xl">
              Join over 50,000 travelers who've discovered the joy of
              stress-free trip planning. Start crafting your perfect journey
              today.
            </p>
            <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 hover:from-orange-600 to-amber-500 hover:to-amber-600 shadow-lg hover:shadow-xl px-10 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300"
                onClick={googleLogin}
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent hover:bg-orange-500 px-10 py-4 border-2 border-orange-300 rounded-full font-semibold text-orange-100 hover:text-white text-lg transition-all duration-300"
                onClick={githubLogin}
              >
                Sign in with GitHub
              </Button>
            </div>
            <p className="mt-6 text-orange-200 text-sm">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>

          {/* Background Elements */}
          <div className="top-0 left-0 absolute opacity-10 w-full h-full">
            <div className="top-20 left-20 absolute bg-orange-400 rounded-full w-40 h-40"></div>
            <div className="right-20 bottom-20 absolute bg-amber-400 rounded-full w-60 h-60"></div>
            <div className="top-1/2 left-1/2 absolute bg-orange-300 rounded-full w-80 h-80 -translate-x-1/2 -translate-y-1/2 transform"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="mx-auto px-4 container">
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex justify-center items-center bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg w-8 h-8">
                <MapIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-xl">TripCraft</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-orange-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-gray-800 border-t text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} TripCraft. All rights reserved. Made
            with ❤️ for travelers.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: string;
}) {
  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-8 text-center">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto text-white group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h3 className="mb-4 font-bold text-gray-900 text-2xl">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
