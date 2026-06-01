import type { ReactNode } from "react";

interface GameShellProps {
  title: string;
  children: ReactNode;
}

export const GameShell = ({ title, children }: GameShellProps) => (
  <main className="app-shell" aria-label={title}>
    <header className="top-header">
      <span className="brand-mark">湯</span>
      <span>{title}</span>
      <span className="header-chip">MVP</span>
    </header>
    <section className="gameplay-area">{children}</section>
    <aside className="reserved-ad-area" aria-label="広告表示予約領域">
      <span>広告エリア</span>
    </aside>
  </main>
);
