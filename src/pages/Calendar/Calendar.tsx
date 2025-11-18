import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const initialEvents = [
    {
      title: "Corte de Cabelo - João",
      date: new Date().toISOString().split("T")[0],
    },
  ];

  return (
    <Card className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title",
          center: "prev,next",
          right: "",
          // right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
        locale="pt-br"
        selectable={true}
        editable={true}
        events={initialEvents}
        select={(info) => {
          setSelectedDate(info.startStr);
          setIsOpen(true);
        }}
        eventClick={(info) => {
          alert(`Evento: ${info.event.title}`);
        }}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Data selecionada: <strong>{selectedDate}</strong>
          </p>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-primary text-white"
            >
              Fechar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
