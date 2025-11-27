import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockCustomers } from "@/mocks/customers";
import { Table, TableBody, TableHead, TableHeader, TableCell, TableRow } from "@/components/ui/table";

export default function Customers() {
  return (
    <div>

      <Card className="p-4">

        <p className="text-2xl font-bold text-gray-800 mb-4">
          Lista de clientes cadastrados
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {mockCustomers.map((customer) => (
              <TableRow key={customer.id}>

                {/* Coluna do cliente */}
                <TableCell>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-700">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                    <p className="text-sm text-gray-500">{customer.phone}</p>
                  </div>
                </TableCell>

                {/* Coluna dos botões */}
                <TableCell>
                  <div className="flex flex-col items-end gap-2">

                    <Button
                      className="w-24 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
                      size="sm"
                      variant="destructive"
                    >
                      Editar
                    </Button>

                    <Button
                      style={{ backgroundColor: "var(--color-error)",  color: "#ffffff",  }} 
                      className="w-24 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
                      size="sm"
                      variant="destructive"
                    >
                      Deletar
                    </Button>

                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* BOTÃO FIXO NO RODAPÉ */}
      {/* <div className="fixed bottom-20 left-0 right-0 flex justify-center px-4 z-50">
        <Button
          style={{ backgroundColor: "var(--color-primary)", color: "#ffffff", }}
          className="w-full max-w-md rounded-2xl h-14 shadow-lg">
          + Novo Cliente
        </Button>
      </div> */}

    </div>
  );
}
