"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

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
/*  Nav                                                               */
/* ------------------------------------------------------------------ */
function Nav() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#FAFAF8]/80 border-b border-[--color-divider]">
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold tracking-tight text-[--color-foreground] hover:text-[--color-accent] transition-colors"
        >
          Josh Sklar
        </button>
        <div className="hidden sm:flex items-center gap-6 text-xs text-[--color-muted]">
          {[
            ["About", "about"],
            ["Career", "career"],
            ["Writing", "writing"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="hover:text-[--color-foreground] transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1 — Hero                                                  */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-12"
    >
      <div className="max-w-5xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Photo — shown first on mobile */}
        <div className="order-first md:order-last flex justify-center md:justify-end">
          <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden">
            <Image
              src="/images/headshot-optimized.jpg"
              alt="Josh Sklar"
              width={800}
              height={1000}
              priority
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Text */}
        <div className="order-last md:order-first">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-none">
            Josh Sklar
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[--color-muted] leading-relaxed max-w-lg">
            Product and engineering leader. Passionate about people-first
            culture. 14+ years of building and scaling consumer apps.
          </p>
          <p className="mt-6 text-base text-[--color-foreground] leading-relaxed max-w-lg">
            I&rsquo;ve spent my career helping companies build things people
            actually use&nbsp;&mdash; from the early days of a scrappy startup to
            shipping products at scale. I&rsquo;m based in New York. I do a lot
            of cool things outside of work too.
          </p>
          <div className="mt-8 flex items-center gap-6 text-sm">
            <a
              href="#about"
              className="text-[--color-accent] hover:underline"
            >
              Read more &darr;
            </a>
            <a
              href="#contact"
              className="text-[--color-accent] hover:underline"
            >
              Get in touch &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — By The Numbers                                        */
/* ------------------------------------------------------------------ */
const stats = [
  { number: "19th", lines: ["Employee", "at StockX"] },
  { number: "20+", lines: ["Apps Built", "& Shipped"] },
  { number: "3", lines: ["Series A+", "Startups"] },
  { number: "6", lines: ["Ironman", "70.3s"] },
  { number: "2", lines: ["NYC", "Marathons"] },
  { number: "3", lines: ["Mix-Media", "Art Publications"] },
];

function ByTheNumbers() {
  return (
    <section className="py-20 border-y border-[--color-divider] bg-[#F5F5F3]">
      <FadeUp>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-0 md:divide-x md:divide-[--color-divider]">
          {stats.map((s) => (
            <div
              key={s.number + s.lines[0]}
              className="text-center md:px-6 first:md:pl-0 last:md:pr-0"
            >
              <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                {s.number}
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
        <div className="max-w-[65ch] mx-auto px-6">
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
    description:
      "Led product for a B2B2C SaaS workforce performance optimization platform that helped frontline workers earn a stake in the outcomes they drive and feel more connected to their companies. Drove a full platform rebuild.",
  },
  {
    company: "Pickle",
    title: "Head of Product",
    description:
      "Joined as the 12th employee. Led product for a peer-to-peer clothing rental marketplace. Drove initiatives to increase offer acceptance rate, click-through rate, and order conversion rate.",
  },
  {
    company: "StockX",
    title: "Lead Product Manager",
    description:
      "Joined as the 19th employee. Built the iOS app, led engineering teams, and ran product for parts of the consumer purchasing experience\u2009\u2014\u2009product discovery, research, and catalog.",
  },
  {
    company: "Earlier",
    title: "Software Engineer \u00b7 Various Companies",
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
                <h3 className="text-2xl font-semibold tracking-tight">
                  {role.company}
                </h3>
                <p className="text-sm text-[--color-muted] mt-1">
                  {role.title}
                </p>
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
const quotes = [
  {
    text: "Your decision documents are absolutely award winning gold medal type stuff. Clear approvals, very clear guidance on options considered. The little plus and minus signs, and everything.",
    attribution: "Chief Product Officer",
  },
  {
    text: "In my past, I\u2019ve seen Product Managers not take an easy quick-win from their predecessor PM because they want to do their own thing or some other ego-driven reason. Josh on the other hand asked questions, identified the opportunity, and launched it. I love that behavior.",
    attribution: "VP of Product",
  },
  {
    text: "Both in engineering and in product, you\u2019ve been someone I trusted, relied upon, and had the utmost faith that you would figure it out. Further, I really appreciate your level headedness, your ability to communicate with the team, and your constant desire to grow.",
    attribution: "Product Marketing Manager",
  },
];

function Testimonials() {
  return (
    <section className="py-28 md:py-36 border-t border-[--color-divider]">
      <FadeUp>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[--color-muted] mb-12">
            What Others Say
          </p>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {quotes.map((q, i) => (
              <div key={i} className={i === 2 ? "md:col-span-2 md:max-w-[65ch]" : ""}>
                <span
                  className="block text-6xl leading-none text-[--color-divider] font-serif select-none"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="-mt-4 text-lg leading-relaxed font-serif italic text-[--color-foreground]">
                  {q.text}
                </blockquote>
                <p className="mt-4 text-xs uppercase tracking-widest text-[--color-muted]">
                  &mdash; {q.attribution}
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
/*  Section 7 — Favorite Books                                        */
/* ------------------------------------------------------------------ */
const books = [
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    note: "Embarrassingly useful. I was skeptical, then I wasn\u2019t.",
  },
  {
    title: "Originals",
    author: "Adam Grant",
    note: null,
  },
  {
    title: "Crucial Conversations",
    author: "Kerry Patterson et al.",
    note: null,
  },
];

function FavoriteBooks() {
  return (
    <section className="py-28 md:py-36 border-t border-[--color-divider]">
      <FadeUp>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[--color-muted] mb-2">
            Favorite Books
          </p>
          <p className="text-base text-[--color-muted] mb-12">
            Books I come back to, recommend often, or think about more than I
            expected to.
          </p>

          <div className="space-y-6">
            {books.map((b) => (
              <div key={b.title}>
                <p className="text-base font-medium">
                  {b.title}{" "}
                  <span className="font-normal text-[--color-muted]">
                    &mdash; {b.author}
                  </span>
                </p>
                {b.note && (
                  <p className="mt-1 text-sm text-[--color-muted]">{b.note}</p>
                )}
              </div>
            ))}
          </div>
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
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ByTheNumbers />
        <About />
        <Career />
        <Testimonials />
        <Writing />
        <FavoriteBooks />
      </main>
      <Contact />
    </>
  );
}
