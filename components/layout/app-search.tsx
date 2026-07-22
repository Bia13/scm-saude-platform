import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function AppSearch() {
  return (
    <div className="relative hidden md:block">

      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Pesquisar..."
        className="w-72 pl-9"
      />

    </div>
  );
}