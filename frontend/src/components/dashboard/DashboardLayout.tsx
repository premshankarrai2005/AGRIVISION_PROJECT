import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-1 flex-col bg-gray-100">
        <Navbar />

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}