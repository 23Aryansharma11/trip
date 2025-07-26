import React from "react";
import { Map as MapIcon } from "lucide-react";
import { githubLogin, googleLogin } from "@/lib/auth-actions";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className=" bg-gradient-to-b from-white to-blue-50 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Plan your perfect trip, every time
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Create itineraries, organize destinations, and share your travel
                plans all in one place.
              </p>

            </div>
          </div>
          {/* Decorative clipped background */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 bg-white"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
          />
        </section>

        {/* Features Section (single unified presentation) */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Plan with confidence
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature Item */}
              <FeatureCard
                icon={<MapIcon className="h-6 w-6 text-primary" />}
                title="Interactive Maps"
                description="Visualize your trip with interactive maps. See your entire itinerary at a glance."
                iconBg="bg-blue-100"
              />
              <FeatureCard
                icon={
                  <svg
                    className="h-6 w-6 text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Day-by-Day Itineraries"
                description="Organize your trip day by day. Never miss a beat with structured planning."
                iconBg="bg-amber-100"
              />
              <FeatureCard
                icon={
                  <svg
                    className="h-6 w-6 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L12 7" />
                    <path d="M15 5v4h4" />
                  </svg>
                }
                title="Drag & Drop Planning"
                description="Easily rearrange your itinerary with simple drag and drop functionality."
                iconBg="bg-green-100"
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-gray-800">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to plan your next adventure?
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Join thousands of travelers who plan better trips with
              TripPlanner.
            </p>
            <div className="flex gap-4 justify-center items-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                onClick={googleLogin}
              >
                Sign in with Google
              </button>

              <button
                className="bg-gray-800 hover:bg-gray-900 text-white rounded-full px-5 py-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-600"
                onClick={githubLogin}
              >
                Sign in with GitHub
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBg: string;
}) {
  return (
    <div className={`p-6 rounded-lg border border-gray-100 shadow-sm bg-white`}>
      <div
        className={`${iconBg} w-12 h-12 rounded-full flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
