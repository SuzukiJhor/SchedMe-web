import { AlertCircle } from "lucide-react";
import { toLocalDate, getTodayDateObj } from "@/lib/utils";

type Props = {
    events: { start_time: string; full_name: string }[];
};

export function TodayEventAlert({ events }: Props) {
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
        <div className="p-3 bg-green-100 border border-green-300 rounded-md flex items-center gap-2 text-green-700">
            <AlertCircle className="w-5 h-5" />
            <span>Hoje há um evento agendado</span>
        </div>
    );
}
