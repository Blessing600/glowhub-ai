/**
 * Shared public-site copy. No metrics, customers, testimonials or partners —
 * GlowHub is pre-launch.
 */
import {
  BadgeCheck,
  BarChart3,
  Boxes,
  CalendarClock,
  ClipboardList,
  FlaskConical,
  HeartHandshake,
  type LucideIcon,
  MessageCircleQuestion,
  ScanFace,
  Sparkles,
  Store,
  Users,
} from "lucide-react";

export type IconItem = { icon: LucideIcon; title: string; body: string };

export const businessCapabilities: readonly IconItem[] = [
  {
    icon: Boxes,
    title: "Stock and expiry",
    body: "Batches, expiry dates and stock movements in one place, with first-expiry-first-out suggestions and low-stock alerts.",
  },
  {
    icon: Sparkles,
    title: "GlowHub Intelligence",
    body: "Ask about sales, margins and stock in plain language. Answers link to your records and show their working.",
  },
  {
    icon: HeartHandshake,
    title: "Consultations",
    body: "Guide customers to suitable products you actually stock, with ingredient reasons, budget and safety checks.",
  },
  {
    icon: BadgeCheck,
    title: "Supplier evidence",
    body: "Organise invoices and batch evidence, flag mismatches for human review and record every decision.",
  },
  {
    icon: Users,
    title: "Sales and customers",
    body: "Record sales once and stock updates once. Keep customer preferences and consent together.",
  },
  {
    icon: Store,
    title: "Storefront",
    body: "A mobile catalogue of your stock with evidence status and an enquiry button — no marketplace required.",
  },
];

/** Feature names from the brief §4. `status` describes prototype scope honestly. */
export const features: ReadonlyArray<IconItem & { name: string; status: string; points: readonly string[] }> = [
  {
    name: "Glow Intelligence",
    icon: Sparkles,
    title: "Answers grounded in your business records",
    body: "Ask which products to restock, what sold best this month or where margin is slipping.",
    status: "Shown in the interactive demo with fictional data",
    points: [
      "Calculations come from your records, with the formula shown",
      "Says when evidence is missing instead of guessing",
      "Suggestions only — you approve any stock, price or purchase change",
    ],
  },
  {
    name: "Glow Match",
    icon: HeartHandshake,
    title: "Consultations matched to real stock",
    body: "Budget, routine and preferences in; suitable in-stock products, reasons and prices out.",
    status: "Shown in the interactive demo with fictional data",
    points: [
      "Recommends only products in the catalogue, at their real price",
      "Respects allergies you list and stays within budget",
      "Stops and refers to qualified care for medical symptoms",
    ],
  },
  {
    name: "Glow Check",
    icon: FlaskConical,
    title: "Ingredient intelligence",
    body: "Understand what each ingredient does, spot common irritants and overlapping actives, and see what's missing.",
    status: "Planned for the prototype consumer and workspace milestones",
    points: [
      "Ingredient roles and known irritants, with source and date",
      "Flags incomplete ingredient lists rather than claiming compatibility",
      "No guarantee of individual tolerance — patch testing still applies",
    ],
  },
  {
    name: "Glow Verify",
    icon: BadgeCheck,
    title: "Supplier evidence review",
    body: "Extract supplier, batch, expiry and registration details from invoices and flag mismatches for a person to review.",
    status: "Shown in the interactive demo with fictional data",
    points: [
      "Human reviewers decide; AI never declares a product genuine or fake",
      "A registration number or barcode is not proof a unit is genuine",
      "Badges state exactly which review was completed, and when",
    ],
  },
  {
    name: "Glow Routine",
    icon: CalendarClock,
    title: "Simple morning and evening routines",
    body: "Turn a consultation into an ordered routine with general usage notes and cautions.",
    status: "Shown in the interactive demo with fictional data",
    points: [
      "Clear step order for morning and evening",
      "General guidance only — follow manufacturer instructions",
      "Saved only if the shopper chooses to save it",
    ],
  },
  {
    name: "Glow Scan",
    icon: ScanFace,
    title: "Optional photo-guided consultation",
    body: "A future, opt-in way to start a consultation from a photo. Text-only consultation is always available.",
    status: "Sample only in this prototype — live photo analysis is switched off",
    points: [
      "The demo uses a fictional sample image with scripted observations",
      "Camera preview stays on your device; photos are not analysed or stored",
      "Live analysis needs safety, fairness and privacy review before any pilot",
    ],
  },
];

export const coreManagement: readonly string[] = [
  "Catalogue with ingredients, sizes, prices and supplier details",
  "Batch, expiry and stock movement history",
  "Sales, payments status, refunds and receipts",
  "Customer records with consent and opt-outs",
  "Reports: revenue, gross profit, stock ageing and expiry",
  "Team roles and permissions",
];

export const audiences: readonly IconItem[] = [
  {
    icon: Store,
    title: "Independent skincare retailers",
    body: "Track stock, batches, sales and customers, and give reliable product guidance.",
  },
  {
    icon: Sparkles,
    title: "Beauty brand owners",
    body: "Manage catalogue and inventory, retailer orders, customer education and performance.",
  },
  {
    icon: Boxes,
    title: "Beauty distributors",
    body: "Keep supplier evidence, stock and business-to-business sales organised.",
  },
  {
    icon: HeartHandshake,
    title: "Salons, spas and professionals",
    body: "Record consultations, recommend products you stock and manage repeat purchases.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Shoppers",
    body: "Find suitable products, understand ingredients and buy from participating sellers.",
  },
];

export const howItWorksSteps: ReadonlyArray<{ title: string; body: string; icon: LucideIcon }> = [
  {
    icon: Users,
    title: "Set up your workspace",
    body: "Create your business, choose currency and location, and invite staff with the right roles. Start on a 14-day trial with no card.",
  },
  {
    icon: ClipboardList,
    title: "Add your catalogue",
    body: "Import products from a spreadsheet or add them one by one: ingredients, sizes, prices, supplier and registration details. Missing evidence is shown, not hidden.",
  },
  {
    icon: Boxes,
    title: "Record stock by batch",
    body: "Receive stock against batches with expiry dates and costs. Every adjustment needs a reason, and stock balances always reconcile.",
  },
  {
    icon: HeartHandshake,
    title: "Run consultations",
    body: "Staff or shoppers answer a short questionnaire. GlowHub suggests in-stock products with reasons, prices and safety notes for a person to review.",
  },
  {
    icon: BadgeCheck,
    title: "Review supplier evidence",
    body: "Upload invoices and batch evidence. GlowHub extracts the fields and flags gaps; a human reviewer approves, rejects or asks for more.",
  },
  {
    icon: Store,
    title: "Record sales",
    body: "Each confirmed sale deducts stock exactly once. Payment status, refunds and receipts stay with the sale.",
  },
  {
    icon: BarChart3,
    title: "See what's working",
    body: "Reports on revenue, gross profit, best sellers, expiry and repeat customers — and plain-language answers from GlowHub Intelligence.",
  },
];

export type FaqItem = { question: string; answer: string; topic: string };

export const faqs: readonly FaqItem[] = [
  {
    topic: "Product",
    question: "What is GlowHub?",
    answer:
      "GlowHub is a proposed operating system for beauty businesses — stock, sales, customers, consultations and supplier evidence — with AI built into each workflow. Shoppers get product discovery and consultation through participating sellers' storefronts.",
  },
  {
    topic: "Launch",
    question: "Can I use GlowHub today?",
    answer:
      "Not yet. GlowHub is pre-launch. This site and its demo are an interactive prototype with fictional data. Join early access to hear about pilots and launch.",
  },
  {
    topic: "Product",
    question: "Is there a marketplace?",
    answer:
      "Not at launch. GlowHub starts as business software that is useful on its own. A connected marketplace may follow once seller coverage, trust processes and delivery are ready.",
  },
  {
    topic: "Camera",
    question: "What happens to my photo in Glow Scan?",
    answer:
      "In this prototype, live photo analysis is switched off. Any camera preview stays on your device: it is not uploaded, stored or analysed. The demo uses a fictional sample image with scripted observations. You can always use a text-only consultation instead.",
  },
  {
    topic: "Safety",
    question: "Can GlowHub diagnose skin conditions?",
    answer:
      "No. GlowHub gives cosmetic guidance only. It does not diagnose, prescribe or replace a qualified clinician. If you have severe or persistent symptoms, a worsening rash, signs of infection or a suspected allergic reaction, please see a qualified healthcare professional. For breathing difficulty or other emergency signs, get urgent medical help.",
  },
  {
    topic: "Authenticity",
    question: "Does GlowHub guarantee products are authentic?",
    answer:
      "No. GlowHub helps businesses organise supplier evidence and flags mismatches for human review. A badge states exactly which review was completed and when. A registration number or barcode alone is not proof that a particular unit is genuine.",
  },
  {
    topic: "Plans",
    question: "How much will GlowHub cost?",
    answer:
      "Proposed launch plans are Starter ₦10,000, Professional ₦25,000 and Business ₦60,000 per month, with discounts for quarterly, six-month and annual prepayment. Prices are a hypothesis we are testing with pilot businesses and may change before launch.",
  },
  {
    topic: "Plans",
    question: "Will the free trial charge me automatically?",
    answer:
      "No. The proposed 14-day Professional trial needs no card and does not convert to a paid plan automatically.",
  },
  {
    topic: "Plans",
    question: "What happens if we use all our AI requests?",
    answer:
      "You'll see a warning at 80% of your monthly allowance. At 100%, AI features pause until the next month unless you choose a clearly priced add-on. There are no surprise fees, and manual workflows keep working.",
  },
  {
    topic: "Privacy",
    question: "What happens to the details I enter on this site?",
    answer:
      "Nothing is stored. Forms on this prototype check your entries and show a confirmation, but no details are sent anywhere. The demo never uses real customer records.",
  },
  {
    topic: "Privacy",
    question: "Will GlowHub train AI on my business data?",
    answer:
      "No. The plan is not to train AI models on private customer content without separate, documented authorisation and a lawful basis.",
  },
];
