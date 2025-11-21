import { Button } from "../ui/button";

export default function ButtonPrimary({
    title,
    setIsOpen,
}: { title: string; setIsOpen: (open: boolean) => void }) {
    return (
        <Button
            style={{ backgroundColor: "var(--color-primary)", color: "#ffffff" }}
            className="w-full max-w-md rounded-2xl h-14 shadow-lg"
            onClick={() => setIsOpen(true)}
        >
            {title}
        </Button>
    );
}