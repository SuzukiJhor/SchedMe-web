import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAgenda,
  createAgenda,
  updateAgenda,
  deleteAgenda,
} from "../../services/agendaService";

export default function AgendaForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    titulo: "",
    data: "",
    descricao: "",
  });

  useEffect(() => {
    if (isEdit) {
      getAgenda(id).then((res) => setForm(res));
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEdit) await updateAgenda(id, form);
    else await createAgenda(form);
    window.history.back();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        {isEdit ? "Editar Agenda" : "Nova Agenda"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="datetime-local"
          name="data"
          value={form.data}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-xl">
          {isEdit ? "Salvar" : "Cadastrar"}
        </button>
      </form>

      {isEdit && (
        <button
          onClick={() => {
            deleteAgenda(id);
            window.history.back();
          }}
          className="w-full bg-red-600 text-white p-3 rounded-xl"
        >
          Excluir Agendamento
        </button>
      )}
    </div>
  );
}
