import { Button } from "../ui/button";

type ReservationPagesProps = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};
export function ReservationPages({
    totalPages,
    currentPage,
    setCurrentPage,
}: ReservationPagesProps) {

    return <div className="flex justify-center items-center gap-2 mt-4 pb-10">
        <Button
            variant="destructive"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
        >
            ◀ Anterior
        </Button>

        <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
        </span>

        <Button
            variant="destructive"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
        >
            Próxima ▶
        </Button>
    </div>
        ;
}