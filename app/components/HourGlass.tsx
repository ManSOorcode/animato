"use client";
import { forwardRef, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
interface HourGlassProps {
  coverFraction?: number;
}

const HourGlass = forwardRef<SVGSVGElement, HourGlassProps>(function HourGlass(
  { coverFraction = 0.33 },
  externalRef
) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const polyTopRef = useRef(null);
  const polyBottomRef = useRef(null);

  const setRefs = (node: SVGSVGElement | null) => {
    svgRef.current = node;

    if (typeof externalRef === "function") {
      externalRef(node);
    } else if (externalRef) {
      externalRef.current = node;
    }
  };

  useLayoutEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const top = polyTopRef.current;
    const bottom = polyBottomRef.current;

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
        scaleY: 2.12,
        duration: 0.9,
        ease: "power2.inOut",
      },
      "-=0.4"
    );

    const topPointsExtended = `0,-250 200,-250 100,100`;

    tl.to(
      top,
      {
        attr: { points: topPointsExtended },
        duration: 1.0,
        ease: "power2.inOut",
      },
      "-=0.6"
    );

    const bottomPointsExtended = "-320,340 204,160 100,100";

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
        rotateZ: 400,
        duration: 1.0,

        ease: "power2.inOut",
      },
      "-=0.3"
    );

    tl.add(() => {
      gsap.set(svg, { rotateZ: gsap.getProperty(svg, "rotateZ") });

      if (svg) svg.dataset.ready = "1";
    });

    return () => {
      tl.kill();
      gsap.set(svg, { clearProps: "all" });
    };
  }, [coverFraction]);
  return (
    <svg
      ref={setRefs}
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
});

export default HourGlass;
