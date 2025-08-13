"use client"

import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { addLocation } from "../actions/add-location"
import { MapPin, Loader2 } from "lucide-react"

const NewLocationClient = ({ tripId }: { tripId: string }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/10 rounded-full blur-2xl"></div>
      </div>

      <div className="w-full max-w-md mx-auto px-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm p-8 shadow-2xl rounded-2xl border border-white/20">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4 shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Add New Location
            </h1>
            <p className="text-gray-600 mt-2">Add an exciting destination to your trip</p>
          </div>

          <form
            action={(formData: FormData) => startTransition(() => addLocation(formData, tripId))}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 cursor-pointer" htmlFor="address">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  Address or Location
                </div>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  placeholder="Enter address, landmark, or place name..."
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding Location...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Add Location
                </div>
              )}
            </Button>
          </form>

          {/* Decorative bottom element */}
          <div className="mt-6 pt-6 border-t border-gray-200/50">
            <p className="text-center text-sm text-gray-500">Your location will be added to the trip itinerary</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewLocationClient
