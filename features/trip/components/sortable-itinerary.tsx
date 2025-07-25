interface SortableItineraryProps {
  locations: Location[];
  tripId: string;
}

import { Location } from "@/app/generated/prisma";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useId, useState } from "react";
import { SortableItem } from "./sortable-item";
import { reorderItinerary } from "../actions/reorder-itinerary";

export const SortableItinerary = ({
  locations,
  tripId,
}: SortableItineraryProps) => {
  const id = useId();
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // there was some change
      const oldIndex = localLocation.findIndex((item) => item.id === active.id);
      const newIndex = localLocation.findIndex((item) => item.id === over!.id);

      const newLocationsOrder = arrayMove(
        localLocation,
        oldIndex,
        newIndex
      ).map((item, index) => ({ ...item, order: index }));
      setLocalLocation(newLocationsOrder);

      await reorderItinerary(
        tripId,
        newLocationsOrder.map((item) => item.id)
      );
    }
  };

  const [localLocation, setLocalLocation] = useState(locations);

  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={localLocation.map((loc) => loc.id)}
      >
        <div className="space-y-4">
          {localLocation.map((loc, key) => (
            <SortableItem key={key} item={loc} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
