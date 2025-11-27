import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ReservationPages } from "./ReservationPages";
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
    <div className="pb-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reservado</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reservationDay.length > 0 &&
            paginatedReservations.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-700">{event.full_name}</p>
                    <p className="text-sm text-gray-500">{event.whatsapp}</p>

                    {/* STATUS opcional: adicionar badge colorido depois */}
                    <p className="text-sm text-gray-500">{event.status}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-end gap-2">

                    <Button
                    style={{ backgroundColor: "var(--color-primary)",  color: "#ffffff",  }} 
                      className="w-24 rounded-xl"
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(event)}
                    >
                      Editar
                    </Button>

                    <Button
                    style={{ backgroundColor: "var(--color-error)",  color: "#ffffff",  }} 
                      className="w-24 rounded-xl"
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(event.id ?? null)}
                    >
                      Deletar
                    </Button>

                  </div>
                </TableCell>

              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Paginação */}
      {totalPages > 1 && (
        <ReservationPages
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      </div>
    </>
  );
};
