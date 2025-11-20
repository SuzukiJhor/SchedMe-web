export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 98765-4321",
    status: "Ativo",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(21) 91234-5678",
    status: "Inativo",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    phone: "(41) 99887-6644",
    status: "Ativo",
  },
];

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Ativo" | "Inativo";
}