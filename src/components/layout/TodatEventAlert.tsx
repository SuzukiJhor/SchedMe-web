import { getTodayISO, getTodayEvent, hasEventToday } from "@/lib/utils";
import { Button } from "../ui/button";
import DialogCalendar from "./DialogCalendar";
import type { EventData } from "@/pages/type";
import { TitleDescriptionGreen } from "./TitledescriptionGreen";

type Props = {
    events: EventData[];
    setOpen: (open: boolean) => void;
    open: boolean;
    callBack: (event: EventData) => void;
};

export function TodayEventAlert({ events, setOpen, open, callBack }: Props) {
    const eventScheduledToday = hasEventToday(events);
    if (!eventScheduledToday) return null;

    return (
        <>
            <TitleDescriptionGreen title={"Hoje há um evento agendado"} />
            <Button size="default" variant="destructive" onClick={() => setOpen(true)}>
                Ver Reserva de Hoje
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
