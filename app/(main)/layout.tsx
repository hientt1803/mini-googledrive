import { Header } from "@/components/header";
import { SideNav } from "./_components/side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className="container max-auto p-12">
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <SideNav />
          <div className="w-full">{children}</div>
        </div>
      </main>
    </>
  );
}
