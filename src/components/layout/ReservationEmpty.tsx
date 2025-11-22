import ButtonPrimary from "./ButtonPrimary";

type ReservationEmptyProps = {
  setIsOpen: (open: boolean) => void;
};

export const ReservationEmpty = ({
  setIsOpen,
}: ReservationEmptyProps) => {
  return (
    <><p className="text-sm text-muted-foreground mt-2 pb-30">
      Nenhuma reserva encontrada para este dia.
    </p>

      <div className="fixed bottom-20 left-0 right-0 flex justify-center px-4 z-50">
        <ButtonPrimary
          title="+ Nova Reserva"
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}