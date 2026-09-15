import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
} from "lucide-react";
import LineAnimation from "@/components/ui/lineanimation";

const testimonials = [
  {
    id: 1,
    name: "Alexander Wright",
    role: "CEO",
    company: "Nexus Systems",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    text: "The level of professionalism and attention to detail provided by this agency is unmatched. They didn't just build a product; they helped us redefine our entire digital presence. Our conversion rate has increased by 140% since the launch.",
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "Lead Designer",
    company: "Studio Bloom",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Collaborating with this team felt like having an elite extension of our own core staff. Their creative vision is fresh, bold, and perfectly aligned with modern SaaS trends. I've never seen such a seamless integration of design and engineering.",
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Founder",
    company: "QuantFlow",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    text: "As a technical founder, I'm extremely picky about performance. The solutions delivered were not only beautiful but blazing fast. They understood our complex requirements from day one and executed flawlessly on every milestone.",
    rating: 5,
    verified: true,
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "VP of Marketing",
    company: "CloudScale",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Rarely do you find an agency that truly understands the intersection of marketing strategy and technical execution. They delivered a platform that is not only a joy for our users but a powerful lead generation engine for our team.",
    rating: 5,
    verified: true,
  },
];

export default function TestimonialsCarousel() {
  const scrollItems = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#07111E] py-24"
    >
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

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Trusted by Clients Worldwide
            </h2>
            <div className="flex w-full justify-center">
              <LineAnimation />
            </div>

            <p className="mx-auto mt-3 max-w-2xl font-sans text-lg text-slate-400">
              See what our clients say about working with our agency.
            </p>
          </motion.div>
        </div>

        {/* Infinite Scroller */}
        <div className="group relative">
          {/* Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#07111E] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#07111E] to-transparent" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 py-4"
              animate={{
                x: [0, -1800], // Approximation of half the double-array width
              }}
              transition={{
                duration: 35,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{ display: "flex" }}
              //   whileHover={{ animationPlayState: 'paused' }}
            >
              {scrollItems.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="relative flex h-full w-[350px] shrink-0 flex-col rounded-2xl border border-white/[0.06] bg-[#091424] p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)] md:w-[450px]"
                >
                  {/* Star Rating */}
                  <div className="mb-6 flex items-center gap-1 text-emerald-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#34d399" stroke="none" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <div className="flex-1">
                    <p className="mb-8 font-sans text-lg leading-relaxed text-slate-300">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="mt-auto flex items-center gap-4 border-t border-white/[0.06] pt-6">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <h4 className="truncate font-display text-sm font-semibold text-white">
                          {testimonial.name}
                        </h4>
                        {testimonial.verified && (
                          <CheckCircle2
                            size={12}
                            className="shrink-0 text-emerald-400"
                          />
                        )}
                      </div>
                      <p className="truncate font-sans text-xs text-slate-500">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
