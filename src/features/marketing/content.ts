/**
 * Shared public-site copy. Describes capabilities only: no customer counts,
 * testimonials, revenue, partners or example business data. Anything that depends
 * on a backend says so where it matters (see docs/frontend-api-contracts.md).
 */

export type TextItem = { title: string; body: string };

/** The connected parts of a beauty business (homepage §2). */
export const complexityThreads: ReadonlyArray<TextItem & { label: string }> = [
  { label: "Customers", title: "Who needs what", body: "Skin concerns, preferences, budgets and the questions people ask before they buy." },
  { label: "Sales", title: "What actually moved", body: "Which products sell, to whom, through which channel, and what came back." },
  { label: "Shelf", title: "What you can sell today", body: "Stock by batch, expiry dates and the products quietly running low." },
  { label: "Margins", title: "What you really earn", body: "Supplier costs, prices and discounts — the difference between busy and profitable." },
  { label: "Decisions", title: "What to do next", body: "Reorder, promote, follow up or wait. Every day, with incomplete information." },
];

/** How GlowHub Intelligence builds an insight (homepage §3). */
export const intelligenceAnatomy: ReadonlyArray<TextItem> = [
  { title: "You ask in plain language", body: "Ask about sales, stock, customers or margins the way you would ask a trusted manager." },
  { title: "It reads only your authorised records", body: "Answers draw on your own workspace — sales, batches, supplier costs — never on guesses or other businesses' data." },
  { title: "It shows its working", body: "Each answer cites the records it used and the calculation behind it, and says plainly when information is missing." },
  { title: "You decide", body: "Suggested reorders, price changes or messages wait as drafts until you review and approve them." },
];

/** Sell smarter journeys (homepage §4). Each ties to a business outcome. */
export const sellingJourneys: ReadonlyArray<TextItem & { outcome: string }> = [
  {
    title: "Guided recommendations",
    body: "Suggest products you actually stock, with ingredient reasons, prices and cautions.",
    outcome: "More confident purchases",
  },
  {
    title: "Consultation support",
    body: "Give every staff member the same structured consultation, with safety screening built in.",
    outcome: "Consistent advice, every shift",
  },
  {
    title: "Product matching",
    body: "Match budgets, sensitivities and goals to in-stock products — never expired or recalled batches.",
    outcome: "Fewer returns and disappointments",
  },
  {
    title: "Customer understanding",
    body: "Keep preferences, purchases and consent together, so you know each customer a little better each visit.",
    outcome: "Relationships, not transactions",
  },
  {
    title: "Thoughtful follow-ups",
    body: "Draft a replenishment or check-in message when a product is likely running out — sent only when you approve.",
    outcome: "Repeat sales",
  },
];

/** Operations modules shown on the homepage and product page (homepage §5). */
export const operationsModules: ReadonlyArray<{
  id: string;
  name: string;
  summary: string;
  columns: readonly string[];
  empty: string;
}> = [
  {
    id: "inventory",
    name: "Inventory",
    summary: "Stock by batch with expiry dates, movements and reasons for every adjustment.",
    columns: ["Product", "Batch", "Expires", "On hand", "Status"],
    empty: "No stock recorded yet. Receive your first delivery against a batch and expiry date.",
  },
  {
    id: "products",
    name: "Products",
    summary: "A catalogue with ingredients, sizes, prices, suppliers and registration references.",
    columns: ["Product", "Category", "Size", "Price (₦)", "Ingredients"],
    empty: "Your catalogue is empty. Import a spreadsheet or add products one at a time.",
  },
  {
    id: "suppliers",
    name: "Suppliers",
    summary: "Supplier records and invoice evidence, with mismatches flagged for a person to review.",
    columns: ["Supplier", "Last delivery", "Evidence", "Review status"],
    empty: "No suppliers yet. Add one when you record your first delivery.",
  },
  {
    id: "sales",
    name: "Sales",
    summary: "Record each sale once; stock updates once. Payment status and refunds stay with the sale.",
    columns: ["Date", "Customer", "Items", "Total (₦)", "Payment"],
    empty: "No sales yet. Your first recorded sale will appear here.",
  },
  {
    id: "staff",
    name: "Staff",
    summary: "Invite your team with roles and permissions that match how your business works.",
    columns: ["Name", "Role", "Location", "Last active"],
    empty: "Only you so far. Invite staff and choose what each person can see and do.",
  },
  {
    id: "reports",
    name: "Reports",
    summary: "Revenue, gross profit, best sellers, stock ageing and expiry — calculated from your records.",
    columns: ["Report", "Period", "Based on"],
    empty: "Reports appear once you have recorded products, stock and sales.",
  },
];

/** Who GlowHub serves (homepage §6, Solutions). */
export const audiences: ReadonlyArray<TextItem & { id: string }> = [
  {
    id: "retail",
    title: "Skincare retailers",
    body: "Know what's on the shelf, what's expiring and what to reorder — and guide every customer to products you actually have.",
  },
  {
    id: "brands",
    title: "Beauty brands",
    body: "Keep your catalogue, ingredients and stock in order, educate customers clearly and see which products are earning their place.",
  },
  {
    id: "salons",
    title: "Salons and spas",
    body: "Record consultations, recommend retail products with care, and turn great appointments into repeat purchases.",
  },
  {
    id: "distributors",
    title: "Distributors",
    body: "Organise supplier evidence, batches and business-to-business orders across locations, with a clear audit trail.",
  },
];

/** Trust and responsibility (homepage §7). */
export const trustPrinciples: readonly TextItem[] = [
  { title: "AI suggests, people decide", body: "Stock changes, purchase drafts, prices, messages and refunds always wait for explicit approval." },
  { title: "Grounded, not guessed", body: "Insights cite your records and say when evidence is missing. AI suggestions are labelled apart from calculated figures." },
  { title: "Evidence, not verdicts", body: "Supplier documents are checked field by field and a person decides. A barcode or registration number alone proves nothing about a unit." },
  { title: "Only sellable stock", body: "Expired, recalled and quarantined batches are kept out of recommendations and sales." },
  { title: "Privacy by design", body: "Each business's records stay in its own workspace. Customer details need consent, and we don't train models on your private data." },
  { title: "Cosmetic guidance only", body: "No diagnosis, no skin-tone or age scoring, no lightening goals. Symptoms that need care are referred to qualified professionals." },
];

/** Getting started (How it works page). */
export const howItWorksSteps: readonly TextItem[] = [
  { title: "Create your workspace", body: "Add your business, currency and location, then invite staff with the right roles." },
  { title: "Add your catalogue", body: "Import products from a spreadsheet or add them one by one — ingredients, sizes, prices and suppliers. Missing details are flagged, not hidden." },
  { title: "Record stock by batch", body: "Receive deliveries against batches with expiry dates and costs. Every adjustment needs a reason, so balances always reconcile." },
  { title: "Sell and consult", body: "Record sales once and stock updates once. Use guided consultations to recommend in-stock products with reasons and cautions." },
  { title: "Ask GlowHub Intelligence", body: "Ask what to reorder, what's selling or where margin is slipping. Answers show their working; actions wait for your approval." },
  { title: "Connect Glow Scan", body: "Let shoppers find your products through Glow Scan's guided, privacy-first consultation." },
];

export type FaqItem = { question: string; answer: string; topic: string };

export const faqs: readonly FaqItem[] = [
  {
    topic: "Product",
    question: "What is GlowHub AI?",
    answer:
      "GlowHub AI is a selling and business-intelligence platform for beauty businesses — skincare retailers, beauty brands, salons, spas and distributors. It brings products, stock, sales, customers and suppliers together, with AI built into each workflow to help you sell smarter and decide with confidence.",
  },
  {
    topic: "Product",
    question: "Is GlowHub a marketplace?",
    answer:
      "No. GlowHub is software for running and growing your own beauty business. Shoppers can discover participating merchants' products through Glow Scan, but there is no GlowHub checkout or multi-seller cart.",
  },
  {
    topic: "Product",
    question: "How does GlowHub Intelligence use my data?",
    answer:
      "It reads only the records in your own workspace that your role allows, cites them in its answers and shows how figures were calculated. Suggested actions — reorders, price changes, messages — are drafts until you approve them. We don't train AI models on your private business data.",
  },
  {
    topic: "Glow Scan",
    question: "What happens to my photo in Glow Scan?",
    answer:
      "A photo is always optional. Today, photo analysis is not connected: any photo you add stays on your device as a preview and is not uploaded, stored or analysed. Before photo analysis is ever switched on, Glow Scan will ask for your separate permission and explain who processes the photo and how long it is kept.",
  },
  {
    topic: "Glow Scan",
    question: "Can Glow Scan diagnose skin conditions?",
    answer:
      "No. Glow Scan gives cosmetic guidance only. It does not diagnose, prescribe or replace a qualified clinician. If you have pain, bleeding, a spreading rash, signs of infection or a problem that won't improve, it stops suggesting products and recommends professional care. For breathing difficulty or facial swelling, get urgent medical help.",
  },
  {
    topic: "Trust",
    question: "Does GlowHub guarantee products are authentic?",
    answer:
      "No. GlowHub helps businesses organise supplier evidence and flags mismatches for a person to review. Any badge says exactly which review was completed and when. A registration number or barcode alone is not proof that a particular unit is genuine.",
  },
  {
    topic: "Plans",
    question: "How is GlowHub priced?",
    answer:
      "Plans are priced in naira — Starter, Professional and Business — billed monthly, or prepaid quarterly, six-monthly or annually at a discount. See the pricing page for what each plan includes.",
  },
  {
    topic: "Plans",
    question: "What happens if we use all our AI requests?",
    answer:
      "You'll see a warning at 80% of your monthly allowance. At 100%, AI features pause until the next month unless you choose a clearly priced add-on. There are no surprise fees, and everything else keeps working.",
  },
];
