import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bell, BellPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskContext } from "@/state/contexts";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

export function Reminders() {
  const reminders = useSelector((state) => state.reminder);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div variant="outline" className="w-full flex items-center">
          <Bell color="#1e1919" size={23} className="ml-2" />
          <span className="text-2xl font-[Inter] ml-4">
            Reminders
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your reminders</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {reminders.map((r) => (
          <ReminderCard note={r.note} />
        ))}
      </DialogContent>
    </Dialog>
  );
}

function ReminderCard({ note }) {
  return (
    <Card className="hover:bg-[#ffd6d0]">
      <CardContent className="font-[Quicksand] pb-2 font-bold">{note}</CardContent>
    </Card>
  );
}
