import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FullCalendar from "@fullcalendar/react";
import { Button } from "@/components/ui/button";
import { initialEvents } from "@/mocks/events";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { CalendarEvent } from "./type";

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

  function salvarEdicao() {
    console.log("Salvando edição:", editingEvent);
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
            <div className="mt-4 space-y-2">
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

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  ◀ Anterior
                </Button>

                <span className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </span>

                <Button
                  variant="destructive"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Próxima ▶
                </Button>
              </div>
            )}
          </>
        )}


        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-muted-foreground text-red">
              Data selecionada: <strong>{selectedDate}</strong>
            </p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px- rounded-lg bg-secondary text-white"
              >
                Fechar
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* --- MODAL DE EDIÇÃO --- */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar reserva</DialogTitle>
            </DialogHeader>

            {editingEvent && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Título</label>
                  <input
                    className="w-full p-2 border rounded-md"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({
                      ...editingEvent,
                      title: e.target.value,
                    })} />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="destructive" onClick={() => setIsEditOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={salvarEdicao}>Salvar</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Card></>
  );
}
