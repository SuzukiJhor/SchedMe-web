import { AlertCircle } from "lucide-react";

export function TitleDescriptionRed({
    title,
}: {
    title: string;
}) {
    return (
        <>
            <h2 style={{
                backgroundColor: "#F3E8FF",
                color: "#ff4d4f",
                padding: "8px 14px",
                borderRadius: "8px",
                fontWeight: "bold",
            }} className="p-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{title}</span>
            </h2>
        </>

    );
}