import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollProgressBar = () => {
  const progressBarRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(progressBarRef.current, {
      scaleX: 1, // Fills the width
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Smooth animation
      },
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-gray-300 z-50">
      <div
        ref={progressBarRef}
        className="h-full  origin-left scale-x-0"
        style={{
          background: "linear-gradient(to right, #0099FF, #0044CC, #8000FF)",
        }}
      ></div>
    </div>
  );
};

export default ScrollProgressBar;
