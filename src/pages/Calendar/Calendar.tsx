import { useState } from "react";
import { Card } from "@/components/ui/card";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DialogCalendar from "@/components/layout/DialogCalendar";
import { getTodayISO } from "@/lib/utils";
import { ReservationList } from "@/components/layout/ReservationList";
import { ReservationEmpty } from "@/components/layout/ReservationEmpty";
import { useFetchEvents } from "@/hooks/useFetchAllEvents";
import type { EventData } from "../type";
import LoadingCard from "@/components/layout/ReservationLoading";
import { useUpdateEvent } from "@/hooks/useUpdateEvent";
import { useCreateEvent } from "@/hooks/useCreateEvent";

export default function Calendar() {
  const { events, loading } = useFetchEvents();
   const { updateEvent } = useUpdateEvent();
   const { createEvent } = useCreateEvent();
  const [selectedDate, setSelectedDate] = useState<string>(getTodayISO());
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  function handleEdit(event: EventData) {
    setEditingEvent(event);
    setIsEditOpen(true);
  }

  function handleDelete(id: string) {
    console.log(id);
  }

  async function submitSave(event: EventData) {
    setIsOpen(false);
    try {
      await createEvent(event);
      console.log("Evento criado com sucesso!");
    } catch {
      console.log("Falha ao criar evento");
    }
  }

  async function submitEdit(event: EventData) {
    setIsEditOpen(false);
    try {
      await updateEvent(event);
      console.log("Evento criado com sucesso!");
    } catch {
      console.log("Falha ao criar evento");
    }
  }

  const fullCalendarEvents = events.map(ev => ({
    id: ev.id,
    title: ev.full_name,
    start: ev.start_time,
    end: ev.end_time,
    allDay: true,
    backgroundColor: "#86198f",
    borderColor: "#86198f"
  }));

  const reservationDay = selectedDate
    ? events.filter((e) => e.start_time == selectedDate)
    : [];

  const totalPages = Math.ceil(reservationDay.length / itemsPerPage);

  const paginatedReservations = reservationDay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <Card className="p-4" >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "title",
            right: "prev,next",
          }}
          height="auto"
          locale="pt-br"
          selectable={true}
          editable={true}
          events={fullCalendarEvents}
          dateClick={(info) => {
            setSelectedDate(info.dateStr);
            setCurrentPage(1);
          }}
          slotLaneClassNames={"bg-red"}
          allDayClassNames={"bg-gray-900"}
          dayCellClassNames={"bg-gray-400"}
          eventBackgroundColor="#86198f"
          eventBorderColor="#86198f"
          eventClick={(info) => {
            console.log(info.event.title);
          }}
        />

        {loading ? (
          <LoadingCard />
        ) : (
          <>
            {selectedDate && reservationDay.length === 0 && (
              <ReservationEmpty
                setIsOpen={setIsOpen}
              />
            )}

            <ReservationList
              reservationDay={reservationDay}
              paginatedReservations={paginatedReservations}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </>
        )}

        <DialogCalendar
          open={isOpen}
          setOpen={setIsOpen}
          selectedDate={selectedDate}
          event={null}
          callBack={(Event) => {
            submitSave(Event);
          }}
          textTitle="Nova Reserva"
        />

        <DialogCalendar
          open={isEditOpen}
          setOpen={setIsEditOpen}
          selectedDate={selectedDate}
          event={editingEvent}
          callBack={(Event) => {
            submitEdit(Event);
          }}
          textTitle="Editar reserva"
        />
      </Card></>
  );
}
