import BottomNav from "./BottomNav";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      {/* <Header /> */}
      <main className="flex-1 p-4 pb-20">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
