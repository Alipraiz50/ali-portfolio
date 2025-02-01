"use client"
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNode, FaDocker, FaGithub, FaDatabase, FaGithubAlt, FaSass } from "react-icons/fa"; // Importing react-icons
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFirebase, SiPrisma, SiExpress } from "react-icons/si";

interface WhatCanIDoProps {
  theme: "light" | "dark";
  setIsThemeSection: React.Dispatch<React.SetStateAction<boolean>>;
}

type Skill = { category: string; skills: { name: string; icon: JSX.Element }[] };

const WhatCanIDo: React.FC<WhatCanIDoProps> = ({ theme, setIsThemeSection }) => {
  const skills: Skill[] = [
    {
      category: "Skills",
      skills: [
        { name: "React", icon: <FaReact size={20} /> },
        { name: "Next.js", icon: <SiNextdotjs size={20} /> },
        { name: "HTML", icon: <FaHtml5 size={20} /> },
        { name: "CSS", icon: <FaCss3Alt size={20} /> },
        { name: "JavaScript", icon: <FaJs size={20} /> },
        { name: "TypeScript", icon: <SiTypescript size={20} /> },
        { name: "TailwindCss", icon: <SiTailwindcss size={20} /> },
        { name: "REST API", icon: <FaNode size={20} /> },
        { name: "SASS", icon: <FaSass size={20} /> },
        { name: "Babel", icon: <FaJs size={20} /> },
        { name: "FireBase", icon: <SiFirebase size={20} /> },
        { name: "Express Js", icon: <SiExpress size={20} /> },
      ],
    },
    {
      category: "Tools",
      skills: [
        { name: "Docker", icon: <FaDocker size={20} /> },
        { name: "Prisma", icon: <SiPrisma size={20} /> },
        { name: "Postgres SQL", icon: <FaDatabase size={20} /> },
        { name: "Git", icon: <FaGithub size={20} /> },
        { name: "Framer", icon: <FaGithubAlt size={20} /> },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMounted.current) {
            controls.start("visible");
            setIsThemeSection(false);
          } else if (!entry.isIntersecting && hasMounted.current) {
            controls.start("hidden");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      hasMounted.current = false;
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls, setIsThemeSection]);

  return (
    <div
      ref={sectionRef}
      id="what-can-i-do"
      className={`relative min-h-screen flex flex-col ${
        theme === "dark" ? "bg-[#121212] text-white" : "bg-[#f4f4f4] text-purple-800"
      }`}
    >
      <section className="lg:grid flex flex-col justify-center lg:grid-cols-2 gap-8 px-8 md:px-[200px] items-center min-h-screen">
        <div className="flex flex-col justify-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: -200 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-left text-center font-extrabold mb-6 font-parkinsans">
              My Skills
            </h2>
            <div className="flex lg:justify-normal justify-center space-x-6 mb-6">
              {skills.map((skill, index) => (
                <button
                  key={skill.category}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-2 text-[13px] lg:text-[16px] font-semibold rounded-lg transition-all ${
                    activeTab === index
                      ? theme === "dark"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {skill.category}
                </button>
              ))}
            </div>
          </motion.div>
          <motion.p
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="text-lg leading-relaxed font-josefin lg:text-left text-justify"
          >
            Here&apos;s a breakdown of my technical skills categorized for
            clarity. I am proficient across frontend technologies, leveraging tools to deliver exceptional projects. With
            a ready-to-learn spirit, I am also very capable of learning new
            technologies to better fit a project.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 200 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            skills[activeTab].skills.map((skill, index) => (
              <motion.div
                key={index}
                className={`px-4 py-2 flex gap-[8px] font-parkinsans cursor-pointer text-sm font-medium rounded-lg shadow-md ${
                  theme === "dark"
                    ? "bg-[#313131] text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {skill.icon}
                {skill.name}
              </motion.div>
            ))
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default WhatCanIDo;
