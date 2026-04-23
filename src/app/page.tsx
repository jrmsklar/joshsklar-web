"use client";

import Image from "next/image";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { NavBar } from "@/components/ui/tube-light-navbar";
import { FloatingIconsHero } from "@/components/ui/floating-icons-hero-section";
import { Counter } from "@/components/ui/animated-counter";
import { Home as HomeIcon, User, Briefcase, PenLine, Mail, Sparkles } from "lucide-react";

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
  { name: "Coaching", url: "#coaching", icon: Sparkles },
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
  { target: 3, suffix: "", lines: ["Mixed-Media", "Art Publications"] },
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
              things, but I kept finding myself more interested in
              why we were building them than how. That instinct
              eventually pulled me into product.
            </p>
            <p>
              I joined StockX in 2016 as the 19th employee and spent eight and a
              half years there, building the iOS app and eventually leading
              product for parts of the consumer purchasing
              experience – product discovery, research, and catalog.
            </p>
            <p>
              Since then, I&rsquo;ve led product at early-stage
              startups, working across the full stack of what it means to run product: strategy,
              roadmaps, analytics, hiring, and the hard conversations that come
              with building in constrained environments.
            </p>
            <p>
              I care a lot about craft. Good product work, to me, looks a lot
              like good writing – clear thinking made visible.
              I&rsquo;m drawn to problems where the stakes are real and the
              feedback loops are tight.
            </p>
            <p>
              Outside of work, I spend a lot of time outdoors. I&rsquo;ve
              completed six Ironman 70.3s, two marathons, and a bunch of half
              marathons. I play piano and love to make mixed-media art pieces. My
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
      "Joined as the 19th employee. Built the iOS app, led engineering teams, and ran product for parts of the consumer purchasing experience – product discovery, research, and catalog.",
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
  {
    text: "Josh really shined during our UX reviews with detail-oriented feedback and reasoning backed by historical data results, all of which helped us to keep challenging funnel points driving forward. I enjoyed Josh\u2019s enthusiasm for the industry and always walked away from our conversations with new perspectives.",
    name: "Lead Product Designer",
    role: "",
  },
  {
    text: "One of Josh\u2019s standout qualities is his exceptional skill in crafting well-written, comprehensive documents that communicate ideas and strategies with unparalleled clarity. Josh played a key role in shaping the Product Pages on StockX and solving complex All-in Ask challenges by collaborating seamlessly with cross-functional teams. His strategic thinking, authenticity, and his ability to \u201Csay it as it is\u201D ensures that teams are aligned and focused on the right priorities.",
    name: "Lead Product Manager",
    role: "",
  },
  {
    text: "Josh has an extraordinary ability to envision and deliver world-class customer experiences. He has a meticulous approach to documentation and creates artifacts that are both clear and actionable\u2014something that made working with him as an engineer seamless and efficient. Josh excels at aligning diverse inputs from design, engineering, and business teams into a cohesive product vision. His ability to synthesize ideas and drive alignment made even the most complex projects feel manageable.",
    name: "Senior Engineering Manager",
    role: "",
  },
  {
    text: "Josh demonstrated a deep understanding of market trends and customer needs. His people skills are unparalleled, enabling him to lead and inspire. What really sets Josh apart is his strategic use of questioning to drive innovation, as he consistently challenges assumptions and explores new perspectives to push the boundaries of what\u2019s possible. Josh is not just an exceptional Product Leader but an even better person whom I would highly recommend.",
    name: "Business Operations Manager",
    role: "",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 8);

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
          <TestimonialsColumn testimonials={firstColumn} duration={30} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={38}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={34}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Writing                                               */
/* ------------------------------------------------------------------ */
const linkedInPosts = [
  {
    url: "https://www.linkedin.com/posts/jrmsklar_i-used-to-work-with-someone-who-almost-every-activity-7303460839217397760-_vYy",
    date: "March 6, 2025",
    excerpt: "I used to work with someone who almost every time they wanted to communicate something, they\u2019d send a Slack DM. Stop doing this. Default to public channels instead. Here\u2019s why...",
    likes: "4,328",
    comments: "305",
  },
  {
    url: "https://www.linkedin.com/posts/jrmsklar_four-years-ago-we-had-an-offsite-at-stockx-activity-7417994265479274496-82Ki",
    date: "January 16, 2026",
    excerpt: "Four years ago we had an offsite at StockX. A leader shared a simple trick: \u201CAny time you\u2019re feeling a strong emotion, if you just name it out loud it immediately cuts the intensity down by about half.\u201D It\u2019s the simplest thing I\u2019ve ever learned and I still use it...",
    likes: "68",
    comments: "6",
  },
  {
    url: "https://www.linkedin.com/posts/jrmsklar_bad-ui-in-the-real-world-part-2-the-input-activity-7384601832091824128-z6E7",
    date: "October 16, 2025",
    excerpt: "Bad UI in the Real World, Part 2: The Input Button. I spent 2 minutes trying to change the input on my TV and almost gave up thinking it was broken. Two buttons looked nearly identical...",
    likes: "55",
    comments: "71",
  },
  {
    url: "https://www.linkedin.com/posts/jrmsklar_bad-ui-in-the-real-world-part-3-the-immersive-activity-7414452349605187584-RKG3",
    date: "January 6, 2026",
    excerpt: "Bad UI in the Real World, Part 3: The Immersive Bathroom. This vanity backdrop in the rainforest of Costa Rica was unlike most \u2014 beautiful, bright, and completely immersive in nature... and not a single mirror.",
    likes: "35",
    comments: "19",
  },
];

function Writing() {
  const [currentPost, setCurrentPost] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (newIndex: number) => {
    setDirection(newIndex > currentPost ? 1 : -1);
    setCurrentPost(newIndex);
  };

  const prev = () => {
    const newIndex = (currentPost - 1 + linkedInPosts.length) % linkedInPosts.length;
    setDirection(-1);
    setCurrentPost(newIndex);
  };

  const next = () => {
    const newIndex = (currentPost + 1) % linkedInPosts.length;
    setDirection(1);
    setCurrentPost(newIndex);
  };

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

          {/* LinkedIn post carousel */}
          <div className="relative mb-8 flex items-center gap-3">
            {/* Left arrow */}
            <button
              onClick={prev}
              className="flex shrink-0 w-8 h-8 items-center justify-center rounded-full bg-white border border-[#D2D2D7] text-[#6E6E73] hover:text-[#1D1D1F] hover:border-[#6E6E73] transition-colors shadow-sm"
              aria-label="Previous post"
            >
              &larr;
            </button>

            {/* Card with animation */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentPost}
                custom={direction}
                initial={{ opacity: 0, x: direction * 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 300 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <a
                  href={linkedInPosts[currentPost].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-[--color-divider] bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src="/images/headshot-square.jpg"
                        alt="Josh Sklar"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[--color-foreground]">Josh Sklar</p>
                      <p className="text-xs text-[--color-muted]">{linkedInPosts[currentPost].date}</p>
                    </div>
                    <svg className="ml-auto w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-[--color-foreground] leading-relaxed line-clamp-4">
                    {linkedInPosts[currentPost].excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-[--color-muted]">
                    <span>{linkedInPosts[currentPost].likes} likes</span>
                    <span>{linkedInPosts[currentPost].comments} comments</span>
                  </div>
                </a>
              </motion.div>
              </AnimatePresence>
            </div>

            {/* Right arrow */}
            <button
              onClick={next}
              className="flex shrink-0 w-8 h-8 items-center justify-center rounded-full bg-white border border-[#D2D2D7] text-[#6E6E73] hover:text-[#1D1D1F] hover:border-[#6E6E73] transition-colors shadow-sm"
              aria-label="Next post"
            >
              &rarr;
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {linkedInPosts.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentPost
                    ? "bg-[#1D1D1F]"
                    : "bg-[#D2D2D7] hover:bg-[#6E6E73]"
                }`}
                aria-label={`View post ${i + 1}`}
              />
            ))}
          </div>

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
/*  Section 7.5 — Coaching                                            */
/* ------------------------------------------------------------------ */
function Coaching() {
  return (
    <section
      id="coaching"
      className="py-28 md:py-36 border-t border-[--color-divider]"
    >
      <FadeUp>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[--color-muted] mb-8">
            Coaching
          </p>
          <div className="space-y-5 text-base leading-relaxed text-[--color-foreground] mb-8 max-w-2xl">
            <p>
              I offer 1:1 coaching for product and engineering leaders – whether
              you&rsquo;re stepping into your first management role, navigating a
              tough team dynamic, or trying to grow in leadership. I
              draw on 14+ years of building and leading teams
              to help you think clearly and and lead with care.
            </p>
            <p>
              Mentoring has been one of the most meaningful parts of my career – watching the people I&rsquo;ve worked with grow into leaders themselves is what keeps me doing this.
            </p>
          </div>
          <a
            href="mailto:josh@joshsklar.com?subject=Coaching%20inquiry"
            className="inline-flex items-center gap-1 text-[--color-accent] text-sm hover:underline"
          >
            Email me to get started &rarr;
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
              href="mailto:josh@joshsklar.com"
              className="text-white hover:text-[--color-accent] transition-colors"
            >
              josh@joshsklar.com
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
        <Coaching />

      </main>
      <Contact />
    </>
  );
}
