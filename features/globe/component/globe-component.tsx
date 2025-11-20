"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, GlobeIcon, Users, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

export function GlobeComponent() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/trips");
        const data = await response.json();
        const locationsArray =
          data.transformedLocations as TransformedLocation[];

        setLocations(locationsArray);

        const countries = new Set(locationsArray.map((loc) => loc.country));
        setVisitedCountries(countries);
      } catch (err) {
        console.error("Error fetching locations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (globeRef.current) {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 2;
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full text-white">
                <GlobeIcon className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
              Your Travel Journey
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the world through your adventures. See all the amazing
              places you've visited on our interactive globe.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Globe Section */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl shadow-orange-500/10 overflow-hidden">
                <div className="p-8">
                  <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative flex justify-center items-center rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center h-full text-white">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                          <div
                            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-amber-500 rounded-full animate-spin animate-reverse"
                            style={{ animationDuration: "1.5s" }}
                          />
                        </div>
                        <p className="mt-4 text-lg font-medium">
                          Loading your journey...
                        </p>
                      </div>
                    ) : (
                      <Globe
                        ref={globeRef}
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        backgroundColor="rgba(0,0,0,0)"
                        pointColor={() => "#f97316"}
                        pointLabel="name"
                        pointsData={locations}
                        pointRadius={0.3}
                        pointAltitude={0.15}
                        pointsMerge={true}
                        atmosphereColor="#f97316"
                        atmosphereAltitude={0.15}
                      />
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Stats and Countries List */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-orange-500 to-amber-500 text-white border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <div>
                        <p className="text-2xl font-bold">
                          {visitedCountries.size}
                        </p>
                        <p className="text-sm opacity-90">Countries</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500 to-yellow-500 text-white border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <div>
                        <p className="text-2xl font-bold">{locations.length}</p>
                        <p className="text-sm opacity-90">Locations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Countries List */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-orange-500/10 sticky top-8">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg text-white">
                      <Users className="h-4 w-4" />
                    </div>
                    Countries Visited
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
                        <p className="text-sm text-gray-700">
                          {visitedCountries.size > 0 ? (
                            <>
                              <span>Amazing! You've explored </span>
                              <span className="font-bold text-orange-600">
                                {visitedCountries.size}
                              </span>{" "}
                              {visitedCountries.size === 1
                                ? "country"
                                : "countries"}{" "}
                              around the world.
                            </>
                          ) : (
                            <span>You haven't visited any country</span>
                          )}
                        </p>
                      </div>

                      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
                        {Array.from(visitedCountries)
                          .sort()
                          .map((country, index) => (
                            <div
                              key={index}
                              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-200 border border-transparent hover:border-orange-100 hover:shadow-md"
                            >
                              <div className="p-1.5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg text-white group-hover:scale-110 transition-transform duration-200">
                                <MapPin className="h-3 w-3" />
                              </div>
                              <span className="font-medium text-gray-700 group-hover:text-orange-700 transition-colors">
                                {country}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
