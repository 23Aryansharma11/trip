import React from "react";

export const LoginError = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background overflow-hidden">
      <span
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none font-extrabold tracking-tight z-0"
        aria-hidden="true"
      >
        <span className="text-[14vw] text-foreground/5 dark:text-foreground/10">
          Sign In
        </span>
      </span>

      {/* Foreground sign-in message */}
      <div className="relative z-10 p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-foreground">
          Please Sign In
        </h1>
        <p className="text-muted-foreground text-lg">
          You need to be signed in to access this page.
        </p>
      </div>
    </div>
  );
};
