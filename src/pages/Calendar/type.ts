export type CalendarEvent = {
  id?: string;
  full_name: string;
  start_time: string;
  end_time?: string;
};

export type CalendarProps = {
  events: CalendarEvent[];
};