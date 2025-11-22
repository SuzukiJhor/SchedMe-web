import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateBr, getTodayDateObj, getTodayISO, toLocalDate } from "@/lib/utils";
import DialogCalendar from "@/components/layout/DialogCalendar";
import LoadingCard from "@/components/layout/ReservationLoading";
import DashboardList from "@/components/layout/DashboardList";
import ButtonPrimary from "@/components/layout/ButtonPrimary";
import type { EventData } from "../type";
import { useEvents } from "@/hooks/useEvents";

export default function Dashboard() {
  const { events, addEvent, loading } = useEvents();

  const [isOpen, setIsOpen] = useState(false);

  function getNextEvent(events: EventData[]) {
    const today = getTodayDateObj();
    return events
      .filter(ev => toLocalDate(ev.start_time) >= today)
      .sort((a, b) => toLocalDate(a.start_time).getTime() - toLocalDate(b.start_time).getTime())[0];
  }

  function getNextDates(events: EventData[], days = 5) {
    const today = new Date();
    const result = [];

    for (let i = 1; i <= days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const found = events.some(ev => {
        const evDate = toLocalDate(ev.start_time);
        return (
          evDate.getFullYear() === d.getFullYear() &&
          evDate.getMonth() === d.getMonth() &&
          evDate.getDate() === d.getDate()
        );
      });

      result.push({
        date: d.toLocaleDateString("pt-BR"),
        status: found ? "Ocupado" : "Livre"
      });
    }

    return result;
  }

 async function newReservation(event: EventData) {
    await addEvent(event);
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
              <h2 className="text-lg font-semibold">{nextEvent.full_name}</h2>
              <p className="text-gray-500 text-sm">
                {formatDateBr(nextEvent.start_time)}
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

      <ButtonPrimary
        title="+ Nova Reserva"
        setIsOpen={setIsOpen}
      />


      {loading ? (
        <LoadingCard />
      ) : (
        <>
          <CardContent className="p-4 space-y-2">
            <p className="font-medium text-gray-700 mb-2">Próximas datas</p>

            {nextDates.map((d, idx) => (
              <DashboardList key={idx} date={d.date} status={d.status} />
            ))}
          </CardContent>
        </>
      )}

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
