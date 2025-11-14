"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import type { ComponentType } from "react";

type MotionTag = "div" | "section" | "p" | "h1" | "h2" | "h3" | "span" | "ul" | "li";

const motionMap: Record<MotionTag, ComponentType<HTMLMotionProps<"div">>> = {
  div: motion.div,
  section: motion.section as unknown as ComponentType<HTMLMotionProps<"div">>,
  p: motion.p as unknown as ComponentType<HTMLMotionProps<"div">>,
  h1: motion.h1 as unknown as ComponentType<HTMLMotionProps<"div">>,
  h2: motion.h2 as unknown as ComponentType<HTMLMotionProps<"div">>,
  h3: motion.h3 as unknown as ComponentType<HTMLMotionProps<"div">>,
  span: motion.span as unknown as ComponentType<HTMLMotionProps<"div">>,
  ul: motion.ul as unknown as ComponentType<HTMLMotionProps<"div">>,
  li: motion.li as unknown as ComponentType<HTMLMotionProps<"div">>,
};

export type MotionElementProps = HTMLMotionProps<"div"> & {
  as?: MotionTag;
};

export function MotionElement({ as = "div", ...rest }: MotionElementProps) {
  const Component = motionMap[as] ?? motion.div;
  return <Component {...rest} />;
}

export default MotionElement;
