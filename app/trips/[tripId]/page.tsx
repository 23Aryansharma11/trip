import { auth } from "@/auth";
import { LoginError } from "@/features/auth/components/login-error";
import { TripDetailsClient } from "@/features/trip/components/trip-detail-client";
import { prisma } from "@/lib/prisma";

export default async function TripDetails({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const session = await auth();
  if (!session) {
    return <LoginError />;
  }

  const { tripId } = await params;
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user?.id,
    },
  });
  if (!trip) {
    return (
      <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background overflow-hidden">
        <span
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none font-extrabold tracking-tight z-0"
          aria-hidden="true"
        >
          <span className="text-[14vw] text-foreground/5 dark:text-foreground/10">
            404
          </span>
        </span>

        <div className="relative z-10 p-8 rounded-xl text-center">
          <h1 className="text-2xl font-bold mb-2 text-foreground">
            Trip not found
          </h1>
          <p className="text-muted-foreground text-lg">
            The trip you’re looking for does not exist or was removed.
          </p>
        </div>
      </div>
    );
  }

  return <TripDetailsClient trip={trip} />;
}
