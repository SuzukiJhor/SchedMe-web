import BottomNav from "./BottomNav";
import Header from "./Header";

export default function AppLayout({ children }) {
  return (
    <div className="">

      <main className="flex-1 p-4 pb-20">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
