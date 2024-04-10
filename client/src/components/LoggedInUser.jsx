import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function LoggedInUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border border-solid border-[#d0aaaa] rounded-md h-12 px-1 py-2 bg-[#ffd6d0]"
        >
          <div className="flex">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* <div className="ml-2">
              <div className="text-left">username</div>
              <div className="text-gray-700 text-xs">
                sudipta.sundar95@gmail.com
              </div>
            </div> */}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border border-solid border-[#d0aaaa] rounded-md">
        <DropdownMenuLabel>User details</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#d0aaaa]" />
        <DropdownMenuItem>username</DropdownMenuItem>
        <DropdownMenuItem>sudipta.sundar95@gmail.com</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
