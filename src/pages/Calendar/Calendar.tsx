import { ChevronLeft, ChevronRight, Home, Calendar as CalendarLucide, ClipboardList, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Calendar() {
  const days = [
    { day: 22, status: "Livre" },
    { day: 23, status: "Livre" },
    { day: 24, status: "Ocupado" },
    { day: 25, status: "Livre" },
    { day: 26, status: "Livre" },
    { day: 27, status: "Ocupado" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* HEADER */}
      <header className="flex items-center justify-between px-4 pt-10 pb-4 bg-white">
        <h1 className="text-2xl font-semibold">Calendário</h1>
      </header>

      {/* SELETOR DE MÊS */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-sm">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <p className="font-semibold text-lg">Abril 2024</p>

        <Button variant="ghost" size="icon">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* GRID DO CALENDÁRIO */}
      <main className="flex-1 px-4 py-4">
        <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
          <span>Dom</span>
          <span>Seg</span>
          <span>Ter</span>
          <span>Qua</span>
          <span>Qui</span>
          <span>Sex</span>
          <span>Sáb</span>
        </div>

        {/* Grade dos dias */}
        <div className="grid grid-cols-7 gap-2 text-center">

          {/* Espaços em branco até o primeiro dia da semana */}
          <span></span>
          <span></span>
          <span></span>

          {days.map((d) => (
            <DayCell key={d.day} day={d.day} status={d.status} />
          ))}

        </div>
      </main>

      {/* BOTTOM NAV */}
      <nav className="h-16 bg-white border-t flex items-center justify-around">
        <NavItem icon={Home} label="Início" />
        <NavItem icon={CalendarLucide} label="Calendário" active />
        <NavItem icon={ClipboardList} label="Reservas" />
        <NavItem icon={User} label="Perfil" />
      </nav>
    </div>
  );
}

/* CÉLULA DO CALENDÁRIO */
function DayCell({ day, status }: { day: number; status: "Livre" | "Ocupado" }) {
  const isToday = day === 24;

  return (
    <Card
      className={`
        rounded-xl p-2 text-sm cursor-pointer 
        ${isToday ? "bg-blue-500 text-white" : "bg-white"}
      `}
    >
      <p className="font-semibold">{day}</p>
      {!isToday && (
        <p
          className={`text-xs ${
            status === "Livre" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </p>
      )}
      {isToday && <p className="text-white text-xs">Hoje</p>}
    </Card>
  );
}

/* BOTTOM TAB */
function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <button className="flex flex-col items-center gap-1 text-xs">
      <Icon className={`w-5 h-5 ${active ? "text-blue-500" : "text-gray-400"}`} />
      <span className={active ? "text-blue-500 font-medium" : "text-gray-400"}>
        {label}
      </span>
    </button>
  );
}
