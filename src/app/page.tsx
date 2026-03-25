"use client";

import Image from "next/image";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { NavBar } from "@/components/ui/tube-light-navbar";
import { FloatingIconsHero } from "@/components/ui/floating-icons-hero-section";
import { Counter } from "@/components/ui/animated-counter";
import { Home as HomeIcon, User, Briefcase, PenLine, Mail } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Intersection Observer hook for fade-up                            */
/* ------------------------------------------------------------------ */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function FadeUp({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useFadeUp();
  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav items for tube light navbar                                    */
/* ------------------------------------------------------------------ */
const navItems = [
  { name: "Josh", url: "#hero", icon: HomeIcon },
  { name: "About", url: "#about", icon: User },
  { name: "Career", url: "#career", icon: Briefcase },
  { name: "Writing", url: "#writing", icon: PenLine },
  { name: "Contact", url: "#contact", icon: Mail },
];

/* ------------------------------------------------------------------ */
/*  Section 1 — Hero (floating icons component)                       */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Section 2 — By The Numbers                                        */
/* ------------------------------------------------------------------ */
const stats = [
  { target: 19, suffix: "th", lines: ["Employee", "at StockX"] },
  { target: 20, suffix: "+", lines: ["Apps Built", "& Shipped"] },
  { target: 3, suffix: "", lines: ["Series A+", "Startups"] },
  { target: 6, suffix: "", lines: ["Ironman", "70.3s"] },
  { target: 2, suffix: "", lines: ["NYC", "Marathons"] },
  { target: 3, suffix: "", lines: ["Mix-Media", "Art Publications"] },
];

function ByTheNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 border-y border-[--color-divider] bg-[#F5F5F3]"
    >
      <FadeUp>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[--color-muted] mb-10 text-center">
            By The Numbers
          </p>
        </div>
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-8">
          {stats.map((s) => (
            <div
              key={s.target + s.lines[0]}
              className="text-center"
            >
              <div className="flex items-center justify-center font-semibold tracking-tight">
                <Counter
                  end={s.target}
                  duration={1}
                  fontSize={48}
                  started={started}
                />
                {s.suffix && (
                  <span className="text-4xl md:text-5xl font-semibold tracking-tight">
                    {s.suffix}
                  </span>
                )}
              </div>
              {s.lines.map((line) => (
                <div
                  key={line}
                  className="text-xs text-[--color-muted] mt-1 leading-snug"
                >
                  {line}
                </div>
              ))}
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — About                                                 */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <section id="about" className="py-28 md:py-36">
      <FadeUp>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[--color-muted] mb-8">
            About
          </p>

          <div className="space-y-5 text-base leading-relaxed text-[--color-foreground]">
            <p>
              I started my career as a software engineer. I loved building
              things, but I kept finding myself more interested in{" "}
              <em>why</em> we were building them than how. That instinct
              eventually pulled me into product.
            </p>
            <p>
              I joined StockX in 2016 as the 19th employee and spent eight and a
              half years there, building the iOS app and eventually leading
              product for parts of the consumer purchasing
              experience&nbsp;&mdash; product discovery, research, and catalog.
            </p>
            <p>
              Since then, I&rsquo;ve led product at early-stage
              startups&nbsp;&mdash; a peer-to-peer clothing rental marketplace
              and a B2B2C employee engagement platform&nbsp;&mdash; working
              across the full stack of what it means to run product: strategy,
              roadmaps, analytics, hiring, and the hard conversations that come
              with building in constrained environments.
            </p>
            <p>
              I care a lot about craft. Good product work, to me, looks a lot
              like good writing&nbsp;&mdash; clear thinking made visible.
              I&rsquo;m drawn to problems where the stakes are real and the
              feedback loops are tight.
            </p>
            <p>
              Outside of work, I spend a lot of time outdoors. I&rsquo;ve
              completed six Ironman 70.3s, two marathons, and a bunch of half
              marathons. I play piano and love to make mix-media art pieces. My
              amazing fianc&eacute;e even let me hang one up right in our
              kitchen. I&rsquo;m Jewish and active in the NYC Jewish community. I
              currently live in NYC, but was born and raised in Michigan.
            </p>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Career                                                */
/* ------------------------------------------------------------------ */
const roles = [
  {
    company: "Jolly",
    title: "SVP of Product",
    icon: "/images/app_icons/jolly-app-icon.png",
    url: "https://jolly.com",
    description:
      "Led product for a B2B2C SaaS workforce performance optimization platform that helped frontline workers earn a stake in the outcomes they drive and feel more connected to their companies. Drove a full platform rebuild.",
  },
  {
    company: "Pickle",
    title: "Head of Product",
    icon: "/images/app_icons/pickle-app-icon.jpeg",
    url: "https://shoponpickle.com",
    description:
      "Joined as the 12th employee. Led product for a peer-to-peer clothing rental marketplace. Drove initiatives to increase offer acceptance rate, click-through rate, and order conversion rate.",
  },
  {
    company: "StockX",
    title: "Lead Product Manager",
    icon: "/images/app_icons/stockx-app-icon.png",
    url: "https://stockx.com",
    description:
      "Joined as the 19th employee. Built the iOS app, led engineering teams, and ran product for parts of the consumer purchasing experience\u2009\u2014\u2009product discovery, research, and catalog.",
  },
  {
    company: "Earlier",
    title: "Software Engineer \u00b7 Various Companies",
    icon: null,
    url: null,
    description:
      "Worked as a software engineer before moving into product full-time, shipping apps for Fortune 500 clients including Domino\u2019s Pizza and KIA Motors. That foundation still shapes how I think about technical tradeoffs and what\u2019s actually hard to build.",
  },
];

function Career() {
  return (
    <section
      id="career"
      className="py-28 md:py-36 border-t border-[--color-divider]"
    >
      <FadeUp>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[--color-muted] mb-2">
            Career
          </p>
          <p className="text-base text-[--color-muted] mb-12">
            A few of the places I&rsquo;ve worked and what I did there.
          </p>

          <div className="divide-y divide-[--color-divider]">
            {roles.map((role) => (
              <div key={role.company} className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  {role.icon && (
                    <Image
                      src={role.icon}
                      alt={role.company}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-xl"
                    />
                  )}
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {role.url ? (
                        <a
                          href={role.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[--color-accent] hover:underline transition-colors inline-flex items-center gap-1"
                        >
                          {role.company}
                          <span className="text-sm text-[--color-muted]">&rarr;</span>
                        </a>
                      ) : (
                        role.company
                      )}
                    </h3>
                    <p className="text-sm text-[--color-muted]">
                      {role.title}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-base leading-relaxed text-[--color-foreground]">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — What Others Say                                       */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    text: "Your decision documents are absolutely award winning gold medal type stuff. Clear approvals, very clear guidance on options considered. The little plus and minus signs, and everything.",
    name: "Chief Product Officer",
    role: "",
  },
  {
    text: "In my past, I\u2019ve seen Product Managers not take an easy quick-win from their predecessor PM because they want to do their own thing or some other ego-driven reason. Josh on the other hand asked questions, identified the opportunity, and launched it. I love that behavior.",
    name: "VP of Product",
    role: "",
  },
  {
    text: "Both in engineering and in product, you\u2019ve been someone I trusted, relied upon, and had the utmost faith that you would figure it out. Further, I really appreciate your level headedness, your ability to communicate with the team, and your constant desire to grow.",
    name: "Product Marketing Manager",
    role: "",
  },
  {
    text: "Outside of work, you\u2019ve been an inspiration for me \u2014 whether it\u2019s been moonlighting as a B school student, the races and physical challenges you\u2019ve put yourself through and overcame, or just your open embrace and friendship. I hope that I can take your lessons and embody them for the rest of my life.",
    name: "Product Marketing Manager",
    role: "",
  },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = [testimonials[0], testimonials[3]];

function Testimonials() {
  return (
    <section className="py-28 md:py-36 border-t border-[--color-divider] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-10"
        >
          <p className="text-xs uppercase tracking-widest text-[--color-muted] mb-4">
            What Others Say
          </p>
        </motion.div>
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Writing                                               */
/* ------------------------------------------------------------------ */
function Writing() {
  return (
    <section
      id="writing"
      className="py-28 md:py-36 border-t border-[--color-divider]"
    >
      <FadeUp>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[--color-muted] mb-2">
            Writing
          </p>
          <p className="text-base text-[--color-muted] mb-12">
            I write about product, design, and leadership. Most of it lives on
            LinkedIn.
          </p>

          <a
            href="https://www.linkedin.com/in/jrmsklar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[--color-accent] text-sm hover:underline"
          >
            More on LinkedIn &rarr;
          </a>
        </div>
      </FadeUp>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 8 — Contact / Footer                                      */
/* ------------------------------------------------------------------ */
function Contact() {
  return (
    <footer
      id="contact"
      className="bg-[#1D1D1F] text-white py-28 md:py-36"
    >
      <FadeUp>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-8">
            Get In Touch
          </p>
          <p className="text-base text-white/70 mb-8">
            The best way to reach me is email. I try to respond to everyone.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
            <a
              href="mailto:jrmsklar@gmail.com"
              className="text-white hover:text-[--color-accent] transition-colors"
            >
              jrmsklar@gmail.com
            </a>
            <span className="hidden sm:inline text-white/30">&middot;</span>
            <a
              href="https://www.linkedin.com/in/jrmsklar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[--color-accent] transition-colors"
            >
              LinkedIn
            </a>
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 text-xs text-white/30">
            Josh Sklar &middot; New York, NY &middot; &copy; 2026
          </div>
        </div>
      </FadeUp>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  return (
    <>
      <NavBar items={navItems} />
      <main>
        <FloatingIconsHero />
        <ByTheNumbers />
        <About />
        <Career />
        <Testimonials />
        <Writing />

      </main>
      <Contact />
    </>
  );
}
