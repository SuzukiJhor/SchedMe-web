import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDateBr } from "@/lib/utils";
import type { CalendarEvent } from "@/pages/Calendar/type";

type DialogCalendarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedDate: string;
  event: CalendarEvent | null;
  callBack: (data: CalendarEvent) => void;
  textTitle: string;
};

export default function DialogCalendar({
  open,
  setOpen,
  selectedDate,
  event,
  callBack,
  textTitle,
}: DialogCalendarProps) {

  const [formData, setFormData] = useState({
    title: "",
    whatsapp: "",
    date: selectedDate,
    all_day: false,
    notes: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        whatsapp: event.whatsapp,
        date: event.date,
        all_day: event.all_day,
        notes: event.notes,
      });
    } else {
      setFormData({
        title: "",
        whatsapp: "",
        date: selectedDate,
        all_day: true,
        notes: "",
      });
    }
  }, [event, selectedDate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    callBack(formData);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle>{textTitle}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Data selecionada: <strong>{String(formatDateBr(selectedDate))}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome</label>
            <input
              className="w-full p-2 border rounded-md"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Celular</label>
            <input
              className="w-full p-2 border rounded-md"
              value={formData.whatsapp}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp: e.target.value })
              }
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="AllDay" className="text-sm font-medium">
              Dia Inteiro
            </label>

            <input
              id="AllDay"
              type="checkbox"
              checked={formData.all_day}
              onChange={(e) =>
                setFormData({ ...formData, all_day: e.target.checked })
              }
              className="accent-purple-600 w-5 h-5 rounded"
            />

          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Anotação</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button style={{ backgroundColor: "var(--color-secondary)", color: "#ffffff", }} variant="destructive" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button style={{ backgroundColor: "var(--color-primary)", color: "#ffffff", }} type="submit" variant="destructive">Salvar</Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
}
