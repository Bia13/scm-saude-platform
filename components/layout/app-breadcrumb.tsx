"use client";

import { usePathname } from "next/navigation";

export function AppBreadcrumb() {
  const pathname = usePathname();

  const page =
    pathname.split("/").filter(Boolean).pop() ?? "dashboard";

  return (
    <div className="capitalize font-medium">
      {page}
    </div>
  );
}