import Image from "next/image";

import { Mermaid } from "./Mermaid";

import type { ImgHTMLAttributes } from "react";

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

export const mdxComponents = {
  img: MdxImage,
  Mermaid,
};

export default mdxComponents;
