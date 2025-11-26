import type { UserData } from "@/pages/type";
import { registerUser } from "@/services/agendaService";
import { useState } from "react";

export function useUsers() {
    const [user, setUSer] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    async function registerUserWithClerId(payload: UserData) {
        setLoading(true);
        const data = await registerUser(payload);
        setUSer(data);
        setLoading(false);
    }
    
    return { registerUserWithClerId, loading, user };
}