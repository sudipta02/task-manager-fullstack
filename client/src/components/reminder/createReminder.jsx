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
import { Input } from "@/components/ui/input";
import { BellPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskContext } from "@/state/contexts";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { addReminder } from "@/state/slices/reminderSlice";

export function CreateReminder() {
  const dispatch = useDispatch();
  const { setReminders } = useContext(TaskContext);
  const reminderForm = useForm({
    resolver: zodResolver(CreateReminderSchema),
    defaultValues: {
      note: "",
      time: "18:00",
    },
  });

  const onSubmit = async (inputReminder) => {
    // setReminders((prev) => {
    //     let prevReminders = prev;
    //     prevReminders.push(inputReminder);
    //     return prevReminders;
    // })
    dispatch(addReminder());
    reminderForm.reset();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div variant="outline" className="w-full flex items-center">
          <BellPlus color="#1e1919" size={23} className="ml-2" />
          <span className="text-2xl font-[Inter] ml-4">
            Create a reminder
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a reminder</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...reminderForm}>
          <form
            onSubmit={reminderForm.handleSubmit(onSubmit)}
            className="w-full"
          >
            <div className="space-y-2">
              <FormField
                control={reminderForm.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your reminder note"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={reminderForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>When to remind you</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full mt-6 bg-pink-950 hover:bg-pink-800"
              type="submit"
            >
              Save task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const CreateReminderSchema = z.object({
  note: z.string().min(1, "Task is required").min(3, "3 characters minimum"),
  time: z.string(),
});
