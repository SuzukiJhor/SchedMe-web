import { useState } from "react";
import { Card } from "@/components/ui/card";
import FullCalendar from "@fullcalendar/react";
import { initialEvents } from "@/mocks/events";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CalendarEvent } from "./type";
import DialogCalendar from "@/components/layout/DialogCalendar";
import { getTodayISO } from "@/lib/utils";
import { ReservationList } from "@/components/layout/ReservationList";
import { ReservationEmpty } from "@/components/layout/ReservationEmpty";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayISO());
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const itemsPerPage = 3;

  function handleEdit(event: CalendarEvent) {
    setEditingEvent(event);
    setIsEditOpen(true);
  }

  function handleDelete(id: string) {
    console.log(id);
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }

  function salvarEdicao(event: CalendarEvent) {
    console.log("Salvando edição:", event);
    setIsEditOpen(false);
  }

  const reservationDay = selectedDate
    ? events.filter((e) => e.date === selectedDate)
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
          events={events}
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
      
        <DialogCalendar
          open={isOpen}
          setOpen={setIsOpen}
          selectedDate={selectedDate}
          event={null}
          callBack={(Event) => {
            salvarEdicao(Event);
          }}
          textTitle="Nova Reserva"
        />

        <DialogCalendar
          open={isEditOpen}
          setOpen={setIsEditOpen}
          selectedDate={selectedDate}
          event={editingEvent}
          callBack={(Event) => {
            salvarEdicao(Event);
          }}
          textTitle="Editar reserva"
        />
      </Card></>
  );
}
