export type CalendarEvent = {
  id: string;
  user_id: string;
  whatsapp: string;
  all_day: boolean;
  title: string;
  date: string;
  notes: string;
  end_time: string;
};

export type CalendarProps = {
  events: CalendarEvent[];
};