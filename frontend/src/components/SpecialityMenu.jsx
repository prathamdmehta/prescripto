import React, { useEffect, useRef } from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SpecialityMenu = () => {
    const logosRef = useRef([]); // Reference for all logos
    const sectionRef = useRef(null); // Reference for the section

    useEffect(() => {
        // Register GSAP's ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Animate the logos with a smooth popup effect
        gsap.fromTo(
            logosRef.current,
            { scale: 0.8, opacity: 0, y: 50 }, // Start slightly smaller, semi-transparent, and offset
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.5, // Shorter duration for smoothness
                ease: 'power3.out', // Smooth easing for popup effect
                stagger: 0.25, // Slight delay between each logo animation
                scrollTrigger: {
                    trigger: sectionRef.current, // Trigger animation when this section enters the viewport
                    start: 'top 70%', // Start when the section hits 75% of the viewport
                    toggleActions: 'play none none none', // Play once and don't repeat
                },
            }
        );
    }, []);

    return (
        <div ref={sectionRef} id="speciality" className="flex flex-col items-center gap-4 py-16 text-[#262626]">
            <h1 className="text-3xl font-medium">Find by Speciality</h1>
            <p className="sm:w-1/3 text-center text-sm">
                Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>
            <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
                        key={index}
                        ref={(el) => (logosRef.current[index] = el)} // Add each logo to the reference array
                    >
                        <img className="w-16 sm:w-24 mb-2 hover:translate-y-[-10px] transition-all duration-500" src={item.image} alt={item.speciality} />
                        <p>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;
// update

