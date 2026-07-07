import Image from "next/image";

import { getWorkImages } from "@/lib/images";

type WorkGalleryProps = {
  slug: string;
  title: string;
  thumbnail?: string;
  images?: { hero?: string; gallery?: string[] };
};

function GalleryImage({
  src,
  alt,
  aspectRatio,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-foreground/10 ring-inset" />
    </div>
  );
}

export default function WorkGallery({
  slug,
  title,
  thumbnail,
  images,
}: WorkGalleryProps) {
  const { hero, gallery } = getWorkImages(slug, { thumbnail, images });

  return (
    <section className="space-y-4">
      <GalleryImage
        src={hero}
        alt={title}
        aspectRatio="16/9"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        priority
      />

      {gallery.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((src, index) => (
            <GalleryImage
              key={src}
              src={src}
              alt={`${title} image ${index + 1}`}
              aspectRatio="4/3"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}