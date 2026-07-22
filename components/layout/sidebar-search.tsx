"use client";

import { RefObject } from "react";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/ui/sidebar";

type SidebarSearchProps = {
  value: string;
  onChange: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

export function SidebarSearch({
  value,
  onChange,
  inputRef,
}: SidebarSearchProps) {
  const { state, toggleSidebar } = useSidebar();

  function handleOpenSearch() {
    if (state === "collapsed") {
      toggleSidebar();

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });

      return;
    }

    inputRef.current?.focus();
  }

  return (
    <>
      {state === "collapsed" ? (
        <div className="border-b p-3 flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={handleOpenSearch}
          >
            <Search className="size-5" />
          </Button>
        </div>
      ) : (
        <div className="border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

            <Input
              ref={inputRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Pesquisar..."
              className="pl-9"
            />
          </div>
        </div>
      )}
    </>
  );
}