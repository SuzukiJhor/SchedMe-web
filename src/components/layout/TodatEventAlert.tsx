import { AlertCircle } from "lucide-react";
import { toLocalDate, getTodayDateObj, getTodayISO, getTodayEvent, } from "@/lib/utils";
import { Button } from "../ui/button";
import DialogCalendar from "./DialogCalendar";
import type { EventData } from "@/pages/type";

type Props = {
    events: EventData[];
    setOpen: (open: boolean) => void;
    open: boolean;
    callBack: (event: EventData) => void;
};

export function TodayEventAlert({ events, setOpen, open, callBack }: Props) {
    const today = getTodayDateObj();
    const hasEventToday = events.some(ev => {
        const date = toLocalDate(ev.start_time);
        return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        );
    });

    if (!hasEventToday) return null;

    return (
        <>
            <div className="p-3 bg-green-100 border border-green-300 rounded-md flex items-center gap-2 text-green-700">
                <AlertCircle className="w-5 h-5" />
                <span>Hoje há um evento agendado</span>
            </div>
            <Button size="default" variant="destructive" onClick={() => setOpen(true)}>
                Ver Evento
            </Button>

            <DialogCalendar
                open={open}
                setOpen={setOpen}
                selectedDate={getTodayISO()}
                event={getTodayEvent(events)}
                callBack={(Event) => {
                    callBack(Event);
                }}
                textTitle="Reserva de Hoje"
            />
        </>

    );
}
