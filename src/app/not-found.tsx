"use client";

import { useEffect } from "react";
import Container from "./_components/container";
import { Intro } from "./_components/intro";
import Link from "next/link";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <Container>
      <Intro />
      <div className="flex flex-col items-center justify-center space-y-6">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight text-neutral-500 dark:text-slate-500 text-center">
          404 <br /> Seite nicht gefunden
        </h2>

        <p className="text-center text-lg md:text-xl text-neutral-500 dark:text-slate-500">
          Entschuldigung, die von Ihnen aufgerufene Seite konnte nicht gefunden
          werden.
        </p>

        <Link
          href="/"
          className="bg-black dark:bg-slate-800 dark:text-slate-400 hover:bg-white hover:text-black text-white font-bold px-4 py-2 duration-200 transition-colors border border-black dark:border-slate-800 rounded"
        >
          Zur Startseite
        </Link>
      </div>
    </Container>
  );
}
