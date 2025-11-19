"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HourGlass from "./HourGlass";

gsap.registerPlugin(ScrollTrigger);

export default function Banner() {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        videoRef.current,
        { scale: 0.5 },
        { scale: 1.7 }
      );

      ScrollTrigger.create({
        trigger: bannerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        animation: tween,
      });
    }, bannerRef); // bind GSAP to this component

    return () => ctx.revert(); // cleanup happens automatically
  }, []);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = video.getBoundingClientRect();
      const x = e.clientX - rect.left; // mouse X inside video
      const y = e.clientY - rect.top; // mouse Y inside video

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10; // max 10 deg
      const rotateY = ((x - centerX) / centerX) * -10; // max 10 deg

      gsap.to(video, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: "power1.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(video, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.3,
        ease: "power1.out",
      });
    };

    video.addEventListener("mousemove", onMouseMove);
    video.addEventListener("mouseleave", onMouseLeave);

    return () => {
      video.removeEventListener("mousemove", onMouseMove);
      video.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      //   className="relative w-full h-screen  bg-[#f7f1eb]"
    >
      <div className="absolute inset-0  pointer-events-none flex items-center justify-center">
        <HourGlass coverFraction={0.33} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          autoPlay
          muted
          loop
          className="object-cover rounded-3xl"
          style={{
            width: "60vw", // initial small size
            height: "60vh",

            transformStyle: "preserve-3d", // enable 3D transforms
            willChange: "transform", // optimize for smooth animations

            // transformStyle: "preserve-3d",
          }}
        />
      </div>
    </section>
  );
}
