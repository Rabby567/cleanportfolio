import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { PageTransition } from "./PageTransition";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <PageTransition>
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </PageTransition>
    </>
  );
}
