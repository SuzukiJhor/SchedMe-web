import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CalendarEvent } from "../Calendar/type";
import { initialEvents } from "@/mocks/events";
import { formatDateBr, getTodayDateObj, getTodayISO, toLocalDate } from "@/lib/utils";
import DialogCalendar from "@/components/layout/DialogCalendar";

export default function Dashboard() {
  const [events] = useState<CalendarEvent[]>(initialEvents);
  const [isOpen, setIsOpen] = useState(false);

  function getNextEvent(events: CalendarEvent[]) {
    const today = getTodayDateObj();

    return events
      .filter(ev => toLocalDate(ev.date) >= today)
      .sort((a, b) => toLocalDate(a.date).getTime() - toLocalDate(b.date).getTime())[0];
  }

  function getNextDates(events: CalendarEvent[], days = 5) {
    const today = new Date();
    const result = [];

    for (let i = 1; i <= days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const localDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

      const found = events.some(ev => ev.date === localDate);

      result.push({
        date: d.toLocaleDateString("pt-BR"),
        status: found ? "Ocupado" : "Livre"
      });
    }

    return result;
  }

  function newReservation(event: any) {
    console.log("Salvando edição:", event);
    setIsOpen(false);
  }


  const nextEvent = getNextEvent(events);
  const nextDates = getNextDates(events);

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

          {nextEvent ? (
            <>
              <h2 className="text-lg font-semibold">{nextEvent.title}</h2>
              <p className="text-gray-500 text-sm">
                {formatDateBr(nextEvent.date)}
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">Nenhuma reserva futura</p>
          )}
        </div>

        <div className="bg-purple-600 p-4 rounded-2xl">
          <Calendar style={{ color: "#ffff" }} className="w-8 h-8" />
        </div>
      </CardContent>

      <Button
        style={{ backgroundColor: "var(--color-primary)", color: "#ffffff" }}
        className="w-full max-w-md rounded-2xl h-14 shadow-lg"
        onClick={() => setIsOpen(true)}  
      >
        + Nova Reserva
      </Button>

      {/* LISTA — Próximas datas */}
      <CardContent className="p-4 space-y-2">
        <p className="font-medium text-gray-700 mb-2">Próximas datas</p>

        {nextDates.map((d, idx) => (
          <Row key={idx} date={d.date} status={d.status} />
        ))}
      </CardContent>

      <DialogCalendar
        open={isOpen}
        setOpen={setIsOpen}
        selectedDate={getTodayISO()}
        event={null}
        callBack={(Event) => {
          newReservation(Event);
          setIsOpen(false);
        }}
        textTitle="Nova Reserva"
        />

    </Card>
  );
}

/* COMPONENTE DE LINHA DE DATAS */
function Row({ date, status }: { date: string; status: string }) {
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

