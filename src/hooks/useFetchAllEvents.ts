import { useState, useEffect } from "react";
import { fetchAllEvents } from "@/services/agendaService";
import type { EventData } from "@/pages/type";

export function useFetchEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await fetchAllEvents();
        setEvents(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { events, loading };
}
