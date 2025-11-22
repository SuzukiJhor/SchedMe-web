import { useState, useEffect } from "react";
import { fetchAllEvents, createEvent, updateEvent, deleteEvent } from "@/services/agendaService";
import type { EventData } from "@/pages/type";

export function useEvents() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadEvents() {
        setLoading(true);
        const data = await fetchAllEvents();
        setEvents(data);
        setLoading(false);
    }

    async function addEvent(payload: EventData) {
        const newEvent = await createEvent(payload);
        setEvents(prev => [...prev, newEvent]);
        await loadEvents();
        return newEvent;
    }

    async function editEvent(id: number, payload: EventData) {
        const updated = await updateEvent(id, payload);
        setEvents(prev =>
            prev.map(ev => (Number(ev.id) === id ? updated : ev))
        );
        return updated;
    }

    async function removeEvent(id: number) {
        await deleteEvent(id);
        setEvents(prev => prev.filter(ev => Number(ev.id) !== id));
    }

    useEffect(() => {
        const fetchData = async () => {
            await loadEvents();
        };
        fetchData();
    }, []);

    return {
        events,
        loading,
        reloadEvents: loadEvents,
        addEvent,
        editEvent,
        removeEvent,
    };
}
