// src/components/layout/PageTransition.tsx
import { useLocation } from "react-router-dom";
import "./EffectGlitch.css";

export default function EffectGlitch({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();
  return (
    <>
      <div key={`${pathname}-tv`} className="tv-static" aria-hidden="true" />
      <div key={pathname} className="page-glitch">
        {children}
      </div>
    </>
  );
}
