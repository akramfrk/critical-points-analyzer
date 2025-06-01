"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { Home, MessageSquare, User } from "lucide-react";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-5 w-5 sm:h-4 sm:w-4" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <User className="h-5 w-5 sm:h-4 sm:w-4" />,
    },
    {
      name: "Purpose",
      link: "/purpose",
      icon: <MessageSquare className="h-5 w-5 sm:h-4 sm:w-4" />,
    },
  ];
  
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
