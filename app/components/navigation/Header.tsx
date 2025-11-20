"use client";
import gsap from "gsap";
import { useLayoutEffect } from "react";

export default function Header() {
  useLayoutEffect(() => {
    gsap.from(["#menu", "#project"], {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      delay: 0.5,
    });
  }, []);
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4">
      <button
        id="menu"
        className="flex items-center gap-3 bg-[#D9FF62] text-black px-4 py-2 rounded-full text-sm font-medium"
      >
        <div className="flex flex-col gap-[5px]">
          <span className="block w-5 h-0.5 bg-black"></span>
          <span className="block w-5 h-0.5 bg-black"></span>
        </div>
        MENU
      </button>

      <div className="text-black font-bold text-xl tracking-tight">
        ANIMATOVE
      </div>

      <button
        id="project"
        className="bg-[#D9FF62] text-black px-5 py-2 rounded-full text-xs font-semibold"
      >
        GOT A PROJECT?
      </button>
    </header>
  );
}
