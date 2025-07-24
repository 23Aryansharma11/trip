import NewLocationClient from "@/features/trip/components/new-location-client";

export default async function NewLocation({
  params,
}: {
  params: Promise<{
    tripId: string;
  }>;
}) {
  const { tripId } = await params;

  return <NewLocationClient tripId={tripId} />;
}
