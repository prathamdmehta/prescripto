import { useEffect } from "react";
import { gsap } from "gsap";

const ClickSpark = () => {
  useEffect(() => {
    const createSpark = (e) => {
      const numSparks = 10; // Number of spark particles
      const radius = 40; // Distance sparks travel
      const duration = 0.6; // Animation duration
      const colors = ["#ff4d4d", "#ffcc00", "#ff66ff", "#00ccff"]; // Random colors

      for (let i = 0; i < numSparks; i++) {
        const angle = (i / numSparks) * 360; // Evenly space sparks
        const spark = document.createElement("div");

        // Use `pageX` and `pageY` for accurate positioning while scrolling
        Object.assign(spark.style, {
          position: "absolute",
          width: "15px",
          height: "15px",
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          borderRadius: "50%",
          pointerEvents: "none",
          left: `${e.pageX}px`, // Adjusted for scrolling
          top: `${e.pageY}px`, // Adjusted for scrolling
          transform: "translate(-50%, -50%)", // Center the spark
          zIndex: "9999",
        });

        document.body.appendChild(spark);

        // Convert angle to radians for movement
        const radians = (angle * Math.PI) / 180;
        const x = Math.cos(radians) * radius;
        const y = Math.sin(radians) * radius;

        // Animate spark explosion effect
        gsap.to(spark, {
          x: x,
          y: y,
          opacity: 0,
          scale: 0,
          duration: duration,
          ease: "power2.out",
          onComplete: () => spark.remove(), // Remove after animation
        });
      }
    };

    // Add event listener for clicks
    document.addEventListener("click", createSpark);

    return () => {
      document.removeEventListener("click", createSpark);
    };
  }, []);

  return null; // No UI needed
};

export default ClickSpark;
