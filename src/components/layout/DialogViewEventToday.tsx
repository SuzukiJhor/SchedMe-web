import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDateBr } from "@/lib/utils";
import type { EventData } from "@/pages/type";

type DialogCalendarProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedDate: string;
    event: EventData;
    callBack: (data: EventData) => void;
    textTitle: string;
};

export default function DialogViewEventToday({
    open,
    setOpen,
    event,
    callBack,
}: DialogCalendarProps) {

    console.log(event);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="[&>button]:hidden">
                <DialogHeader>
                    <DialogTitle>{'textTitle'}</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                    Data selecionada: <strong>{String(formatDateBr('selectedDate'))}</strong>
                </p>

                <Button style={{ backgroundColor: "var(--color-secondary)", color: "#ffffff", }} variant="destructive" type="button" onClick={() => callBack(event!)}>
                    Fechar
                </Button>
            </DialogContent>
        </Dialog>
    );
}
