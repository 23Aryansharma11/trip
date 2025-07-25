"use client";

import { Location } from "@/app/generated/prisma";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface MapProps {
  itineraries: Location[];
}

export const Map = ({ itineraries }: MapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  if (loadError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-red-50 text-red-700 text-lg font-semibold p-6">
        Error loading maps
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-700 p-6 space-y-2">
        <svg
          className="animate-spin h-8 w-8 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-lg font-medium">Loading map...</span>
      </div>
    );
  }

  const center =
    itineraries.length > 0
      ? { lat: itineraries[0].lat, lng: itineraries[0].lng }
      : { lat: 0, lng: 0 };
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={8}
      center={center}
    >
      {itineraries.map((location, key) => (
        <Marker
          key={key}
          position={{ lat: location.lat, lng: location.lng }}
          title={location.locationTitle}
        />
      ))}
    </GoogleMap>
  );
};
