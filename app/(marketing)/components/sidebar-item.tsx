"use client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";

interface SidebarItemProps {
  label: string;
  href: string;
}

export const SidebarItem = ({ label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <SheetClose>
      <button
        onClick={onClick}
        type="button"
        className={cn(
          " w-full flex justify-center items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:bg-slate-300/20",
          isActive &&
            "text-custom-color font-bold bg-sky-200/20 hover:bg-sky-200/20",
        )}
      >
        <div className="flex items-center gap-x-2 py-4">{label}</div>{" "}
        <div
          className={cn(
            "ml-auto opacity-0 border-2 border-custom-color mr-4 h-full transition-all",
            isActive && "opacity-100",
          )}
        />
      </button>
    </SheetClose>
  );
};
