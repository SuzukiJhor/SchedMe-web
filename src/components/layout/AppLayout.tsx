import BottomNav from "./BottomNav";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      {/* Cabeçalho fixo no topo */}
      <Header />

      {/* Conteúdo principal */}
      <main className="flex-1 p-4 md:px-8 md:py-6 w-full max-w-5xl mx-auto">
        {children}
      </main>

      {/* Navegação inferior */}
      <BottomNav />
    </div>
  );
}
