"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { createTrip } from "@/features/trip/actions/create-trip";
import { UploadButton } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Create New Trip
          </h2>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={(formData: FormData) => {
              if (imageUrl) formData.append("imageUrl", imageUrl);
              startTransition(() => {
                createTrip(formData);
              });
            }}
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trip Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Tokyo Adventure 2025"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Exploring temples, neon lights, sushi bars and hidden alleys in Tokyo..."
                className="w-full border border-gray-300 px-3 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Image
              </label>

              {imageUrl ? (
                <div className="mb-4">
                  <Image
                    src={imageUrl}
                    alt="Trip Preview"
                    className="w-full max-h-56 rounded-md object-cover border"
                    width={600}
                    height={224}
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <Image
                    src="/placeholder.jpg"
                    alt="Trip Preview"
                    className="w-full max-h-56 rounded-md object-fit border"
                    width={600}
                    height={224}
                  />
                </div>
              )}

              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error: ", error);
                }}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className={cn(
                "w-full px-4 py-3 text-base sm:text-lg font-semibold transition-colors",
                isPending ? "cursor-not-allowed opacity-70" : "cursor-pointer"
              )}
            >
              {isPending ? "Creating..." : "Create Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
