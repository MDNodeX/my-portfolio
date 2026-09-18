import {
  CardHeader,
  CardTitle,
  Card,
  CardDescription,
} from "@/components/ui/card";
import aboutpagehead from "@/assets/images/10002.svg";
import { HeroSlider } from "@/components/HeroSlider";
import Serviceboxes from "@/components/ui/Serviceboxes";

import React from "react";
import { FaServicestack } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import FadeIn from "@/components/motion/FadeIn";
import {
  Check,
  Rocket,
  Layers,
  Cpu,
  Sparkles,
  MessageSquare,
  ClipboardList,
  Palette,
  Code2,
  Eye,
  Globe,
  Atom,
  ShoppingCart,
  RefreshCw,
  Bug,
  ArrowRight,
} from "lucide-react";

const plans = [
  {
    tier: "Starter",
    name: "Landing Page",
    price: "৳15,000",
    originalPrice: "৳20,000",
    save: "Save 25%",
    popular: false,
    icon: Rocket,
    features: [
      "Single-page responsive design",
      "Performance & speed optimization",
      "Contact form integration",
      "Basic SEO setup",
      "2 rounds of revisions",
    ],
    cta: "Get started",
  },
  {
    tier: "Professional",
    name: "Multi-Page Website",
    price: "৳35,000",
    originalPrice: "৳50,000",
    save: "Save 30%",
    popular: true,
    icon: Layers,
    features: [
      "Up to 10 custom pages",
      "CMS integration (WordPress)",
      "E-commerce / payment gateway setup",
      "Advanced SEO optimization",
      "Analytics dashboard setup",
      "5 rounds of revisions",
    ],
    cta: "Get started",
  },
  {
    tier: "Enterprise",
    name: "Web Application",
    price: "৳80,000",
    originalPrice: "৳120,000",
    save: "Save 33%",
    popular: false,
    icon: Cpu,
    features: [
      "Custom web application (React/Next.js)",
      "Custom API & backend development",
      "Advanced database design & integration",
      "User authentication & roles",
      "Cloud deployment (AWS/GCP) & CI/CD",
      "Priority support & unlimited revisions",
    ],
    cta: "Contact sales",
  },
];

const services = [
  {
    name: "Landing Page",
    subtext: "Landing Page",
    price: "৳15,000",
    save: "Save 25%",
    icon: Rocket,
    features: [
      "Single-page responsive design",
      "Performance & speed optimization",
      "Contact form integration",
      "Basic SEO setup",
      "2 rounds of revisions",
    ],
    cta: "Get started",
  },
  {
    name: "Landing Page",
    subtext: "Landing Page",
    price: "৳15,000",
    save: "Save 25%",
    icon: Rocket,
    features: [
      "Single-page responsive design",
      "Performance & speed optimization",
      "Contact form integration",
      "Basic SEO setup",
      "2 rounds of revisions",
    ],
    cta: "Get started",
  },
  {
    name: "Landing Page",
    subtext: "Landing Page",
    price: "৳15,000",
    save: "Save 25%",
    icon: Rocket,
    features: [
      "Single-page responsive design",
      "Performance & speed optimization",
      "Contact form integration",
      "Basic SEO setup",
      "2 rounds of revisions",
    ],
    cta: "Get started",
  },
];

const steps = [
  {
    number: "01",
    title: "Conversation",
    description:
      "I discuss with every client to understand the project needs and requirements thoroughly.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Planning",
    description:
      "Creating a detailed roadmap that gives high potential to every project.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Design",
    description:
      "Crafting clean, modern, and conversion-focused interfaces users love.",
    icon: Palette,
  },
  {
    number: "04",
    title: "Development",
    description:
      "Building with clean, optimized, and well-structured code that scales.",
    icon: Code2,
  },
  {
    number: "05",
    title: "Review",
    description:
      "Sending for client review and refining until every detail is perfect.",
    icon: Eye,
  },
  {
    number: "06",
    title: "Launch",
    description: "Publishing the final product and providing ongoing support.",
    icon: Rocket,
  },
];

{
  /* aditional section */
}
const addons = [
  { name: "Additional Pages", price: "৳3,000/page" },
  { name: "Logo Design", price: "From ৳10,000" },
  { name: "Professional Copywriting", price: "৳2,500/page" },
  { name: "Multi-Language Setup", price: "From ৳15,000" },
  { name: "Premium Stock Images", price: "৳5,000" },
  { name: "CRM Integration", price: "From ৳15,000" },
];
const Service = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />

        <FadeIn className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="lg:text-7xl text-5xl font-black text-white flex items-center justify-center gap-2">
            Our <div className="text-[#00CAA0]">Services</div>
          </h1>
        </FadeIn>
      </section>
      <section>
        <Serviceboxes />
      </section>
      <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <FadeIn className="mb-10 text-center sm:mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Optional Add-ons
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-400 sm:text-base">
              Enhance your web development project with these powerful add-ons
            </p>
          </FadeIn>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addons.map((addon, i) => (
              <FadeIn key={addon.name} delay={(i % 3) * 0.08}>
                <div className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-[#091424] p-5 transition-all duration-300 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)] sm:flex-row sm:items-center sm:gap-3">
                  <h3 className="text-base font-semibold leading-snug text-white sm:text-[15px]">
                    {addon.name}
                  </h3>
                  <span className="inline-block flex-shrink-0 whitespace-nowrap rounded-full bg-emerald-400/10 px-3 py-1.5 text-sm font-medium text-emerald-400">
                    {addon.price}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        {/* pricing section */}
        <div className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <FadeIn className="mb-10 text-center sm:mb-14">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium tracking-wide text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                Pricing
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                One-Time Plans
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-400 sm:text-base">
                Simple, transparent pricing. Pick the plan that fits your
                project — no hidden fees.
              </p>
            </FadeIn>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-center lg:gap-6">
              {plans.map((plan, i) => {
                const Icon = plan.icon;
                return (
                  <FadeIn key={plan.name} delay={(i % 3) * 0.1}>
                    <div
                      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-7 ${
                        plan.popular
                          ? "border-emerald-400/40 bg-[#091424] shadow-[0_0_0_1px_rgba(52,211,153,0.15),0_20px_60px_-15px_rgba(16,185,129,0.35)] lg:scale-[1.05] lg:py-10"
                          : "border-white/[0.06] bg-[#091424] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] hover:border-white/[0.12] hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.15)]"
                      }`}
                    >
                      {/* Watermark icon */}
                      <Icon
                        className={`pointer-events-none absolute -right-4 -top-4 h-28 w-28 rotate-12 transition-transform duration-500 group-hover:rotate-6 ${
                          plan.popular
                            ? "text-emerald-400/[0.08]"
                            : "text-white/[0.03]"
                        }`}
                        strokeWidth={1}
                      />

                      {/* Most popular badge */}
                      {plan.popular && (
                        <span className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#04342C] shadow-[0_0_20px_rgba(52,211,153,0.5)]">
                          Most popular
                        </span>
                      )}

                      <div className="relative">
                        <span
                          className={`text-xs font-semibold uppercase tracking-widest ${
                            plan.popular
                              ? "text-emerald-400"
                              : "text-emerald-400/70"
                          }`}
                        >
                          {plan.tier}
                        </span>
                        <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                          {plan.name}
                        </h3>

                        <div className="mt-5 flex items-baseline gap-2">
                          <span className="text-sm text-slate-500 line-through">
                            {plan.originalPrice}
                          </span>
                        </div>
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-white sm:text-4xl">
                            {plan.price}
                          </span>
                        </div>
                        <span className="mt-2 inline-block rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                          {plan.save}
                        </span>

                        <div className="my-6 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                        <ul className="space-y-3">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2.5"
                            >
                              <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                                <Check
                                  className="h-2.5 w-2.5 text-emerald-400"
                                  strokeWidth={3}
                                />
                              </span>
                              <span className="text-sm leading-snug text-slate-300">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="relative mt-8">
                        {plan.popular ? (
                          <Button className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 font-semibold text-[#04342C] shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] hover:from-emerald-300 hover:to-teal-400">
                            {plan.cta}
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full border-white/15 bg-transparent font-semibold text-white hover:border-emerald-400/40 hover:bg-emerald-400/5 hover:text-emerald-400"
                          >
                            {plan.cta}
                          </Button>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
