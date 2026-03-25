"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface IconData {
  id: number;
  src: string;
  alt: string;
  className: string;
  hideOnMobile?: boolean;
}

const icons: IconData[] = [
  { id: 1, src: "/images/app_icons/dominos-app-icon.webp", alt: "Domino's", className: "top-[8%] left-[5%]" },
  { id: 2, src: "/images/app_icons/pickle-app-icon.webp", alt: "Pickle", className: "top-[12%] left-[28%]", hideOnMobile: true },
  { id: 3, src: "/images/app_icons/jolly-app-icon.webp", alt: "Jolly", className: "top-[6%] left-[58%]", hideOnMobile: true },
  { id: 4, src: "/images/app_icons/kiai-motors-app-icon.webp", alt: "KIA Motors", className: "top-[15%] right-[8%]" },
  { id: 5, src: "/images/app_icons/companion-app-icon.png", alt: "Companion", className: "top-[35%] left-[3%]" },
  { id: 6, src: "/images/app_icons/cavaliers-app-icon.png", alt: "Cavaliers", className: "top-[45%] right-[3%]" },
  { id: 7, src: "/images/app_icons/social-justice-challenge-icon.png", alt: "Social Justice Challenge", className: "top-[65%] left-[5%]", hideOnMobile: true },
  { id: 8, src: "/images/app_icons/freezebrew-logo.png", alt: "FreezeBrew", className: "top-[62%] right-[6%]" },
  { id: 9, src: "/images/app_icons/legends-card-app-icon.png", alt: "Legends Card", className: "bottom-[10%] left-[12%]" },
  { id: 10, src: "/images/app_icons/secret-app-icon.png", alt: "Secret", className: "bottom-[5%] left-[30%]", hideOnMobile: true },
  { id: 11, src: "/images/app_icons/merge-app-icon.png", alt: "Merge", className: "bottom-[12%] right-[10%]" },
];

function FloatingIcon({
  iconData,
  mouseX,
  mouseY,
  index,
}: {
  iconData: IconData;
  mouseX: React.RefObject<number>;
  mouseY: React.RefObject<number>;
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  React.useEffect(() => {
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
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "absolute pointer-events-none",
        iconData.hideOnMobile && "hidden md:block",
        iconData.className
      )}
    >
      <motion.div
        className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20 overflow-hidden"
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 4, 0, -4, 0],
          rotate: [0, 3, 0, -3, 0],
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
          width={64}
          height={64}
          className="w-full h-full object-cover"
          sizes="64px"
        />
      </motion.div>
    </motion.div>
  );
}

export function FloatingIconsHero() {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16"
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
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Circular headshot */}
        <div className="mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-8 ring-4 ring-[#D2D2D7]/50 shadow-xl">
          <Image
            src="/images/headshot-square.jpg"
            alt="Josh Sklar"
            width={288}
            height={288}
            priority
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-b from-[#1D1D1F] to-[#6E6E73] bg-clip-text text-transparent">
          Josh Sklar
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-[--color-muted] leading-relaxed max-w-xl mx-auto">
          Product and engineering leader. Passionate about people-first
          culture. 14+ years of building and scaling consumer apps.
        </p>

        {/* Body text */}
        <p className="mt-4 text-base text-[--color-foreground] leading-relaxed max-w-lg mx-auto">
          I&rsquo;ve spent my career helping companies build things people
          actually use&nbsp;&mdash; from the early days of a scrappy startup to
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
