import { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateBr, getTodayDateObj, getTodayISO, hasEventToday, invertDate, normalizeDate, toLocalDate } from "@/lib/utils";
import DialogCalendar from "@/components/layout/DialogCalendar";
import LoadingCard from "@/components/layout/ReservationLoading";
import DashboardList from "@/components/layout/DashboardList";
import ButtonPrimary from "@/components/layout/ButtonPrimary";
import type { EventData } from "../type";
import { useEvents } from "@/hooks/useEvents";
import { TodayEventAlert } from "@/components/layout/TodatEventAlert";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenday, setisOpenday] = useState(false);
  const [isOpenEventToday, setIsOpenEventToday] = useState(false);
  const [eventClickedDay, seteventClickedDay] = useState<EventData>();
  const { events, addEvent, editEvent, loading } = useEvents();
  const { user } = useUser();

  const nameUser = user?.firstName ? user.firstName : "";

  async function selectClickedDay(day: string) {
    const sanitizeDate = normalizeDate(day);
    const resultFilterByDay = events.filter(event => {
      return event.start_time === sanitizeDate;
    });
    if (resultFilterByDay.length === 0) return;
    seteventClickedDay(resultFilterByDay[0]);
    setisOpenday(true);
    return;
  }

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

  async function EditReservation(event: EventData) {
    const { id } = event;
    await editEvent(Number(id), event);
    setIsOpenEventToday(false);
  }

  const nextEvent = getNextEvent(events);
  const nextDates = getNextDates(events);
  const eventScheduledToday = hasEventToday(events);

  return (
    <Card className="p-4 space-y-6">
      <p className="text-xl font-bold text-gray-800">
        Bem vindo {nameUser}!
      </p>

      {!eventScheduledToday && (
        <>
          <h2 style={{
            backgroundColor: "#F3E8FF",
            color: "#ff4d4f",
            padding: "8px 14px",
            borderRadius: "8px",
            fontWeight: "bold",
          }} className="text-lg font-semibold">Hoje AINDA não tem reservas!</h2>
          <ButtonPrimary
            title="+ Nova Reserva"
            setIsOpen={setIsOpen}
          />
        </>

      )}

      <CardContent className="flex items-center justify-between">
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

      {loading ? (
        <LoadingCard />
      ) : (
        <>
          <TodayEventAlert events={events} open={isOpenEventToday} setOpen={setIsOpenEventToday} callBack={(Event) => {
            EditReservation(Event);
          }} />
          <DashboardList nextDates={nextDates} callBack={selectClickedDay} />
        </>
      )}

      <DialogCalendar
        open={isOpenday}
        setOpen={setisOpenday}
        selectedDate={eventClickedDay?.start_time || getTodayISO()}
        event={eventClickedDay || null}
        callBack={(Event) => {
          EditReservation(Event)
        }}
        textTitle={`Próxima Reserva - ${eventClickedDay ? invertDate((eventClickedDay.start_time).split(" ")[0]) : ""}`}
      />

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
