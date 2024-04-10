import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchInput() {
  return (
    <div className="relative ml-5 border border-solid border-[#d0aaaa] rounded-md mr-2">
      <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground bg-[#ffd6d0]" />
      <Input placeholder="Search" className="pl-8 w-60 bg-[#ffd6d0] placeholder:text-black" />
    </div>
  );
}
