import { useQuery } from "@tanstack/react-query";
import { getAgendas } from "../services/agendaService";

export function useAgendas() {
  return useQuery({
    queryKey: ["agendas"],
    queryFn: getAgendas,
  });
}
