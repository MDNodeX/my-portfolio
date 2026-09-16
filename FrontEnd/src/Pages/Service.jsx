import {
  CardHeader,
  CardTitle,
  Card,
  CardDescription,
} from "@/components/ui/card";
import aboutpagehead from "@/assets/images/10002.svg";
import { HeroSlider } from "@/components/HeroSlider";

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

/**
 * PricingPlans
 * Drop this component anywhere in your service page.
 *
 * Requires:
 *  - Tailwind CSS
 *  - shadcn/ui Button component ( npx shadcn@latest add button )
 *  - lucide-react ( npm i lucide-react )
 *
 * Brand colors used:
 *  - Page background:  #07111E
 *  - Card background:  #091424
 *  - Accent:           emerald-400 / emerald-500 (swap to your brand accent if needed)
 */
//service grid

/* ---------------------------------------------------------
   Shared browser-frame chrome, reused across every scene.
   Each scene passes its own id prefix so gradients/ids never
   collide when multiple SVGs are on the page at once.
--------------------------------------------------------- */
function Frame({ id }) {
  return (
    <>
      <defs>
        <linearGradient
          id={`${id}g`}
          x1="0"
          y1="0"
          x2="320"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
        <radialGradient id={`${id}glow`}>
          <stop offset="0" stopColor="#10b981" stopOpacity="0.45" />
          <stop offset="1" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx="160"
        cy="104"
        rx="120"
        ry="76"
        fill={`url(#${id}glow)`}
        opacity="0.55"
      />
      <rect
        x="48"
        y="36"
        width="224"
        height="132"
        rx="14"
        fill="currentColor"
        opacity="0.05"
        stroke="currentColor"
        strokeOpacity="0.14"
      />
      <line
        x1="48"
        y1="62"
        x2="272"
        y2="62"
        stroke="currentColor"
        strokeOpacity="0.12"
      />
      <circle cx="66" cy="49" r="3.5" fill="#ff5f57" />
      <circle cx="78" cy="49" r="3.5" fill="#febc2e" />
      <circle cx="90" cy="49" r="3.5" fill="#28c840" />
      <rect
        x="108"
        y="43"
        width="146"
        height="12"
        rx="6"
        fill="currentColor"
        opacity="0.1"
      />
    </>
  );
}

const svgBase = "relative h-auto w-full text-white";

/* 1. WordPress Website Development — page publishing + "Live" badge */
function SceneWordPress() {
  const id = "s1";
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={svgBase}
    >
      <Frame id={id} />
      <g>
        <animate
          attributeName="opacity"
          values="0;1;1;1;0"
          keyTimes="0;0.2;0.9;0.96;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 10;0 0"
          keyTimes="0;0.2"
          dur="4s"
          repeatCount="indefinite"
        />
        <rect
          x="64"
          y="74"
          width="196"
          height="42"
          rx="9"
          fill={`url(#${id}g)`}
        />
        <circle cx="88" cy="95" r="11" fill="#fff" opacity="0.85" />
        <path d="M84 95l6 3.5v-7z" fill={`url(#${id}g)`} />
        <rect
          x="110"
          y="88"
          width="120"
          height="6"
          rx="3"
          fill="#fff"
          opacity="0.55"
        />
        <rect
          x="110"
          y="99"
          width="80"
          height="6"
          rx="3"
          fill="#fff"
          opacity="0.35"
        />
      </g>
      <rect
        x="64"
        y="126"
        width="150"
        height="7"
        rx="3.5"
        fill="currentColor"
        opacity="0.12"
      />
      <rect x="64" y="126" height="7" rx="3.5" fill={`url(#${id}g)`}>
        <animate
          attributeName="width"
          values="0;0;150;150;0"
          keyTimes="0;0.28;0.52;0.9;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="64"
        y="140"
        width="112"
        height="7"
        rx="3.5"
        fill="currentColor"
        opacity="0.12"
      />
      <rect
        x="64"
        y="140"
        height="7"
        rx="3.5"
        fill={`url(#${id}g)`}
        opacity="0.6"
      >
        <animate
          attributeName="width"
          values="0;0;112;112;0"
          keyTimes="0;0.38;0.62;0.9;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
      <g transform="translate(208 22)">
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.6;0.7;0.94;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <rect width="52" height="20" rx="10" fill="#34d399" opacity="0.16" />
        <circle cx="13" cy="10" r="3.5" fill="#34d399">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x="23"
          y="14"
          fontSize="10"
          fontWeight="700"
          fill="#34d399"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          Live
        </text>
      </g>
    </svg>
  );
}

/* 2. Custom Web Applications — code lines typing in, blinking cursor */
function SceneCodeApp() {
  const id = "s2";
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={svgBase}
    >
      <Frame id={id} />
      <g>
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.1;0.9;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <rect
          x="64"
          y="76"
          width="10"
          height="6"
          rx="3"
          fill="currentColor"
          opacity="0.15"
        />
        <rect
          x="64"
          y="94"
          width="10"
          height="6"
          rx="3"
          fill="currentColor"
          opacity="0.15"
        />
        <rect
          x="64"
          y="112"
          width="10"
          height="6"
          rx="3"
          fill="currentColor"
          opacity="0.15"
        />
        <rect
          x="64"
          y="130"
          width="10"
          height="6"
          rx="3"
          fill="currentColor"
          opacity="0.15"
        />

        <rect x="80" y="76" height="6" rx="3" fill={`url(#${id}g)`}>
          <animate
            attributeName="width"
            values="0;0;96;96;0"
            keyTimes="0;0.05;0.28;0.9;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="80" y="94" height="6" rx="3" fill="#fff" opacity="0.5">
          <animate
            attributeName="width"
            values="0;0;130;130;0"
            keyTimes="0;0.2;0.42;0.9;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="80"
          y="112"
          height="6"
          rx="3"
          fill={`url(#${id}g)`}
          opacity="0.7"
        >
          <animate
            attributeName="width"
            values="0;0;70;70;0"
            keyTimes="0;0.36;0.56;0.9;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="80" y="130" height="6" rx="3" fill="#fff" opacity="0.35">
          <animate
            attributeName="width"
            values="0;0;108;108;0"
            keyTimes="0;0.5;0.7;0.9;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>

        <rect x="192" y="129" width="6" height="8" fill="#34d399">
          <animate
            attributeName="opacity"
            values="0;0;1;0;1;0"
            keyTimes="0;0.5;0.6;0.7;0.8;0.9"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      <g transform="translate(224 24)">
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2.2s"
          repeatCount="indefinite"
        />
        <rect width="34" height="20" rx="8" fill="#34d399" opacity="0.14" />
        <text
          x="7"
          y="14"
          fontSize="11"
          fontWeight="700"
          fill="#34d399"
          fontFamily="ui-monospace, monospace"
        >
          {"</>"}
        </text>
      </g>
    </svg>
  );
}

/* 3. E-commerce Design & Development — product flying into cart */
function SceneCart() {
  const id = "s3";
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={svgBase}
    >
      <Frame id={id} />

      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 62 44; 62 44"
          keyTimes="0;0.55;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;1;0;0"
          keyTimes="0;0.5;0.58;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <rect
          x="88"
          y="70"
          width="30"
          height="30"
          rx="6"
          fill={`url(#${id}g)`}
        />
        <rect
          x="94"
          y="78"
          width="18"
          height="4"
          rx="2"
          fill="#fff"
          opacity="0.7"
        />
        <rect
          x="94"
          y="86"
          width="12"
          height="4"
          rx="2"
          fill="#fff"
          opacity="0.5"
        />
      </g>

      <g transform="translate(150 118)">
        <path
          d="M0 0h14l10 46h58l10-34H30"
          stroke={`url(#${id}g)`}
          strokeWidth="6"
          fill="none"
        />
        <circle cx="42" cy="60" r="7" fill={`url(#${id}g)`} />
        <circle cx="78" cy="60" r="7" fill={`url(#${id}g)`} />

        <g transform="translate(78 -14)">
          <animateTransform
            attributeName="transform"
            type="scale"
            values="0;0;1.15;1;1"
            keyTimes="0;0.55;0.66;0.75;1"
            dur="4s"
            repeatCount="indefinite"
            additive="sum"
          />
          <animate
            attributeName="opacity"
            values="0;0;1;1;1"
            keyTimes="0;0.55;0.6;0.9;1"
            dur="4s"
            repeatCount="indefinite"
          />
          <circle r="10" fill="#34d399" />
          <text
            y="4"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#04342C"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            3
          </text>
        </g>
      </g>
    </svg>
  );
}

/* 4. Website Cloning & Migration — data syncing between two panels */
function SceneMigration() {
  const id = "s4";
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={svgBase}
    >
      <Frame id={id} />

      <rect
        x="64"
        y="76"
        width="70"
        height="72"
        rx="8"
        fill="currentColor"
        opacity="0.06"
        stroke="currentColor"
        strokeOpacity="0.14"
      />
      <rect
        x="76"
        y="90"
        width="46"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.3"
      />
      <rect
        x="76"
        y="102"
        width="34"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.2"
      />
      <rect
        x="76"
        y="114"
        width="40"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.2"
      />

      <rect
        x="186"
        y="76"
        width="70"
        height="72"
        rx="8"
        fill="currentColor"
        opacity="0.06"
        stroke="currentColor"
        strokeOpacity="0.14"
      />
      <rect x="198" y="90" width="0" height="6" rx="3" fill={`url(#${id}g)`}>
        <animate
          attributeName="width"
          values="0;0;46;46;0"
          keyTimes="0;0.5;0.7;0.92;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="198"
        y="102"
        width="0"
        height="6"
        rx="3"
        fill={`url(#${id}g)`}
        opacity="0.7"
      >
        <animate
          attributeName="width"
          values="0;0;34;34;0"
          keyTimes="0;0.58;0.78;0.92;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="198"
        y="114"
        width="0"
        height="6"
        rx="3"
        fill={`url(#${id}g)`}
        opacity="0.7"
      >
        <animate
          attributeName="width"
          values="0;0;40;40;0"
          keyTimes="0;0.66;0.86;0.92;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>

      <g transform="translate(160 112)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 160 112"
          to="360 160 112"
          dur="3s"
          repeatCount="indefinite"
        />
        <path
          d="M-10 0a10 10 0 0 1 17-7"
          stroke={`url(#${id}g)`}
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M10 0a10 10 0 0 1-17 7"
          stroke={`url(#${id}g)`}
          strokeWidth="3"
          fill="none"
        />
      </g>

      <rect y="94" width="10" height="10" rx="3" fill={`url(#${id}g)`}>
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.1;0.45;0.55"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x"
          values="80;80;190;190"
          keyTimes="0;0.15;0.45;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>

      <g transform="translate(224 66)">
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.7;0.78;0.94;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <circle r="9" fill="#34d399" />
        <path d="M-4 0l3 3 6-6" stroke="#04342C" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/* 5. Website Bug Fixing — bug crawling a code line, then fixed */
function SceneBugFix() {
  const id = "s5";
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={svgBase}
    >
      <Frame id={id} />

      <rect
        x="64"
        y="80"
        width="130"
        height="7"
        rx="3.5"
        fill="currentColor"
        opacity="0.16"
      />
      <rect x="64" y="98" width="150" height="7" rx="3.5" fill="#fb7185">
        <animate
          attributeName="fill"
          values="#fb7185;#fb7185;#34d399;#34d399"
          keyTimes="0;0.55;0.65;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.35;0.35;0.5;0.5"
          keyTimes="0;0.55;0.65;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="64"
        y="116"
        width="98"
        height="7"
        rx="3.5"
        fill="currentColor"
        opacity="0.16"
      />

      <g>
        <animate
          attributeName="opacity"
          values="1;1;0;0"
          keyTimes="0;0.5;0.58;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="70 0;190 0"
          dur="4s"
          keyTimes="0;0.5"
          repeatCount="indefinite"
        />
        <g transform="translate(0 101)">
          <circle r="6" fill="#fb7185" />
          <line
            x1="-6"
            y1="-3"
            x2="-11"
            y2="-7"
            stroke="#fb7185"
            strokeWidth="2"
          />
          <line
            x1="-6"
            y1="3"
            x2="-11"
            y2="7"
            stroke="#fb7185"
            strokeWidth="2"
          />
          <line
            x1="6"
            y1="-3"
            x2="11"
            y2="-7"
            stroke="#fb7185"
            strokeWidth="2"
          />
          <line x1="6" y1="3" x2="11" y2="7" stroke="#fb7185" strokeWidth="2" />
        </g>
      </g>

      <g transform="translate(224 101)">
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.6;0.68;0.94;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <circle r="9" fill="#34d399" />
        <path d="M-4 0l3 3 6-6" stroke="#04342C" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/* 6. AI Integration — pulsing neural network */
function SceneAI() {
  const id = "s6";
  const nodes = [
    { x: 110, y: 80 },
    { x: 210, y: 78 },
    { x: 96, y: 132 },
    { x: 224, y: 134 },
  ];
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={svgBase}
    >
      <Frame id={id} />

      {nodes.map((n, i) => (
        <line
          key={i}
          x1="160"
          y1="104"
          x2={n.x}
          y2={n.y}
          stroke="currentColor"
          strokeOpacity="0.18"
        />
      ))}

      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="5" fill={`url(#${id}g)`}>
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            begin={`${i * 0.4}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      <g transform="translate(160 104)">
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1;1.18;1"
          dur="2.4s"
          repeatCount="indefinite"
          additive="sum"
        />
        <circle r="16" fill={`url(#${id}g)`} />
        <path
          d="M0-6l1.8 4.2L6 0l-4.2 1.8L0 6l-1.8-4.2L-6 0l4.2-1.8z"
          fill="#04342C"
          transform="scale(0.9)"
        />
      </g>

      <g transform="translate(214 30)">
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.55;0.65;0.94;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <rect width="44" height="20" rx="10" fill="#34d399" opacity="0.16" />
        <circle cx="13" cy="10" r="3.5" fill="#34d399">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x="23"
          y="14"
          fontSize="10"
          fontWeight="700"
          fill="#34d399"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          AI
        </text>
      </g>
    </svg>
  );
}

const servicesbox = [
  {
    title: "WordPress Website Development",
    description: (
      <>
        <span className="text-emerald-400">Custom, fast & SEO-ready</span>{" "}
        WordPress and Elementor websites built to convert.
      </>
    ),
    Scene: SceneWordPress,
  },
  {
    title: "Custom Web Applications",
    description: (
      <>
        Scalable, secure web apps engineered with the{" "}
        <span className="text-emerald-400">modern MERN stack</span>.
      </>
    ),
    Scene: SceneCodeApp,
  },
  {
    title: "E-commerce Design & Development",
    description: (
      <>
        <span className="text-emerald-400">High-converting</span> online stores
        on WooCommerce, Shopify & Wix.
      </>
    ),
    Scene: SceneCart,
  },
  {
    title: "Website Cloning & Migration",
    description: (
      <>
        <span className="text-emerald-400">Pixel-perfect</span> website cloning
        and seamless platform-to-platform migration.
      </>
    ),
    Scene: SceneMigration,
  },
  {
    title: "Website Bug Fixing",
    description: (
      <>
        <span className="text-emerald-400">Fast diagnosis</span> and reliable
        fixes for any WordPress or web issue.
      </>
    ),
    Scene: SceneBugFix,
  },
  {
    title: "AI Integration",
    description: (
      <>
        <span className="text-emerald-400">Smart AI features</span>, chatbots &
        automation to supercharge your website.
      </>
    ),
    Scene: SceneAI,
  },
];

function IconBox({ icon: Icon, animation }) {
  return (
    <div className="relative flex h-[150px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.04] bg-gradient-to-br from-emerald-500/[0.08] to-teal-500/[0.03]">
      {/* Ambient glow behind the icon */}
      <div className="absolute h-24 w-24 rounded-full bg-emerald-400/20 blur-2xl" />

      {/* Rotating dashed ring for "tech" style icons */}
      {(animation === "spin" || animation === "spin-slow") && (
        <div
          className={`absolute h-20 w-20 rounded-full border border-dashed border-emerald-400/30 ${
            animation === "spin"
              ? "animate-[spin_8s_linear_infinite]"
              : "animate-[spin_5s_linear_infinite]"
          }`}
        />
      )}

      {/* Main icon */}
      <Icon
        className={`relative h-11 w-11 text-emerald-400 ${
          animation === "spin"
            ? "animate-[spin_6s_linear_infinite]"
            : animation === "spin-slow"
            ? "animate-[spin_4s_linear_infinite]"
            : animation === "pulse-glow"
            ? "animate-pulse"
            : ""
        }`}
        strokeWidth={1.5}
      />

      {/* Bouncing notification badge for e-commerce */}
      {animation === "bounce-badge" && (
        <span className="absolute right-[calc(50%-2.75rem)] top-6 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-emerald-400 text-[10px] font-bold text-[#04342C]">
          3
        </span>
      )}

      {/* Pulsing alert dot for bug fixing */}
      {animation === "pulse-badge" && (
        <span className="absolute right-[calc(50%-2.5rem)] top-7 flex h-3 w-3 animate-pulse items-center justify-center rounded-full bg-rose-400" />
      )}
    </div>
  );
}
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
          <FadeIn className="mb-12 text-center sm:mb-14">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Services I Provide
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-400 sm:text-base">
              Professional web solutions that help your business grow online
            </p>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesbox.map(({ title, description, Scene }, i) => (
              <FadeIn key={title} delay={(i % 3) * 0.1}>
              <div
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#091424] p-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)]"
              >
                <div className="overflow-hidden rounded-2xl">
                  <Scene />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-bold text-white sm:text-lg">
                    {title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {description}
                  </p>

                  <button
                    aria-label={`Learn more about ${title}`}
                    className="mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:text-[#04342C]"
                  >
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <section
        id="hero"
        className="relative overflow-hidden border-b border-gray-100 py-10 lg:py-16"
        style={{
          background: `
      radial-gradient(circle at 12% 45%, rgba(62, 124, 177, 0.18) 0%, transparent 45%),
      radial-gradient(circle at 88% 30%, rgba(0, 48, 87, 0.35) 0%, transparent 55%),
      linear-gradient(160deg, #0A1628 0%, #050B14 100%)
    `,
        }}
      >
        <section
          className="relative w-full lg:py-15 py-10 overflow-hidden bg-cover bg-center"
          // style={{
          //   backgroundImage: `
          //         linear-gradient(rgba(18, 63, 100, 0.7), rgba(0, 20, 73, 0.7)), url(${aboutpagehead})`,
          // }}
        >
          <FadeIn className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h1 className="lg:text-7xl text-5xl font-black text-white flex items-center justify-center gap-2">
              Our <div className="text-[#c8102e]">Services</div>
            </h1>
          </FadeIn>
        </section>
        {/* pricing section */}
        <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          {/* Ambient background glow */}
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
        </section>
        {/* aditonal section */}
        <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          {/* Ambient background glow — matches PricingPlans */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />

          {/* Faint grid texture — matches PricingPlans */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative mx-auto max-w-6xl">
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
                <div
                  className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-[#091424] p-5 transition-all duration-300 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)] sm:flex-row sm:items-center sm:gap-3"
                >
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
        </section>
        {/* service section */}
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
            {/* Heading */}
            <FadeIn className="mb-10 text-center sm:mb-14">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                What I will do?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-slate-400 sm:text-base">
                You don't have to struggle alone, you've got our assistance and
                help. It's just not a service, it's a relationship...
              </p>
            </FadeIn>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <FadeIn key={step.number} delay={(i % 3) * 0.1}>
                  <div
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#091424] p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)] sm:p-7"
                  >
                    {/* Large faded step number */}
                    <span className="pointer-events-none absolute right-5 top-2 select-none text-6xl font-extrabold text-white/[0.06]">
                      {step.number}
                    </span>

                    {/* Icon badge — matches the emerald accent used across the page */}
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>

                    <h3 className="relative mt-5 text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                  </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Service;
