import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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


export function normalizeEventDates(payload: any) {
  const clean = { ...payload };

  if (!clean.end_time && clean.start_time) {
    const date = new Date(clean.start_time);
    date.setDate(date.getDate() + 1);
    clean.end_time = date.toISOString().split("T")[0];
  }

  return clean;
}
