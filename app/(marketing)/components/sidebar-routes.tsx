"use client";

import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const guestRoutes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const SidebarRoutes = () => {
  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      <Image
        src="/logo.svg"
        width={50}
        height={50}
        alt="logo image"
        className="mb-8 mt-4 ml-4"
      />
      {routes.map((route) => (
        <SidebarItem key={route.href} label={route.label} href={route.href} />
      ))}
      <Button size="sm" variant="outline" className="w-28 mt-8 ml-4">
        <Link href="/sign-in">Login</Link>
      </Button>
    </div>
  );
};
