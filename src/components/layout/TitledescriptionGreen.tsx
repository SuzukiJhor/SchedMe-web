import { AlertCircle } from "lucide-react";

export function TitleDescriptionGreen({
    title,
}: {
    title: string;
}) {
    return (
        <div className="p-3 bg-green-100 border border-green-300 rounded-md flex items-center gap-2 text-green-700">
            <AlertCircle className="w-5 h-5" />
            <span>{title}</span>
        </div>
    );
}