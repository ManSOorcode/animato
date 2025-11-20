"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HourGlass from "./HourGlass";
import heroSvg from "../../public/home-hero-text.svg";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Banner() {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hourglassRef = useRef<SVGSVGElement | null>(null);

  //  console.log(gsap.getProperty(hourglassRef.current, "rotateX"), "hourglass");
  useLayoutEffect(() => {
    const banner = bannerRef.current;
    const video = videoRef.current;
    const hourglass = hourglassRef.current;
    if (!video || !banner || !hourglass) return;

    const initialTilt = { rotateX: 24, rotateY: 0, rotateZ: 0 };

    const initialHG = {
      rotateX: gsap.getProperty(hourglass, "rotateX") as number,
      rotateY: gsap.getProperty(hourglass, "rotateY") as number,
      rotateZ: gsap.getProperty(hourglass, "rotateZ") as number,
    };

    // const initialHG = { rotateX: 0, rotateY: 0, rotateZ: 0 };

    gsap.delayedCall(1.02, () => {
      initialHG.rotateX = gsap.getProperty(hourglass, "rotateX") as number;
      initialHG.rotateY = gsap.getProperty(hourglass, "rotateY") as number;
      initialHG.rotateZ = gsap.getProperty(hourglass, "rotateZ") as number;
    });

    // console.log(initialHG, "hourglass");

    gsap.set(video, {
      ...initialTilt,
    });

    const onMouseMove = (e: MouseEvent) => {
      // if (video.dataset.locked === "true") return;
      if (!hourglass?.dataset?.ready) return;
      const rect = video.getBoundingClientRect();
      const x = e.clientX - rect.left; // mouse X inside video
      const y = e.clientY - rect.top; // mouse Y inside video

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = initialTilt.rotateX - ((y - centerY) / centerY) * 4;
      const rotateY = initialTilt.rotateY - ((x - centerX) / centerX) * -4;
      const rotateZ = initialTilt.rotateZ - ((x - centerX) / centerX) * 1;

      gsap.to(video, {
        rotateX: rotateX,
        rotateY: rotateY,
        rotateZ: rotateZ,
        duration: 0.4,
        ease: "power1.out",
      });

      const deltaX = (x - centerX) / centerX; // -1 → +1
      const deltaY = (y - centerY) / centerY; // -1 → +1

      gsap.killTweensOf(hourglass, "rotateX,rotateY,rotateZ");

      gsap.to(hourglass, {
        rotateX: initialHG.rotateX + deltaY * 2,
        rotateZ: initialHG.rotateZ + deltaX * 1.5,
        duration: 0.35,
        ease: "power1.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(video, {
        ...initialTilt,
        duration: 0.5,
        ease: "power1.out",
      });

      gsap.to(hourglass, { ...initialHG, duration: 0.5 });
    };

    banner.addEventListener("mousemove", onMouseMove);
    banner.addEventListener("mouseleave", onMouseLeave);

    return () => {
      banner.removeEventListener("mousemove", onMouseMove);
      banner.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useLayoutEffect(() => {
    const video = videoRef.current;
    const hourglass = hourglassRef.current;
    if (!video || !hourglass) return;
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
        // onUpdate: () => {
        //   gsap.to(video, {
        //     rotateX: 0,
        //     rotateY: 0,
        //     rotateZ: 0,
        //     duration: 0.2,
        //     // overwrite: "auto",
        //   });

        // gsap.to(hourglass, {
        //   rotateX: 0,
        //   rotateY: 0,
        //   rotateZ: 0,
        //   duration: 0.2,
        //   overwrite: "auto",
        // });
        // },

        // onEnter: () => {
        //   video.dataset.locked = "true";
        //   hourglass.dataset.locked = "true";
        // },
        // onLeaveBack: () => {
        //   video.dataset.locked = "false";
        //   hourglass.dataset.locked = "false";
        // },
      });
    }, bannerRef); // bind GSAP to this component

    return () => ctx.revert(); // cleanup happens automatically
  }, []);

  return (
    <section
      ref={bannerRef}
      className=" relative w-full h-screen overflow-hidden bg-[#EAE3DC]"
      //   className="relative w-full h-screen  bg-[#f7f1eb]"
    >
      <div className="absolute inset-0  pointer-events-none flex items-center justify-center">
        <HourGlass coverFraction={0.33} ref={hourglassRef} />
      </div>

      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <video
          ref={videoRef}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          autoPlay
          muted
          loop
          className="object-cover rounded-3xl"
          style={{
            // width: "80vw",
            height: "80vh",

            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        />
      </div>

      <div className="absolute inset-0 flex justify-between items-center px-4 text-black">
        {/* <h1 className="text-bold text-4xl flex-wrap">
          Simple text1 writen here
        </h1> */}

        <div className="max-w-xs">
          <h1 className="font-bold text-4xl leading-tight">
            Step into <br /> the Spotlight
          </h1>
        </div>
        {/* <h2 className="text-lg">Simple text writen here</h2> */}

        <div className="max-w-sm ">
          <p className="text-gray-700 text-lg leading-relaxed">
            We craft world-class spaces & events that create memories, initiate
            conversations and elevate ambitions.
          </p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
        }}
        className="flex items-end  "
      >
        <Image
          alt="home-hero-text"
          src={heroSvg}
          loading="eager"
          decoding="async"
          data-nimg="fill"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </section>
  );
}
