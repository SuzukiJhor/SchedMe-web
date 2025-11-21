export type CalendarEvent = {
  id: string;
  user_id?: string;
  full_name: string;
  whatsapp: string;
  all_day: boolean;
  notes: string;
  start_time: string;
  end_time?: string;
};

export type CalendarProps = {
  events: CalendarEvent[];
};