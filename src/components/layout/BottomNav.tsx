import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Plus } from "lucide-react";

export default function BottomNav() {
  const { pathname } = useLocation();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="h-16 bg-gray-900 shadow-md fixed bottom-0 left-0 right-0 flex justify-around items-center z-50"  style={{ backgroundColor: "var(--color-secondary)" }}>
      
      {/* INÍCIO */}
      <Link to="/" className="flex flex-col items-center justify-center">
        <Home
          color={isActive("/") ? "var(--color-primary)" : "var(--color-surface)"}
          size={24}
        />
      </Link>

      {/* CALENDÁRIO */}
      <Link to="/calendar" className="flex flex-col items-center justify-center">
        <Calendar
          color={isActive("/calendar") ? "var(--color-primary)" : "var(--color-surface)"}
          size={24}
        />
      </Link>

      {/* NOVO */}
      <Link to="/customers" className="flex flex-col items-center justify-center">
        <Plus
          color={isActive("/customers") ?"var(--color-primary)" : "var(--color-surface)"}
          size={28}
        />
      </Link>

    </nav>
  );
}
