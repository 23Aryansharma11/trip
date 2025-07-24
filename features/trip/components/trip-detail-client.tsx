"use client";
import { Trip } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Calendar, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface TripDetailClientProps {
  trip: Trip;
}

export const TripDetailsClient = ({ trip }: TripDetailClientProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {trip.imageUrl && (
        <div className="w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg relative">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        </div>
      )}

      <div className="bg-white p-6 shadow rounded-l-2xl  flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {trip.title}
          </h1>

          <div className="flex items-center text-gray-500 mt-2">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="text-lg">
              {new Date(trip.startDate).toLocaleDateString()} -{" "}
              <span className="text-lg">
                {new Date(trip.endDate).toLocaleDateString()}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Add Location
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-l-2xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 ">
            <TabsTrigger
              className="text-lg w-32 hover:cursor-pointer text-center"
              value="overview"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              className="text-lg w-32 hover:cursor-pointer text-center"
              value="itinerary"
            >
              Itinerary
            </TabsTrigger>
            <TabsTrigger
              className="text-lg w-32 hover:cursor-pointer text-center"
              value="map"
            >
              Map
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="">
                <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-6 w-6 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700">Dates</p>
                      <p className="text-sm text-gray-500 ">
                        {new Date(trip.startDate).toLocaleDateString()} -
                        {new Date(trip.endDate).toLocaleDateString()}
                        <br />
                        {`${Math.round(
                          (trip.endDate.getTime() - trip.startDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}`}{" "}
                        day(s).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start"></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
