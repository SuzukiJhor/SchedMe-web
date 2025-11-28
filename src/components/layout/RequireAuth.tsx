import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useCheckFirstAccess } from "@/hooks/useCheckFirstAccess";
import { Register } from "@/pages/CheckUser/Register";
import LoadingCard from "./ReservationLoading";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const firstTime = useCheckFirstAccess();

  function loading() {
    return <>
    <div className="flex h-screen w-full items-center justify-center">
      (<LoadingCard />)
    </div>
    </>;
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
