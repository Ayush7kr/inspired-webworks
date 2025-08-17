import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-subtle">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-8 overflow-auto">
          <div className="page-enter">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}