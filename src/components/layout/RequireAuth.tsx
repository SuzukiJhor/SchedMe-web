import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useCheckFirstAccess } from "@/hooks/useCheckFirstAccess";
import { Register } from "@/pages/CheckUser/Register";
import { Loader2 } from "lucide-react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const firstTime = useCheckFirstAccess();

  function loading() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-secondary" />

        <div className="mt-4 space-y-1">
          <p className="text-base font-medium text-gray-900 sm:text-lg">
            Carregando...
          </p>

          <p className="text-sm text-gray-600 sm:text-base max-w-xs sm:max-w-sm mx-auto">
            Aguente firme! Estamos teleportando os dados para sua tela… quase lá!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        {firstTime === null && loading()}
        {firstTime === true && <Register />}
        {firstTime === false && children}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
