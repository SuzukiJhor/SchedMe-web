import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Plus } from "lucide-react";

export default function BottomNav() {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `flex flex-col items-center justify-center ${
      pathname === path ? "text-blue-600" : "text-gray-500"
    }`;

  return (
    <nav className="h-16 bg-white shadow fixed bottom-0 left-0 right-0 flex justify-around items-center z-50">
      <Link to="/" className={linkClass("/")}>
        <Home size={24} />
        <span className="text-xs">Início</span>
      </Link>

      <Link to="/calendar" className={linkClass("/calendar")}>
        <Calendar size={24} />
        <span className="text-xs">Calendário</span>
      </Link>

      <Link to="/customers" className={linkClass("/agenda")}>
        <Plus size={28} />
        <span className="text-xs">Novo</span>
      </Link>

    </nav>
  );
}
