import aboutpagehead from "@/assets/images/10002.svg";
import bannerImage from "@/assets/images/webandappdev.png";
import { Link } from "react-router-dom";
import { RouteContact } from "@/helpers/RouteName";
import aboutImage from "@/assets/images/about.jpg";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/motion/FadeIn";

import React, { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Clock,
  Star,
  Calendar,
  Check,
  Cpu,
  Zap,
  Bot,
  TrendingUp,
  Palette,
  Sparkles,
  ChevronDown,
  ShoppingBag,
  Code2,
} from "lucide-react";

import {
  SiWordpress,
  SiElementor,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiWix,
  SiShopify,
  SiWebflow,
  SiUpwork,
  SiFreelancer,
  SiFiverr,
} from "react-icons/si";

const coreStack = [
  {
    name: "WordPress",
    icon: SiWordpress,
    color: "text-sky-400",
    bg: "bg-sky-500/15",
  },
  {
    name: "Elementor",
    icon: SiElementor,
    color: "text-pink-400",
    bg: "bg-pink-500/15",
  },
  {
    name: "React.js",
    icon: SiReact,
    color: "text-cyan-400",
    bg: "bg-cyan-500/15",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "text-emerald-400",
    bg: "bg-emerald-400/15",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-green-400",
    bg: "bg-green-500/15",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    color: "text-slate-300",
    bg: "bg-white/10",
  },
];

const expertise = [
  {
    name: "AI Integration",
    icon: Cpu,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
  },
  {
    name: "AI Automation",
    icon: Zap,
    color: "text-cyan-400",
    bg: "bg-cyan-500/15",
  },
  {
    name: "AI Chatbot",
    icon: Bot,
    color: "text-rose-400",
    bg: "bg-rose-500/15",
  },
  {
    name: "SEO",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-400/15",
  },
  { name: "Wix", icon: SiWix, color: "text-blue-400", bg: "bg-blue-500/15" },
  {
    name: "Shopify",
    icon: SiShopify,
    color: "text-green-400",
    bg: "bg-green-500/15",
  },
  {
    name: "Webflow",
    icon: SiWebflow,
    color: "text-indigo-400",
    bg: "bg-indigo-500/15",
  },
  {
    name: "Photoshop & Illustrator",
    icon: Palette,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
  },
];

//where i work
const platforms = [
  {
    name: "Upwork",
    icon: SiUpwork,
    color: "#6FDA44",
  },
  {
    name: "Freelancer",
    icon: SiFreelancer,
    color: "#29B2FE",
  },
  {
    name: "Fiverr",
    icon: SiFiverr,
    color: "#1DBF73",
  },
  {
    name: "ThemeForest",
    icon: ShoppingBag,
    color: "#D2792A",
  },
  {
    name: "DevSquad",
    icon: Code2,
    color: "#3B82F6",
  },
];

const progressSteps = [
  { label: "Discovery & Strategy", percent: 99 },
  { label: "Design & Development", percent: 98 },
  { label: "Testing & Launch", percent: 100 },
];

const accordionItems = [
  {
    title: "Unlock Your Potential",
    description:
      "We help you identify and seize new opportunities for growth and innovation through comprehensive digital audits and strategic planning.",
  },
  {
    title: "Build a Better Business",
    description:
      "We craft tailored strategies and scalable systems that turn your vision into a stronger, more resilient business — built to grow with you.",
  },
  {
    title: "Achieve Your Goals",
    description:
      "We stay by your side from launch to growth, tracking results and refining our approach until every goal is met.",
  },
];

// Counts from 0 -> target once `start` becomes true — same approach as
// the StatsSection count-up, reused here for the percentage labels.
function useCountUp(target, start, duration = 1000) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return value;
}

function ProgressBar({ label, percent, inView }) {
  const count = useCountUp(percent, inView);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-white">{label}</span>
        <span className="font-semibold text-emerald-400">{count}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-1000 ease-out"
          style={{ width: inView ? `${percent}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function AccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border bg-[#091424] p-6 transition-all duration-300 ${
        isOpen
          ? "border-emerald-400/40 shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)]"
          : "border-white/[0.06] hover:border-emerald-400/20"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-sm font-bold text-emerald-400">
            {index + 1}
          </span>
          <span className="text-base font-bold text-white sm:text-lg">
            {item.title}
          </span>
        </div>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "mt-3 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pl-12 text-sm leading-relaxed text-slate-400 sm:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

const SectionEyebrow = ({ children, icon: Icon }) => (
  <div className="mb-10 flex items-center justify-center gap-3 sm:mb-12">
    <span className="h-px w-8 bg-white/15 sm:w-14" />
    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
    <span className="h-px w-8 bg-white/15 sm:w-14" />
  </div>
);

const stats = [
  {
    value: 84,
    suffix: "+",
    label: "Jobs Completed",
    subtext: "Delivered on Upwork",
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
  },
  {
    value: 3242,
    suffix: "+",
    label: "Hours Worked",
    subtext: "Billed to clients",
    icon: Clock,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
  },
  {
    value: 100,
    suffix: "%",
    label: "Job Success",
    subtext: "Top Rated Plus",
    icon: Star,
    color: "text-emerald-400",
    bg: "bg-emerald-400/15",
  },
  {
    value: 6,
    suffix: "+",
    label: "Years Experience",
    subtext: "Building since 2020",
    icon: Calendar,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
  },
];

function StatCard({ stat }) {
  const Icon = stat.icon;
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(stat.value, inView);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#091424] p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)] sm:p-7"
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>

      <div className="mt-5 text-4xl font-extrabold text-white sm:text-5xl">
        {count.toLocaleString()}
        {stat.suffix}
      </div>

      <div className="mt-2 text-base font-semibold text-white">
        {stat.label}
      </div>
      <div className="mt-0.5 text-sm text-slate-400">{stat.subtext}</div>
    </div>
  );
}

const About = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const leftColRef = useRef(null);

  useEffect(() => {
    const el = leftColRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* page about */}
      <section
        className="relative w-full lg:py-15 py-10 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(18, 63, 100, 0.7), rgba(0, 20, 73, 0.7)), url(${aboutpagehead})`,
        }}
      >
        <FadeIn className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="lg:text-7xl text-5xl font-black text-white flex items-center justify-center gap-2">
            About <div className="text-[#c8102e]">Us</div>
          </h1>
        </FadeIn>
      </section>

      {/* about section */}
      <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Ambient background glow — matches your other sections */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />

        {/* Faint grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <FadeIn className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div
              className="w-full rounded-2xl border border-white/[0.06] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] lg:min-h-[460px] min-h-[320px]"
              style={{
                backgroundImage: `url(${aboutImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Content */}
            <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Web & Application Developer
              </span>

              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                Full-Time Web & Application Developer
              </h2>

              <p className="text-base leading-relaxed text-slate-400 sm:text-lg">
                Hi, I'm WP Hridoy — a professional Freelancer, Web Developer &
                WordPress Expert from Bangladesh with 6+ years of experience. I
                specialize in creating modern, responsive, and optimized
                websites tailored to client needs. Passionate about learning and
                improving every day, I aim to deliver top-quality results with
                lifetime support you can rely on.
              </p>

              <ul className="flex flex-col gap-3">
                {[
                  "Custom WordPress & Web App Development",
                  "Responsive, SEO-Optimized Websites",
                  "Lifetime Support & Maintenance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                      <Check
                        className="h-3 w-3 text-emerald-400"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-sm text-slate-300 sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                type="submit"
                size="lg"
                className="mt-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 font-semibold text-[#04342C] shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] hover:from-emerald-300 hover:to-teal-400"
              >
                <Link to={RouteContact}>Get In Touch</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Ambient background glow — matches your other sections */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />

        {/* Faint grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <StatCard stat={stat} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Ambient background glow — matches your other sections */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />

        {/* Faint grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Core Stack */}
          <SectionEyebrow>Core Stack</SectionEyebrow>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {coreStack.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <FadeIn key={tech.name} delay={(i % 6) * 0.06}>
                <div
                  className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-[#091424] p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)]"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${tech.bg} ${tech.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold text-white">
                    {tech.name}
                  </span>
                </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Additional Expertise */}
          <div className="mt-16 sm:mt-20">
            <SectionEyebrow icon={Sparkles}>
              Additional Expertise
            </SectionEyebrow>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {expertise.map((item, i) => {
                const Icon = item.icon;
                return (
                  <FadeIn key={item.name} delay={(i % 4) * 0.08}>
                  <div
                    className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#091424] p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)]"
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-white sm:text-base">
                      {item.name}
                    </span>
                  </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Ambient background glow — matches your other sections */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />

        {/* Faint grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column */}
            <FadeIn direction="left">
            <div ref={leftColRef}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Our Approach
                </span>
              </div>

              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                How We Drive Innovation & Growth
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
                We follow a proven process to ensure the success of every
                project. We start by understanding your business and goals,
                create a custom strategy, and work closely with you throughout.
              </p>

              <div className="mt-8 flex flex-col gap-6">
                {progressSteps.map((step) => (
                  <ProgressBar
                    key={step.label}
                    label={step.label}
                    percent={step.percent}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
            </FadeIn>

            {/* Right column — accordion */}
            <FadeIn direction="right" className="flex flex-col gap-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? -1 : index)
                  }
                />
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* hero section */}
      <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Ambient background glow — matches your other sections */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />

        {/* Faint grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <FadeIn className="relative mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Where I Work
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-400 sm:text-base">
            Trusted across leading freelance platforms and marketplaces
          </p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            {platforms.map((platform, i) => {
              const Icon = platform.icon;
              return (
                <FadeIn key={platform.name} delay={(i % 5) * 0.06}>
                <div
                  className="group flex h-[90px] w-[190px] items-center justify-center gap-2.5 rounded-2xl border border-transparent bg-white px-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.4)]"
                >
                  <Icon
                    className="h-6 w-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: platform.color }}
                  />
                  <span className="text-lg font-bold text-slate-800">
                    {platform.name}
                  </span>
                </div>
                </FadeIn>
              );
            })}
          </div>
        </FadeIn>
      </section>
    </>
  );
};

export default About;
