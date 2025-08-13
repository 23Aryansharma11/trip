import { auth } from "@/auth"
import { LoginError } from "@/features/auth/components/login-error"
import { TripDetailsClient } from "@/features/trip/components/trip-detail-client"
import { prisma } from "@/lib/prisma"
import { MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function TripDetails({
  params,
}: {
  params: Promise<{ tripId: string }>
}) {
  const session = await auth()
  if (!session) {
    return <LoginError />
  }

  const { tripId } = await params
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user?.id,
    },
    include: { locations: true },
  })

  if (!trip) {
    return (
      <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-orange-50 via-white to-amber-50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full opacity-10"></div>
        </div>

        {/* Large 404 background text */}
        <span
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none font-extrabold tracking-tight z-0"
          aria-hidden="true"
        >
          <span className="text-[14vw] bg-gradient-to-r from-orange-200 to-amber-200 bg-clip-text text-transparent opacity-30">
            404
          </span>
        </span>

        {/* Main content */}
        <div className="relative z-10 p-8 max-w-md mx-auto text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Trip Not Found
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Oops! The adventure you're looking for seems to have wandered off the map. It might have been removed or
            never existed.
          </p>

          {/* Action button */}
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Trips
          </Link>

          {/* Additional help text */}
          <p className="text-sm text-gray-500 mt-6">Need help? Check your trip list or create a new adventure.</p>
        </div>
      </div>
    )
  }

  return <TripDetailsClient trip={trip} />
}
