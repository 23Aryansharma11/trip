import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Navbar() {
  const links = [
    {
      label: "Planner",
      href: "/trips",
    },
    {
      label: "Globe",
      href: "/globe",
    },
  ];
  return (
    <nav className="bg-background text-foreground border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image alt="logo" src="/logo.svg" width={30} height={30} />
          <span className="hidden md:inline text-2xl font-bold text-foreground">
            Trip
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary rounded transition-all duration-200"
                style={{ transitionProperty: "width" }}
              ></span>
            </Link>
          ))}
          <button>Sign In</button>
        </div>
      </div>
    </nav>
  );
}
