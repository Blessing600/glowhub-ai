import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Editorial photo slot. Until licensed photography is supplied (brief §3) it
 * describes the intended shot so it can be commissioned; every use is listed in
 * docs/implementation-plan.md under "Photography to supply". Pass `src` (a file
 * under public/images) and `alt` once the image exists. Never use unlicensed or
 * hotlinked images. The slot fills its box: size it with className (e.g. aspect-*).
 */
export function PhotoPlaceholder({
  shot,
  folder,
  src,
  alt = "",
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
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
  className?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl bg-blush", className)}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <figure className={cn("relative overflow-hidden rounded-xl bg-[#ead6c8]", className)}>
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-[12%] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full bg-gold/45" />
        <div className="absolute -bottom-[30%] left-1/2 aspect-square w-[120%] -translate-x-1/2 rounded-full bg-terracotta/25" />
      </div>
      <figcaption className="absolute top-4 left-4 max-w-[16rem] rounded-lg bg-white/90 p-3 text-xs text-plum">
        <span className="flex items-center gap-2 font-semibold">
          <ImageIcon aria-hidden className="size-4 text-rose-700" />
          Photograph to be supplied
        </span>
        <span className="mt-1 block text-plum-600">{shot}</span>
        <span className="mt-1 block text-plum-600">public/images/{folder}</span>
      </figcaption>
    </figure>
  );
}
