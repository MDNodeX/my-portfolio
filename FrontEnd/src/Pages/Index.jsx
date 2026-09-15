import React, { useEffect } from "react";
import ContactForm from "@/components/contact-form";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import LineAnimation from "@/components/ui/lineanimation";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
  FaGithub,
  FaBehance,
  FaInstagram,
} from "react-icons/fa6";

// import { Button } from "@/components/ui/button";
import { FaServicestack } from "react-icons/fa";
// import { RouteContact } from "@/helpers/RouteName";

import Hero from "@/components/Hero.jsx";

import { useDispatch, useSelector } from "react-redux";
// import { fetchBlogs } from "@/redux/blog/blog.slice";
import BlogCard from "@/components/BlogCard.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Loading from "@/components/Loading";

const contactItems = [
  {
    label: "EMAIL",
    value: "hello@wphridoy.com",
    icon: Mail,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
  },
  {
    label: "CALL / WHATSAPP",
    value: "+8801329 32 35 31",
    icon: Phone,
    color: "text-emerald-400",
    bg: "bg-emerald-400/15",
  },
  {
    label: "LOCATION",
    value: "Narsingdi, Dhaka, Bangladesh",
    icon: MapPin,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
  },
  {
    label: "TIME ZONE",
    value: "UTC+6 Asia/Dhaka",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
  },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
  { label: "YouTube", href: "#", icon: FaYoutube },
  { label: "X", href: "#", icon: FaXTwitter },
  { label: "GitHub", href: "#", icon: FaGithub },
  { label: "Behance", href: "#", icon: FaBehance },
  { label: "Instagram", href: "#", icon: FaInstagram },
];

//contact form fungtion

const Index = () => {
  // const dispatch = useDispatch();
  // const { blogs } = useSelector((state) => state.blog);

  // useEffect(() => {
  //   dispatch(fetchBlogs());
  // }, [dispatch]);
  // if (Loading) return <Loading />;
  return (
    <>
      {/* new bannar */}
      <div className="animate-fade-in">
        <Hero />
      </div>

      {/* blog post */}
      {/* <section>
        <BlogCard limit={3} blogs={blogs?.slice(0, 3)} />
      </section> */}

      {/* testimonials section */}
      <section className="">
        <TestimonialsCarousel />
      </section>
      {/* contact section */}
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

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Context & Info */}
          <div className="space-y-10 lg:col-span-7">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Available for new projects
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-black leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                  Let's build something great
                </h2>
                <p className="max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
                  Tell me about your project and I'll get back to you within 24
                  hours. Prefer a quick chat? Reach out on any channel below.
                </p>
              </motion.div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#091424] p-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)]"
                  >
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-white sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Presence */}
            <div className="space-y-5 border-t border-white/10 pt-7">
              <h5 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                Follow
              </h5>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    whileHover={{ y: -4 }}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-400 hover:text-[#04342C]"
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>

        <div className="w-full h-[400px] rounded-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </div>
      </section>
    </>
  );
};

export default Index;
