"use client";
import Link from "next/link";
import { Logo } from "@/app/(marketing)/components/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BookOpen, Menu, TextCursor } from "lucide-react";
import { SheetContent, Sheet, SheetTrigger } from "@/components/ui/sheet";
import { SidebarRoutes } from "./sidebar-routes";
import Image from "next/image";

export const Navbar = () => {
  const resources = [
    {
      name: "Blog",
      description: "Get a better understanding of your traffic",
      href: "/blog",
      icon: BookOpen,
      color: "bg-orange-100/50",
      hoverColor: "hover:bg-orange-100/50",
      iconColor: "text-orange-600",
    },
    {
      name: "Engagement",
      description: "Speak directly to your customers",
      href: "#",
      icon: TextCursor,
      color: "bg-sky-100/50",
      hoverColor: "hover:bg-sky-100/50",
      iconColor: "text-blue-600",
    },
  ];

  const product = [
    {
      name: "Blog",
      description: "Get a better understanding of your traffic",
      href: "#",
      icon: BookOpen,
      color: "bg-orange-100/50",
      hoverColor: "hover:bg-orange-100/50",
      iconColor: "text-orange-600",
    },
    {
      name: "Engagement",
      description: "Speak directly to your customers",
      href: "#",
      icon: TextCursor,
      color: "bg-sky-100/50",
      hoverColor: "hover:bg-sky-100/50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="fixed z-50 top-0 w-full h-14 px-4  bg-white flex items-center">
      <Link href="/">
        <img src="/logo.svg" alt="image" className="md:hidden" />
      </Link>
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="md:hidden">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent className="bg-white flex flex-col justify-between px-0">
                <SidebarRoutes />

                <Link href="/contact" className="mx-6">
                  <button
                    type="submit"
                    className={` w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    Get in Touch
                  </button>
                </Link>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center ml-4 text-sm">
            {/* }
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-black bg-transparent px-2 font-normal mx-4">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className=" p-2 md:w-[400px] ">
                      <li className="flex flex-col">
                        {product.map((item) => (
                          <div
                            key={item.name}
                            className={`group relative flex gap-x-6 rounded-lg p-4 ${item.hoverColor}`}
                          >
                            <div className={`mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white  ${item.color}`}>
                              <item.icon className={`h-6 w-6 ${item.iconColor}`} aria-hidden="true" />
                            </div>
                            <div>
                              <a href={item.href} className="font-semibold text-gray-900">
                                {item.name}
                                <span className="absolute inset-0" />
                              </a>
                              <p className="text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}

                      </li>

                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
                        */}

            <Link href="/pricing" className="ml-12">
              Pricing
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-black bg-transparent px-2 font-normal mx-4">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className=" p-2 md:w-[400px] ">
                      <li className="flex flex-col">
                        {resources.map((item) => (
                          <div
                            key={item.name}
                            className={`group relative flex gap-x-6 rounded-lg p-4 ${item.hoverColor}`}
                          >
                            <div
                              className={`mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white  ${item.color}`}
                            >
                              <item.icon
                                className={`h-6 w-6 ${item.iconColor}`}
                                aria-hidden="true"
                              />
                            </div>
                            <div>
                              <a
                                href={item.href}
                                className="font-semibold text-gray-900"
                              >
                                {item.name}
                                <span className="absolute inset-0" />
                              </a>
                              <p className="text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/contact">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button size="sm" className="bg-blue-600">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
