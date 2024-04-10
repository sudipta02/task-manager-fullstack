import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { SignInForm } from "../components/SignInForm";
import { SignUpForm } from "../components/SignUpForm";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); //if true, show signin card, else show signup card
  const isDesktop = useMediaQuery("(min-width: 992px)");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location?.state?.signin){
      toast.dismiss();
      toast.error(location?.state?.signin);
    }
  },[]);

  return (
    <div
      className={cn(
        isDesktop
          ? "flex items-center justify-evenly h-full"
          : "flex flex-col items-center"
      )}
    >
      <p
        className={cn(
          isDesktop
            ? "text-balance catch-line w-[450px]"
            : "text-balance catch-line-mobile text-center my-10"
        )}
      >
        The ultimate task manager app to make you productive
      </p>
      {isLogin ? (
        <SignInForm setIsLogin={setIsLogin} />
      ) : (
        <SignUpForm setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Login;
