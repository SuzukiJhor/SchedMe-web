import { CardContent } from "../ui/card";

export default function DashboardList({ nextDates }: { nextDates: { date: string; status: string }[] }) {
    return (
        <>
            <CardContent className="p-4 space-y-2">
                <p className="font-medium text-gray-700 mb-2">Próximas datas</p>
                {nextDates.map((d, idx) => (
                    <div className="flex justify-between items-center" key={idx}>
                        <span className="text-gray-700">{d.date}</span>
                        <span
                            className={
                                d.status === "Livre"
                                    ? "text-green-600 font-medium"
                                    : "text-red-600 font-medium"
                            }
                        >
                            {d.status}
                        </span>
                    </div>
                ))}

            </CardContent>
        </>

    );
}