import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTodayDateObj() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
export function toLocalDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
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
