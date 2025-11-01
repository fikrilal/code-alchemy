import Image from "next/image";

function isExternal(src?: string) {
  if (!src) return false;
  return /^https?:\/\//i.test(src);
}

export function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src: rawSrc, alt = "", className = "", ...rest } = props;
  const src = typeof rawSrc === "string" ? rawSrc : undefined;
  if (!src) return null;
  // For external or unknown sizes, fall back to plain img to avoid domain config issues
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
};

export default mdxComponents;
