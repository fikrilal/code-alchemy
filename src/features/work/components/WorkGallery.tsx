import Image from "next/image";

import { getWorkImages } from "@/lib/images";

export default function WorkGallery({
  slug,
  title,
  thumbnail,
  images,
}: {
  slug: string;
  title: string;
  thumbnail?: string | undefined;
  images?: { hero?: string; gallery?: string[] } | undefined;
}) {
  const { hero, gallery } = getWorkImages(slug, { thumbnail, images });

  return (
    <section className="space-y-6">
      <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={hero}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority
        />
      </div>
      {gallery.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((src, i) => (
            <div key={i} className="relative rounded-md overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image
                src={src}
                alt={`${title} image ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
