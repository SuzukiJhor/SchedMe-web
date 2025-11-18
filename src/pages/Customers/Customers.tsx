import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Ativo" | "Inativo";
}

const mockCustomers: Customer[] = [
  { id: "C001", name: "João da Silva", email: "joao@email.com", phone: "11987654321", status: "Ativo" },
  { id: "C002", name: "Maria Oliveira", email: "maria@email.com", phone: "11992345678", status: "Ativo" },
  { id: "C003", name: "Carlos Eduardo", email: "carlos@email.com", phone: "21987894567", status: "Inativo" },
  { id: "C004", name: "Ana Paula Ferreira", email: "ana@email.com", phone: "11977774444", status: "Ativo" },
  { id: "C005", name: "Pedro Rocha", email: "pedro@email.com", phone: "31999112233", status: "Ativo" },
];

export default function Customers() {
  return (
    <Card className="p-4">
      <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>

      {/* Botão de adicionar cliente */}
      <Button
        className="w-full md:w-auto bg-[#86198f] text-white hover:bg-[#5a078f] rounded-2xl"
        onClick={() => alert("Funcionalidade de adicionar cliente")}
      >
        + Novo Cliente
      </Button>

      {/* Lista de clientes */}
      <div className="space-y-3">
        {mockCustomers.map((customer) => (
          <Card
            key={customer.id}
            className="shadow-sm rounded-2xl border-none flex justify-between items-center p-4"
          >
            <div className="flex items-center gap-4">
              <User className="w-8 h-8 text-[#86198f]" />
              <div>
                <p className="font-medium text-gray-700">{customer.name}</p>
                <p className="text-sm text-gray-500">{customer.email}</p>
                <p className="text-sm text-gray-500">{customer.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={customer.status === "Ativo" ? "secondary" : "destructive"}
                className="px-3 py-1 rounded-full"
              >
                {customer.status}
              </Badge>

              <Button
                size="sm"
                variant="outline"
                onClick={() => alert(`Editar cliente ${customer.name}`)}
              >
                Editar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
    </Card>
    
  );
}
