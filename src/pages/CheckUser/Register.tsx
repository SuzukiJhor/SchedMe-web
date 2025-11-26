import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCompanies } from "@/hooks/useCompanies";
import { useEvents } from "@/hooks/useEvents";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserData } from "../type";

export function Register() {
    const { user } = useUser();
    const { registerUserWithClerId } = useEvents();
    const { companies, loading } = useCompanies();
    const navigate = useNavigate();
    const nameUser = user?.firstName ?? "";
    const emailUser = user?.primaryEmailAddress?.emailAddress ?? "";
    const clerkId = user?.id ?? "";

    const [formData, setFormData] = useState({
        name: nameUser,
        email: emailUser,
        whatsapp: "",
        clerk_user_id: clerkId,
        company_id: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await registerUserWithClerId(formData);
            setTimeout(() => navigate("/"), 300);
        } catch (error) {
            console.error("Erro ao registrar o usuário:", error);
        }
    }


    return (
        <>
            <div className="flex pt-2 pl-5 pr-5">
                <UserButton />
            </div>

            <div className="flex justify-center mt-6 px-4">
                <Card className="p-6 w-full max-w-xl shadow-lg rounded-2xl space-y-6">

                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                            Bem-vindo, {nameUser}! 👋
                        </p>
                        <p className="text-gray-600 text-md pt-8">
                            Antes de continuar, finalize seu cadastro
                        </p>
                    </div>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Empresa */}
                            <div className="flex flex-col">
                                {loading ? (
                                    <p className="text-gray-500 text-sm">Carregando empresas...</p>
                                ) : (
                                    <>
                                        <label className="text-sm text-gray-700 mb-1">Selecione o nome da empresa</label>
                                        <select
                                            name="company_id"
                                            value={(formData as UserData).company_id ?? ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, company_id: e.target.value })
                                            }
                                            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                            required
                                        >
                                            <option value="">Selecione...</option>

                                            {companies.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </>

                                )}
                            </div>

                            {/* Nome */}
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-700 mb-1">Nome</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>

                            {/* E-mail */}
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-700 mb-1">E-mail</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>

                            {/* WhatsApp */}
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-700 mb-1">WhatsApp</label>
                                <input
                                    name="whatsapp"
                                    placeholder="(xx) 9xxxx-xxxx"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex justify-center gap-2">
                                <Button
                                    style={{
                                        backgroundColor: "var(--color-primary)",
                                        color: "#ffffff",
                                    }}
                                    type="submit"
                                >
                                    Finalizar Cadastro
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
