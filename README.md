# Lendsqr Admin Dashboard | Frontend Assessment

A professional, feature-rich admin dashboard built for managing user data, financial details, and account statuses. This project demonstrates a clean architecture approach using modern web technologies, with a focus on data integrity, persistence, and modularity.

## 🚀 Live Demo
*(Placeholder for deployment link - e.g. Vercel URL)*

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Sass (SCSS)](https://sass-lang.com/) with CSS Modules
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Icons**: Custom SVG paths & Font-awesome styled icons.

---

## ✨ Core Features

### 1. Authentication
- Sleek, responsive Login page.
- Password toggle visibility.
- Form validation and structured layout.

### 2. User Management
- **Dashboard Overview**: Summary cards showing Total Users, Active Users, Users with Loans, and Users with Savings.
- **Dynamic Table**: A robust data table listing users with:
  - **Filtering**: Filter by Organization, Username, Email, Phone Number, Date Joined, and Status.
  - **Pagination**: Navigate through large datasets with adjustable items-per-page.
  - **Actions Menu**: View User Details, Blacklist User, or Activate User directly from the table.

### 3. User Details Profile
- **Comprehensive View**: Detailed information organized into sections: Personal Info, Education & Employment, Socials, and Guarantor.
- **Interactive Tabs**: Tabbed navigation (Documents, Bank Details, Loans, etc.) with 구현된 "Coming Soon" states.
- **Dynamic Headers**: User Summary bar showing Avatar, Name, ID, Tier, and Bank Balance.

### 4. Smart Data Handling
- **Sanitization Engine**: Custom logic to clean raw JSON data, handling common issues like `ReferenceError` strings, `undefined` handles, and non-standard date formats.
- **Fallbacks**: Intelligent fallbacks for missing avatars, names, and social media handles.

---

## 💾 LocalStorage Persistence

This project implements a multi-layer caching strategy using `localStorage` to ensure a premium user experience:

- **User List Caching**: The main users list is cached locally (`lendsqr_users`) for instant loading on repeat visits.
- **Status Persistence**: User status changes (Blacklisting/Activating) are saved in a shared override map (`lendsqr_status_overrides`). This ensures that if you blacklist a user on the detail page, they remain blacklisted on the main table and after a browser refresh.
- **Detail Caching**: Viewed user details are cached individually to allow for persistent viewing of dynamic routes.

---

## 🏗 Modular Architecture

The project follows a "Feature-First" modular directory structure:

```text
src/
├── app/             # Next.js App Router (Pages & API Routes)
├── components/
│   ├── common/      # Reusable UI (StatCard, Pagination, Skeletons)
│   ├── features/    # Domain-specific (users/, auth/)
│   └── layout/      # Global components (Topbar, Sidebar, Shared Layout)
├── hooks/           # Custom React hooks (useUsers, etc.)
├── lib/             # API layer, Sanitization logic, Constants
├── styles/          # Global styles, Mixed-ins, and Variables
└── types/           # Global TypeScript interfaces
```

---

## 🧪 Testing

The codebase includes a comprehensive test suite covering both **Positive** (Success paths) and **Negative** (Error handling/Edge cases) scenarios.

- **API Sanitization**: Tests for handling corrupt data strings and normalization.
- **Component Tests**: Verifies rendering and interaction for `UserTable`, `UserDetailsClient`, and `StatCard`.
- **Logic Tests**: Ensures pagination and tab switching work as intended.

**Run Tests:**
```bash
npm test
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ishola10/lendsqr-frontend-engineering-assessment.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Design Tokens
- **Colors**: Primary Teal (`#39CDCC`), Heading Blue (`#213F7D`), Text Grey (`#545F7D`).
- **Typography**: Uses modern sans-serif fonts (Inter/Geist) for a premium fintech feel.
- **Responsiveness**: Mobile-first approach with breakpoints for Tablet and Desktop views.
