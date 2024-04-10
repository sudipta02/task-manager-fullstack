import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  BellPlus,
  CheckCircle,
  Pencil,
  PlusSquare,
  Star,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMPORTANT, STATUSES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await fetch(`http://localhost:3000/tasks`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      return response.tasks;
    },
  });
}

export function TaskContainer() {
  const { status, data: tasks, error, isFetching } = useTasks();
  return (
    <div className="task-container">
      {status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        tasks.map((task) => (
          <Task
            title={task.title}
            description={task.description}
            createdOn={task.createdOn}
          />
        ))
      )}
      {<CreateTask />}
    </div>
  );
}

function Task({ title, description, createdOn }) {
  return (
    <div className="task-card rounded-lg opacity-85">
      <Card className="hover:bg-[#ffdcd0]">
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex justify-between">
              <div className="font-[Inter] font-light antialiased">{title}</div>
              <Star fill="#ffff89" strokeWidth={1.5} />
            </div>
          </CardTitle>
          <CardDescription className="text-gray-800 text-md font-[Nunito]">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="font-[Quicksand] pb-2">
          <div className="text-sm font-[Nunito]">Created on: {createdOn}</div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex justify-between w-full">
            <CheckCircle size={20} color="#cc8338" className="cursor-pointer" />
            <div className="flex">
              <Pencil size={20} className="mr-2" color="#4f4f51" />
              <Trash
                size={20}
                color="#4f4f51"
                className="cursor-pointer trash-icon"
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

const CreateTaskSchema = z.object({
  title: z.string().min(1, "Task is required").min(3, "3 characters minimum"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(3, "3 characters minimum"),
  status: z.string({ required_error: "Please select one status" }),
  important: z.string({ required_error: "Select important or not" }),
});

function CreateTask() {
  const [openDialog, setOpenDialog] = useState(false);
  const { TODO, INPROGRESS, DONE } = STATUSES;
  const { YES, NO } = IMPORTANT;
  const form = useForm({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: ({requestBody, token}) => {
      return fetch(`http://localhost:3000/tasks`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  });

  const onSubmit = (values, e) => {
    e.preventDefault();
    toast.loading("Waiting...");
    const { title, description, status, important } = values;
    const date = new Date();
    const createdOn = date.toISOString();
    const token = localStorage.getItem("token");
    const requestBody = {
      title,
      description,
      status,
      important,
      createdOn,
    };
    const { isError, isSuccess, error } = createTaskMutation;
    try {
      createTaskMutation.mutate({requestBody, token});

      if (isError) {
        toast.dismiss();
        toast.error(error.message);
      }
      if (isSuccess) {
        toast.dismiss();
        toast.success("Task created !");
      }
    } catch (err) {
      toast.dismiss();
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed");
      }
    }
    setOpenDialog(false);
    form.reset();
  };

  return (
    <div className="task-card rounded-lg opacity-70">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Edit Profile</Button> */}
          <Card className="h-full hover:bg-[#ffdcd0] hover:cursor-pointer">
            <CardContent className="h-full pt-6">
              <div className="flex flex-col items-center justify-center h-full">
                <PlusSquare size={32} strokeWidth={1.5} />
                <div className="font-[Inter]">Create a new task</div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new task</DialogTitle>
            <DialogDescription>
              Create new tasks here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Task title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your task here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="important"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Important</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="col-span-3" {...field}>
                            <SelectValue placeholder="Is this important?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={YES.value}>
                              {YES.label}
                            </SelectItem>
                            <SelectItem value={NO.value}>{NO.label}</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="col-span-3" {...field}>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={TODO.value}>
                              {TODO.label}
                            </SelectItem>
                            <SelectItem value={INPROGRESS.value}>
                              {INPROGRESS.label}
                            </SelectItem>
                            <SelectItem value={DONE.value}>
                              {DONE.label}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
    </div>
  );
}
