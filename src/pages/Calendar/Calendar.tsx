import { useState } from "react";
import Swal from 'sweetalert2';
import type { EventData } from "../type";
import { Card } from "@/components/ui/card";
import { useEvents } from "@/hooks/useEvents";
import FullCalendar from "@fullcalendar/react";
import toast, { Toaster } from "react-hot-toast";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DialogCalendar from "@/components/layout/DialogCalendar";
import LoadingCard from "@/components/layout/ReservationLoading";
import { formatToISO, getTodayISO, invertDate, styleConfigureToast } from "@/lib/utils";
import { ReservationList } from "@/components/layout/ReservationList";
import { ReservationEmpty } from "@/components/layout/ReservationEmpty";
import { TitleDescriptionRed } from "@/components/layout/TitleDescriptionRed";
import { TitleDescriptionGreen } from "@/components/layout/TitledescriptionGreen";

export default function Calendar() {
  const { events, addEvent, editEvent, removeEvent, reloadEvents, loading } = useEvents();
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

  async function handleDelete(id: string | null) {
    if (!id) return;
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter esta exclusão!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, Deletar!',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await removeEvent(Number(id));
        toast.success('Reserva removida com sucesso!');
      } catch (error) {
        console.error("Erro ao remover evento:", error);
        toast.error('Erro ao remover a reserva. Tente novamente.');
      }
    }
  }

  async function submitSave(event: EventData) {
    await toast.promise(
      addEvent(event),
      {
        loading: 'Enviando dados da reserva...',
        success: 'Reserva criada com Sucesso!',
        error: (err) => err.message || 'Erro ao criar a reserva. Verifique a conexão.',
      },
      {
        style: styleConfigureToast.style,
      }
    ).finally(() => {
      setIsOpen(false);
    });

    await reloadEvents();
  }

  async function submitEdit(event: EventData) {
    const { id } = event;
    await toast.promise(
      editEvent(Number(id), event),
      {
        loading: 'Atualizando dados da reserva...',
        success: 'Reserva atualizada com Sucesso!',
        error: (err) => err.message || 'Erro ao atualizar a reserva. Verifique a conexão.',
      },
      {
        style: styleConfigureToast.style,
      }
    );
    await editEvent(Number(id), event);
    setIsEditOpen(false);
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
        <Toaster
          position="bottom-center"
          reverseOrder={true}
        />
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
            const date = info.event.start;
            if (date) {
              const dateFormatted = formatToISO(date);
              setSelectedDate(dateFormatted);
            }

          }}
        />

        {loading ? (
          <LoadingCard />
        ) : (
          <>
            {selectedDate && reservationDay.length === 0 && (
              <><TitleDescriptionGreen title={`Data ${invertDate(selectedDate)}`} /><ReservationEmpty
                setIsOpen={setIsOpen} /></>
            )}

            {selectedDate && !(reservationDay.length === 0) && (
              <>
                <TitleDescriptionRed title={`Data ${invertDate(selectedDate)}`} />
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
      </Card>
    </>
  );
}
