"use client";
import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div
                  className="p-8 rounded-3xl border border-[--color-divider] shadow-lg shadow-black/5 w-72"
                  key={i}
                >
                  <div className="text-base leading-relaxed text-[--color-foreground]">
                    {text}
                  </div>
                  <div className="flex items-center gap-2 mt-5">
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-[--color-foreground]">
                        {name}
                      </div>
                      {role && (
                        <div className="leading-5 text-[--color-muted] tracking-tight text-sm">
                          {role}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
