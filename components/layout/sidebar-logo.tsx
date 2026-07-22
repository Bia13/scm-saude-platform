"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import {
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

export function SidebarLogo() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <SidebarHeader
      className="
        h-16
        border-b
        px-3
      "
    >
      <button
        onClick={toggleSidebar}
        className="
          group
          flex
          h-full
          w-full
          items-center
          gap-3
          rounded-xl
          px-2
          transition-all
          hover:bg-muted/60
          group-data-[collapsible=icon]:justify-center
          group-data-[collapsible=icon]:px-0
        "
      >
        {/* Logo */}

        <div
          className="
            relative
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            bg-black
            text-white
          "
        >
          {/* Letra */}

          <span
            className="
              text-lg
              font-bold
              transition-all
              duration-200
              group-hover:scale-0
              group-hover:opacity-0
            "
          >
            S
          </span>

          {/* Hover */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              scale-75
              opacity-0
              transition-all
              duration-200
              group-hover:scale-100
              group-hover:opacity-100
            "
          >
            {state === "collapsed" ? (
              <PanelLeftOpen className="size-5" />
            ) : (
              <PanelLeftClose className="size-5" />
            )}
          </div>
        </div>

        {/* Texto */}

        <div className="group-data-[collapsible=icon]:hidden">
          <h1 className="text-base font-semibold tracking-tight">
            SCM Saúde
          </h1>

          <p className="text-xs text-muted-foreground">
            Platform
          </p>
        </div>
      </button>
    </SidebarHeader>
  );
}