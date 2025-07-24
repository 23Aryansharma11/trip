"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { addLocation } from "../actions/add-location";

const NewLocationClient = ({ tripId }: { tripId: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl text-center font-bold">Add new Location</h1>

          <form
            action={(formData: FormData) =>
              startTransition(() => addLocation(formData, tripId))
            }
            className="space-y-4"
          >
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-0"
              />
            </div>
            <Button type="submit" className="cursor-pointer w-full">
              {isPending ? "Adding..." : "Add Location"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLocationClient;
