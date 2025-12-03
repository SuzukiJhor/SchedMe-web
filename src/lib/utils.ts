import type { EventData } from "@/pages/type";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeDate(dateString: string): string {
  const [day, month, year] = dateString.split("/");
  return (`${year}-${month}-${day}`);
}

export function getTodayDateObj() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function toLocalDate(str: string): Date {
  const [year, month, day] = str.replace(/\//g, "-").split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateBr(dateString: string) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}

export function getTodayISO() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split("T")[0];
}

export function normalizeEventDates(payload: EventData) {
  const clean = { ...payload };
  if (!clean.end_time && clean.start_time) {
    const date = new Date(clean.start_time);
    date.setDate(date.getDate() + 1);
    clean.end_time = date.toISOString().split("T")[0];
  }
  return clean;
}

export function formatToISO(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayEvent(events: EventData[]): EventData | null {
  const today = getTodayDateObj();
  for (const ev of events) {
    const evDate = toLocalDate(ev.start_time);
    if (
      evDate.getFullYear() === today.getFullYear() &&
      evDate.getMonth() === today.getMonth() &&
      evDate.getDate() === today.getDate()
    ) {
      return ev;
    }
  }
  return null;
}

export function hasEventToday(events: unknown): boolean {
  const today = getTodayDateObj();
  if (!Array.isArray(events)) return false;
  return events.some((ev: { start_time: string; }) => {
    const evDate = toLocalDate(ev.start_time);
    return (
      evDate.getFullYear() === today.getFullYear() &&
      evDate.getMonth() === today.getMonth() &&
      evDate.getDate() === today.getDate()
    );
  });
}

export function invertDate(dateString: string) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}

export function maskPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

export const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmado":
      return {
        backgroundColor: "#D1FAE5", color: "#065F46",
      };
    case "pendente":
      return {
        backgroundColor: "#FEF3C7", color: "#92400E",
      };
    case "cancelado":
      return {
        backgroundColor: "#FEE2E2",
        color: "#991B1B",
      };
    default:
      return {
        backgroundColor: "#E5E7EB", color: "#374151",
      };
  }
};

export const styleConfigureToast = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  }
};