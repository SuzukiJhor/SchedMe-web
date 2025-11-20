import { Button } from "../ui/button";

type ReservationEmptyProps = {
    setIsOpen: (open: boolean) => void;
};

export const ReservationEmpty = ({
    setIsOpen,
}: ReservationEmptyProps) => {
    return (
      <><p className="text-sm text-muted-foreground mt-2">
            Nenhuma reserva encontrada para este dia.
          </p>

            <div className="fixed bottom-20 left-0 right-0 flex justify-center px-4 z-50">
              <Button
                style={{ backgroundColor: "var(--color-primary)", color: "#ffffff", }}
                className="w-full max-w-md rounded-2xl h-14 shadow-lg"
                onClick={() => setIsOpen(true)}
              >
                + Nova Reserva
              </Button>
            </div>
            </>
    );
}