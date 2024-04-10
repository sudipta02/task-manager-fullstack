import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoutes() {
  let auth = { token: true };
  if(!auth.token){
    toast.error("Please signin to access the dashboard");
  }
  return auth.token ? <Outlet /> : <Navigate to="/" state={{signin: "Please signin to access the dashboard"}}/>;
}
