import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ClipboardList, Menu } from "lucide-react";
import { SearchInput } from "./Search";
import { Filter } from "./Filter";
import { LoggedInUser } from "./LoggedInUser";
import { Separator } from "./ui/separator";

import { CreateReminder } from "./reminder/createReminder";
import { Reminders } from "./reminder/reminders";

export function Navbar() {
  return (
    <div className="flex items-center justify-between h-16 px-3 rounded-lg navbar">
      <div className="flex">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="bg-[#ffd6d0] border border-solid border-[#d0aaaa]"
            >
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="!bg-[#f7caca] drawer-menu">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="border-b-2">
                <DrawerTitle>
                  <div className="logo-menu">Task Manager</div>
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-4 hover:bg-[#ffd6d0] cursor-pointer">
                <DrawerClose asChild>
                  <div variant="outline" className="w-full flex items-center">
                    <ClipboardList color="#1e1919" size={23} className="ml-2" />
                    <span className="text-2xl font-[Inter] ml-4">
                      All tasks
                    </span>
                  </div>
                </DrawerClose>
              </div>
              {/* <Separator className="h-1"/> */}
              <div className="p-4 hover:bg-[#ffd6d0] cursor-pointer">
                <DrawerClose asChild>
                  <CreateReminder />
                </DrawerClose>
              </div>
              {/* <Separator className="h-1"/> */}
              <div className="p-4 hover:bg-[#ffd6d0] cursor-pointer">
                <DrawerClose asChild>
                  <Reminders />
                </DrawerClose>
              </div>
              {/* <Separator /> */}
            </div>
            <DrawerFooter>hi there</DrawerFooter>
          </DrawerContent>
        </Drawer>
        <div className="logo ml-4 ">Task Manager</div>
      </div>
      <div className="flex">
        <SearchInput />
        <Filter />
      </div>
      <LoggedInUser />
    </div>
  );
}
