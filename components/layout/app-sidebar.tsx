"use client";

import { useRef, useState } from "react";

import { Sidebar } from "@/components/ui/sidebar";

import { SidebarLogo } from "./sidebar-logo";
import { SidebarSearch } from "./sidebar-search";
import { SidebarNav } from "./sidebar-nav";
import { SidebarUser } from "./sidebar-user";

export function AppSidebar() {
  const [search, setSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
    >
      <SidebarLogo />

      <SidebarSearch
        value={search}
        onChange={setSearch}
        inputRef={inputRef}
      />

      <SidebarNav search={search} />

      <SidebarUser />

    </Sidebar>
  );
}