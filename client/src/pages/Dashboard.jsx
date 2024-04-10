import { jwtDecode } from "jwt-decode";
import { Navbar } from "../components/Navbar";
import { TaskContainer } from "../components/TaskContainer";
import { TaskContext } from "@/state/contexts";
import { useState } from "react";

export function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const token = localStorage.getItem("token");
  let user;
  if (token) {
    user = jwtDecode(token);
  }
  console.log(reminders);
  return (
    <TaskContext.Provider value={{ reminders, setReminders }}>
      <div>
        <Navbar />
        <TaskContainer />
      </div>
    </TaskContext.Provider>
  );
}
