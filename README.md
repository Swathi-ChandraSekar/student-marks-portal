# Student Performance Analytics Portal

A Next.js (App Router + TypeScript + Tailwind CSS v4) academic portal with three
logically separate portals:

```
Student Performance Portal
├── /dashboard  → Student Portal   (existing — preserved as-is)
├── /faculty    → Faculty Portal   (new in Session 1)
└── /admin      → Admin Portal     (new in Session 1)
```

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

- `npm run typecheck` — runs `tsc --noEmit`
- `npm run lint` — runs ESLint
- `npm run build` — production build

> Google Fonts (Geist / Geist Mono) are fetched at build time by `next/font/google`.
> If you're building in a network-restricted environment, allow
> `fonts.googleapis.com` and `fonts.gstatic.com`, or swap `app/layout.tsx` to
> `next/font/local` / system fonts.

## Current status (end of Session 1)

- **Student Portal** (`/dashboard`, `/login`, `/register`, `/api/student/*`) —
  unchanged from the original project. Login currently requires `MONGODB_URI`
  to be configured; without it, `/api/student/login` returns a 503 and the
  landing page's Student Login/Registration flow will not complete. This is
  pre-existing behavior, not something introduced this session.
- **Admin Portal** (`/admin`) — dashboard, Batch Management, Student
  Management, Faculty Management, Student List, Internal Marks, Overall
  Sheet, Cumulative Sheet, Subject Analysis, Nil Arrear, and Reports. All
  pages use in-memory mock data (see `data/admin.ts`); nothing is persisted.
- **Faculty Portal** (`/faculty`) — dashboard, Student List, Internal Marks
  entry, Overall Sheet, Cumulative Sheet, Subject Analysis, Nil Arrear, and
  Attendance. All pages use in-memory mock data (see `data/faculty.ts`).
- Admin and Faculty portals are **not behind authentication yet** — that
  decision was intentionally left for a future session along with MongoDB
  integration, since Session 1's scope was UI/foundation only.
- **Nil Arrear** pages (both portals) are UI-only. Final eligibility rules
  (arrear thresholds, attendance conditions, fee clearance, etc.) have not
  been confirmed and are explicitly not implemented — this is called out
  directly on each page.
- Mock data is loosely modeled on a four-year AI & ML department (subject
  codes, register-number format, assessment structure) for realism, but all
  names, employee IDs, and figures are fictional.

## Project structure

```
app/
  (auth)/login, (auth)/register      Student auth pages (unchanged)
  api/student/...                    Student auth API routes (unchanged)
  dashboard/...                      Student Portal (unchanged)
  admin/...                          Admin Portal (new)
  faculty/...                        Faculty Portal (new)
components/
  dashboard/                         Shared dashboard primitives (Topbar, StatCard, Sidebar)
  portal/                            New reusable Admin/Faculty building blocks
    PortalSidebar.tsx                Configurable sidebar (nav items, brand, status card)
    DataTable.tsx                    Generic typed data table
    SectionCard.tsx                  White rounded card wrapper with title/actions
    Badge.tsx                        Status pill (success/warning/danger/info/neutral)
  marks/, fees/, attendance/         Student portal components (unchanged)
data/
  student.ts                        Student mock data (unchanged)
  admin.ts                          Admin portal mock data (new)
  faculty.ts                        Faculty portal mock data (new)
types/
  student.ts                        Student domain types (unchanged)
  admin.ts                          Admin domain types (new)
  faculty.ts                        Faculty domain types (new)
lib/
  auth.ts, mongodb.ts, student-data.ts   Unchanged. MongoDB is not connected
                                          yet (isMongoConfigured() gates all
                                          DB access and falls back safely).
```

## Not in scope for this session

- MongoDB connection / persistence for Admin or Faculty data
- Excel/CSV import
- Admin/Faculty authentication
- Final Nil Arrear eligibility business logic
- Any redesign of existing Student portal pages
