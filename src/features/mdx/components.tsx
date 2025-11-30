import Image from "next/image";

import { Mermaid } from "./Mermaid";

import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

function isExternal(src?: string) {
  if (!src) return false;
  return /^https?:\/\//i.test(src);
}

export function MdxImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src: rawSrc, alt = "", className = "", ...rest } = props;
  const src = typeof rawSrc === "string" ? rawSrc : undefined;
  if (!src) return null;
  if (isExternal(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} {...rest} />;
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={675}
      className={className}
    />
  );
}

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, className = "", target, rel, children, ...rest } = props;
  const external = isExternal(href);
  const effectiveTarget = target ?? (external ? "_blank" : undefined);
  const effectiveRel = rel ?? (external ? "noreferrer" : undefined);
  const linkClass = `${className} text-blue-500 underline`.trim();

  return (
    <a href={href} target={effectiveTarget} rel={effectiveRel} className={linkClass} {...rest}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  img: MdxImage,
  a: MdxLink,
  Mermaid,
};

export default mdxComponents;
