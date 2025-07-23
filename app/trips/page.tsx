import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TripsPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px] text-foreground text-center p-6">
        <p className="text-lg font-medium">
          You are not logged in yet. Please sign in to access your trips and
          planning tools.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div>
        <h1>Dashboard</h1>
        <Link href="/trips/new">
          <Button>New Trip</Button>
        </Link>
      </div>
    </div>
  );
}
