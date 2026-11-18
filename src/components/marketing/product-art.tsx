/**
 * Original vector still lifes of fictional skincare products, in brand colours.
 * Decorative stand-ins until licensed photography is supplied (see
 * docs/implementation-plan.md, "Photography to supply"). Not real products or brands.
 */
import { cn } from "@/lib/utils";

const c = {
  plum: "#342038",
  cream: "#FFF7EF",
  blush: "#F7E6EA",
  blushDeep: "#EDCFD8",
  rose: "#B9527C",
  gold: "#C59B5D",
  goldDeep: "#A9814A",
  sage: "#B96546",
  sageDeep: "#9A4E33",
  white: "#FFFFFF",
};

const sans = "var(--font-manrope), sans-serif";
const serif = "var(--font-playfair), serif";

type Placement = { x: number; y: number; s?: number };

function at({ x, y, s = 1 }: Placement) {
  return `translate(${x} ${y}) scale(${s})`;
}

function Shadow({ x, y, w }: { x: number; y: number; w: number }) {
  return <ellipse cx={x} cy={y} rx={w} ry={w * 0.14} fill={c.plum} opacity={0.1} />;
}

function Label({ y, lines, color = c.plum, size = 9 }: { y: number; lines: string[]; color?: string; size?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <text
          key={line}
          x={0}
          y={y + i * (size + 4)}
          textAnchor="middle"
          fontFamily={sans}
          fontSize={i === 0 ? size : size - 2}
          fontWeight={i === 0 ? 700 : 500}
          letterSpacing={i === 0 ? 1.6 : 1}
          fill={color}
        >
          {line}
        </text>
      ))}
    </>
  );
}

function Highlight({ x, y, h }: { x: number; y: number; h: number }) {
  return <rect x={x} y={y} width={6} height={h} rx={3} fill={c.white} opacity={0.4} />;
}

function Serum(p: Placement) {
  return (
    <g transform={at(p)}>
      <rect x={-45} y={-150} width={90} height={150} rx={14} fill={c.gold} />
      <rect x={-30} y={-166} width={60} height={22} rx={7} fill={c.goldDeep} />
      <rect x={-22} y={-188} width={44} height={26} rx={4} fill={c.plum} />
      <rect x={-15} y={-236} width={30} height={52} rx={15} fill={c.plum} />
      <rect x={-45} y={-108} width={90} height={58} fill={c.cream} />
      <Label y={-82} lines={["VITAMIN C", "SERUM 30 ML"]} />
      <Highlight x={-35} y={-140} h={120} />
    </g>
  );
}

function Cleanser(p: Placement) {
  return (
    <g transform={at(p)}>
      <rect x={-50} y={-210} width={100} height={210} rx={22} fill={c.white} stroke="#E6DCD3" strokeWidth={2} />
      <rect x={-13} y={-234} width={26} height={26} fill={c.plum} />
      <rect x={-15} y={-262} width={30} height={30} rx={5} fill={c.plum} />
      <rect x={-15} y={-264} width={62} height={13} rx={6.5} fill={c.plum} />
      <rect x={-50} y={-128} width={100} height={72} fill={c.blush} />
      <text x={0} y={-96} textAnchor="middle" fontFamily={serif} fontSize={20} fontWeight={600} fill={c.plum}>
        Gentle
      </text>
      <Label y={-76} lines={["CLEANSER", "150 ML"]} size={8} />
      <Highlight x={-38} y={-196} h={150} />
    </g>
  );
}

function Sunscreen(p: Placement) {
  return (
    <g transform={at(p)}>
      <rect x={-31} y={-42} width={62} height={42} rx={7} fill={c.plum} />
      <path d="M-31,-42 L31,-42 L43,-206 L-43,-206 Z" fill={c.sage} />
      <rect x={-45} y={-220} width={90} height={16} rx={3} fill={c.sageDeep} />
      <text x={0} y={-128} textAnchor="middle" fontFamily={serif} fontSize={26} fontWeight={700} fill={c.cream}>
        SPF 50
      </text>
      <Label y={-108} lines={["SUNSCREEN"]} color={c.cream} size={8} />
      <Highlight x={-28} y={-196} h={130} />
    </g>
  );
}

function Jar(p: Placement) {
  return (
    <g transform={at(p)}>
      <rect x={-76} y={-82} width={152} height={82} rx={18} fill={c.blush} stroke={c.blushDeep} strokeWidth={2} />
      <rect x={-82} y={-114} width={164} height={38} rx={11} fill={c.plum} />
      <rect x={-70} y={-108} width={40} height={6} rx={3} fill={c.white} opacity={0.18} />
      <text x={0} y={-42} textAnchor="middle" fontFamily={serif} fontSize={18} fontWeight={600} fill={c.plum}>
        Barrier
      </text>
      <Label y={-24} lines={["MOISTURISER"]} size={7.5} />
    </g>
  );
}

function Toner(p: Placement) {
  return (
    <g transform={at(p)}>
      <rect x={-40} y={-222} width={80} height={222} rx={12} fill={c.rose} />
      <rect x={-22} y={-272} width={44} height={54} rx={6} fill={c.gold} />
      <rect x={-40} y={-152} width={80} height={82} fill={c.cream} />
      <text x={0} y={-118} textAnchor="middle" fontFamily={serif} fontSize={17} fontWeight={600} fill={c.plum}>
        Hydrating
      </text>
      <Label y={-98} lines={["TONER", "200 ML"]} size={8} />
      <Highlight x={-30} y={-210} h={50} />
    </g>
  );
}

/** Five-product still life on an arch. Used in the hero and page headers. */
export function ProductStill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 640" className={cn("h-auto w-full", className)} aria-hidden focusable="false">
      <path d="M40,640 L40,280 A260,260 0 0 1 560,280 L560,640 Z" fill={c.blush} />
      <circle cx={430} cy={190} r={74} fill={c.gold} opacity={0.55} />
      <path d="M40,640 L40,560 L560,560 L560,640 Z" fill="#EBDCC8" />
      <rect x={40} y={556} width={520} height={6} fill={c.goldDeep} opacity={0.5} />

      <Shadow x={140} y={548} w={50} />
      <Toner x={140} y={548} s={1.05} />
      <Shadow x={258} y={548} w={62} />
      <Cleanser x={258} y={548} s={1.12} />
      <Shadow x={382} y={548} w={56} />
      <Serum x={382} y={548} s={1.1} />

      <Shadow x={205} y={616} w={76} />
      <Jar x={205} y={616} s={0.9} />
      <Shadow x={492} y={612} w={44} />
      <Sunscreen x={492} y={612} s={0.88} />
    </svg>
  );
}

/** The three-product routine from the consultation demo. */
export function ProductTrio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 400" className={cn("h-auto w-full", className)} aria-hidden focusable="false">
      <path d="M30,400 L30,200 A190,190 0 0 1 410,200 L410,400 Z" fill={c.blush} />
      <path d="M30,400 L30,350 L410,350 L410,400 Z" fill="#EBDCC8" />
      <Shadow x={130} y={348} w={52} />
      <Cleanser x={130} y={348} s={1} />
      <Shadow x={235} y={352} w={40} />
      <Sunscreen x={235} y={352} s={0.95} />
      <Shadow x={336} y={352} w={66} />
      <Jar x={336} y={352} s={0.8} />
    </svg>
  );
}

export type ProductKind = "serum" | "cleanser" | "sunscreen" | "jar" | "toner";

const singles: Record<ProductKind, (p: Placement) => React.ReactElement> = {
  serum: Serum,
  cleanser: Cleanser,
  sunscreen: Sunscreen,
  jar: Jar,
  toner: Toner,
};

/** One fictional product on a small arch, for product cards. */
export function ProductSingle({ kind, className }: { kind: ProductKind; className?: string }) {
  const Product = singles[kind];
  return (
    <svg viewBox="0 0 240 300" className={cn("h-auto w-full", className)} aria-hidden focusable="false">
      <path d="M20,300 L20,140 A100,100 0 0 1 220,140 L220,300 Z" fill={c.blush} />
      <path d="M20,300 L20,272 L220,272 L220,300 Z" fill="#EBDCC8" />
      <Shadow x={120} y={270} w={56} />
      <Product x={120} y={270} s={kind === "jar" ? 0.95 : 0.88} />
    </svg>
  );
}
