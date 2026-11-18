# GLOWHUB AI — Frontend Implementation Brief and Source PRD

> Saved verbatim from the brief supplied by the project owner on 16 November 2026.
> Original PRD: https://docs.google.com/document/d/1L1vTt2uoPEw4ZZDZ8-BW3vI2XLVkoki2yxm6BK6VpiY/edit

GLOWHUB AI
Claude Code | Complete Frontend Implementation Brief
AERA Technologies • Pre-launch • Developer handoff

Original PRD: https://docs.google.com/document/d/1L1vTt2uoPEw4ZZDZ8-BW3vI2XLVkoki2yxm6BK6VpiY/edit
Use this implementation brief together with the complete source PRD reproduced in Appendix A. Where the frontend brief specifies a revised design or prototype scope, follow it; production obligations and safety gates in the PRD remain applicable. This is a consolidated developer handoff of the previously discussed Claude Code instructions, not a verbatim transcript.

## 1. Mission and execution scope
Act as senior frontend engineer, product designer and architect. Build a polished, interactive, mobile-first frontend, not static screenshots or a generic beauty store. GlowHub is a beauty discovery product for shoppers and a standalone B2B operating system for beauty businesses. Implement public marketing, consumer Glow Scan and routines, merchant workspace, storefronts, platform administration, subscription interfaces and legal pages. All business records are fictional and connected. No production authentication, live AI, real payments, actual supplier approval, live outbound communications or marketplace checkout. Use localhost and authorised staging; domain later. Paystack is the proposed provider, consistent with the Atelier approach; prepare integration contracts only. Keep marketplace P1 and live facial analysis disabled behind feature flags. The original PRD contains all P0 production requirements; the current deliverable is a frontend prototype of those workflows plus Glow Scan.

## 2. Technical foundation
Next.js App Router, TypeScript, Tailwind CSS, customised shadcn/ui, Motion for React, Lucide, React Hook Form, Zod, TanStack Table, TanStack Query, Recharts, Vitest, React Testing Library, Playwright. Choose compatible stable versions and commit lockfile. Use modular feature folders and shared UI, types, validation, business logic and configuration. Keep financial calculations deterministic and independent of components. Mock services must have typed interfaces replaceable by future APIs. Inspect any existing repository before changes; preserve working features. Create CLAUDE.md and AGENTS.md with brand, architecture, security, accessibility, testing and product constraints. Maintain docs/implementation-plan.md as a resumable milestone log. No secrets or real customer data. Future architecture: NestJS/PostgreSQL/Prisma on Azure, as detailed in Appendix A.

## 3. Visual identity and logo
A premium contemporary African beauty brand, elegant and trustworthy; consumer pages editorial and warm, merchant and admin interfaces restrained and operational. Use the refined proposed palette from the design discussion: dusty rose #B76E79, deep plum #432C3A, warm cream #FAF6F0, soft sage #859681, champagne #D9BE9C, blush #F1DFDF. This supersedes the original PRD palette for prototype design only, pending brand approval. Use Cormorant Garamond for editorial headlines and Manrope for UI/body. Deep plum primary CTA; test accessible darker rose variants. No generic purple gradients, glassmorphism, heavy shadows or excessive pink. Marketing max width 1440px; desktop sidebar ~248px; desktop padding 24–32px; mobile 16px; 4/8px spacing; 8–12px corners; 44px primary touch targets. Hero 56–76px desktop, 38–46px mobile; application body 14–16px.
Create an original lowercase "glowhub." wordmark: refined Cormorant Garamond-inspired lettering, plum letters, rose period, adjusted kerning. Optional "glowhub ai" extended version and tagline BEAUTY MEETS INTELLIGENCE. Create lowercase "g." monogram, cream on rose or plum. No generic sparkles, faces or flowers as main mark. Convert real font glyphs to SVG paths, not a raster embedded in SVG. Supply primary, reverse, monochrome, compact, extended lockup and monogram SVGs, favicon SVG/ICO, Apple touch icon, 192/512px and maskable PWA PNGs in public/brand. Add internal brand preview and test small sizes.
Photography: premium African beauty editorial, diverse adult skin tones, natural skin texture, confident women, slender and curvy body types where relevant, contemporary natural hairstyles, cream/blush/sage studio lighting. Include authentic beauty entrepreneurs in stores, salons and studios. Product imagery: fictional creams, moisturisers, serums, cleanser, sunscreen, body care on neutral backgrounds. Use supplied licensed images or original generated assets; no watermarks, hotlinking, unlicensed search images or excessive retouching. Never imply models are customers. Store optimised WebP/AVIF locally in public/images/{hero,beauty-editorial,skin-scan,beauty-businesses,skincare-products,product-previews,consultation,storefronts}. For visual references use the mockups in the design conversation; actual reference files are not embedded in this document. If unavailable, recreate direction with authorised assets and document replacements.

## 4. Public website
Routes: /, /for-businesses, /for-shoppers, /features, /how-it-works, /pricing, /demo, /about, /faq, /contact, /early-access, /sign-in, /register, and all legal routes below. Header: logo, For Businesses, For Shoppers, Features, How It Works, Pricing, Sign In, Get Early Access; prominent Try Glow Scan. Mobile menu accessible, no overflow. Home sequence: hero/demo, trust problem, business capabilities, consumer consultation and verification, audience segments, pricing, FAQ, early access, footer.
Hero headline "Beautiful businesses. Intelligent commerce." Supporting copy: Manage stock, recommend the right products, review sourcing evidence and grow your beauty business with AI built into every workflow. CTA Get Early Access; See GlowHub in Action activates demo; consumer CTA Discover your skincare routine. Premium African female beauty entrepreneur editorial portrait alongside headline and prominent interactive panel. Mobile stacks text, actions, demo, image. Restrained motion with reduced-motion alternative.
Problem headline "Beauty deserves better than guesswork." Show consumer discovery, ingredient confusion, uncertain sourcing, stock availability, manual retail operations and expiry losses as hypotheses, not verified market findings.
Features: Glow Scan, Glow Intelligence, Glow Check, Glow Verify, Glow Match, Glow Routine and core business management. Use actual prototype screenshots. For Businesses headline "Run a more intelligent beauty business." For Shoppers headline "Your skin. Your glow." Clearly offer optional photo or text-only consultation. How It Works covers onboarding, catalogue, stock, consultations, evidence review, sales and reports. About explains founder vision and AERA venture-building contribution without inventing founder identity or operating entity. FAQ covers product scope, camera, diagnosis limits, authenticity, plans, privacy and launch. Contact and early access use validated forms, mock submission, accurate confirmation, optional separate marketing consent; no real data storage or invented contact details. Footer includes all legal links, cookie preferences and configured contacts only.

## 5. Interactive homepage AI demonstration
Two tabs: For Businesses and For Shoppers. Label "Interactive demo • fictional data." Select prompts, progressive reveal, structured cards, sources, uncertainty, review action, replay/reset and accessible static fallback. No live model.
Business stock prompt: "Which products should I restock this week, and how can I increase sales?" Vitamin C Serum available 4, demand 24, safety 4, reorder 24; SPF 50 Sunscreen available 6, demand 20, safety 4, reorder 18; Gentle Cleanser available 8, demand 16, safety 4, reorder 12; incoming 0. Formula max(0, demand over lead/review period + safety stock − available − confirmed incoming). Show expiry risk and draft bundle; no automatic procurement.
Business verification prompt: "Check this supplier invoice." Display synthetic invoice, supplier/batch/expiry/registration fields, mismatch, and Needs human review; no authenticity guarantee.
Shopper consultation prompt: dry sensitive skin, ₦30,000 budget. Fictional Gentle Cleanser ₦8,500, Moisturiser ₦10,500, Sunscreen ₦9,000; total ₦28,000, remaining ₦2,000. Show reasons, ingredients, cautions, routine and available stock.
Glow Scan demo: preloaded fictional portrait, sample image quality, fictional cosmetic observations, questionnaire, priorities, product categories and routine. Never represent scripted observations as derived from a real photograph.

## 6. Consumer application
Routes /beauty, /beauty/scan/{consent,capture,questionnaire,analysis,results}, /beauty/consultation, /beauty/recommendations, /beauty/routine, /beauty/ingredients, /beauty/products/[id], /beauty/saved, /beauty/profile, /beauty/settings/privacy. Mobile nav Discover, Glow Scan, My Routine, Saved, Profile. Guest demo; fictional greeting, prominent scan card, routine, product categories, ingredient discovery and storefronts.
Glow Scan welcome: optional selfie plus questionnaire; photo alone cannot reliably establish skin type, diagnosis or safety. Consent before camera; explain local-only preview, no upload/storage/analysis, deletion, no recognition or biometric templates, separate marketing consent; decline continues text-only.
Camera: use browser media APIs in secure context after affirmative action. Front-facing camera, framing guide, lighting guidance, capture, switch if supported, cancel, upload alternative, sample image. Handle permission denial, unavailable device, unsupported browser, camera in use and invalid image. Stop tracks on capture, cancellation, route exit and cleanup. Local image preview with retake/delete/continue; revoke object URLs and clear references. No persistence or external transfer. Label real photo "Camera preview only. This prototype does not analyse your photograph." Keep fictional assessment separate; never imply it describes real user. Simulate quality only for known sample image, not arbitrary images.
Questionnaire: self-reported dry/oily/combination/normal/sensitive/not sure; goals hydration, even-looking tone, appearance of spots, shine, texture, fine lines, simple routine; existing cleanser/moisturiser/SPF/actives; optional allergies/fragrance sensitivities/current products; optional pregnancy/breastfeeding/treatment considerations with skip; safety screening; budget bands under ₦10k, ₦10–20k, ₦20–30k, ₦30–50k, above ₦50k or custom; simple or expanded routine. No skin-lightening goals or unnecessary medical history. Sensitive inputs ephemeral; no real data persistence.
Safety: severe/persistent/worsening rash, painful irritation, infection or suspected allergic reaction stops personalised recommendations and refers to qualified care. Breathing difficulty or emergency warning signs: urgent medical help. No diagnosis, prescription, biometric inference, attractiveness scores, skin-tone ranking, age estimates or medical inference from face. Do not use a disclaimer instead of screening.
Analysis screen: progress/retry/cancel, clearly simulated. Results show self-reported preferences, goals, budget, possible cosmetic priorities and limitations; only sample image has fictional visual observations. No numeric skin quality score.
Recommendations: ground in shared fictional catalogue, available eligible stock, verified sample ingredient records, budget, preferences, allergies and caution rules. Show product photo, name, brand, size, category, price, seller, stock, reasons, source/date, evidence status and cautions. Offer alternative if available; explain no suitable match instead of inventing. Include creams, moisturisers, cleansers, serums and sunscreen. No prescription or guaranteed safety/effectiveness. Exclude expired/recalled/quarantined products. Do not invent real brand ingredient lists.
Routine: morning cleanser, optional appropriate serum, moisturiser, broad-spectrum sunscreen; evening cleanser, optional appropriate cosmetic product, moisturiser. Use simple routine and cautious active combinations. Show step purpose, order, price, instructions and cautions; save/remove/substitute/edit, total cost, morning/evening tabs, fictional completion/reset. Glow Progress journal and follow-up photos P1 only; no real longitudinal storage.
Glow Check: search curated ingredient records, paste sample INCI, compare lists, show cosmetic roles, known supported irritants, sources/version, missing data, overlapping actives; insufficient information fallback. No medical claims or authenticity determinations.
Discovery: product categories, filters for price/stock/merchant/category/ingredient preference, details, save/add to routine/enquire. Individual merchant storefront /store/[slug] and product/consultation subroutes, fictional Amara Beauty Studio, search/filter, branded catalogue, merchant identity, evidence status and mock enquiry. No multi-vendor cart or live checkout.

## 7. Business application and onboarding
Routes /business, /business/onboarding, /business/overview, /business/intelligence, /business/products, /business/products/new, /business/products/[id], /business/inventory, /business/inventory/batches, /business/inventory/[id], /business/suppliers, /business/suppliers/[id], /business/verification, /business/verification/[id], /business/sales, /business/sales/new, /business/orders, /business/orders/[id], /business/customers, /business/customers/[id], /business/consultations, /business/consultations/new, /business/consultations/[id], /business/marketing, /business/marketing/campaigns, /business/reports, /business/storefront, /business/team, /business/billing, /business/settings, /business/help. Desktop sidebar with all modules; top bar workspace/location/search/notifications/account. Mobile Overview, Products, Sales, Intelligence, More. Demo Workspace label. Separate mock consumer, owner, staff and admin entry; sign-in/register/verify/reset interfaces; no real credentials stored. Onboarding business identity, location, currency/timezone, plan, fictional catalogue import, batch setup, invite staff (skip), dashboard.
Dashboard derive metrics from central seed: recorded sales, gross profit, active products, low stock, expiry, unpaid balances, repeat purchases, pending evidence. Charts, best sellers, expiry, recent sales, supplier review, customer activity, AI actions. Quick actions Add Product, Receive Stock, Record Sale, Start Consultation, Review Evidence, Marketing Draft.

## 8. Catalogue, stock, suppliers and trust
Product CRUD/archive/search/filter/sort/pagination/CSV sample import with validation and duplicates. Product fields name, brand, category, SKU, optional barcode, size, description, INCI/source/version, manufacturer, supplier, cost, price, currency, registration reference, image, usage/storage/warnings, publish status. Missing data explicit. No real external upload.
Batch inventory: lot, product, supplier, received/on-hand/reserved quantities, cost, manufacture/expiry, location, evidence/status. Available = on hand − reserved. Prevent oversell and invalid negatives; first-expiry-first-out; configurable 30/60/90-day alerts; expired, recalled, quarantined excluded from recommendations and sales. Receive, reserve, release, sale, return, adjust with reason, quarantine, write-off; audit movements. Returns require review before saleable restock.
Suppliers and verification: supplier profile, invoices, batch records, labels, registration references, distributor authorisation, evidence/review history. Status Draft, Evidence Submitted, Needs Information, Under Review, Approved Evidence, Rejected, Suspended, Expired. Separate merchant identity, registration and product evidence. Mock extraction with fields/source/confidence/correction, no claim of real OCR. Human review request clarification/approve/reject/recheck/suspend/appeal with reason and immutable decision history. No automatic authenticity conclusion. No assumed NAFDAC API. Complaints, quarantine, recall, appeal, case history; quarantined products removed from recommendations and new sales. See PRD for detailed acceptance and operational constraints.

## 9. Sales, CRM, consultations and marketing
Sales list and create: reference, customer, products/eligible batches, quantity, discounts, configurable tax, total, payment state, date, location/staff. Draft, Pending Payment, Paid, Fulfilled, Cancelled, Refunded, Partially Refunded. Confirm once and deduct stock once; reject duplicates/oversell; receipt preview, refund and cancellation with correct inventory effects. Orders list/detail/fulfilment. No real card collection or purchases. CRM search/dedupe, profile tabs Overview, Purchase History, Consultations, Preferences, Communications, Notes; separate marketing consent and opt-out, export/delete request, sensitive notes restricted by role.
Merchant consultation: fictional customer or guest, consent, preferences/goals/allergies/budget, available catalogue match, ingredient cautions, editable routine, save summary only if permitted, mock enquiry/draft sale. Same safety rules as shopper consultation; no required image.
Marketing: product descriptions, bundles, promotions, repeat purchase reminders, segments, campaign draft/edit/approve, fictional channel/schedule, respect opt-outs, no real sends or unsupported claims. Exclude expired/unsafe products.

## 10. GlowHub Intelligence and reports
Dedicated assistant with suggested prompts, history, loading/error/retry, record references and structured response cards. Seven P0 capabilities: beauty consultant, ingredient intelligence, authenticity evidence risk review, stock/expiry, sales/marketing, business intelligence, smart capture. Ground in shared synthetic records; unknown request honest fallback. Context actions across catalogue, stock, supplier evidence, sales, CRM, consultations, marketing and reports. Read-only by default; confirmation for proposed stock/price changes, procurement drafts, messages, refunds, publication; no automatic external actions.
Reports: sales, recorded receipts, outstanding balances, COGS, gross profit/margin, refunds, expenses, stock ageing, expiry, best sellers, repeat purchase, locations, consultations. Date/location/category filters and fictional CSV export. Net sales excludes collected taxes; gross profit = net sales − allocated batch COGS; margin = gross profit/net sales, handle zero. Distinguish cash receipts from unpaid invoices, gross from net profit; fixed-precision money, shared calculations, no invented tax rates.

## 11. Storefront, team and subscription
Storefront editor logo/cover/brand colours/description/catalogue/publication/contact settings, desktop/mobile preview; eligible products only. Roles owner, manager, sales/beauty adviser, inventory, finance; scoped views, seat quotas, invites/removal, no claim client roles enforce security. Settings profile, location, currency, preferences, notifications, privacy/export/deletion, help.
Pricing from PRD: Starter ₦10,000/month (1 seat/location, 300 SKUs, 100 AI requests); Professional ₦25,000 (5 seats, 1 location, 2,000 SKUs, 500 requests); Business ₦60,000 (15 seats, 3 locations, 10,000 SKUs, 2,000 requests). Quarterly ₦27,000 / ₦67,500 / ₦162,000; six months ₦51,000 / ₦127,500 / ₦306,000; annual ₦96,000 / ₦240,000 / ₦576,000. Prepaid discounts 10/15/20%. Shared pricing config, total payable, effective monthly, savings, renewal, configurable tax; no discount stacking. 14-day no-card Professional trial proposed, no auto conversion. Monthly quota reset, warn 80%, pause metered AI 100%, manual workflows available, no surprise fee. Public CTAs early access, consumer basic discovery free proposed.
Billing current plan, usage, renewal, invoices/history, plan comparison, upgrade prorated preview, downgrade next renewal, cancel/re-enable, trial/active/pending/failed/grace/cancelled/expired. Mock checkout and success/failure/cancel; no real card collection or live Paystack. Future backend initialises transactions, verifies payment, validates signed webhooks, idempotency/reconciliation, updates entitlements and refunds. Never trust client callback for payment.

## 12. Platform administration
Routes /admin, /admin/businesses, /admin/users, /admin/verification, /admin/products, /admin/safety, /admin/complaints, /admin/recalls, /admin/billing, /admin/support, /admin/audit, /admin/content, /admin/feature-flags, /admin/analytics. Fictional business and subscription metrics, review queue, evidence decisions, product moderation/quarantine, complaints/recall, billing reconciliation, support, audit and feature flags. Scope reviewer to assigned cases; no unrestricted private customer/health browsing, no silent impersonation. Future support access time-limited, reason logged and authorised. Admin actions update shared mock records and audit history.

## 13. Legal and trust pages (mandatory)
Implement complete structured drafts, not empty placeholders. Use original PRD Appendix A/B as base. Shared legal layout title/version/effective date/updated date/table of contents/anchor headings/print/mobile/related links. Label Draft for legal review on staging; legal entity, registration, address, contacts and dates configurable. No unapproved binding commitments or compliance certification.
Routes and content:
- /privacy-policy: controller identity, business/consumer records, supplier evidence, optional consultations and facial images, sensitive data, payment references, technical data, purposes/lawful bases, AI, controller/processor distinction, sharing/subprocessors/transfers, retention/security, rights/withdrawal, cookies, children, contacts/complaints. Actual prototype photos local only; future image pilot consent and DPIA; no recognition/training without separate authorisation and lawful basis. Proposed retention: consultation 90 days unless saved/lawful exception, raw pilot image 24h unless explicitly saved, supplier active plus up to 12 months, security logs 90 days, backups 30–90 days, statutory transaction records. Verify all before publication.
- /terms-of-service: account/eligibility, business roles, product scope, fees/trials/renewals/cancellation/refunds, AI cosmetic limits, merchant sourcing/labelling duties, evidence limits, acceptable use, IP/data, third parties, availability, suspension/termination, liability, disputes and changes. Preserve statutory consumer rights. Nigerian law position is draft review input; no invented final liability cap. Future marketplace terms only when enabled.
- /cookie-policy: actual essential/functional storage and optional analytics/marketing only if implemented, preferences, withdrawal, browser controls. Footer preference link; optional tracking inactive until appropriate consent/approval.
- /refund-and-cancellation-policy: SaaS cancellation stops renewal, access through paid period, upgrades/downgrades, proposed seven-day grace period, duplicate/failed charges, eligible refunds, statutory rights. Future marketplace returns/damaged/unsafe/misdescribed products and complaints clearly inactive; no blanket no-refund policy.
- /data-processing-agreement: parties, scope, controller/processor roles, instructions, categories, confidentiality, safeguards, subprocessors, transfers, rights, incident cooperation, export/deletion, audit, annexes; no binding execution in prototype.
- /acceptable-use-policy: fraud, counterfeit/unlawful/expired/recalled products, misleading claims, privacy violations, unauthorised photos, harassment, IP, malware, fake reviews, verification manipulation; human review/appeal.
- /beauty-and-ai-disclaimer: optional facial imagery, cosmetic guidance not diagnosis, uncertainty, individual tolerances, manufacturer instructions, referral for serious/persistent symptoms and urgent care for emergency signs; link from scan/results/ingredients/recommendations.
- /product-verification-policy: identity, supplier evidence, registration and batch distinction; review workflow, status limits, complaints, quarantine, recall and appeal; no guarantee of physical authenticity.
- /security: planned authentication, tenant isolation, roles, encryption, private image/evidence storage, secrets, audit, payment verification, backup/recovery, incident reporting; distinguish future controls, no ISO/SOC2/bank-grade claims.

Consent UI: separate terms acknowledgement, privacy notice, optional marketing, optional photo/sensitive consultation consent, optional save, cookie preference, recurring renewal authorisation, export/delete/withdrawal. Unchecked where affirmative consent required. Record fictional user/workspace/purpose/document version/status/time/withdrawal only; no real legal audit trail. Legal review against Nigeria Data Protection Act 2023, applicable NAFDAC cosmetic rules and consumer rights; use PRD sources and counsel, not claims of verified compliance.

## 14. Shared data and connected workflows
Use one deterministic seed: User, Business, Membership, Role, Location, Consent, AuditEvent, Product, SKU, Ingredient, IngredientSource, Batch, StockMovement, Reservation, Supplier, PurchaseOrder, VerificationCase, EvidenceFile, ExtractedField, RegistrationCheck, ReviewerDecision, SafetyComplaint, RecallNotice, Customer, Sale, SaleItem, Order, Payment, Refund, Invoice, Receipt, Consultation, Preference, CosmeticObservation, Recommendation, Routine, RoutineStep, AIRequest, SourceReference, Approval, Feedback, KnowledgeVersion, Plan, PriceVersion, Entitlement, Subscription, UsageLedger, BillingEvent, Trial, CampaignDraft, ConsentRecord, MessageEvent, OptOut, LegalDocument, LegalAcceptance, PrivacyRequest. Merchant, storefront, consumer recommendation and admin share catalogue/status. Use in-memory or explicitly demo-only persistence; never persist real face, health, password or card info. Reset demo action.
End-to-end: customer consultation → product match → routine → saved selection; sample Glow Scan → consent/questionnaire/results; local camera → preview/delete without analysis; product → batch → publication/storefront; sale → deduct once → reports; expiry/quarantine → exclusion; supplier evidence → extraction → human decision; merchant consultation → draft sale; marketing draft → consent/approval; restock recommendation → draft purchase list; subscription mock checkout → entitlements; complaint → quarantine/audit; legal/privacy preferences → fictional record.

## 15. Responsive, accessibility, performance and repo
Test 360/390/768/1024/1440 widths; no horizontal overflow; mobile cards for wide tables; keyboard controls, focus management, semantic HTML, labelled fields, error announcements, contrast, reduced motion, chart text alternative, no status by colour alone. WCAG 2.2 AA target. PWA manifest/icons, no caching sensitive data. Optimised images/fonts, route code splitting, metadata, OG, sitemap/robots, env-based canonical URL. Staging restricted and noindex; robots not security.
Repo suggested apps/web/app/{(marketing),(auth),beauty,business,store,admin}; components/{brand,marketing,consumer,skin-scan,products,workspace,forms,charts,intelligence,verification,billing,legal}; features by module, services, mocks, hooks, lib, config, styles, public. Shared packages ui/types/validation/business-logic/config. docs/{product-requirements,design-system,brand-guidelines,frontend-architecture,mock-data-model,integration-contracts,ai-safety,glow-scan-release-gates,legal-review,implementation-plan}. Root CLAUDE.md, AGENTS.md, README, .env.example, tests, lockfile. Config application URL/API/demo flag/camera flag/live scan disabled/marketplace disabled/payments disabled/provider/legal contacts/versions. No hardcoded domain or secrets.

## 16. Production integration and safety gates
Future Azure Container Apps, PostgreSQL Flexible Server, Blob Storage, Azure OpenAI/Microsoft Foundry, AI Search where needed, Document Intelligence, Service Bus, Key Vault, Monitor/Application Insights, Front Door/WAF where justified. Do not provision now. Document typed API contracts for all modules, secure upload, tenant-scoped queries, server validation, roles, audit, idempotency, webhooks, privacy rights. Live Glow Scan disabled until selected method validated across diverse skin tones, qualified safety review, cosmetic-only scope, image quality/uncertainty tests, DPIA, consent/deletion/retention, approved processing regions, curated ingredient sources, catalogue grounding, allergy and high-risk screening, security, no biometric recognition, text-only fallback and controlled pilot. A prototype is not proof of accuracy. Follow source PRD evaluation targets and marketplace launch gates.

## 17. Milestones and testing
M1 foundation/brand; M2 public website/demo/pricing; M3 consumer/Glow Scan/routines; M4 legal/privacy; M5 business onboarding/dashboard/catalogue/batches; M6 supplier verification/sales/CRM/consultations/reports; M7 intelligence/marketing/storefront; M8 billing/team/settings; M9 admin; M10 QA/documentation/staging readiness. Complete and verify each; update implementation plan; no placeholder primary routes.
Tests: pricing matrix/discounts/quotas; sales totals/COGS/margin/refunds/balances; batch receipt/reserve/release/sale once/expiry/quarantine/overselling; budget/allergy/availability/safety referral/routine; scan consent/denial/camera unavailable/retake/delete/tracks cleanup/no external upload/no persistence/simulation label; evidence extraction/human review/appeal; AI source/price/stock consistency/approval/no writes; legal routes/version/consent/cookies/privacy; end-to-end consumer, camera, onboarding, product, batch, sale, verification, quarantine, storefront, AI, billing, admin. Run lint, typecheck, unit/component/Playwright tests and production build. Report actual results, not invented passes. Test desktop/mobile keyboard and responsive layouts.

## 18. Final deliverables and acceptance
Complete source repo with original vector logo, optimised imagery, all marketing/consumer/business/admin/storefront/legal routes, connected mock workflows, reusable components, integration contracts and documentation. Screenshots desktop/mobile: homepage, both AI demo modes, Glow Scan consent/camera/questionnaire/results, recommendations/routine/ingredients/products/storefront, dashboard/catalogue/batch/supplier/sales/CRM/consultation/marketing/intelligence/reports/billing/admin/safety/legal. No real captured image in screenshots. Acceptance: all navigation and primary actions functional; financial/stock reconciled; fictional sample analysis never attributed to real face; text-only path and safety escalation work; quarantine affects catalogue; human evidence review; no real payments/auth/AI/messages; all legal pages structured drafts; responsive and accessible; lint/typecheck/test/build verified. Final implementation report completed milestones/routes/assets/tests/build/accessibility/known issues, backend/Azure/Paystack/scan/verification/legal dependencies and photo rights. Provide staging URL only if actually deployed and verified, otherwise exact instructions and blocker. Do not stop at landing page. Start by inspecting repository and reading this brief and source PRD. Proceed milestone by milestone.

---

# APPENDIX A | ORIGINAL GLOWHUB AI PRODUCT REQUIREMENTS
The following source text is included to preserve detailed business, production, legal and acceptance requirements. It is not a separate instruction to activate production services during the frontend phase.

GlowHub AI
Product Requirements Document | v1.0 | 13 November 2026
AERA Technologies • Pre-launch product specification • Founder, product, engineering, design and legal review
Beautiful businesses. Intelligent commerce.

## 1. Product vision and strategic direction
GlowHub AI is a proposed AI-powered commerce and business operating system for beauty brands, skincare retailers, distributors and beauty professionals. Its mission is to make trusted beauty products easier to discover and purchase while giving African beauty businesses the intelligence to manage stock, sales, customers and growth. The primary paying customer is the business; consumers benefit through intelligent product discovery and, subsequently, a connected marketplace.

### Founder context and problem
The founder's GlowHub Project Development Report describes difficulty finding authentic skincare products, inconsistent availability, fragmented social-media discovery, expensive international shipping and unreliable vendors. Beauty businesses also need better distribution and discovery. The founder's personal experience provides problem insight, not evidence of nationwide demand. The B2B operational pain points and willingness to pay are hypotheses to validate.

### Strategic decisions
Preserve the founder's long-term vision of a trusted beauty ecosystem, but start with standalone B2B SaaS that is useful without marketplace traffic. AI must perform real operational work from the first release. The public marketplace follows after sufficient vendor coverage, trust processes and fulfilment readiness. Do not purchase inventory or manufacture products at launch. No claim of existing customers, revenue, live integrations, partnerships or verified traction.
AERA contributes product, engineering, design, operations and execution support; the founder leads customer research, partnerships, commercial decisions and business operations. Confirm entity, ownership, intellectual property and Founder Agreement before development commitment. Cloud benefits are infrastructure support, not cash funding or guaranteed approval.

### Goals and exclusions
- Reduce stockouts, expiry losses, manual sales reporting and customer follow-up effort.
- Improve product discovery and non-medical consultation through grounded ingredient and catalogue information.
- Make supplier evidence and product verification review auditable; avoid unsupported authenticity guarantees.
- Generate sustainable recurring revenue; expand into marketplace commissions only when viable.

Out of MVP: nationwide multi-vendor marketplace, owned inventory, private label, lending, medical diagnosis, prescription recommendations, dermatologist consultations, clinical image diagnosis, autonomous procurement and courier fleet ownership. Cosmetic image analysis is a gated pilot feature, not a launch promise.

## 2. Customers, market opportunity and validation

| Persona | Primary job and value |
|---|---|
| Independent skincare retailer | Track stock, batches, sales, customers; provide reliable product guidance. |
| Beauty brand owner | Manage catalogue and inventory, retailer orders, customer education and performance. |
| Beauty distributor | Track supplier evidence, stock and B2B sales; advanced wholesale features later. |
| Salon/spa or beauty professional | Record consultations, recommend available products and manage repeat purchases. |
| Shopper | Discover appropriate products, understand ingredients, buy from participating sellers when marketplace launches. |
| GlowHub reviewer/admin | Review supplier evidence, resolve complaints, monitor safety and operations. |

Launch discovery in Nigeria; start pilot in one city (proposed Lagos) to concentrate support and recruitment. Abuja and Port Harcourt follow on evidence of demand. Expand to Ghana, Senegal and Côte d'Ivoire, then other African markets and diaspora only after localisation, payments, compliance and operational readiness. Prioritise women-led and women-operated beauty businesses, without excluding other businesses. Mobile-first, low-bandwidth design; English and NGN initially.

### Market evidence from the founder's report

| Indicator (as reported) | Value | Interpretation |
|---|---|---|
| Nigeria skincare market, 2025 | US$1.94bn | Next Move Strategy Consulting estimate; product market, not SaaS TAM. |
| Personal care e-commerce, 2025 | US$125m | ECDB estimate; category broader than skincare. |
| Beauty/personal care retail value growth, 2025 | 23% | Euromonitor; broader category value growth, not user growth. |
| Estimated online share | About 4.5% | Beauty West Africa; different scope from ECDB. |
| Counterfeit experience / suspected purchase | 83.4% | Opinyze survey of >330; not nationally representative. |
| Cosmetics/skincare category share | 35.7% | Reported categories in same survey, not counterfeit prevalence. |
| Online beauty shoppers by 2030 | 21m+ | Beauty West Africa forecast, not current users. |
| Female respondents preferring online beauty shopping | 59.8% | Versus Africa survey of 250 Nigerian respondents, 49% women; sample finding. |

Sources: founder's report pp. 5, 10–11, 17. These estimates are not independently audited and measure different markets. Do not combine them into a TAM or claim them as verified market share. Verify source dates, geography, definitions and methodology before investor or public use.

### Bottom-up SaaS planning scenario (illustrative only)

| Segment | Assumed eligible businesses | Annual list-value at ₦240,000/account |
|---|---|---|
| TAM: Africa | 100,000 | ₦24bn |
| SAM: initially reachable Nigerian businesses | 20,000 | ₦4.8bn |
| SOM: year-three target | 1,000 | ₦240m |

The assumed business counts are invented planning inputs, not research findings. ₦20,000 average monthly realised revenue is a scenario, not a forecast; 1,000 paying accounts would imply ₦20m monthly and ₦240m annualised recurring revenue before churn, taxes and expenses. Validate through directories, interviews and paid pilots; do not publish as actual traction. Marketplace GMV and commission revenue must be modelled separately from SaaS revenue.

### Discovery and commercial validation
- Founder interviews at least 25 retailers/brands and 10 professionals; capture existing workflows, stock and expiry losses, current tools, purchasing authority and willingness to pay.
- Recruit 10 pilot businesses willing to import real catalogue and stock data under appropriate agreements; target at least 5 paid commitments after trial, subject to results.
- Compare existing retail/POS tools and beauty marketplaces on ingredient knowledge, batch traceability, AI accuracy and cost. Validate the differentiation with actual users rather than claiming no competitors.
- Measure cost per acquisition, gross margin after model usage and support, time saved, stock accuracy, renewal intent, trust review cost and repeat usage. Set go/no-go based on evidence.

## 3. Business model, subscription pricing and entitlements
B2B subscriptions are the primary launch revenue. Consumers access basic discovery and consultation free where enabled; no consumer subscription or transaction fee at MVP. Future marketplace earns commission on completed sales, with disclosed seller fees and no hidden buyer charges. Optional AI usage add-ons, enterprise licences, featured listings and distributor tools follow validation. Sponsored placements must be labelled and never override safety recommendations.

| Billing cycle | Starter | Professional | Business |
|---|---|---|---|
| Monthly | ₦10,000 | ₦25,000 | ₦60,000 |
| Quarterly (10% off) | ₦27,000 | ₦67,500 | ₦162,000 |
| Six months (15% off) | ₦51,000 | ₦127,500 | ₦306,000 |
| Annual (20% off) | ₦96,000 | ₦240,000 | ₦576,000 |

Price = monthly list price × billing months × (1 − discount). Longer plans are prepaid, not monthly instalments. No discount stacking unless explicitly offered. Display total payable, effective monthly equivalent, savings, taxes if applicable, renewal date and cancellation rules. Example: Professional annual saves ₦60,000 versus twelve monthly payments. Pricing is a proposed launch hypothesis; test with founders and pilots.

| Feature | Starter | Professional | Business |
|---|---|---|---|
| Seats / locations | 1 / 1 | 5 / 1 | 15 / 3 |
| Active SKUs | 300 | 2,000 | 10,000 |
| Core stock, sales, CRM, expiry tracking | Included | Included | Included |
| AI requests per month | 100 | 500 | 2,000 |
| AI consultant / ingredient checker | Included | Included | Included |
| Supplier evidence and risk review | Basic | Advanced | Multi-location + audit |
| Forecasts, marketing, analytics | Basic insights | Advanced | Advanced + exports |
| Storefront | Single catalogue | Branded catalogue | Multi-location catalogue |
| Support | Standard | Priority | Priority + onboarding |

14-day no-card Professional trial; no automatic paid conversion. Quotas reset monthly even for prepaid plans. Warn at 80%; at 100% pause metered AI or offer clearly priced opt-in add-on, never surprise fees. Manual workflows remain accessible. Enterprise pricing by quote; add-on prices, SKU limits and trial economics require validation.

### Billing and entitlement rules
- Checkout uses a licensed payment service provider; support cards and bank transfer where available. Do not store raw card details. Payment webhook signature verification, idempotency and reconciliation are mandatory.
- Activate paid entitlements only after confirmed payment. Renew only with explicit recurring-payment authorisation; notify before renewal, show next date and receipt. Cancellation stops renewal and access continues through paid term, subject to legal rights.
- Failed renewal: proposed seven-day grace period with notices and read-only fallback, then restricted access; preserve export and account deletion. No silent deletion. Upgrade with disclosed prorated charge; downgrade at renewal after resolving seat/SKU limits.
- Refund duplicate/failed charges and eligible cancellations according to applicable law and published terms; do not promise blanket non-refundability. Admin adjustments require audit reason; never let client-side state override entitlements.

## 4. Product scope, navigation and end-to-end journeys
P0 = required for first paid release; P1 = post-MVP or gated pilot. All P0 workflows work without consumer marketplace adoption. Responsive web/PWA first; native mobile apps later if validated.

| Area | Pages and purpose |
|---|---|
| Public website | Home, How it works, Features, For businesses, For shoppers, Pricing, Demo, About, FAQ, Contact, Waitlist, Terms, Privacy. |
| Business workspace | Overview, GlowHub Intelligence, Products, Inventory, Suppliers & Verification, Sales & Orders, Customers, Consultations, Marketing, Reports, Storefront, Team, Billing, Settings, Help. |
| Shopper storefront (P0) | Seller-branded catalogue, search/filter, product detail, AI consultation, wishlist or saved selections, enquiry/share; no multi-vendor checkout until P1. |
| Marketplace (P1) | Browse/search, verified vendor profile, cart, checkout, orders, reviews, support, refund/dispute. |
| Platform admin | Tenants, users, vendor approval, supplier evidence, product moderation, safety cases, billing, audit, content, support, analytics, feature flags. |

### Primary user journeys
- **Business onboarding:** verify account → create business workspace → set currency/location/roles → choose trial → import or add catalogue and stock → record first sale → see stock/AI insight → invite staff → subscribe. Target setup within 15 minutes for a small sample catalogue.
- **Supplier verification:** upload invoice and batch evidence → extract fields → validate registration and evidence → risk queue → human reviewer requests clarification or approves/rejects → record decision, expiry and audit trail → publish only eligible product status.
- **Consultation:** shopper or staff enters preferences, budget, skin concerns and allergies voluntarily → AI checks catalogue and ingredient evidence → flags uncertainty or safety concerns → suggests products with reasons and price → user reviews and saves or enquires; no medical diagnosis or automatic purchase.
- **Stock and sales:** record purchase/batch → update available units → record confirmed sale → deduct stock atomically → monitor expiry and reorder thresholds → AI proposes replenishment → owner approves draft purchase list. No automatic purchasing.
- **Marketplace P1:** approved vendor publishes eligible product → customer orders from a seller → PSP confirms payment → stock reserved → seller fulfils through supported courier → delivery proof → settlement and review → complaint/refund workflow if needed. Single-seller checkout first; multi-seller cart only after settlement complexity is addressed.

## 5. Functional requirements and acceptance criteria

| ID / module | Priority and acceptance |
|---|---|
| F01 Identity & onboarding | P0. Email verification, password reset, optional MFA, workspace creation, trial selection; owner can invite/revoke staff. No cross-tenant access. |
| F02 Catalogue | P0. Create/import SKU, brand, category, size, ingredients, price, images, supplier, registration reference and expiry data; CSV validation, duplicate detection, archive, search. Incomplete evidence shown explicitly. |
| F03 Inventory | P0. Batch/lot, expiry, quantity, purchase cost, location, stock movement, adjustments with reason, low stock; first-expiry-first-out suggestions. Concurrent sales cannot oversell; stock balances reconcile. |
| F04 Suppliers & verification | P0. Supplier profile, invoice upload, batch evidence, extracted fields, verification status, reviewer queue, evidence dates, expiry/recheck. Human approval required; badge scope and limitations visible. |
| F05 Sales & orders | P0. Record manual/storefront sales and payment status, item quantity, discounts, tax, refunds and receipts; stock changes only once. Track pending/paid/fulfilled/cancelled/refunded. No card storage. |
| F06 Customer CRM | P0. Contact details, preferences, purchase history, consent and opt-outs; search/dedupe, export/delete as appropriate. Sensitive notes optional and access-restricted. |
| F07 Consultations | P0. Text questionnaire, ingredient checker, recommendation and safety flags, saved summary with consent, no diagnosis; staff/customer can reject or edit. No image required. |
| F08 Marketing | P0. AI draft descriptions, bundles, follow-ups and promotions using approved catalogue/consent; preview, edit, approve before send. Unsubscribe respected; claims checked. |
| F09 Reports | P0. Revenue, gross profit, stock ageing, expiry, best sellers, customer repeat rates, unpaid balances; date/location filters and CSV. Distinguish cash receipts from orders. |
| F10 Storefront | P0. Mobile-friendly merchant catalogue, product detail, filters, available stock, evidence status, AI widget and enquiry CTA; no fabricated reviews or marketplace claims. |
| F11 Team & billing | P0. Role permissions, seat and location quotas, trial, subscription state, receipts, cancellation, verified payment events. |
| F12 Admin | P0. Tenant suspension/reactivation, verification review, safety reports, moderation, subscription reconciliation, support, audit; least privilege and no unrestricted customer-data browsing. |
| F13 Marketplace | P1. Vendor onboarding/publishing, search, checkout, payment split/settlement, tracking, verified-purchase reviews, complaints and returns; seller terms accepted before listing. |
| F14 Advanced services | P1. Image-based cosmetic analysis pilot, wholesale workflows, multi-seller checkout, forecasting at scale, dermatologist referral/consultation after clinical and legal review. |

### Permissions

| Role | Scope |
|---|---|
| Owner | Workspace settings, all business records, billing, roles, approval and exports. |
| Manager | Catalogue, stock, sales, customers and reports; no owner/billing changes unless explicitly delegated. |
| Sales / beauty adviser | Create sales and consultations, see authorised stock and customer records; no supplier documents, full financial reports or billing. |
| Inventory staff | Manage catalogue, batches and stock; no sensitive consultation notes or financial exports. |
| Finance | Sales, refunds subject to permission, reports and reconciliation; no optional health notes. |
| Platform reviewer | Access assigned verification evidence and cases only; cannot change merchant financial records. |
| Platform admin / support | Scoped operational access, time-limited support access with reason and audit; no silent impersonation. |
| Shopper | Own profile, preferences, saved consultations, orders and privacy controls only. |

## 6. GlowHub Intelligence: core AI engine
AI is available at launch as an integral operational capability, not a Phase 3 add-on. Use tool-enabled, permission-filtered retrieval from the tenant catalogue, inventory, sales, supplier evidence and curated ingredient knowledge. The assistant combines model reasoning with deterministic calculations and links to source records; it must say when evidence is missing. No cross-tenant retrieval or unsupported medical claims.

| AI capability | Inputs, output and acceptance |
|---|---|
| A01 AI Beauty Consultant (P0) | Text-based budget, routine, goals, preferences and optional allergy info + actual stock and verified ingredient records → limited product suggestions, reasons, price, routine order, uncertainty and safety flags. Respect budget, contraindication rules and stock; refer medical concerns to clinician. |
| A02 Ingredient Intelligence (P0) | INCI list typed, uploaded label or catalogue + curated sources → ingredient roles, known allergens/irritants, overlapping actives and missing data. No guarantee of safety, cure or individual tolerance. Source/version and uncertainty visible. |
| A03 Authenticity Intelligence (P0) | Supplier invoices, brand/distributor documents, batch/expiry and registration references → structured extraction, duplicates, mismatches, incomplete evidence and review priority. Human decides; never conclude counterfeit or authentic from model output alone. |
| A04 Stock & Expiry Intelligence (P0) | Sales history, inventory, lead time, batch expiry and safety stock → low-stock, expiry risks, recommended order quantities and draft reorder list. Formula and confidence shown; no automatic procurement. |
| A05 Sales & Marketing Assistant (P0) | Approved catalogue, margins, consented customer segments and past sales → product descriptions, bundles, promotional copy, reorder reminders. Reject misleading therapeutic claims, require approval before external messages. |
| A06 Business Intelligence (P0) | Permission-filtered sales, costs, stock and customer aggregates → natural-language performance answers, trend and margin analysis, actionable recommendations. Numeric results must match database aggregates. |
| A07 Smart Capture (P0) | Product labels/invoices → OCR/extraction of SKU, batch, expiry, supplier, ingredient text and costs; confidence and field-level correction. Never silently write unreviewed values. |
| A08 Cosmetic skin-image insights (P1 gated) | Optional consented image → limited appearance observations and non-medical guidance only after bias, privacy and clinical-safety review. No diagnosis, biometric identity, skin-tone ranking or certainty from photo. Text workflow remains available. |
| A09 Advanced forecasting (P1) | Sufficient historical data, seasonality and supplier lead times → demand ranges, forecast error and scenario planning. Cold-start uses explicit thresholds, not invented predictions. |

### Consultation safety and ingredient knowledge
- Ask only necessary questions; distinguish cosmetic concerns from medical symptoms. For severe or persistent symptoms, worsening rash, signs of infection or suspected allergic reaction, stop product suggestions and recommend qualified care; emergency symptoms such as breathing difficulty require urgent medical help.
- Do not recommend prescription treatments, diagnose disease, promise that products treat hives or eczema, or infer medical conditions from appearance. Use explicit allergy exclusions and cautious rules for pregnancy/breastfeeding and active ingredient combinations; defer to qualified advice when uncertain.
- Use curated, versioned manufacturer ingredient labels and qualified-reviewed evidence. Identify sources and record date. Unknown or incomplete INCI means no confident compatibility claim. Recommend only products actually present in catalogue; do not invent stock, prices, ingredients or registration.
- No paid ranking may override safety or suitability. Show why a product was selected, alternatives and price. Shopper can decline saving sensitive consultation information and use a general catalogue instead.

### Authenticity workflow and product trust
Statuses: Draft → Evidence submitted → Needs information → Under review → Approved evidence / Rejected / Suspended / Expired. Seller verification is distinct from product evidence review and regulatory registration. A badge states precisely which review was completed and when. A valid registration number or barcode is not proof that a specific unit is genuine.
Required checks: business and supplier identity, invoices, batch/expiry, product label and NAFDAC registration where required, distributor authorisation if claimed, discrepancies and complaint history. Use official verification portal/manual review where permitted; do not assume an API exists. AI extracts evidence and flags risk; human reviewer verifies, records reason and approves. Suspected counterfeit, expiry or safety complaint triggers quarantine, evidence preservation, investigation and appropriate reporting/recall support. Vendor has appeal channel; no automatic accusation.

### AI outputs, evaluation and guardrails
- Use structured schemas, citations to internal records, confidence/missing-data flags, moderation, prompt-injection protections, rate limits, model routing and deterministic tool functions. Keep user inputs separate from system instructions. External documents are untrusted; no execution of instructions embedded in labels or invoices.
- Read-only recommendations by default. Any stock adjustment, customer message, price change, purchase order, refund or publication requires permission and explicit user approval. Log model/version, source record IDs, approved action and outcome with minimised personal data. AI model training on customer data prohibited without separately documented legal basis/authorisation.

| Evaluation gate | Proposed target before release |
|---|---|
| Grounding | ≥95% correct grounded answers on 100+ representative test prompts; no invented price, stock or ingredients in critical cases. |
| Financial / stock calculations | 100% exact on deterministic test fixtures; reconcile with database. |
| Safety | 100% of predefined high-risk/red-flag test cases receive appropriate refusal/referral; qualified reviewer sign-off. |
| Isolation | Zero cross-tenant disclosures in adversarial tests; no unauthorised writes. |
| Evidence extraction | ≥95% exact on readable critical fields in test set; low-confidence fields always require correction. |
| Fairness | Review recommendations across skin tones, body/appearance diversity and product availability; image pilot requires separate validation. |
| Cost / latency | Track cost per task and per tenant; target p95 first response ≤5s for normal text, show progress and timeout fallback. |

## 7. UX, website and brand requirements
Brand proposition: Beautiful businesses. Intelligent commerce. Secondary line: The AI-powered operating system for Africa's beauty businesses. The website must feel premium, modern and African, not a generic AI template or an online cosmetics catalogue. Lead with B2B value, with a separate shopper experience.

### Interactive AI hero (mandatory)
Headline: Beautiful businesses. Intelligent commerce. Supporting copy: Manage stock, recommend the right products, verify sourcing evidence and grow your beauty business with AI built into every workflow. Pre-launch CTA: Join the waitlist / Get early access. Secondary CTA: See GlowHub in action. At launch replace waitlist with Start your 14-day free trial. Do not display fabricated customer logos, testimonials, live metrics or partner badges.
Hero layout: editorial portrait of a confident African female beauty entrepreneur on one side; interactive product panel on the other. Mobile stacks text, CTA, demo and portrait. Provide two tabs: For businesses and For shoppers. Animated message entry, progress state, grounded evidence cards and response reveal. Visitors can select demo prompts without account. Use isolated synthetic dataset and clear "Interactive demo • fictional data" label; deterministic fallback when model unavailable; never expose production customer records.

| Demo mode | Script and output |
|---|---|
| Business: stock intelligence | Prompt: Which products should I restock this week and how can I increase sales? Sample data: Vitamin C Serum 4 units; SPF 50 Sunscreen 6; Gentle Cleanser 8. Suggested reorder 24, 18, 12 respectively, based on fictional demand/lead-time inputs. Show calculation, expiry risks and proposed bundle; review before action. |
| Business: verification | Prompt: Check this supplier invoice. Show extracted supplier, batch and expiry, a mismatch between invoice and catalogue, and "Needs human review"; no authenticity guarantee. |
| Shopper: consultation | Prompt: I have dry, sensitive skin and ₦30,000. Example fictional catalogue: gentle cleanser ₦8,500, moisturiser ₦10,500, sunscreen ₦9,000; total ₦28,000. Explain general routine, ingredient caveats, optional patch testing and referral for persistent symptoms. |
| Demo behaviour | Selectable prompts, typing or streaming animation, progressive reveal, reset and accessible reduced-motion alternative. Show source cards, uncertainty, approval action as simulated; no real purchase, message or stock change. |

### Visual identity and photography

| Colour | Hex / purpose |
|---|---|
| Deep plum | #342038 • primary text and dark sections |
| Rose / hibiscus | #B9527C • brand accent and selected highlights |
| Warm ivory | #FFF7EF • backgrounds |
| Terracotta | #B96546 • secondary accents |
| Antique gold | #C59B5D • restrained premium detail |
| Espresso | #302420 • body text and high-contrast surfaces |

Proposed palette combines founder report's rose and dark tones with warm African-inspired earth colours. Use a high-contrast dark plum primary CTA or accessible darker rose variant; validate WCAG contrast for actual combinations. Headlines: Playfair Display or similar editorial serif; UI and body: Manrope or similar legible sans-serif. Use consistent spacing, icons, clear pricing cards and uncluttered layouts.
Photography: beautiful, confident African women, including slender and curvy body types, varied ages among adults, skin tones, natural hairstyles and contemporary beauty/fashion styling. Combine aspirational close-up beauty portraits with authentic women entrepreneurs working in stores, salons and studios. Avoid skin-lightening ideals, before/after deception, excessive retouching or implying one body/skin type represents beauty. Use licensed or commissioned imagery and appropriate releases; no unconsented customer photos.

### Website content and accessibility
Home sequence: hero/demo → trust problem → business capabilities → consultation/verification workflow → who it serves → pricing → FAQ → early access → footer legal links. Dedicated features pages, product screenshots clearly marked prototype, about/founder story approved for publication, contact and support. Pricing selector for monthly/quarterly/six months/annual uses same server-backed matrix. SEO metadata, sitemap, robots.txt, Open Graph, descriptive alt text, semantic headings, keyboard navigation, captions and reduced-motion support. No broken links or demo figures represented as real.

## 8. Architecture, Azure infrastructure and data model
Proposed architecture: responsive web/PWA → authenticated API → modular application services and job workers → relational database/object storage → AI orchestration and curated knowledge retrieval. Start modular monolith, split only for security or measured scale. Separate dev, staging and production. Azure services are proposed architecture choices, contingent on availability, cost, quota and data location review.

| Azure service | Use |
|---|---|
| Azure Container Apps | P0: web/API and async workers, autoscaling and revisions. |
| Azure Database for PostgreSQL Flexible Server | P0: transactions, tenant-scoped records, constraints, indexes, backups and restoration. |
| Azure Blob Storage | P0: private product images, invoices and evidence; short-lived signed URLs, lifecycle deletion. |
| Azure OpenAI / Microsoft Foundry | P0: approved model inference, structured tool calls, safety and model routing; no training assumption. |
| Azure AI Search | P0 where needed: curated ingredient knowledge and tenant-filtered catalogue retrieval; use PostgreSQL search initially if sufficient. |
| Azure AI Document Intelligence | P0: invoice/label extraction with human review; OCR fallbacks. |
| Azure Service Bus | P0 where justified: background extraction, notification and reconciliation jobs; retry/DLQ. |
| Azure Key Vault + managed identities | P0: secrets, keys and service identity; rotation and least privilege. |
| Azure Monitor / Application Insights | P0: redacted logs, latency, cost, availability, alerts. |
| Azure Front Door / WAF | P1 or production gate: edge security and caching if justified by threat/traffic assessment. |

Cost and infrastructure plan: estimate monthly model tokens, OCR pages, storage, database/compute, search and monitoring from 10 pilot tenants, then 100 and 1,000. Track spend per tenant and AI task. Budget alerts at 50/80/100%, quotas, cache non-sensitive repeated ingredient queries and use smaller models where adequate. Do not inflate usage; validate Azure region, model quotas, commercial terms and data-transfer safeguards. No dependency on a credit award for viability.

### Core data model

| Entity group | Key entities and constraints |
|---|---|
| Identity / tenant | User, Business, Membership, Role, Location, Consent, AuditEvent; tenant_id and RBAC on every workspace entity. |
| Catalogue / inventory | Product, SKU, Ingredient, IngredientSource, Batch, StockMovement, Reservation, Supplier, PurchaseOrder; unique SKU per tenant; quantity and cost constraints; expiry optional only where legally appropriate. |
| Trust / evidence | VerificationCase, EvidenceFile, ExtractedField, RegistrationCheck, ReviewerDecision, SafetyComplaint, RecallNotice; immutable decisions and evidence versions. |
| Commerce | Customer, Sale, SaleItem, Order, Payment, Refund, Invoice, Settlement, Shipment, Review; money in integer minor units, currency, idempotent events. |
| AI / consultation | Consultation, Preference, Recommendation, AIRequest, SourceReference, Approval, Feedback, KnowledgeVersion; optional sensitive fields restricted, no image identity template. |
| Subscription | Plan, PriceVersion, Entitlement, Subscription, UsageLedger, BillingEvent, Trial; billing cycle/renewal and discount snapshot. |
| Marketing | CampaignDraft, ConsentRecord, MessageEvent, OptOut; no marketing send without permission/consent where required. |

API requirements: versioned endpoints; pagination/filtering; validated request schemas; idempotency keys on mutations; transactions for stock/payment; optimistic concurrency; secure file uploads with MIME/size validation, malware scanning and private storage; webhook verification and replay protection. Document OpenAPI contract. Background jobs retry with capped backoff and dead-letter queue; reconcile failed payments and stock reservations.

## 9. Security, privacy, regulatory and operational requirements

| Requirement | Proposed acceptance |
|---|---|
| Tenant isolation | Server-side scoped queries, row-level policies or equivalent, test every role and AI retrieval. No public sensitive endpoints. |
| Authentication | Strong password policy, MFA for platform admins and privileged users, secure sessions, rate limits, hashed credentials, revoke sessions. |
| Encryption | TLS in transit, encryption at rest, managed secrets, no public evidence/photos; short-lived signed URLs. |
| Availability / performance | Target 99.5% monthly at pilot; p95 ordinary API ≤500ms under agreed load; test mobile/low bandwidth. AI streaming or progress state and fallback. |
| Backups / recovery | Daily backups, proposed RPO 24h and RTO 8h; restore drill before launch; improve as scale warrants. |
| Accessibility | WCAG 2.2 AA target; keyboard, focus, labels, contrast, screen-reader checks; reduced motion. |
| Data lifecycle | Export, correction, deletion and retention workflows; logs redacted; documented backup expiry and legal holds. |
| Incident management | Monitoring, incident owner, breach assessment, notification within applicable statutory timelines, evidence preservation and postmortem. |
| Payment integrity | PSP hosted/tokenised checkout, signed webhooks, replay tests, reconciliation and refund audit. |
| QA | Unit, integration, end-to-end, security, load, accessibility and AI evaluation tests; zero critical unresolved issues at launch. |

### Privacy and regulatory readiness
Nigeria Data Protection Act 2023: establish lawful basis by purpose, privacy notices, processor agreements, minimisation, rights workflow and security. Skin conditions, allergy history and certain images may reveal sensitive health information; collect only when needed, with appropriate lawful basis and explicit consent where required, separate from marketing. No facial recognition. Complete data protection impact assessment before high-risk image processing; assess NDPC registration and cross-border transfer obligations with counsel.
NAFDAC: verify applicable cosmetic registration, labelling and advertising requirements before listings; require evidence and accurate claims. Do not present a registration lookup as guarantee of physical authenticity. No unlawful, expired, recalled or unregistered products where registration is required. Qualified legal/regulatory review before marketplace or private label. FCCPA consumer rights: plain pricing, truthful claims, safe products, cancellation/return/refund rights and complaint handling. No blanket waiver of statutory protections.
Proposed retention: optional consultation data 90 days by default unless user chooses to save longer or law requires; raw image pilot delete within 24h after processing by default, unless explicit save choice; supplier evidence retained while relationship active plus up to 12 months for review unless legal hold/required record period; transaction records according to applicable statutory requirements; security logs 90 days; backup expiry within 30–90 days. Finalise exact periods, processor locations and rights response procedures with counsel before publication. Data export before closure and deletion subject to legal obligations.

### Marketplace operational gates (P1)
Define seller onboarding, product evidence, commission and payout contract, licensed PSP split settlement, tax/receipt treatment, delivery coverage and cutoffs, return/refund windows, complaint escalation, counterfeit investigation and recall process. Start one city and limited verified sellers. Same-day delivery and pay-on-delivery only where supported; POD must have risk limits, reconciliation and proof. Do not hold customer funds as unlicensed escrow. Marketplace launch requires support capacity, courier SLAs and viable unit economics.

## 10. Delivery roadmap, success metrics and launch gates

| Phase / timeframe | Scope and deliverable |
|---|---|
| GROOM: weeks 1–2 | Founder Agreement/entity review, 25+ retailer interviews, pilot recruitment, competitive research, data/ingredient sources, validated scope and pricing. |
| BUILD: weeks 3–5 | Design system, interactive public hero, auth/tenancy, catalogue, batch inventory, CRM, basic sales and admin foundations. |
| BUILD: weeks 6–8 | AI consultant and ingredient engine, verification extraction/review, stock and business insights, marketing drafts, storefront, billing. |
| QA & PILOT: weeks 9–12 | Integrations, test fixtures, safety/security/privacy review, 10 pilot businesses, onboarding, feedback, pricing and cost validation. |
| LAUNCH: after gates | Activate paid plans, publish approved legal pages, monitor operations, support and reliability. |
| P1: after evidence | Connected marketplace, delivery, settlement and reviews; image pilot only after safety and privacy gates; advanced forecasting and distributor tools. |
| Long term | African expansion and professional consultations after local compliance; optional owned inventory/private label only with independent capital and business case. |

12-week plan is a proposed target, not a delivery guarantee. Founder owns commercial validation and vendor relationships; AERA product lead owns scope; CTO owns architecture; design owns user journeys and brand; legal/regulatory adviser owns legal review; QA owns release sign-off; operations owns support and trust processes.

| Metric | Pilot / launch target (not actual results) |
|---|---|
| Activation | 60% of trial workspaces add catalogue, stock and first sale within 7 days. |
| Operational value | 25% reduction in median time to complete stock review or consultation versus pilot baseline. |
| Stock quality | ≥95% inventory reconciliation accuracy on pilot sample; track expiry losses and stockouts. |
| Paid conversion | 20% trial-to-paid within 30 days once sample sufficient; pilot goal 5 paid commitments. |
| Retention | 70% of first paid cohort still subscribed at 90 days. |
| AI adoption | 50% of active tenants use AI weekly; record correction/approval rates and cost. |
| Trust / safety | 100% of published verification statuses have recorded evidence and human decision; zero critical safety or tenant-isolation failures. |
| Unit economics | Track gross margin after AI, payment and support, CAC, payback and churn; approve sustainable pricing before scaling. |

### Launch checklist and open decisions
- Confirm founder, legal operator, registered address, domain, support/privacy contacts, founder/IP agreement, team and pilot participants.
- Validate pricing, entitlements, trial, tax treatment, payment provider, AI usage cost, refund rules and retention schedule.
- Confirm ingredient evidence sources, qualified safety reviewer, verification SOP and NAFDAC checks; complete privacy impact assessment and processor contracts.
- Complete billing, security, backups, accessibility, load and AI safety tests; approve Terms and Privacy; publish accurate site copy and accessible demo.
- No fabricated vendor/customer numbers, revenue, partnerships or live features. Use demo label and separate demo tenant. Check legal pages and all CTAs before launch.

## Appendix A. Draft website Terms of Service
DRAFT FOR LEGAL REVIEW — publish only after operator, contacts, policies and effective date are confirmed. Effective date: [insert]. Operator: [registered legal name, registration number, registered address]. Contact: [support email]. These terms are proposed for B2B SaaS and public storefront; marketplace clauses take effect only when the marketplace is launched and disclosed.

**1. Acceptance and account**
By creating an account or using GlowHub, you agree to these Terms and the Privacy Policy. If you act for a business, you confirm authority to bind it. Account holders must be at least 18 and provide accurate information, protect credentials and notify us of unauthorised access. Business owners are responsible for authorised staff and permissions. We may verify identity or suspend access for material breaches, fraud, safety risks or legal obligations, with notice and opportunity to remedy where appropriate.

**2. Service scope and AI**
GlowHub provides business software, catalogue, inventory, sales, customer management and AI-assisted insights. Features depend on plan and release stage. AI outputs are informational and may be incomplete or inaccurate. You must review recommendations, extracted fields, calculations and proposed actions before reliance. GlowHub does not diagnose, prescribe or replace qualified medical advice. Seek a qualified clinician for medical concerns. Product and ingredient suitability depends on individual circumstances; no guarantee of tolerance, outcome or authenticity is made. AI flags are not determinations that a seller or product is counterfeit.

**3. Subscriptions, payments and cancellation**
Plans are billed in NGN at the prices shown before checkout, inclusive or exclusive of applicable taxes as disclosed. Standard monthly, quarterly 10%, six-month 15% and annual 20% discounts apply to the corresponding list price unless a clearly disclosed offer states otherwise. Prepaid periods are 1, 3, 6 and 12 months. The proposed 14-day trial requires no card and does not automatically convert. Paid access begins on confirmed payment. Recurring renewal requires authorisation; cancellation stops the next renewal, with access through the paid period unless law or agreed refund requires otherwise. We disclose price changes before renewal. Duplicate, erroneous or eligible charges are refunded consistent with law and published policy. Usage allowances reset monthly; paid add-ons require separate consent. Failed renewals may lead to grace period and restricted access. Statutory cancellation, refund and consumer rights are unaffected.

**4. Acceptable use and seller obligations**
Do not use the service for fraud, counterfeit or prohibited goods, misleading claims, harassment, infringement, unauthorised access, scraping that disrupts service, malware or privacy violations. Businesses must ensure catalogue, ingredients, prices, registration and supplier evidence are accurate, maintain required registrations and comply with product safety, labelling and advertising laws. Do not submit customer information without authority and lawful basis. Sellers must cooperate with safety investigations and remove recalled, expired or unlawful products. GlowHub may remove listings or suspend sellers where necessary and provide a review/appeal route.

**5. Marketplace, delivery and returns (when available)**
The seller of record is identified at checkout. Unless GlowHub expressly sells goods itself, participating sellers are responsible for product description, lawful supply and fulfilment; GlowHub facilitates transactions and support and remains responsible for its own obligations. Display full price, delivery fees, seller identity and expected delivery before payment. Delivery availability and same-day/POD options depend on location and seller capacity. Customers may report missing, damaged, unsafe, suspected counterfeit or incorrect items through support. Returns, cancellations and refunds follow the disclosed policy and applicable law; hygiene-related restrictions apply only where lawful and do not override rights for defective, unsafe or misdescribed goods. Refunds are processed via the payment provider where possible. Verified seller or product-evidence badges describe completed checks, not guarantees. Reviews must reflect genuine experiences; paid promotions are labelled. Separate vendor agreement will set commissions, settlement, fees, disputes and operational obligations before marketplace launch.

**6. Intellectual property and data**
GlowHub retains rights in its software, branding and original content. You retain ownership or applicable rights in your business records and submitted content, granting GlowHub a limited licence to host, process and display them as necessary to provide the service. You warrant you have permission to submit product images, supplier documents and customer information. No general model training on private customer content without separate documented authorisation and appropriate legal basis. You may export supported data subject to lawful restrictions and third-party rights.

**7. Availability, liability and termination**
We aim to operate securely and reliably but may update, interrupt or discontinue features with appropriate notice. To the extent permitted by law, neither party is liable for indirect losses arising from ordinary service use; any liability cap and exceptions must be approved by counsel and disclosed before launch. Nothing excludes liability that cannot lawfully be excluded, including statutory consumer protections, fraud or other mandatory obligations. You may close your account or cancel renewal through settings or support. We may terminate for serious or uncured breaches; export and retention/deletion rights remain subject to law and the Privacy Policy.

**8. Disputes, changes and contact**
Contact [support email] to resolve complaints. Nigerian law applies, subject to mandatory consumer protections and applicable jurisdiction rights. Users may seek redress through competent courts and regulators, including FCCPC where appropriate. We notify users of material changes and obtain consent where required; changes take effect as disclosed. Operator/contact details and effective date must be completed before publication.

## Appendix B. Draft website Privacy Policy
DRAFT FOR LEGAL REVIEW — effective date [insert]; controller [registered legal name, address, registration number]; privacy contact [email]; DPO/contact if applicable [insert]. This notice describes planned processing when the relevant features launch. Update it to reflect actual subprocessors, transfers and retention before publication.

**1. Information collected**
Account and business details: name, email, phone, business identity, role, location and login/security information. Business content: catalogue, inventory, invoices, supplier evidence, sales, customer contacts, payment references and communications. Optional shopper consultation: preferences, budget, routine, allergies or skin concerns; images only if a future consented feature is enabled. Device, IP, cookies and usage logs for security and analytics. Payment details are handled by the payment provider; GlowHub receives transaction references and status, not raw card data. Do not upload unnecessary identity or health information.

**2. Purposes and lawful bases**
We process information to provide accounts, SaaS features, billing, support and requested consultations under contract or steps requested before contract; to secure the service, prevent fraud and improve operations under appropriate legitimate interests; and to comply with legal obligations. Marketing and optional nonessential cookies use consent where required. Sensitive consultation information is processed only when necessary with a valid sensitive-data basis, including explicit consent where required. Users may withdraw consent without affecting prior lawful processing. We do not condition basic catalogue access on providing health information or images.

**3. AI processing and business customer data**
GlowHub uses AI to analyse authorised business records, product information, supplier evidence and optional consultation inputs. Data is minimised, permission-filtered and sent only to approved processors as necessary. AI recommendations and verification risk flags assist humans; significant seller or account decisions require appropriate human review. We do not use private customer content to train general-purpose models without separate authorisation and lawful basis. For merchant customer records, the merchant generally acts as controller and GlowHub as processor under a data processing agreement; GlowHub acts as controller for its own account, billing, security and platform obligations. Roles may vary by workflow and will be documented.

**4. Sharing and international transfers**
We share information only as necessary with contracted hosting, AI, payment, communications, analytics, support and security providers; authorised merchant staff; relevant seller/courier for marketplace fulfilment when enabled; regulators or authorities where legally required; and professional advisers or transaction parties under appropriate safeguards. We do not sell personal data. Cloud processing may occur outside Nigeria; before transfers, assess lawful transfer grounds, safeguards, contracts and destination risks. Publish actual provider categories, relevant locations and transfer information in the final notice.

**5. Cookies and marketing**
Essential cookies support login, security and preferences. Nonessential analytics and advertising technologies are enabled only as permitted and with required consent; provide a cookie preference control and withdrawal option. Users may opt out of marketing at any time through unsubscribe or settings. Transactional notices may still be sent where necessary.

**6. Retention and security**
Keep information only for the purpose and applicable legal obligations. Proposed defaults: unsaved consultation records 90 days, raw optional image pilot files 24 hours unless explicitly saved, evidence during active relationship plus up to 12 months where justified, security logs 90 days, backups expiring within 30–90 days; transaction records for applicable statutory periods. Legal holds or complaints may require longer retention. Final schedule will be published after legal review. We use access controls, encryption, tenant isolation, secure storage, monitoring and incident response. No system is completely risk-free. Notify regulators and affected persons where required by applicable law.

**7. Rights and choices**
Subject to applicable law, users may request access, correction, deletion, restriction, objection, portability, withdrawal of consent and information about automated processing, including human review where applicable. Contact [privacy email]; we may verify identity before responding and explain lawful limitations. Merchant customers may also contact the relevant merchant. Users may complain to the Nigeria Data Protection Commission at https://ndpc.gov.ng/. We will respond within applicable legal timelines.

**8. Children, changes and contact**
The service is intended for adults; do not submit children's personal or health data without an approved lawful workflow and required parental/guardian authorisation. We do not knowingly offer accounts to children. We update this notice when processing changes and notify users of material changes; obtain fresh consent where required. Contact [privacy email] at [registered address] for questions or requests.

## Appendix C. Sources and reference basis
Founder source: GlowHub Project Development Report, 17 pages, provided for product, design and development discussions; pp. 3–9 concept and features, pp. 10–11 market evidence, pp. 12–16 business model, roadmap and scope, p. 17 references. Repositioning, subscription prices, SaaS market assumptions, AI requirements and roadmap are proposed AERA specifications, not claims in the original report.

Market sources listed in founder report: https://www.nextmsc.com/market-report/nigeria/retail-and-consumer/personal-care-products ; https://blog.opinyze.com/fake-products-in-nigeria-what-consumers-say-about-counterfeit-products ; https://www.euromonitor.com/beauty-and-personal-care-in-nigeria/report ; https://ecdb.com/resources/sample-data/market/ng/personal-care ; https://www.beautywestafrica.com/market-overview ; https://www.beautywestafrica.com/west-africas-growing-beauty-personal-care-market ; https://www.versus.africa/our-reports/consumer-outlook-2023-report . Verify original research before public or investment use.

Legal reference points: Nigeria Data Protection Act 2023 (https://nccc.gov.ng/resources/nigeria-data-protection-act-2023); NDPC (https://ndpc.gov.ng/); FCCPC consumer rights (https://fccpc.gov.ng/consumers/consumer-rights-responsibilities/rights-responsibilities/); NAFDAC cosmetics guidance (https://nafdac.gov.ng/find-guidelines-on-cosmetics-and-other-related-products/) and registration verification (https://registration.nafdac.gov.ng/). These are review inputs, not a legal opinion. Confirm current rules and final documents with Nigerian counsel.

END OF DOCUMENT • Version 1.0 • Pre-launch only
