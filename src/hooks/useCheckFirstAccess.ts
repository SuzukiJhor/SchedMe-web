import { useEffect, useState } from "react";
import { firstOrNotLogin } from "@/services/agendaService";
import { useAxiosInterceptor } from "./useInterceptorClerkAuth";

export function useCheckFirstAccess() {
    const [firstTime, setFirstTime] = useState<boolean | null>(null);
    useAxiosInterceptor();
    useEffect(() => {
        async function check() {
            const res = await firstOrNotLogin();
            setFirstTime(res.first_time);
        }

        check();
    }, []);

    return firstTime;
}
