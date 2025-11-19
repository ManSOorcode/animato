"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HourGlass({ coverFraction = 0.33 }) {
  const svgRef = useRef(null);
  const polyTopRef = useRef(null);
  const polyBottomRef = useRef(null);

  useLayoutEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const top = polyTopRef.current;
    const bottom = polyBottomRef.current;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const targetExtendX = Math.round((vw * coverFraction) / (vw / 200));

    const extendedBottomLeftX = -Math.abs(targetExtendX); // negative to push left off-screen

    const bottomPointsExtended = `${extendedBottomLeftX},200 200,200 100,100`;

    // initial styles
    gsap.set(svg, {
      width: "100vw",
      height: "100vh",
      position: "absolute",
      left: 0,
      top: 0,
      pointerEvents: "none",
      transformOrigin: "50% 50%",

      rotate: 30,
      scale: 0.18,
      opacity: 0,
    });

    gsap.set([top, bottom], { transformOrigin: "50% 50%" });

    const tl = gsap.timeline();

    tl.to(svg, {
      opacity: 1,
      scale: 0.9,
      duration: 0.6,
      ease: "power2.out",
    });

    tl.to(svg, {
      scale: 1.05,
      duration: 1.0,
      ease: "power3.out",
    });

    tl.to(
      svg,
      {
        scaleY: 1.6,
        duration: 0.9,
        ease: "power2.inOut",
      },
      "-=0.4"
    );

    const topPointsExtended = `0,-150 200,-150 100,100`;

    tl.to(
      top,
      {
        attr: { points: topPointsExtended },
        duration: 1.0,
        ease: "power2.inOut",
      },
      "-=0.6"
    );

    tl.to(
      bottom,
      {
        attr: { points: bottomPointsExtended },
        duration: 1.0,
        ease: "power2.inOut",
      },
      "-=0.6"
    );

    tl.to(
      svg,
      {
        scaleX: 1.8,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.8"
    );

    tl.to(
      svg,
      {
        rotate: 240,
        duration: 1.0,
        ease: "power2.inOut",
      },
      "-=0.3"
    );

    tl.to(
      svg,
      {
        scale: 1.02,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        opacity: 1,
      },
      "+=0.2"
    );

    return () => {
      tl.kill();
      gsap.set(svg, { clearProps: "all" });
    };
  }, [coverFraction]);
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
    >
      <polygon
        ref={polyTopRef}
        points="0,0 200,0 100,100"
        fill="#9C93E8"
        opacity="1"
      />

      <polygon
        ref={polyBottomRef}
        points="0,200 200,200 100,100"
        fill="#9C93E8"
        opacity="1"
      />
    </svg>
  );
}
