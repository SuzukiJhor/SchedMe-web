import { Calendar, Home, Settings, User, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-[#faf5ff]">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 pt-10 pb-4 bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-[#86198f]">Espaço de Lazer</h1>

        <Button
          size="icon"
          variant="ghost"
          className="rounded-full bg-[#86198f] text-white hover:bg-[#5a078f]"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 space-y-4">

        {/* CARD — Próxima Reserva */}
        <Card className="shadow-sm rounded-2xl border-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-600">Próxima reserva</p>
              <h2 className="text-xl font-semibold text-[#86198f]">João da Silva</h2>
              <p className="text-gray-500 text-sm">24 de abril de 2024</p>
            </div>

            <div className="bg-[#86198f] p-4 rounded-2xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        {/* BOTÃO — Nova Reserva */}
        <Button className="w-full h-14 bg-[#86198f] rounded-2xl text-white text-lg font-semibold hover:bg-[#5a078f]" onClick={() => alert('Funcionalidade de nova reserva em desenvolvimento')}>
          + Nova Reserva
        </Button>

        {/* LISTA — Próximas datas */}
        <Card className="shadow-sm rounded-2xl border-none">
          <CardContent className="p-4 space-y-2">
            <p className="font-medium text-gray-700 mb-2">Próximas datas</p>

            <Row date="25 de abril" status="Livre" />
            <Row date="26 de abril" status="Ocupado" />
            <Row date="27 de abril" status="Livre" />
          </CardContent>
        </Card>
      </main>

      {/* BOTTOM NAV */}
      <nav className="h-16 bg-white border-t flex items-center justify-around shadow-sm">
        <NavItem icon={Home} label="Início" active />
        <NavItem icon={Calendar} label="Calendário" />
        <NavItem icon={ClipboardList} label="Reservas" />
        <NavItem icon={User} label="Perfil" />
      </nav>

    </div>
  );
}

/* COMPONENTE DE LINHA DE DATAS */
function Row({ date, status }: { date: string; status: "Livre" | "Ocupado" }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700">{date}</span>
      <span
        className={
          status === "Livre"
            ? "text-green-600 font-medium"
            : "text-red-600 font-medium"
        }
      >
        {status}
      </span>
    </div>
  );
}

/* COMPONENTE DO NAV BOTTOM */
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
      <Icon
        className={`w-5 h-5 ${
          active ? "text-[#86198f]" : "text-gray-400"
        }`}
      />
      <span
        className={
          active ? "text-[#86198f] font-medium" : "text-gray-400"
        }
      >
        {label}
      </span>
    </button>
  );
}
