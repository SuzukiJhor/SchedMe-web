import { fetchCompanies } from "@/services/agendaService";
import { useEffect, useState } from "react";


export function useCompanies() {
    const [companies, setCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    async function getCompany() {
        setLoading(true);
        const data = await fetchCompanies();
        setCompanies(data);
        setLoading(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            await getCompany();
        };
        fetchData();
    }, []);

    return { getCompany, loading, companies };
}