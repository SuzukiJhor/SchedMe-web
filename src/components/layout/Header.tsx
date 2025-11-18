import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex items-center top-0 left-0 right-0 z-50">
       <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>

    </header>
  );
}
