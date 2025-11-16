# Koruku Business Management System - PRD for Bolt.new

## Project Overview

**Name:** Koruku Business Management  
**Domain:** koruku.xyz  
**Purpose:** Complete business management system for Mezokuru web development business  
**Tech Stack:** React + Vite + Supabase + Tailwind CSS  
**Target:** Bolt.new with Supabase integration

---

## Core Functionality

A single-page application for managing clients, projects, invoices, and business operations with real-time data sync via Supabase.

---

## Database Schema (Supabase)

### Table: `clients`
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  notes TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table: `projects`
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('planning', 'development', 'honey-period', 'retainer', 'completed')),
  start_date DATE NOT NULL,
  support_months INTEGER NOT NULL DEFAULT 6,
  support_end_date DATE NOT NULL,
  description TEXT,
  tech_stack TEXT[],
  live_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table: `invoices`
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT UNIQUE NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'paid', 'overdue')),
  description TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table: `settings`
```sql
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users full access (single user system)
CREATE POLICY "Allow all for authenticated users" ON clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON invoices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON settings FOR ALL USING (auth.role() = 'authenticated');
```

---

## Features & User Stories

### 1. Authentication
**Story:** As a user, I need to securely login to access my business data.

**Requirements:**
- Supabase Auth with email/password
- Login page with email and password fields
- "Remember me" option
- Password reset functionality
- Auto-redirect to dashboard after login
- Logout button in sidebar
- Session persistence

**UI:**
- Clean login form centered on page
- Mezokuru branding (dark theme, gold accent)
- Error messages for invalid credentials
- Loading state during authentication

---

### 2. Dashboard
**Story:** As a user, I want to see an overview of my business at a glance.

**Requirements:**
- Revenue stats (current year)
  - Total revenue (sum of paid invoices)
  - Paid invoices count
  - Pending invoices count (sent status)
  - Overdue invoices count
  - Outstanding amount (unpaid total)
- Recent invoices table (last 10)
- Quick action buttons (New Invoice, New Client, New Project)
- Support period alerts (projects ending in 30 days)

**UI:**
- 4-column stat cards with icons
- Recent invoices table with status badges
- Alert banner for expiring support periods
- Quick action buttons prominently displayed

---

### 3. Client Management
**Story:** As a user, I want to manage my client database.

**Requirements:**
- List all clients in a table
- Search clients by business name, contact, email
- Filter by active/inactive
- Sort by name, created date
- Add new client (modal form)
- Edit client (modal form)
- Delete client (with confirmation)
- View client details (modal)
  - Client info
  - List of projects
  - List of invoices
  - Total revenue from client
- Mark client as inactive (soft delete)

**Validation:**
- Business name: required, min 2 chars
- Contact: required, min 2 chars
- Email: required, valid email format
- Phone: required

**UI:**
- Data table with search bar
- Action buttons (edit, delete) per row
- Modal forms for add/edit
- Client detail modal with tabs (Info, Projects, Invoices)
- Empty state when no clients

---

### 4. Project Management
**Story:** As a user, I want to track all my projects and their support periods.

**Requirements:**
- List all projects in a table
- Search projects by name, client
- Filter by status
- Sort by start date, name, support end date
- Add new project (modal form)
- Edit project (modal form)
- Delete project (with confirmation)
- View project details (modal)
  - Project info
  - Client details
  - Support period countdown
  - Related invoices
- Update project status (dropdown)
- Auto-calculate support end date (start date + months)
- Alert when support ending soon (< 30 days)

**Validation:**
- Name: required, min 3 chars
- Client: required (dropdown from clients table)
- Status: required (enum)
- Start date: required, valid date
- Support months: required, number, min 0

**UI:**
- Data table with search and filter
- Status badges with colors
- Support countdown in table
- Warning icon for expiring support
- Modal forms for add/edit
- Project detail modal

---

### 5. Invoice Management
**Story:** As a user, I want to create, track, and manage invoices.

**Requirements:**
- List all invoices in a table
- Search invoices by number, client
- Filter by status
- Sort by date, amount, due date
- Add new invoice (modal form)
- Edit invoice (modal form)
- Delete invoice (with confirmation)
- Mark as sent
- Mark as paid (sets paid_date)
- Duplicate invoice (copy with new number)
- Auto-generate invoice number (MZK-YYYY-XXX)
- Auto-detect overdue (due_date < today && status != paid)
- Highlight overdue invoices in red

**Validation:**
- Invoice number: required, unique, format MZK-YYYY-XXX
- Client: required (dropdown)
- Amount: required, number, min 0
- Date: required, valid date
- Due date: required, valid date, must be after invoice date
- Status: required (enum)
- Description: required

**UI:**
- Data table with search and filter
- Status badges (draft=gray, sent=blue, paid=green, overdue=red)
- Overdue rows highlighted in light red
- Quick action buttons (mark paid, edit, delete)
- Modal form for add/edit
- Auto-fill invoice number on new invoice

---

### 6. Settings
**Story:** As a user, I want to configure business settings.

**Requirements:**
- Business information
  - Business name
  - Email
  - Phone
  - Bank details (name, bank, account, branch, type)
- Invoice settings
  - Invoice prefix (default: MZK)
  - Default payment terms (days, default: 14)
- Project settings
  - Default support period (months, default: 6)
- Save settings to Supabase

**UI:**
- Form with sections
- Save button
- Success notification on save

---

### 7. Data Export
**Story:** As a user, I want to export my data for backup.

**Requirements:**
- Export all data to JSON
- Include clients, projects, invoices, settings
- Filename: `koruku-backup-YYYY-MM-DD.json`
- Download to computer
- Button in settings page

**UI:**
- Export button with download icon
- Success notification after export

---

## UI/UX Requirements

### Design System

**Colors:**
- Primary: #2c3e50 (dark slate)
- Accent: #ffd166 (gold)
- Success: #27ae60 (green)
- Danger: #e74c3c (red)
- Warning: #f39c12 (orange)
- Info: #3498db (blue)
- Background: #f5f5f5 (light gray)
- Text: #2c3e50 (dark slate)
- Muted: #7f8c8d (gray)

**Typography:**
- Font: 'Inter' or 'Segoe UI'
- Headings: Bold, larger sizes
- Body: Regular, 14-16px

**Components:**
- Buttons: Rounded, with hover effects
- Inputs: Border, rounded, focus state
- Tables: Striped rows, hover effect
- Modals: Centered, backdrop blur
- Status badges: Rounded pills with colors
- Cards: White background, subtle shadow

### Layout

**Sidebar (Fixed Left):**
- Width: 250px
- Dark background (#2c3e50)
- Logo at top
- Navigation menu
- Logout at bottom

**Main Content:**
- Margin-left: 250px
- Padding: 20px
- White background cards

**Header (Per Page):**
- Page title (left)
- Search bar (center, if applicable)
- Primary action button (right)

### Navigation

**Sidebar Menu:**
- Dashboard (home icon)
- Clients (users icon)
- Projects (project icon)
- Invoices (invoice icon)
- Settings (cog icon)
- Export Data (download icon)
- Logout (sign-out icon)

**Active State:**
- Gold background (#ffd166)
- Dark text

### Modals

**Behavior:**
- Fade in/out animation
- Click backdrop to close
- ESC key to close
- Form validation before submit
- Loading state on submit

**Structure:**
- Header with title and close button
- Body with form fields
- Footer with cancel and save buttons

### Tables

**Features:**
- Sortable columns (click header)
- Hover effect on rows
- Action buttons (right column)
- Empty state message
- Loading skeleton

**Columns:**
- Left-aligned text
- Right-aligned numbers
- Center-aligned actions

### Forms

**Features:**
- Inline validation
- Required field indicators (*)
- Error messages below fields
- Disabled submit until valid
- Loading state on submit

**Fields:**
- Text inputs
- Email inputs
- Number inputs
- Date pickers (native)
- Dropdowns (searchable for clients)
- Textareas

### Notifications

**Toast Messages:**
- Position: Top-right
- Auto-dismiss: 3 seconds
- Types: Success (green), Error (red), Info (blue)
- Slide-in animation

---

## Technical Specifications

### Tech Stack

**Frontend:**
- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (routing)
- React Query (data fetching)
- Zustand (state management, optional)

**Backend:**
- Supabase (PostgreSQL database)
- Supabase Auth (authentication)
- Supabase Realtime (optional, for live updates)

**Libraries:**
- date-fns (date formatting)
- react-hot-toast (notifications)
- lucide-react (icons)
- @supabase/supabase-js (Supabase client)

### Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── Layout.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   ├── StatusBadge.jsx
│   │   └── StatCard.jsx
│   ├── clients/
│   │   ├── ClientList.jsx
│   │   ├── ClientForm.jsx
│   │   └── ClientDetail.jsx
│   ├── projects/
│   │   ├── ProjectList.jsx
│   │   ├── ProjectForm.jsx
│   │   └── ProjectDetail.jsx
│   └── invoices/
│       ├── InvoiceList.jsx
│       ├── InvoiceForm.jsx
│       └── InvoiceDetail.jsx
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Clients.jsx
│   ├── Projects.jsx
│   ├── Invoices.jsx
│   └── Settings.jsx
├── hooks/
│   ├── useClients.js
│   ├── useProjects.js
│   ├── useInvoices.js
│   └── useSettings.js
├── lib/
│   ├── supabase.js
│   └── utils.js
├── App.jsx
└── main.jsx
```

### Supabase Setup

**Environment Variables:**
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Client Initialization:**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Data Fetching Pattern

**Using React Query:**
```javascript
// hooks/useClients.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('business', { ascending: true })
      
      if (error) throw error
      return data
    }
  })
}

export function useCreateClient() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (client) => {
      const { data, error } = await supabase
        .from('clients')
        .insert([client])
        .select()
      
      if (error) throw error
      return data[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['clients'])
    }
  })
}
```

### Auto-calculations

**Invoice Number:**
```javascript
function generateInvoiceNumber(existingInvoices) {
  const year = new Date().getFullYear()
  const prefix = `MZK-${year}-`
  
  const numbers = existingInvoices
    .filter(inv => inv.invoice_number.startsWith(prefix))
    .map(inv => parseInt(inv.invoice_number.split('-').pop()))
    .filter(num => !isNaN(num))
  
  const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1
  return `${prefix}${String(nextNumber).padStart(3, '0')}`
}
```

**Support End Date:**
```javascript
function calculateSupportEndDate(startDate, months) {
  const date = new Date(startDate)
  date.setMonth(date.getMonth() + months)
  return date.toISOString().split('T')[0]
}
```

**Overdue Detection:**
```javascript
function isOverdue(invoice) {
  if (invoice.status === 'paid') return false
  return new Date(invoice.due_date) < new Date()
}
```

---

## User Flows

### Create Invoice Flow
1. User clicks "New Invoice" button
2. Modal opens with form
3. Invoice number auto-generated
4. User selects client from dropdown
5. User enters amount, dates, description
6. User selects status (draft/sent)
7. User clicks "Save"
8. Invoice created in Supabase
9. Modal closes
10. Table refreshes with new invoice
11. Success toast notification

### Mark Invoice as Paid Flow
1. User clicks "Mark as Paid" button on invoice row
2. Confirmation dialog appears
3. User confirms
4. Invoice status updated to 'paid'
5. paid_date set to today
6. Table refreshes
7. Dashboard stats update
8. Success toast notification

### Client Management Flow
1. User navigates to Clients page
2. Sees list of all clients
3. User searches for specific client
4. User clicks client row
5. Detail modal opens showing:
   - Client info
   - List of projects
   - List of invoices
   - Total revenue
6. User can edit or delete from modal
7. Changes save to Supabase
8. Modal closes
9. Table refreshes

---

## Error Handling

### Supabase Errors
- Network errors: Show toast with retry button
- Auth errors: Redirect to login
- Validation errors: Show inline form errors
- Constraint errors: Show user-friendly message

### User Errors
- Invalid input: Inline validation messages
- Duplicate invoice number: Suggest next available
- Delete with dependencies: Warn about cascade
- Empty required fields: Highlight in red

### Edge Cases
- No internet: Show offline banner
- Session expired: Auto-redirect to login
- Empty states: Helpful messages with action buttons
- No search results: "No results found" message
- Overdue invoices: Highlight in red

---

## Performance Requirements

- Initial load: < 2 seconds
- Page navigation: < 500ms
- Data fetch: < 1 second
- Form submit: < 1 second
- Search results: < 300ms

---

## Security Requirements

- All data behind authentication
- RLS policies on all tables
- HTTPS only
- Secure session storage
- Password requirements (min 8 chars)
- Auto-logout after 24 hours

---

## Deployment

**Domain:** koruku.xyz

**Hosting:** Netlify or Vercel

**Build Command:** `npm run build`

**Environment Variables:**
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

**DNS:**
- Point koruku.xyz to hosting provider
- Enable HTTPS

---

## Success Criteria

### Functionality
- ✅ User can login/logout
- ✅ User can CRUD clients
- ✅ User can CRUD projects
- ✅ User can CRUD invoices
- ✅ Dashboard shows accurate stats
- ✅ Search/filter works on all pages
- ✅ Data persists in Supabase
- ✅ Export data works

### Performance
- ✅ Lighthouse score > 90
- ✅ No console errors
- ✅ Fast page loads
- ✅ Smooth animations

### UX
- ✅ Intuitive navigation
- ✅ Clear error messages
- ✅ Helpful empty states
- ✅ Responsive design
- ✅ Accessible (WCAG AA)

---

## Future Enhancements (Not in MVP)

- Email integration (send invoices)
- PDF generation (invoice template)
- Recurring invoices
- Payment tracking (partial payments)
- Expense tracking
- Time tracking
- Reports (charts, analytics)
- Multi-currency support
- Tax calculations
- Client portal
- Mobile app
- Team collaboration

---

## Bolt.new Instructions

**Prompt for Bolt:**

```
Create a business management system for Mezokuru web development company.

Tech stack: React + Vite + Supabase + Tailwind CSS

Features:
1. Authentication (Supabase Auth)
2. Dashboard with revenue stats
3. Client management (CRUD)
4. Project management (CRUD) with support period tracking
5. Invoice management (CRUD) with auto-numbering
6. Settings page
7. Data export to JSON

Database schema:
- clients table (id, business, contact, email, phone, address, notes, active, timestamps)
- projects table (id, name, client_id FK, status enum, start_date, support_months, support_end_date, description, timestamps)
- invoices table (id, invoice_number unique, client_id FK, project_id FK nullable, amount, date, due_date, paid_date nullable, status enum, description, notes, timestamps)
- settings table (id, key unique, value jsonb, timestamp)

UI: Dark sidebar (#2c3e50) with gold accent (#ffd166), white content area, data tables with search, modal forms, status badges, toast notifications.

Auto-calculations: invoice numbers (MZK-YYYY-XXX), support end dates, overdue detection.

Use React Query for data fetching, Tailwind for styling, lucide-react for icons, react-hot-toast for notifications.

Implement RLS policies for authenticated users only.
```

---

## Notes

- Keep it simple - focus on core business needs
- Prioritize data integrity
- Make UI fast and responsive
- Clear, helpful error messages
- Mobile-friendly (responsive)
- No over-engineering

---

**Goal:** A reliable, fast, cloud-based business management system that works from anywhere.
