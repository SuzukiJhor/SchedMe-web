export type CalendarEvent = {
  id?: string;
  user_id?: string;
  title: string;
  whatsapp: string;
  date: string;
  all_day: boolean;
  notes: string;
  end_time?: string;
};

export type CalendarProps = {
  events: CalendarEvent[];
};