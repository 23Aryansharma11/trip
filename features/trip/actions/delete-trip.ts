"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deleteTrip(formData: FormData) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Not authenticated");
  }

  const tripId = formData.get("tripId")?.toString();

  if (!tripId) {
    throw new Error("Trip ID is required");
  }

  await prisma.trip.delete({
    where: { id: tripId },
  });
}
