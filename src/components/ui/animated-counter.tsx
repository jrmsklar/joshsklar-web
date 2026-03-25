"use client";

import { MotionValue, motion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const padding = 10;

interface CounterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  start?: number;
  end: number;
  duration?: number;
  className?: string;
  fontSize?: number;
  started?: boolean;
}

export const Counter = ({
  start = 0,
  end,
  duration = end,
  className,
  fontSize = 30,
  started = true,
  ...rest
}: CounterProps) => {
  const [value, setValue] = useState(start);
  const height = fontSize + padding;

  useEffect(() => {
    if (!started) return;
    setValue(start);
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= end) {
          clearInterval(interval);
          return end;
        }
        return prev + 1;
      });
    }, (duration / (end - start)) * 1000);

    return () => clearInterval(interval);
  }, [started, start, end, duration]);

  return (
    <div
      style={{ fontSize }}
      {...rest}
      className={cn(
        "flex overflow-hidden rounded leading-none font-bold justify-center",
        className
      )}
    >
      {value >= 100 && <Digit place={100} value={value} height={height} />}
      {value >= 10 && <Digit place={10} value={value} height={height} />}
      <Digit place={1} value={value} height={height} />
    </div>
  );
};

function Digit({ place, value, height }: { place: number; value: number; height: number }) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

function Number({ mv, number, height }: { mv: MotionValue; number: number; height: number }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}
