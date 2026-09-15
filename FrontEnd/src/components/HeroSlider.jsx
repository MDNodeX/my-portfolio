import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Palette,
  BarChart3,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RouteContact } from "@/helpers/RouteName";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Landing Page Design",
    subtitle: "Next-Gen Web Experiences",
    description:
      "Building the next generation of web applications with cutting-edge technologies. Fast, secure, and infinitely scalable.",
    accent: "from-blue-500 to-cyan-400",
    icon: <Code2 className="w-6 h-6" />,
    features: ["React & Node.js", "Frontend Development", "Performance First"],
  },
  {
    id: 2,
    title: "Landing Page Design",
    subtitle: "Pixel Perfect Design",
    description:
      "Crafting intuitive and engaging user journeys that convert. We bridge the gap between aesthetics and functionality.",
    accent: "from-purple-500 to-pink-500",
    icon: <Palette className="w-6 h-6" />,
    features: ["Interactive Prototyping", "Brand Identity", "Accessibility"],
  },
  {
    id: 3,
    title: "Landing Page Design",
    subtitle: "Data-Driven Marketing",
    description:
      "Scaling your organic reach and dominating the digital landscape. Our strategies are built on data and results.",
    accent: "from-emerald-500 to-teal-400",
    icon: <BarChart3 className="w-6 h-6" />,
    features: ["Conversion Optimization", "Content Strategy", "Growth Hacking"],
  },
];

const SlideCard = ({ slide }) => {
  return (
    <div
      className="
        h-full
        rounded-2xl
        border
        //border-[rgba(27,58,92,.5)]
        border-[#00BF84]
        bg-[rgba(27,58,92,.18)]
        backdrop-blur-xl
        p-10
        flex flex-col
        justify-center
        text-center
      "
    >
      <div className="flex items-center justify-center gap-2 mb-8">
        <div
          className={cn(
            "p-2 rounded-lg shadow-lg bg-gradient-to-br",
            slide.accent,
          )}
        >
          {slide.icon}
        </div>

        <span className="uppercase tracking-widest text-center text-white/60 text-sm font-semibold">
          {slide.subtitle}
        </span>
      </div>

      <h2 className="text-4xl lg:text-5xl font-bold leading-none mb-8">
        {slide.title.split(" ").map((word, i) => (
          <span
            key={i}
            className={cn(
              i >= slide.title.split(" ").length - 2 &&
                "text-transparent bg-clip-text bg-gradient-to-r",
              i >= slide.title.split(" ").length - 2 && slide.accent,
            )}
          >
            {word}{" "}
          </span>
        ))}
      </h2>

      <p className="text-white/60 text-lg leading-8 mb-10">
        {slide.description}
      </p>

      <div className="flex justify-center gap-4">
        <Button variant="primaryRed" size="lg">
          <Link to={RouteContact}>Get Started</Link>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="border-white/10 text-white"
        >
          Case Studies
        </Button>
      </div>
    </div>
  );
};
export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const visibleSlides = [
    slides[current],
    slides[(current + 1) % slides.length],
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-80px)] py-20 px-4 overflow-hidden bg-[#07111E] border-b border-gray-100 py-10 lg:px-18 lg:py-30"
      style={{
        background: `
      radial-gradient(circle at 12% 45%, rgba(62, 124, 177, 0.18) 0%, transparent 45%),
      radial-gradient(circle at 88% 30%, rgba(0, 48, 87, 0.35) 0%, transparent 55%),
      linear-gradient(160deg, #0A1628 0%, #050B14 100%)
    `,
      }}
    >
      {" "}
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse delay-700" />
      </div>
      <div className="mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{
              x: direction > 0 ? 120 : -120,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: direction > 0 ? -120 : 120,
              opacity: 0,
            }}
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
            className="grid lg:grid-cols-2 gap-8 w-full"
          >
            {visibleSlides.map((slide) => (
              <SlideCard key={slide.id} slide={slide} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Navigation Controls */}
      <div className="absolute bottom-4 lg:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-8">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full glass hover:bg-white/10 transition-colors border-white/10 text-white/60 hover:text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex space-x-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={cn(
                "h-1.5 transition-all duration-300 rounded-full",
                current === i
                  ? cn("w-12", `bg-gradient-to-r ${slides[current].accent}`)
                  : "w-4 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full glass hover:bg-white/10 transition-colors border-white/10 text-white/60 hover:text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
