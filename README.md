
# AuraGas — Modern Smart LPG Gas Cylinder Booking & Telemetry Platform

AuraGas is an ultra-modern, full-stack LPG gas cylinder booking platform built with **Next.js App Router (React 19, TypeScript)**, **Tailwind CSS**, **Lucide Icons**, **Framer Motion**, and **Mongoose / MongoDB**.

Designed with a high-fidelity FinTech / SaaS aesthetic (Linear/Stripe/Vercel vibe), AuraGas replaces clunky, text-heavy government utility portals with glassmorphism, glowing micro-interactions, real-time telemetry, and native dark/light theming.

---

## 🌟 Key Domain Modules & Features

### 1. Authentication & Role-Based Access (`/login` & `/signup`)
- **Login Portal (`/login`)**:
  - Sign in using registered email or Consumer SV Voucher Number (e.g., `SV-8492018`).
  - **1-Click Demo Evaluation Sign In**: Instant test login as **Consumer** (`Arjun Verma`) or **Fleet Ops Admin** (`Dr. Vikram Sethi`).
- **New Consumer Registration (`/signup`)**:
  - Issue smart digital SV connections for Domestic (14.2kg / 5kg) or Commercial (19kg).
  - Aadhaar/PAN mapping for instant government DBTL direct subsidy crediting.
  - Generates verifiable SV vouchers with instant dashboard redirection.

### 2. Admin & Fleet Commander Console (`/admin`)
- **Live Fleet Dispatch Monitor**:
  - Track in-transit electric trikes with speed and battery telemetry.
  - Real-time revenue and Ministry of Petroleum DBTL subsidies claimed.
- **Warehouse Bottling Inventory**:
  - Live reserve counters for 5kg Mini, 14.2kg Domestic, and 19kg Commercial cylinders.
  - 1-click **Restock Batch** simulator (+50, +100, +25 units).
- **Master Dispatch & Handover Ledger**:
  - Filter by stage (`Order Placed`, `Confirmed & Safety Inspected`, `Dispatched / Out for Delivery`, `Delivered`).
  - Change stage on any order in real time.
  - View driver allocations and security OTP codes.

### 3. About & Regulatory Compliance (`/about`)
- Overview of PESO safety certification (IS 3196:2006 Standard).
- Hydraulic burst testing specification (34.5 bar).
- Direct Benefit Transfer (DBTL) subsidy processing architecture.
- 24/7 National Emergency Leak Hotline (1906) integration.

### 4. Dynamic Booking Engine & Wizard (`/components/booking`)
- **Interactive Multi-Step Booking Wizard**:
  - **Step 1: Cylinder Specification Picker**:
    - **Aura Mini 5kg**: Compact & agile for singles, campers, and kitchen backup.
    - **Aura Domestic 14.2kg (Subsidized)**: Standard household cylinder with DBTL government subsidy (₹300 off credited automatically).
    - **Aura Domestic 14.2kg (Non-Subsidized)**: Standard commercial/general domestic rate.
    - **Aura Commercial 19kg Heavy-Duty**: High-volume catering and restaurant grade with high-flow valve.
  - **Step 2: Delivery Timing & Cadence**:
    - **Express / Immediate Booking**: Priority dispatch with 20–35 min arrival window.
    - **Scheduled Future Delivery**: Interactive date picker and delivery window selector (Morning 8 AM–12 PM or Evening 4 PM–8 PM).
    - **Auto-Refill Recurring Subscription**: Choose cadence (every 30, 45, or 60 days) to prevent running out of gas.
  - **Step 3: Integrated Address Selection & Payment Checkout**:
    - Select from saved delivery hubs or add a new address inline.
    - Real-time tax computation (CGST 2.5% + SGST 2.5%, base price, subsidy discount, and net payable).
    - Payment simulation: Instant UPI QR code, Credit/Debit card with tokenization simulation, Net Banking gateway, and Pay on Delivery (Cash / Doorstep QR).
  - **Celebration & Delivery Verification OTP**: Generates dynamic 4-digit security code required upon cylinder handover.

### 5. Real-Time Booking Tracker (`/components/tracker`)
- **Stage Progression Timeline**:
  - `Order Placed` ➔ `Confirmed & Safety Inspected` ➔ `Dispatched / Out for Delivery` ➔ `Delivered`.
  - Includes interactive **"Simulate Stage"** button for instant end-to-end demo testing.
- **GPS Live Radar Route Canvas**:
  - Real-time navigation telemetry: Speed (`24 km/h`), distance (`1.2 km away`), and electric vehicle battery (`88%`).
  - **Interactive OTP Handover Dialog**: Enter the 4-digit code to authenticate handover and complete delivery.
- **Driver & Fleet Officer Detail Card**:
  - Agent avatar, verified phone contact button with click-to-call simulation, electric trike registration number, live ETA countdown, and dynamic 4-digit Delivery Verification OTP box with 1-click clipboard copy.
- **Reference Lookup Search Bar**:
  - Instantly search and switch tracking focus by Booking Reference ID (e.g. `AG-84920`).

### 6. Address Manager (`/components/addresses`)
- Responsive card grid displaying registered delivery hubs with visual badges (`Home`, `Work`, `Primary`).
- Interactive CRUD modal:
  - Consumer / SV Number, House/Flat No., Street, Landmark, City, State, PIN code, and contact phone.
  - "Set as Default" toggle switch with optimistic UI updates.

### 7. Payment History, Subscription Cadence & Tax Invoices (`/components/history`)
- Modern transaction ledger with status pill tags (`Paid`, `Pending`, `Scheduled`, `Refunded`).
- Quick filter tabs: `All Bookings`, `Instant Express`, and `Scheduled & Subscriptions`.
- **Subscription Cadence Controls**:
  - **Pause / Resume** plan toggle with zero cancellation fees.
  - **Skip Next Refill** cycle button.
- **One-Click Reorder**: Instantly preload cylinder specs into the booking wizard.
- **Slide-Over Tax Invoice Drawer**:
  - Itemized GST split (CGST 2.5% + SGST 2.5%), HSN code `27111900`, DBTL direct subsidy breakdown, gross & tare weights, hydraulic pressure safety test stamp, cryptographic QR verification seal, print preview, and digital PDF export simulation.

### 8. Kitchen Telemetry & Safety Self-Audit
- **Smart Kitchen Telemetry Modal**: Interactive daily cooking hours slider (0.5 to 6.0 hrs) that recalculates predicted days remaining, burner thermal efficiency (99.4%), and 7-day usage bar chart.
- **Safety Self-Audit & Emergency Drill Modal**: Interactive 4-point doorstep audit checklist (O-ring inspection, soapy water bubble test, regulator click lock, Suraksha hose expiry) and 24/7 dial 1906 button.

---

## 🎨 Design & Theming Specification
- **Theming**: Native Dark and Light mode support via `next-themes` with zero flash of unstyled content.
- **Dark Mode**: Obsidian zinc background (`#090D16` / `#0F172A`), electric cyan and orange accents, glowing border strokes (`border-zinc-800`), neon status indicators.
- **Light Mode**: Crisp slate neutrals (`#F8FAFC`), warm flame gradients, polished subtle drop-shadows.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15+ App Router, React 19, TypeScript |
| **Styling** | Tailwind CSS 3.4, PostCSS, Lucide React Icons |
| **Animation** | Framer Motion & CSS keyframe glow pulses |
| **State & Theming** | `next-themes`, React hooks, optimistic UI patterns |
| **Database & ORM** | MongoDB & Mongoose ORM with resilient fallback in-memory store |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create or verify `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/auragas
NEXT_PUBLIC_APP_NAME=AuraGas
```
*(Note: If no MongoDB daemon is running locally, AuraGas automatically uses its built-in in-memory repository with pre-seeded realistic data, ensuring 100% functionality out of the box).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Public Home / Landing Page**: [http://localhost:3000](http://localhost:3000) (High-impact entry page with interactive pricing calculator, 4-stage protocol walkthrough, and Get Started CTAs)
- **Consumer Booking Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard) (Interactive booking wizard, real-time live GPS radar tracker, address manager, and transaction feed)
- **Fleet Ops Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin) (Live dispatch telemetry, stage updating, and warehouse restocking)
- **Sign In**: [http://localhost:3000/login](http://localhost:3000/login) (Includes 1-click demo consumer & fleet admin logins)
- **New Connection Application**: [http://localhost:3000/signup](http://localhost:3000/signup) (Aadhaar/PAN mapping & SV voucher issuance)
- **About & Regulatory Info**: [http://localhost:3000/about](http://localhost:3000/about) (PESO compliance & DBTL subsidy pipeline)

### 4. Build for Production
```bash
npm run build
npm run start
```
=======
# gasgo
A full-stack booking and reservation system designed to manage appointments, check real-time availability, and process bookings seamlessly.

