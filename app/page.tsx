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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="h-4 w-4 fill-current" />
                Trusted by 50,000+ travelers worldwide
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-800 to-amber-700 bg-clip-text text-transparent leading-tight">
                Craft unforgettable journeys with ease
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Transform your travel dreams into perfectly organized
                adventures. Plan, collaborate, and explore with the most
                intuitive trip planning platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={googleLogin}
                >
                  Start Planning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Free forever plan
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Setup in {"<"}1 minute
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 max-w-6xl mx-auto px-4">
            <div className="relative">
              <Image
                width={1000}
                height={1000}
                src="/dashboard.png"
                alt="TripCraft Dashboard Preview"
                className="w-full rounded-2xl shadow-2xl border border-gray-200 z-50"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl z-40"></div>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200 rounded-full opacity-20 animate-pulse delay-1000 z-40"></div>
        </section>
        {/* Social Proof Section */}

        {/* Call to Action Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your next adventure awaits
            </h2>
            <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-3xl mx-auto">
              Join over 50,000 travelers who've discovered the joy of
              stress-free trip planning. Start crafting your perfect journey
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={googleLogin}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-4 text-lg font-semibold rounded-full border-2 border-orange-300 text-orange-100 hover:bg-orange-500 hover:text-white transition-all duration-300 bg-transparent"
                onClick={githubLogin}
              >
                Sign in with GitHub
              </Button>
            </div>
            <p className="text-orange-200 mt-6 text-sm">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>

          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-40 h-40 bg-orange-400 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-amber-400 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-300 rounded-full"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <MapIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TripCraft</span>
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
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
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
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
