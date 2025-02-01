import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { Github, Link } from "lucide-react";

interface ProjectsProps {
  theme: "light" | "dark";
  setIsThemeSection: React.Dispatch<React.SetStateAction<boolean>>;
  hideNavbar: boolean; // New prop to control navbar visibility
}

type Project = {
  title: string;
  description: string;
  repo_link: string;
  live_link: string;
  image: string;
  tags: string[];
};

// Static project data
const projects: Project[] = [
  {
    title: "Ladun Agency",
    description: "This is a creative agency...",
    repo_link:"https://github.com/Alipraiz50/Ladun/tree/main",
    live_link: "https://ladun-ten.vercel.app/",
    image: "/images/project1.png",
    tags: ["React", "Tailwind Css", "Framer Motion"]
  },
  {
    title: "Text-To-Speech",
    description: "A tool built with Eleven Labs API...",
    repo_link: "https://github.com/Alipraiz50/Ai-Text-To-Speech",
    live_link: "https://ai-text-to-speech-rc6j.vercel.app/",
    image: "/images/project4.png",
    tags: ["Next Js", "Eleven Labs Api", "Tailwind Css"]
  },
  {
    title: "Patnite Blog",
    description: "Patnite Blog is a SaaS platform...",
    repo_link: "",
    live_link: "https://painiteblog.vercel.app/",
    image: "/images/project3.png",
    tags: ["Typescript", "Firebase", "Tailwind Css"]
  },
  {
    title: "Vibe",
    description: "Vibe is designed for effortless chat...",
    repo_link: "",
    live_link: "https://vibe-rose.vercel.app/",
    image: "/images/project5.png",
    tags: ["Realtime Chat", "Firebase", "auth", "messaging"]
  },
  {
    title: "Task Hub",
    description: "TaskHub is a task management solution...",
    repo_link: "",
    live_link: "https://taskhub-site.netlify.app/",
    image: "/images/project6.png",
    tags: ["React", "Convex", "Typescript"]
  }
];

const Projects: React.FC<ProjectsProps> = ({ theme, setIsThemeSection, hideNavbar }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const projectSectionRef = useRef<HTMLDivElement>(null);
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

    if (projectSectionRef.current) {
      observer.observe(projectSectionRef.current);
    }

    return () => {
      hasMounted.current = false;
      if (projectSectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(projectSectionRef.current);
      }
    };
  }, [controls, setIsThemeSection]);

  // Conditionally hide navbar in project section
  useEffect(() => {
    if (hideNavbar) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when navbar is hidden
    } else {
      document.body.style.overflow = 'auto'; // Allow scrolling when navbar is visible
    }
  }, [hideNavbar]);

  return (
    <div
      ref={projectSectionRef}
      id="what-i-have-built"
      className={`relative min-h-screen flex flex-col ${
        theme === "dark" ? "bg-[#121212] text-white" : "bg-[#f4f4f4] text-purple-800"
      }`}
    >
      <section className="lg:flex flex-wrap justify-center gap-8 items-center min-h-screen">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="flex flex-col justify-center px-8 md:px-[200px]"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-parkinsans">
            My Projects
          </h2>
          <p className="text-lg leading-relaxed font-josefin">
           
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: 400 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
          }}
          className="flex gap-8 overflow-x-auto w-full px-3 py-8"
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={index}
                className={`p-6 flex flex-col justify-between rounded-lg shadow-lg font-josefin cursor-pointer ${
                  theme === "dark" ? "bg-[#313131] text-white" : "bg-gray-300 text-gray-800"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  minWidth: "280px",  // Reduced min-width for smaller cards
                  maxWidth: "350px",  // Reduced max-width
                  height: "400px",    // Set a fixed height for the cards
                }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} image`}
                  width={350}
                  height={200}  // Adjusted the height for smaller image size
                  className="rounded-lg mb-4 h-[200px] object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 justify-between mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-2 py-1 text-xs font-medium rounded-md ${
                        theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 justify-center">
                  {project.repo_link && (
                    <a
                      href={project.repo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium underline ${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      <Github />
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium underline ${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      <Link />
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Projects;
