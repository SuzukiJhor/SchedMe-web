import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Plus } from "lucide-react";

export default function BottomNav() {
  const { pathname } = useLocation();
  console.log(pathname);
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="h-16 bg-gray-dark shadow fixed bottom-0 left-0 right-0 flex justify-around items-center z-50">
      
      {/* INÍCIO */}
      <Link to="/" className="flex flex-col items-center justify-center">
        <Home
          color={isActive("/") ? "#86198f" : "#9CA3AF"}
          size={24}
        />
      </Link>

      {/* CALENDÁRIO */}
      <Link to="/calendar" className="flex flex-col items-center justify-center">
        <Calendar
          color={isActive("/calendar") ? "#86198f" : "#9CA3AF"}
          size={24}
        />

      </Link>

      {/* NOVO */}
      <Link to="/customers" className="flex flex-col items-center justify-center">
        <Plus
          color={isActive("/customers") ? "#86198f" : "#9CA3AF"}
          size={28}
        />
      </Link>

    </nav>
  );
}
