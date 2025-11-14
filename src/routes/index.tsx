import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Calendar from "@/pages/Calendar/Calendar";
import Dashboard from "../pages/Dashboard/Dashboard";
import AgendaForm from "../pages/AgendaForm/AgendaForm";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/agenda/:id?" element={<AgendaForm />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
