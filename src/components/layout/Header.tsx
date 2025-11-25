import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex pt-2 pl-5 pr-5 items-center justify-between top-0 left-0 right-0 z-50">
      <Button
        style={{ backgroundColor: "var(--color-secondary)", color: "#ffffff", }}
        variant="destructive"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      <SignedIn>
        <UserButton />
      </SignedIn>
      {/* <SignedOut>
        <SignInButton />
      </SignedOut> */}

    </header>
  );
}
