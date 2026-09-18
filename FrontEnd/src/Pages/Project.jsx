import React, { useState } from "react";
import { Lock } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";

// Base URL with optimization params baked in
// Full-height screenshot, width-constrained only
const CLOUD_BASE =
  "https://res.cloudinary.com/dl913bem7/image/upload/w_800,q_auto,f_auto";

const categories = ["All", "Landing Page", "Business", "SaaS", "Healthcare"];

const portfolios = [
  {
    id: 1,
    title: "Business Website",
    domain: "xpeng-c-club.vercel.app",
    url: "https://xpeng-c-club.vercel.app",
    category: "Business",
    image: `${CLOUD_BASE}/v1789655248/1002_bkog9p.png`,
  },
  {
    id: 2,
    title: "Marketing Agency",
    domain: "www.wphridoy.com",
    url: "https://www.wphridoy.com/",
    category: "SaaS",
    image: `${CLOUD_BASE}/v1789655258/1005_hthnsc.png`,
  },
  {
    id: 3,
    title: "AI Marketing Platform",
    domain: "prprophetai.com",
    category: "SaaS",
    image: `${CLOUD_BASE}/v1789655261/1003_bzxtiw.png`,
  },
  {
    id: 4,
    title: "Influencer Marketing",
    domain: "influencermarketingai.com",
    category: "Landing Page",
    image: `${CLOUD_BASE}/v1789655263/1006_yxdtpp.png`,
  },
  {
    id: 5,
    title: "Airport Transfer Service",
    domain: "pointtopointexpress.com",
    category: "Business",
    image: `${CLOUD_BASE}/v1789655258/1005_hthnsc.png`,
  },
  {
    id: 6,
    title: "Construction Company",
    domain: "jvsgcconstruction.com",
    category: "Business",
    image: `${CLOUD_BASE}/v1789655248/1002_bkog9p.png`,
  },
];

const BrowserCard = ({ portfolio }) => (
  <a
    href={portfolio.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Open ${portfolio.title} in a new tab`}
    className="group block cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-[#091424] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111E]"
  >
    <div className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#091424] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)]">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0B1B2E] px-4 py-3">
        <div className="flex flex-shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[0.04] px-3 py-1.5">
          <Lock
            className="h-3 w-3 flex-shrink-0 text-slate-500"
            strokeWidth={2}
          />
          <span className="truncate text-xs text-slate-400">
            {portfolio.domain}
          </span>
        </div>
      </div>

      {/* Screenshot */}
      <div className="relative h-[220px] overflow-hidden sm:h-[260px]">
        <img
          src={portfolio.image}
          alt={portfolio.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-[object-position] duration-[3000ms] ease-linear will-change-[object-position] group-hover:[object-position:50%_100%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#091424]/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Title */}
      <div className="flex items-center justify-between p-5">
        <h3 className="text-lg font-bold text-white">{portfolio.title}</h3>
        <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
          {portfolio.category}
        </span>
      </div>
    </div>
  </a>
);

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPortfolios =
    activeCategory === "All"
      ? portfolios
      : portfolios.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Ambient background glow — matches your other sections */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />

        <FadeIn className="relative z-10 max-w-7xl  mx-auto text-center ">
          <h1 className="lg:text-7xl text-5xl font-black text-white flex items-center justify-center gap-2">
            Our Recent <div className="text-[#00CAA0]">Projects</div>
          </h1>
        </FadeIn>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <FadeIn className="mb-10 text-center sm:mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Recent Projects
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-400 sm:text-base">
              A few of the products and websites we've shipped recently.
            </p>
          </FadeIn>

          {/* Category filter pills */}
          <FadeIn
            delay={0.1}
            className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:mb-14"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-emerald-400 text-[#04342C] shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)]"
                    : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-emerald-400/30 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </FadeIn>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPortfolios.map((portfolio, i) => (
              <FadeIn key={portfolio.id} delay={(i % 3) * 0.1}>
                <BrowserCard portfolio={portfolio} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;
