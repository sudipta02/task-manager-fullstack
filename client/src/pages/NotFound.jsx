import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <div className="font-[Quicksand] text-2xl">
        Sorry, the page you were looking for was not found.
      </div>
      <Link to={"/"}>
        <Button className="w-full mt-6 bg-pink-950 hover:bg-pink-800">
          Return to home
        </Button>
      </Link>
    </div>
  );
}
