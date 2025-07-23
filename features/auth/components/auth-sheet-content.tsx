"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { githubLogin, googleLogin } from "@/lib/auth-actions";

export function AuthSheetContent() {
  return (
    <SheetContent
      side="bottom"
      className="h-60 flex flex-col justify-center items-center px-6 text-center space-y-6"
    >
      <SheetHeader className="max-w-xs">
        <SheetTitle className="text-lg sm:text-xl font-semibold text-foreground">
          Start Planning Trips
        </SheetTitle>
        <SheetDescription className="text-xs sm:text-sm text-muted-foreground">
          Please sign in using one of the following providers to continue.
        </SheetDescription>
      </SheetHeader>

      <div className="flex gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          onClick={googleLogin}
        >
          Sign in with Google
        </button>

        <button
          className="bg-gray-800 hover:bg-gray-900 text-white rounded-full px-5 py-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-600"
          onClick={githubLogin}
        >
          Sign in with GitHub
        </button>
      </div>
    </SheetContent>
  );
}
