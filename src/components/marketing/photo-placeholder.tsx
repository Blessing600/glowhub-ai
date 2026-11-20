import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Editorial photo slot. With `src` (a licensed file under public/images, recorded in
 * docs/photo-credits.md) it renders a responsive next/image. Without one it renders a
 * clearly labelled, replaceable slot describing the shot to commission — never a fake
 * "final" image. The slot fills its box: size it with className (e.g. aspect-*).
 */
export function PhotoPlaceholder({
  shot,
  folder,
  src,
  alt = "",
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  position,
  className,
}: {
  /** Description of the intended photograph. */
  shot: string;
  /** Destination folder under public/images. */
  folder: string;
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  /** CSS object-position, e.g. "70% 30%", to keep faces in frame across crops. */
  position?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg bg-sand", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={70}
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    );
  }

  return (
    <figure className={cn("relative overflow-hidden rounded-lg border border-dashed border-plum/30 bg-sand", className)}>
      <figcaption className="absolute top-4 left-4 max-w-[17rem] rounded-md bg-white p-3 text-xs text-ink">
        <span className="flex items-center gap-2 font-semibold">
          <ImageIcon aria-hidden className="size-4 text-rose-700" />
          Photograph to be supplied
        </span>
        <span className="mt-1 block text-taupe">{shot}</span>
        <span className="mt-1 block font-mono text-taupe">public/images/{folder}</span>
      </figcaption>
    </figure>
  );
}
