"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTrip } from "@/features/trip/actions/create-trip";
import { cn } from "@/lib/utils";
import React, { useTransition } from "react";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="max-w-lg mx-auto mt-10 px-4 sm:px-6 lg:max-w-xl lg:px-0">
      <Card>
        <CardHeader className="px-6 py-4 sm:px-8 lg:px-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            New Trip
          </h2>
        </CardHeader>

        <CardContent className="px-6 py-6 sm:px-8 lg:px-10">
          <form
            action={(formData: FormData) =>
              startTransition(() => {
                createTrip(formData);
              })
            }
            className="space-y-6"
          >
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Japan Trip"
                className={cn(
                  "w-full border border-r-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "text-sm sm:text-base"
                )}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Trip Description"
                className={cn(
                  "w-full border border-r-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "resize-y min-h-[88px] text-sm sm:text-base"
                )}
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className={cn(
                    "w-full border border-r-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                    "text-sm sm:text-base"
                  )}
                  required
                />
              </div>
              {/* End Date */}
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className={cn(
                    "w-full border border-r-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                    "text-sm sm:text-base"
                  )}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full px-4 py-3 text-base sm:text-lg font-semibold hover:cursor-pointer"
            >
              {isPending ? "Creating..." : "Add Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
