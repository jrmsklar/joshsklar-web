"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface IconData {
  id: number;
  src: string;
  alt: string;
  desktopClassName: string;
  shortViewportClassName?: string; // used on tablet/short viewports to avoid center overlap
  mobileClassName?: string;
  hideOnMobile?: boolean;
}

const icons: IconData[] = [
  // Top row: above headshot on mobile, flanking headshot on desktop
  { id: 1, src: "/images/app_icons/stockx-app-icon.png", alt: "StockX", desktopClassName: "top-[14%] left-[8%]", mobileClassName: "top-[13%] left-[3%]" },
  { id: 2, src: "/images/app_icons/dominos-app-icon.png", alt: "Domino's", desktopClassName: "top-[12%] left-[28%]", shortViewportClassName: "top-[15%] left-[28%]", mobileClassName: "top-[11%] left-[40%]" },
  { id: 3, src: "/images/app_icons/pickle-app-icon.jpeg", alt: "Pickle", desktopClassName: "top-[12%] right-[28%]", shortViewportClassName: "top-[15%] right-[28%]", mobileClassName: "top-[13%] right-[3%]" },
  { id: 4, src: "/images/app_icons/kiai-motors-app-icon.webp", alt: "KIA Motors", desktopClassName: "top-[14%] right-[8%]", mobileClassName: "bottom-[6%] left-[5%]" },
  // Left column: evenly spaced down the left side
  { id: 5, src: "/images/app_icons/cavaliers-app-icon.png", alt: "Cavaliers", desktopClassName: "top-[32%] left-[7%]", shortViewportClassName: "top-[30%] left-[7%]", mobileClassName: "bottom-[6%] left-[38%]" },
  { id: 7, src: "/images/app_icons/companion-app-icon.png", alt: "Companion", desktopClassName: "top-[52%] left-[5%]", shortViewportClassName: "top-[47%] left-[5%]", hideOnMobile: true },
  { id: 9, src: "/images/app_icons/legends-card-app-icon.png", alt: "Legends Card", desktopClassName: "top-[72%] left-[3%]", shortViewportClassName: "top-[64%] left-[3%]", hideOnMobile: true },
  { id: 10, src: "/images/app_icons/secret-app-icon.png", alt: "Secret", desktopClassName: "bottom-[6%] left-[28%]", shortViewportClassName: "top-[81%] left-[5%]", hideOnMobile: true },
  // Right column: evenly spaced down the right side
  { id: 6, src: "/images/app_icons/jolly-app-icon.png", alt: "Jolly", desktopClassName: "top-[32%] right-[7%]", shortViewportClassName: "top-[30%] right-[7%]", mobileClassName: "bottom-[6%] right-[5%]" },
  { id: 8, src: "/images/app_icons/freezebrew-logo.png", alt: "FreezeBrew", desktopClassName: "top-[52%] right-[5%]", shortViewportClassName: "top-[47%] right-[5%]", hideOnMobile: true },
  { id: 11, src: "/images/app_icons/merge-app-icon.png", alt: "Merge", desktopClassName: "top-[72%] right-[3%]", shortViewportClassName: "top-[64%] right-[3%]", hideOnMobile: true },
  { id: 12, src: "/images/app_icons/social-justice-challenge-icon.png", alt: "Social Justice Challenge", desktopClassName: "bottom-[6%] right-[28%]", shortViewportClassName: "top-[81%] right-[5%]", hideOnMobile: true },
];

function FloatingIcon({
  iconData,
  mouseX,
  mouseY,
  index,
  isMobile,
  isShortViewport,
}: {
  iconData: IconData;
  mouseX: React.RefObject<number>;
  mouseY: React.RefObject<number>;
  index: number;
  isMobile: boolean;
  isShortViewport: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  React.useEffect(() => {
    // Disable repulsion on touch devices to prevent scroll-induced shifting
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let raf: number;
    const update = () => {
      if (ref.current && mouseX.current !== undefined && mouseY.current !== undefined) {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseX.current - cx;
        const dy = mouseY.current - cy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / 150) * 40;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.3 + index * 0.12,
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "absolute pointer-events-none",
        iconData.hideOnMobile && "hidden md:block",
        isMobile && iconData.mobileClassName
          ? iconData.mobileClassName
          : isShortViewport && iconData.shortViewportClassName
            ? iconData.shortViewportClassName
            : iconData.desktopClassName,
      )}
    >
      <motion.div
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-xl shadow-black/15 bg-white/80 backdrop-blur-sm border border-white/20 overflow-hidden"
        animate={{
          y: [0, -6, 0, 6, 0],
          x: [0, 3, 0, -3, 0],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <Image
          src={iconData.src}
          alt={iconData.alt}
          width={80}
          height={80}
          className="w-full h-full object-cover"
          sizes="80px"
        />
      </motion.div>
    </motion.div>
  );
}

export function FloatingIconsHero() {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isShortViewport, setIsShortViewport] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  React.useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsShortViewport(window.innerWidth >= 768 && window.innerHeight < 900);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-44 pb-36 md:pt-16 md:pb-0"
    >
      {/* Floating icons layer */}
      <div className="absolute inset-0 w-full h-full">
        {icons.map((iconData, index) => (
          <FloatingIcon
            key={iconData.id}
            iconData={iconData}
            mouseX={mouseX}
            mouseY={mouseY}
            index={index}
            isMobile={isMobile}
            isShortViewport={isShortViewport}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Circular headshot */}
        <div className="mx-auto w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden mb-6 ring-4 ring-[#D2D2D7]/50 shadow-xl">
          <Image
            src="/images/headshot-square.jpg"
            alt="Josh Sklar"
            width={416}
            height={416}
            priority
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name badge + toast */}
        <div className="relative inline-flex flex-col items-center">
          <button
            onClick={() => {
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            }}
            className="mt-0 inline-flex items-center rounded-full border border-[#D2D2D7]/60 bg-white/60 backdrop-blur-sm px-4 py-1.5 text-xs md:text-sm text-[--color-foreground] font-medium tracking-wide cursor-pointer hover:bg-white/80 transition-colors"
          >
            Josh Sklar
          </button>

          {/* Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute bottom-full mb-2 z-50"
              >
                <a
                  href="#contact"
                  onClick={() => setShowToast(false)}
                  className="inline-flex items-center gap-1 rounded-full bg-neutral-800 text-white px-4 py-1.5 text-xs font-medium shadow-lg hover:bg-neutral-700 transition-colors whitespace-nowrap"
                >
                  Contact Josh &rarr;
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Headline */}
        <h1 className="mt-4 text-xl md:text-2xl lg:text-3xl font-normal tracking-tight text-[--color-foreground] leading-snug max-w-xl mx-auto">
          Product and engineering leader. Passionate about people-first
          culture. 14+ years of building and scaling consumer apps.
        </h1>

        {/* Body text */}
        <p className="mt-4 text-sm md:text-base text-[--color-muted] leading-relaxed max-w-lg mx-auto">
          I&rsquo;ve spent my career helping companies build things people
          actually use, from the early days of a scrappy startup to
          shipping products at scale. I&rsquo;m based in New York.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
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

    </section>
  );
}
