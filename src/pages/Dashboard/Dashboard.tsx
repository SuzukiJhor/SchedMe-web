import { Button } from "@/components/ui/button";
import { Calendar, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <Card className="p-4 space-y-6">

      <Button
        size="icon"
        variant="ghost"
        className="bg-orange text-white hover:bg-orange/80 rounded-full"
      >
        <Settings className="w-5 h-5" />
      </Button>

      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-700">Próxima reserva</p>
          <h2 className="text-lg font-semibold">João da Silva</h2>
          <p className="text-gray-500 text-sm">24 de abril de 2024</p>
        </div>
       <div className="bg-purple-600 p-4 rounded-2xl">
          <Calendar style={{ color: "#ffff" }} className="w-8 h-8 text-purple-600" />
        </div>
      </CardContent>

      {/* BOTÃO — Nova Reserva */}
      <Button  style={{ backgroundColor: "var(--color-primary)",  color: "#ffffff",  }} className="w-full max-w-md rounded-2xl h-14 shadow-lg">
        + Nova Reserva
      </Button>

      {/* LISTA — Próximas datas */}
     
        <CardContent className="p-4 space-y-2">
          <p className="font-medium text-gray-700 mb-2">Próximas datas</p>

          <Row date="25 de abril" status="Livre" />
          <Row date="26 de abril" status="Ocupado" />
          <Row date="27 de abril" status="Livre" />
        </CardContent>
      
    </Card>


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

