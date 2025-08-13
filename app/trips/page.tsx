import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginError } from "@/features/auth/components/login-error"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { MapPin, Calendar, Plus, Plane, Clock, CheckCircle } from "lucide-react"

export default async function TripsPage() {
  const session = await auth()
  if (!session) {
    return <LoginError />
  }

  const trips = await prisma.trip.findMany({
    where: {
      userId: session?.user?.id,
    },
  })

  const sortedTrips = [...trips].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingTrips = sortedTrips.filter((trip) => new Date(trip.startDate) >= today)

  const pastTrips = sortedTrips.filter((trip) => new Date(trip.endDate) < today)

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: start.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    }

    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.getDate()}, ${end.getFullYear()}`
    }

    return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`
  }

  const getTripStatus = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start > today) return "upcoming"
    if (end < today) return "completed"
    return "ongoing"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-orange-800 bg-clip-text text-transparent">
              Your Travel Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Plan, track, and relive your adventures</p>
          </div>
          <Link href="/trips/new">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Trip
            </Button>
          </Link>
        </div>

        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Plane className="h-6 w-6" />
              </div>
              Welcome back, {session.user?.name}!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-100 text-lg">
              {trips.length === 0
                ? "Ready to start your first adventure? Click the button above to begin planning!"
                : `You have ${trips.length} ${trips.length === 1 ? "trip" : "trips"} planned. ${
                    upcomingTrips.length > 0
                      ? `${upcomingTrips.length} upcoming adventure${upcomingTrips.length === 1 ? "" : "s"} await!`
                      : "Time to plan your next getaway!"
                  }`}
            </p>

            {trips.length > 0 && (
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-200" />
                  <span className="text-orange-100">{upcomingTrips.length} Upcoming</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-200" />
                  <span className="text-orange-100">{pastTrips.length} Completed</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trips Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your Adventures</h2>
          </div>

          {trips.length === 0 ? (
            <Card className="border-2 border-dashed border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-6">
                  <Plane className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No trips yet</h3>
                <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                  Your next great adventure is just a click away. Start planning and create memories that will last a
                  lifetime.
                </p>
                <Link href="/trips/new">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Trip
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTrips.slice(0, 6).map((trip, key) => {
                const status = getTripStatus(trip.startDate, trip.endDate)
                const statusConfig = {
                  upcoming: {
                    color: "bg-blue-100 text-blue-800",
                    icon: Clock,
                    label: "Upcoming",
                    gradient: "from-blue-500 to-cyan-500",
                  },
                  ongoing: {
                    color: "bg-green-100 text-green-800",
                    icon: Plane,
                    label: "In Progress",
                    gradient: "from-green-500 to-emerald-500",
                  },
                  completed: {
                    color: "bg-gray-100 text-gray-800",
                    icon: CheckCircle,
                    label: "Completed",
                    gradient: "from-gray-500 to-slate-500",
                  },
                }

                const config = statusConfig[status]
                const StatusIcon = config.icon

                return (
                  <Link href={`/trips/${trip.id}`} key={key}>
                    <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-0 shadow-lg bg-white">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="line-clamp-1 text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {trip.title}
                          </CardTitle>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color} flex items-center gap-1`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 line-clamp-2 leading-relaxed">{trip.description}</p>

                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Calendar className="h-4 w-4 text-orange-500" />
                          {formatDateRange(trip.startDate, trip.endDate)}
                        </div>

                        {/* Progress bar for visual interest */}
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-300`}
                            style={{
                              width: status === "completed" ? "100%" : status === "ongoing" ? "60%" : "20%",
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Show More Button if there are more than 6 trips */}
        {trips.length > 6 && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 rounded-full px-8 bg-transparent"
            >
              View All {trips.length} Trips
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
