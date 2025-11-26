import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useCheckFirstAccess } from "@/hooks/useCheckFirstAccess";
import { Register } from "@/pages/CheckUser/Register";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const firstTime = useCheckFirstAccess();
  console.log("firstTime", firstTime);
  return (
    <>
      <SignedIn>
        {firstTime === null && <div>Carregando...</div>}
        {firstTime === true && <Register />}
        {firstTime === false && children}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
