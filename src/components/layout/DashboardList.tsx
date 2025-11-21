export default function DashboardList({ date, status }: { date: string; status: string }) {
    return (
        <>
            <div className="flex justify-between items-center">
                <span className="text-gray-700">{date}</span>
                <span
                    className={
                        status === "Livre"
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                    }
                >
                    {status}
                </span>
            </div>
        </>

    );
}