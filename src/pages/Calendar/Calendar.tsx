import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FullCalendar from "@fullcalendar/react";
import { Button } from "@/components/ui/button";
import { initialEvents } from "@/mocks/events";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CalendarEvent } from "./type";
import DialogCalendar from "@/components/layout/DialogCalendar";
import { ReservationPages } from "@/components/layout/ReservationPages";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string>('2025-11-18');
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const itemsPerPage = 3;

  function handleEdit(event: any) {
    setEditingEvent(event);
    setIsEditOpen(true);
  }

  function handleDelete(id: string) {
    console.log(id);
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }

  function salvarEdicao(event: any) {
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
          dateClick= {(info) =>{ 
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
          } }
          />
  
        {/* Caso não existam eventos */}
        {selectedDate && reservationDay.length === 0 && (
          <><p className="text-sm text-muted-foreground mt-2">
            Nenhuma reserva encontrada para este dia.
          </p>

          <div className="fixed bottom-20 left-0 right-0 flex justify-center px-4 z-50">
        <Button
          style={{ backgroundColor: "var(--color-primary)",  color: "#ffffff",  }} 
          className="w-full max-w-md rounded-2xl h-14 shadow-lg"
          onClick={() => setIsOpen(true)}  
        >
          + Nova Reserva
        </Button>
      </div>
            </>
        )}


        {/* Listagem com paginação */}
        {reservationDay.length > 0 && (
          <>
            <div className="mt-4 space-y-2 pb-16">
              {paginatedReservations.map((evento) => (
                <Card
                  key={evento.id}
                  className="p-3 flex items-center justify-between border-border"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{evento.title}</span>
                    <Badge variant="secondary">Reservado</Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="destructive" onClick={() => handleEdit(evento)}>
                      Editar
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => handleDelete(evento.id)}>
                      Deletar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <ReservationPages
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </>
        )}


        <DialogCalendar
          open={isOpen}
          setOpen={setIsOpen}
          selectedDate={selectedDate}
          event={null}
          callBack={(Event) => {
            salvarEdicao(Event);
            setIsOpen(false);
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
            setIsOpen(false);
          }}
          textTitle="Editar reserva"
         />
      </Card></>
  );
}
