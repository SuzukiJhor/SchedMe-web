import { useState } from "react";
import { createEvent } from "@/services/agendaService";
import { normalizeEventDates } from "@/lib/utils";

export function useCreateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleCreateEvent(payload: any) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await createEvent(normalizeEventDates(payload));
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.message || "Erro ao criar evento");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    createEvent: handleCreateEvent,
    loading,
    error,
    success,
  };
}
