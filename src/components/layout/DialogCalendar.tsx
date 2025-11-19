import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


type DialogCalendarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedDate: string;
  event: {
    id: string;
    title: string;
    date: string;
  } | null;
  callBack: () => void;
};

export default function DialogCalendar({
open,
setOpen,
selectedDate,
event,
callBack,
}: DialogCalendarProps) {
  return (
     <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar reserva</DialogTitle>
            </DialogHeader>

                  <p className="text-sm text-muted-foreground text-red">
              Data selecionada: <strong>{selectedDate}</strong>
            </p>

            {event && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Título</label>
                  <input
                    className="w-full p-2 border rounded-md"
                    value={event.title}
                    onChange={(e) => console.log({
                      ...event,
                      title: e.target.value,
                    })} />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="destructive" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={callBack}>Salvar</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
  );
}