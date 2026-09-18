import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import FadeIn from "@/components/motion/FadeIn";
import {
  GitBranch,
  Star,
  Zap,
  Activity,
  ArrowRight,
  Code2,
  Cpu,
  Sparkles,
  Briefcase,
  Clock,
  Calendar,
} from "lucide-react";

// import {
//
//
//
//   Check,
//   Cpu,
//   Zap,
//   Bot,
//   TrendingUp,
//   Palette,
//   Sparkles,
//   ChevronDown,
//   ShoppingBag,
//   Code2,
// } from "lucide-react";
/**
 * ------------------------------------------------------------------
 *  Hero — left content column + LiveBuildPanel (animated code editor)
 *  right column. Same concept/copy/layout as your version — this file
 *  only fixes the broken imports/merge and restores LiveBuildPanel as
 *  its own component.
 * ------------------------------------------------------------------
 */

const BRAND = {
  crimson: "#C8102E",
  deepBlue: "#003057",
  accentBlue: "#3E7CB1",
  cardBg: "#0A1628",
  cardBg2: "#081120",
  border: "#1B3A5C",
};

// ---- Five rotating "files", one per service topic -------------------
const SCENES = [
  {
    file: "aegis_architecture.ts",
    comment: "// Aegis Web Strategy Redesign Engine",
    constName: "brandProfile",
    props: [
      {
        key: "primaryColor",
        value: '"brand-deep-blue"',
        cls: "text-rose-400",
        note: "#003057",
      },
      {
        key: "accentColor",
        value: '"brand-crimson"',
        cls: "text-rose-400",
        note: "#c8102e",
      },
      {
        key: "animationSpeed",
        value: '"350ms"',
        cls: "text-amber-400",
        note: "ease-out",
      },
      {
        key: "framework",
        value: '"react-19-strict-rendering"',
        cls: "text-amber-400",
      },
      {
        key: "speedOptimization",
        value: "true",
        cls: "text-teal-400",
        noComma: true,
      },
    ],
  },
  {
    file: "dev_pipeline.config.ts",
    comment: "// Full-Stack Development Pipeline",
    constName: "developmentStack",
    props: [
      {
        key: "frontend",
        value: '"Next.js 15 + TypeScript"',
        cls: "text-amber-400",
        note: "strict-mode",
      },
      {
        key: "backend",
        value: '"Node.js / Edge Functions"',
        cls: "text-amber-400",
        note: "serverless",
      },
      {
        key: "database",
        value: '"PostgreSQL + Prisma"',
        cls: "text-rose-400",
        note: "type-safe",
      },
      {
        key: "testing",
        value: '"Playwright E2E"',
        cls: "text-amber-400",
        note: "98% coverage",
      },
      { key: "ciCd", value: "true", cls: "text-teal-400", noComma: true },
    ],
  },
  {
    file: "seo_strategy.ts",
    comment: "// Search & Performance Optimization",
    constName: "seoStrategy",
    props: [
      {
        key: "coreWebVitals",
        value: '"passing"',
        cls: "text-rose-400",
        note: "all metrics",
      },
      {
        key: "schemaMarkup",
        value: '"structured-data"',
        cls: "text-amber-400",
        note: "enabled",
      },
      {
        key: "siteSpeed",
        value: '"0.8s"',
        cls: "text-amber-400",
        note: "first paint",
      },
      {
        key: "indexing",
        value: '"auto-sitemap"',
        cls: "text-rose-400",
        note: "enabled",
      },
      {
        key: "organicGrowth",
        value: "true",
        cls: "text-teal-400",
        noComma: true,
      },
    ],
  },
  {
    file: "ai_automation.ts",
    comment: "// AI-Powered Automation Layer",
    constName: "aiAutomation",
    props: [
      {
        key: "chatConcierge",
        value: '"gpt-4-class model"',
        cls: "text-rose-400",
        note: "24/7 support",
      },
      {
        key: "leadScoring",
        value: '"predictive-ml"',
        cls: "text-amber-400",
        note: "auto-qualify",
      },
      {
        key: "responseTime",
        value: '"180ms"',
        cls: "text-amber-400",
        note: "real-time",
      },
      {
        key: "workflowSync",
        value: '"crm + email + calendar"',
        cls: "text-rose-400",
      },
      {
        key: "selfLearning",
        value: "true",
        cls: "text-teal-400",
        noComma: true,
      },
    ],
  },
  {
    file: "digital_strategy.ts",
    comment: "// Growth & Digital Strategy",
    constName: "digitalStrategy",
    props: [
      {
        key: "positioning",
        value: '"market-differentiated"',
        cls: "text-rose-400",
        note: "data-backed",
      },
      {
        key: "contentEngine",
        value: '"seo + social + email"',
        cls: "text-amber-400",
      },
      {
        key: "analytics",
        value: '"full-funnel-tracking"',
        cls: "text-amber-400",
        note: "real-time",
      },
      {
        key: "deployment",
        value: '"zero-downtime"',
        cls: "text-rose-400",
        note: "edge-network",
      },
      {
        key: "scalability",
        value: "true",
        cls: "text-teal-400",
        noComma: true,
      },
    ],
  },
];

// ---- Fixed report metrics — numbers count up 0 → target each cycle --
const STATS = [
  {
    label: "Build Time",
    target: 1.2,
    decimals: 1,
    suffix: "s",
    cls: "text-emerald-400",
    Icon: Zap,
  },
  {
    label: "Lighthouse Score",
    target: 100,
    decimals: 0,
    suffix: "/100",
    cls: `text-[${BRAND.crimson}]`,
    Icon: Activity,
  },
];

// ----project completed stat -------------------
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
// ----project completed stat -------------------

// ---- Terminal / deployment log lines ---------------------------------
const LOGS = [
  { text: "$ pnpm run build", cls: "text-slate-400" },
  { text: "✓ Compiled successfully · 1.2s", cls: "text-emerald-400" },
  { text: "▲ Deploying to edge network…", cls: "text-amber-300" },
  { text: "✓ Live — 0 errors, 0 warnings", cls: "text-emerald-400" },
];

const STATUS_MAP = {
  typing: { label: "Building", dot: "#F59E0B", pulse: true },
  compiling: { label: "Compiling", dot: "#F59E0B", pulse: true },
  deploying: { label: "Deploying", dot: "#38BDF8", pulse: true },
  deployed: { label: "Deployed", dot: "#34D399", pulse: false },
};

// Turn a scene into a flat array of typed "lines" (comment, const-open, props..., close)
function buildLines(scene) {
  const lines = [];
  lines.push({
    indent: 0,
    tokens: [{ t: scene.comment, c: `font-semibold text-[${BRAND.crimson}]` }],
  });
  lines.push({
    indent: 0,
    tokens: [
      { t: "const ", c: "text-cyan-400" },
      { t: scene.constName, c: "text-yellow-200" },
      { t: " = {", c: "" },
    ],
  });
  scene.props.forEach((p) => {
    const tokens = [
      { t: `${p.key}: `, c: "" },
      { t: p.value, c: p.cls },
      { t: p.noComma ? "" : ",", c: "" },
    ];
    if (p.note) tokens.push({ t: ` ${p.note}`, c: "text-slate-500" });
    lines.push({ indent: 1, tokens });
  });
  lines.push({ indent: 0, tokens: [{ t: "};", c: "" }] });
  return lines;
}

function renderTyped(tokens, upTo) {
  let remaining = upTo;
  const out = [];
  for (const tok of tokens) {
    if (remaining <= 0) break;
    if (remaining >= tok.t.length) {
      out.push(tok);
      remaining -= tok.t.length;
    } else {
      out.push({ t: tok.t.slice(0, remaining), c: tok.c });
      remaining = 0;
    }
  }
  return out;
}

function lineLength(line) {
  return line.tokens.reduce((a, t) => a + t.t.length, 0);
}

// Counts a single stat value up from 0 → target whenever `active` turns true
function StatValue({ target, decimals, suffix = "", active, cls }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) {
      setVal(0);
      return;
    }
    let raf;
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [active, target]);

  return (
    <motion.p
      key={active ? "counting" : "idle"}
      initial={{ opacity: 0.5, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`text-lg font-bold tabular-nums ${cls}`}
    >
      {val.toFixed(decimals)}
      {suffix}
    </motion.p>
  );
}

// ------------------------------------------------------------------
//  LiveBuildPanel — the animated code editor (right column)
// ------------------------------------------------------------------
function LiveBuildPanel() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | compiling | deploying | deployed
  const [terminalIdx, setTerminalIdx] = useState(-1);
  const [showStats, setShowStats] = useState(false);
  const [progress, setProgress] = useState(4);
  const [reduceMotion, setReduceMotion] = useState(false);

  const cardRef = useRef(null);
  const rotateX = useSpring(0, { stiffness: 160, damping: 18, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 18, mass: 0.4 });

  const currentLines = useMemo(() => buildLines(SCENES[sceneIdx]), [sceneIdx]);
  const scene = SCENES[sceneIdx];
  const status = STATUS_MAP[phase] || STATUS_MAP.typing;

  // reduced-motion detection (live, in case it changes mid-session)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener
      ? mq.addEventListener("change", handler)
      : mq.addListener(handler);
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", handler)
        : mq.removeListener(handler);
    };
  }, []);

  function handleMouseMove(e) {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 5);
    rotateX.set(-py * 5);
  }
  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  useEffect(() => {
    let cancelled = false;
    const wait = (ms) => new Promise((res) => setTimeout(res, ms));

    if (reduceMotion) {
      const lines = buildLines(SCENES[0]);
      setLineIdx(lines.length - 1);
      setCharIdx(lineLength(lines[lines.length - 1]));
      setPhase("deployed");
      setTerminalIdx(3);
      setProgress(100);
      setShowStats(true);
      return () => {
        cancelled = true;
      };
    }

    async function run() {
      let s = 0;
      while (!cancelled) {
        setSceneIdx(s);
        setPhase("typing");
        setShowStats(false);
        setTerminalIdx(-1);
        setProgress(4);
        setLineIdx(0);
        setCharIdx(0);

        const lines = buildLines(SCENES[s]);

        for (let li = 0; li < lines.length; li++) {
          if (cancelled) return;
          setLineIdx(li);
          setCharIdx(0);
          const total = lineLength(lines[li]);
          await wait(45);
          for (let c = 1; c <= total; c++) {
            if (cancelled) return;
            setCharIdx(c);
            await wait(9 + Math.random() * 15);
          }
          setProgress(5 + Math.round(((li + 1) / lines.length) * 55));
          await wait(80);
        }

        if (cancelled) return;
        setPhase("compiling");
        setProgress(64);
        await wait(220);
        if (cancelled) return;
        setTerminalIdx(0);
        await wait(420);
        if (cancelled) return;
        setProgress(76);
        setTerminalIdx(1);
        await wait(440);
        if (cancelled) return;
        setPhase("deploying");
        setProgress(89);
        setTerminalIdx(2);
        await wait(480);
        if (cancelled) return;
        setProgress(100);
        setTerminalIdx(3);
        setPhase("deployed");
        await wait(350);
        if (cancelled) return;
        setShowStats(true);
        await wait(2600);
        if (cancelled) return;

        s = (s + 1) % SCENES.length;
        await wait(260);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  return (
    <div className="relative flex w-full justify-center lg:col-span-5 lg:justify-end">
      <style>{`
        @keyframes bp-blink { 0%, 45% { opacity: 1 } 50%, 100% { opacity: 0 } }
        .bp-cursor { animation: bp-blink 1s steps(1) infinite; }
      `}</style>

      <div className="relative w-full max-w-md">
        {/* ambient lighting */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-14 -top-14 -z-10 h-64 w-64 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.accentBlue}33, transparent 70%)`,
          }}
          animate={
            reduceMotion
              ? {}
              : { scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-64 w-64 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.crimson}26, transparent 70%)`,
          }}
          animate={
            reduceMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />
        {/* faint dot-grid texture for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(${BRAND.accentBlue} 1px, transparent 1px)`,
            backgroundSize: "18px 18px",
          }}
        />

        {/* floating credibility badge */}
        <motion.div
          className="absolute -top-4 right-6 z-10 hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-slate-200 shadow-lg backdrop-blur-md sm:flex"
          style={{ backgroundColor: "rgba(10,22,40,0.75)" }}
          initial={{ opacity: 0, y: -6 }}
          animate={
            reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -5, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0.5 }
              : {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }
          }
        >
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          4.9/5 <span className="text-slate-500">·</span> 500+ launches
        </motion.div>

        {/* floating tech-stack badge */}
        <motion.div
          className="absolute -bottom-4 left-6 z-10 hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-slate-300 shadow-lg backdrop-blur-md sm:flex"
          style={{ backgroundColor: "rgba(10,22,40,0.75)" }}
          initial={{ opacity: 0, y: 6 }}
          animate={
            reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, 5, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0.5 }
              : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
          }
        >
          <Code2 className="h-3 w-3 text-sky-400" />
          <Cpu className="h-3 w-3 text-violet-400" />
          <Sparkles className="h-3 w-3 text-amber-400" />
          React · Node · AI
        </motion.div>

        {/* Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={reduceMotion ? {} : { scale: 1.008 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 900,
            height: 560,
            background: `linear-gradient(160deg, ${BRAND.cardBg} 0%, ${BRAND.cardBg2} 100%)`,
            border: `1px solid ${BRAND.border}80`,
            boxShadow: `0 30px 90px -25px ${BRAND.deepBlue}99, 0 14px 45px -20px ${BRAND.crimson}33`,
          }}
          className="relative overflow-hidden rounded-xl text-slate-100"
        >
          {/* deploy progress bar */}
          <div className="absolute inset-x-0 top-0 z-10 h-[3px] bg-white/5">
            <motion.div
              className="h-full"
              style={{
                background: `linear-gradient(90deg, ${BRAND.crimson}, ${BRAND.accentBlue})`,
                boxShadow: `0 0 10px ${BRAND.crimson}90`,
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <div className="flex h-full flex-col p-6">
            {/* Window Controls */}
            <div
              className="shrink-0 border-b pb-3"
              style={{ borderColor: `${BRAND.border}66` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className="block h-3 w-3 rounded-full"
                    style={{ backgroundColor: BRAND.crimson }}
                  />
                  <span className="block h-3 w-3 rounded-full bg-amber-500" />
                  <span className="block h-3 w-3 rounded-full bg-emerald-500" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={scene.file}
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 3 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-md bg-white/5 px-2.5 py-1 text-[10px] font-medium tracking-tight text-slate-300"
                  >
                    {scene.file}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[10px]">
                <span className="inline-flex items-center gap-1.5 text-slate-500">
                  <GitBranch className="h-3 w-3" /> main
                  <span className="text-slate-700">·</span>
                  <span className="text-slate-600">a3f9c2e</span>
                </span>

                <span
                  className="inline-flex items-center gap-1.5 font-medium"
                  style={{ color: status.dot }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    {status.pulse && !reduceMotion && (
                      <motion.span
                        className="absolute inline-flex h-full w-full rounded-full"
                        style={{ backgroundColor: status.dot }}
                        animate={{ opacity: [0.7, 0, 0.7], scale: [1, 2.3, 1] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                    <span
                      className="relative inline-flex h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: status.dot }}
                    />
                  </span>
                  {status.label}
                </span>
              </div>
            </div>

            {/* Code Panel */}
            <div className="mt-4 h-[250px] shrink-0 overflow-hidden font-mono text-[12.5px] leading-[1.7] text-slate-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sceneIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {currentLines.slice(0, lineIdx + 1).map((line, li) => {
                    const isActive = li === lineIdx && phase === "typing";
                    const shown =
                      li < lineIdx || phase !== "typing"
                        ? line.tokens
                        : renderTyped(line.tokens, charIdx);

                    return (
                      <p
                        key={li}
                        className={`rounded px-1 ${line.indent ? "pl-5" : ""} ${
                          isActive ? "bg-white/[0.04]" : ""
                        }`}
                      >
                        {shown.map((tok, ti) => (
                          <span key={ti} className={tok.c}>
                            {tok.t}
                          </span>
                        ))}
                        {isActive && (
                          <span className="bp-cursor ml-[1px] inline-block h-[13px] w-[2px] -translate-y-[1px] bg-cyan-300 align-middle" />
                        )}
                      </p>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Terminal / deployment log */}
            <div
              className="mt-3 flex h-[38px] shrink-0 items-center gap-2 rounded-md border px-3 font-mono text-[11px]"
              style={{
                borderColor: `${BRAND.border}55`,
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <span className="text-slate-600">›</span>
              <AnimatePresence mode="wait">
                {terminalIdx >= 0 ? (
                  <motion.span
                    key={terminalIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22 }}
                    className={LOGS[terminalIdx].cls}
                  >
                    {LOGS[terminalIdx].text}
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-600"
                  >
                    waiting for changes…
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Report — label + cards fixed in place, only numbers animate, pinned to bottom */}
            <div
              className="mt-auto shrink-0 border-t pt-4"
              style={{ borderColor: `${BRAND.border}66` }}
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Current Operations Report
                </p>
                <span className="hidden items-center gap-1 text-[9px] text-emerald-400/80 sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  All systems operational
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border p-2.5"
                    style={{
                      borderColor: `${BRAND.border}80`,
                      backgroundColor: `${BRAND.border}30`,
                    }}
                  >
                    <p className="mb-0.5 flex items-center justify-center gap-1 text-[10px] text-slate-400">
                      <s.Icon className="h-3 w-3" />
                      {s.label}
                    </p>
                    <StatValue
                      target={s.target}
                      decimals={s.decimals}
                      suffix={s.suffix}
                      cls={s.cls}
                      active={showStats}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
//  Hero — full section (left content + LiveBuildPanel)
// ------------------------------------------------------------------

const words = [
  {
    text: "Scale.",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    text: "Perform.",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    text: "Grow.",
    gradient: "from-orange-400 to-red-500",
  },
];

export default function Hero({
  onScrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let charIndex = 0;

    const typing = setInterval(() => {
      setDisplayText(words[wordIndex].text.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === words[wordIndex].text.length) {
        clearInterval(typing);

        setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
          setDisplayText("");
        }, 1200);
      }
    }, 100);

    return () => clearInterval(typing);
  }, [wordIndex]);
  return (
    <section
      id="hero"
      className="relative overflow-hidden py-10 lg:py-16"
      //   style={{
      //     background: `
      //   radial-gradient(circle at 12% 45%, rgba(62, 124, 177, 0.18) 0%, transparent 45%),
      //   radial-gradient(circle at 88% 30%, rgba(0, 48, 87, 0.35) 0%, transparent 55%),
      //   linear-gradient(160deg, #0A1628 0%, #050B14 100%)
      // `,
      //   }}
    >
      {/* Structural Minimal Grid Lines */}
      <div className="pointer-events-none absolute inset-0 opacity-2">
        <div className="h-full w-full bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-brand-crimson/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="flex flex-col justify-center text-center lg:col-span-7 lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-1.5 self-center rounded-full border border-[#0E2038] bg-[#071534] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#9dadc3] lg:self-start"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-crimson" />
              <span>BESPOKE WEBSITES FOR ENTERPRISE LEADERS</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 lg:text-[70px] md:text-9xl font-extrabold leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 sm:text-5xl lg:text-6xl"
            >
              We Formulation Codes That{" "}
              <span
                className={`bg-gradient-to-r ${words[wordIndex].gradient} bg-clip-text text-transparent`}
              >
                {displayText}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#9dadc3] sm:text-lg lg:mx-0"
            >
              Bespoke digital architecture, interactive layouts, and
              high-performance engineering designed for high-growth brands
              seeking unmatched competitive online presence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <button
                onClick={() => onScrollToSection("booking")}
                id="hero-book-cta"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[#04342C] shadow-md transition-all hover:scale-[1.02] hover:from-emerald-300 hover:to-teal-400 hover:shadow-lg sm:w-auto"
              >
                <span>Start Your Project</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onScrollToSection("ai-advisory")}
                id="hero-ai-cta"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-brand-blue px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-brand-blue-light sm:w-auto"
              >
                <Sparkles className="h-4 w-4 text-brand-crimson" />
                <span>AI Advisory</span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center justify-center gap-6 text-xs text-white lg:justify-start"
            >
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                GDPR Safe Architecture
              </span>

              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                100% Core Web Vitals
              </span>
            </motion.div>
          </div>

          {/* coding animation editor */}
          <LiveBuildPanel />
        </div>
      </div>
      <div className="pt-15">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <StatCard stat={stat} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
