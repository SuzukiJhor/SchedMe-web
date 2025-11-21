import { useState } from "react";
import { createEvent, updateEvent } from "@/services/agendaService";
import { normalizeEventDates } from "@/lib/utils";

export function useUpdateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleUpdateEvent(payload: any) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { id } = payload;

    try {
      const response = await updateEvent(id, normalizeEventDates(payload));
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar evento");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    updateEvent: handleUpdateEvent,
    loading,
    error,
    success,
  };
}
