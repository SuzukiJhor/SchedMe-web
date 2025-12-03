import { useMobileOnly } from "@/hooks/useMobileOnly";
import BottomNav from "./BottomNav";
import Header from "./Header";
import RequireAuth from "./RequireAuth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  useMobileOnly();
  return (
    <RequireAuth>
      <div className="flex flex-col min-h-screen w-full bg-gray-50">
        <Header />

        <main className="flex-1 p-4 md:px-8 md:py-6 w-full max-w-5xl mx-auto">
          {children}
        </main>

        <BottomNav />
      </div>
    </RequireAuth>
  );
}
