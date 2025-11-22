import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ReservationPages } from "./ReservationPages";
import { Badge } from "@/components/ui/badge";
import type { EventData } from "@/pages/type";

type ReservationListProps = {
    reservationDay: EventData[];
    paginatedReservations: EventData[];
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    handleEdit: (event: EventData) => void;
    handleDelete: (id: string | null) => void;
};

export const ReservationList = ({
    reservationDay,
    paginatedReservations,
    totalPages,
    currentPage,
    setCurrentPage,
    handleEdit,
    handleDelete,
}: ReservationListProps) => {
    return (
        <>
            {reservationDay.length > 0 && (
                <>
                    <div className="mt-4 space-y-2 pb-16">
                        {paginatedReservations.map((evento) => (
                            <Card
                                key={evento.id}
                                className="p-3 flex items-center justify-between border-border"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{evento.full_name}</span>
                                    <Badge variant="secondary">Reservado</Badge>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="destructive" onClick={() => handleEdit(evento)}>
                                        Editar
                                    </Button>

                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(evento.id)}>
                                        Deletar
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <ReservationPages
                            totalPages={totalPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </>
            )}
        </>
    );

}