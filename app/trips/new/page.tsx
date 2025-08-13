"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { createTrip } from "@/features/trip/actions/create-trip"
import { UploadButton } from "@/utils/uploadthing"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Calendar, MapPin, Camera, Sparkles } from "lucide-react"

export default function NewTrip() {
  const [isPending, startTransition] = useTransition()
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Plan Your Adventure
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Trip</h1>
          <p className="text-gray-600">Turn your travel dreams into reality</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <form
              className="space-y-8"
              action={(formData: FormData) => {
                if (imageUrl) formData.append("imageUrl", imageUrl)
                startTransition(() => {
                  createTrip(formData)
                })
              }}
            >
              {/* Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  Trip Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Tokyo Adventure 2025"
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Exploring temples, neon lights, sushi bars and hidden alleys in Tokyo..."
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl resize-none focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
                  rows={4}
                  required
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-900 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-900 bg-white"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <Camera className="w-4 h-4 text-orange-500" />
                  Trip Image
                </label>

                <div className="relative">
                  {imageUrl ? (
                    <div className="relative group">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt="Trip Preview"
                        className="w-full h-64 rounded-2xl object-cover border-2 border-gray-200 shadow-lg"
                        width={600}
                        height={256}
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <p className="text-white font-medium">Change Image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-64 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-orange-500" />
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 font-medium">Upload a trip image</p>
                        <p className="text-gray-500 text-sm">Make your trip memorable with a beautiful photo</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res[0].ufsUrl) {
                          setImageUrl(res[0].ufsUrl)
                        }
                      }}
                      onUploadError={(error: Error) => {
                        console.error("Upload error: ", error)
                      }}
                      className="ut-button:bg-orange-500 ut-button:hover:bg-orange-600 ut-button:focus:ring-orange-400 ut-button:rounded-xl ut-button:font-semibold ut-button:transition-all ut-button:duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className={cn(
                  "w-full px-6 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200",
                  isPending ? "cursor-not-allowed opacity-70 transform-none" : "cursor-pointer",
                )}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Your Trip...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Create Trip
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
