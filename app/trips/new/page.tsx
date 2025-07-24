"use client";

import React, { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTrip } from "@/features/trip/actions/create-trip";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [fileUploadPending, setFileUploadPending] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>("/placeholder.jpg");
  const uploadRef = useRef<HTMLDivElement>(null);

  const handleImageClick = () => {
    const input = uploadRef.current?.querySelector(
      "input[type='file']"
    ) as HTMLElement;
    if (input) input.click();
  };

  return (
    <div className="max-w-lg mx-auto mt-10 px-4 sm:px-6 lg:max-w-4xl lg:px-0">
      <Card>
        <CardHeader className="px-6 py-4 sm:px-8 lg:px-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Log a New Trip
          </h2>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground">
            Fill in the trip details and upload a cover image.
          </p>
        </CardHeader>

        <CardContent className="px-6 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT: Form Section */}
            <form
              action={(formData: FormData) => {
                if (imageUrl !== "/placeholder.jpg" && imageUrl)
                  formData.append("imageUrl", imageUrl);
                startTransition(() => {
                  createTrip(formData);
                });
              }}
              className="space-y-6 flex-1"
            >
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm sm:text-base font-bold text-gray-600 sm:mb-1.5"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Japan Trip"
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm sm:text-base font-bold text-gray-600 sm:mb-1.5"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Trip Description"
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[88px] text-sm sm:text-base"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm sm:text-base font-bold text-gray-600 sm:mb-1.5"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm sm:text-base font-bold text-gray-600 sm:mb-1.5"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* UploadButton (Hidden) */}
              <div ref={uploadRef} className="hidden">
                <UploadButton
                  endpoint="imageUploader"
                  onUploadBegin={() => setFileUploadPending(true)}
                  onClientUploadComplete={(res) => {
                    if (res && res[0].ufsUrl) {
                      setImageUrl(res[0].ufsUrl);
                    }
                    setFileUploadPending(false);
                  }}
                  onUploadError={(error: Error) => {
                    console.error(error);
                    setFileUploadPending(false);
                  }}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending || fileUploadPending}
                className={cn(
                  "w-full px-4 py-3 text-base sm:text-lg font-semibold transition-colors",
                  (isPending || fileUploadPending) &&
                    "cursor-not-allowed opacity-70"
                )}
              >
                {fileUploadPending
                  ? "Uploading Image..."
                  : isPending
                  ? "Creating..."
                  : "Add Trip"}
              </Button>
            </form>

            {/* RIGHT: Image Preview Section */}
            {imageUrl && imageUrl !== "null" && (
              <div
                className="cursor-pointer group flex-1 flex justify-center lg:items-start"
                onClick={handleImageClick}
              >
                <Image
                  src={imageUrl}
                  alt="Trip Preview"
                  width={400}
                  height={300}
                  className="rounded-lg shadow object-cover max-w-full h-auto lg:w-[300px]"
                  priority={false}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
