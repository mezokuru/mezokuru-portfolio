# Admin Panel PRD - Mezokuru Business Management System

## Overview

A single-page admin dashboard for managing clients, projects, invoices, and business operations. Data persists locally using localStorage with export/import for cloud backup.

---

## Core Requirements

### 1. Data Persistence
- **Storage:** localStorage (browser-based)
- **Backup:** Export to JSON file
- **Restore:** Import from JSON file
- **Auto-save:** Every change saves immediately
- **Data structure:** Normalized JSON with relationships

### 2. Authentication
- **Simple password protection** (localStorage-based)
- **Session management** (stays logged in until logout)
- **No external auth service** (keep it simple)

### 3. Core Entities

#### Clients
```json
{
  "id": "uuid",
  "business": "string",
  "contact": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "notes": "string",
  "active": boolean,
  "created": "timestamp",
  "updated": "timestamp"
}
```

#### Projects
```json
{
  "id": "uuid",
  "name": "string",
  "clientId": "uuid",
  "status": "planning|development|honey-period|retainer|completed",
  "startDate": "date",
  "supportMonths": number,
  "supportEndDate": "date (calculated)",
  "description": "string",
  "techStack": ["array"],
  "liveUrl": "string",
  "githubUrl": "string",
  "created": "timestamp",
  "updated": "timestamp"
}
```

#### Invoices
```json
{
  "id": "uuid",
  "invoiceNumber": "string (MZK-2025-XXX)",
  "clientId": "uuid",
  "projectId": "uuid (optional)",
  "amount": number,
  "date": "date",
  "dueDate": "date",
  "paidDate": "date (optional)",
  "status": "draft|sent|paid|overdue",
  "description": "string",
  "lineItems": [
    {
      "description": "string",
      "quantity": number,
      "unitPrice": number,
      "amount": number
    }
  ],
  "notes": "string",
  "created": "timestamp",
  "updated": "timestamp"
}
```

---

## Features

### Dashboard
- **Revenue Stats**
  - Total revenue (current year)
  - Paid invoices count
  - Pending invoices count
  - Overdue invoices count
  - Outstanding amount (unpaid)

- **Quick Actions**
  - New Invoice button
  - New Client button
  - New Project button

- **Recent Activity**
  - Last 5 invoices (table view)
  - Quick status updates

### Clients Management
- **List View**
  - Search by business name, contact, email
  - Filter by active/inactive
  - Sort by name, created date
  - Pagination (20 per page)

- **Actions**
  - Add new client
  - Edit client
  - Delete client (with confirmation)
  - View client details (modal)
  - View client's projects
  - View client's invoices

- **Client Detail Modal**
  - All client info
  - List of projects
  - List of invoices
  - Total revenue from client
  - Quick actions (new invoice, new project)

### Projects Management
- **List View**
  - Search by project name, client
  - Filter by status
  - Sort by start date, name
  - Status badges with colors

- **Actions**
  - Add new project
  - Edit project
  - Delete project (with confirmation)
  - View project details (modal)
  - Update status
  - Mark as completed

- **Project Detail Modal**
  - All project info
  - Client details
  - Support period countdown
  - Related invoices
  - Quick actions

- **Support Period Tracking**
  - Calculate end date from start + months
  - Show days remaining
  - Alert when approaching end (30 days)
  - Auto-suggest retainer conversion

### Invoices Management
- **List View**
  - Search by invoice number, client
  - Filter by status
  - Sort by date, amount, due date
  - Status badges with colors
  - Overdue highlighting

- **Actions**
  - Create new invoice
  - Edit invoice
  - Delete invoice (with confirmation)
  - Mark as sent
  - Mark as paid
  - Generate PDF
  - Duplicate invoice
  - Send reminder (future)

- **Invoice Form**
  - Auto-generate invoice number
  - Client dropdown (searchable)
  - Project dropdown (optional, filtered by client)
  - Line items (add/remove rows)
  - Auto-calculate totals
  - Date pickers
  - Status selector
  - Notes field

- **PDF Generation**
  - Use existing invoice template
  - Populate with invoice data
  - Open in new tab for print/save
  - Include client details
  - Include line items
  - Include totals
  - Include payment terms
  - Include banking details

### Data Management
- **Export**
  - Export all data to JSON
  - Filename: `mezokuru-backup-YYYY-MM-DD.json`
  - Download to computer
  - Includes all clients, projects, invoices

- **Import**
  - Upload JSON file
  - Validate structure
  - Merge or replace options
  - Confirmation before import
  - Error handling

- **Clear Data**
  - Clear all data (with confirmation)
  - Requires password re-entry
  - Cannot be undone warning

---

## UI/UX Requirements

### Design
- **Current style maintained** (dark theme, gold accent)
- **Responsive** (works on tablet, desktop)
- **Fast** (no page reloads, instant updates)
- **Clean** (minimal, no clutter)

### Navigation
- **Sidebar** (fixed left)
  - Dashboard
  - Clients
  - Projects
  - Invoices
  - Settings
  - Logout

- **Top Bar**
  - Page title
  - Primary action button
  - Search (context-aware)

### Modals
- **Smooth animations** (fade in/out)
- **Click outside to close**
- **ESC key to close**
- **Form validation**
- **Loading states**

### Tables
- **Sortable columns** (click header)
- **Hover effects**
- **Action buttons** (view, edit, delete)
- **Empty states** (helpful messages)
- **Loading states** (skeleton or spinner)

### Forms
- **Inline validation**
- **Required field indicators**
- **Date pickers** (native or simple library)
- **Dropdowns** (searchable for clients)
- **Auto-save drafts** (for invoices)
- **Cancel/Save buttons**

---

## Technical Specifications

### Technology Stack
- **HTML5** (semantic markup)
- **CSS3** (existing styles extended)
- **Vanilla JavaScript** (no frameworks)
- **localStorage API** (data persistence)
- **UUID generation** (crypto.randomUUID())
- **Date handling** (native Date API)

### Data Storage
```javascript
// localStorage keys
localStorage.setItem('mezokuru_clients', JSON.stringify(clients));
localStorage.setItem('mezokuru_projects', JSON.stringify(projects));
localStorage.setItem('mezokuru_invoices', JSON.stringify(invoices));
localStorage.setItem('mezokuru_settings', JSON.stringify(settings));
localStorage.setItem('mezokuru_auth', JSON.stringify(auth));
```

### Data Operations
- **CRUD functions** for each entity
- **Search/filter functions**
- **Sort functions**
- **Validation functions**
- **Export/import functions**
- **Backup functions**

### PDF Generation
- **Option 1:** Open invoice template in new window with URL params
- **Option 2:** Use jsPDF library (if needed)
- **Option 3:** Populate template HTML and print

### Performance
- **Lazy loading** (load data on demand)
- **Debounced search** (300ms delay)
- **Pagination** (20 items per page)
- **Efficient rendering** (only update changed elements)

---

## User Flows

### Create Invoice Flow
1. Click "New Invoice" button
2. Modal opens with form
3. Select client (dropdown)
4. Auto-populate client details
5. Optionally select project
6. Add line items (description, qty, price)
7. Auto-calculate totals
8. Set dates (invoice date, due date)
9. Add notes (optional)
10. Save as draft or mark as sent
11. Modal closes, table updates
12. Success notification

### Generate PDF Flow
1. Click "Generate PDF" on invoice row
2. System validates invoice data
3. Opens invoice template in new tab
4. Template auto-populates with data
5. User can print or save as PDF
6. Close tab when done

### Client Management Flow
1. Navigate to Clients section
2. View list of all clients
3. Search/filter as needed
4. Click client row to view details
5. Modal shows client info + projects + invoices
6. Can edit, delete, or create new invoice/project
7. Changes save immediately

---

## Validation Rules

### Clients
- Business name: required, min 2 chars
- Contact: required, min 2 chars
- Email: required, valid email format
- Phone: required, valid phone format

### Projects
- Name: required, min 3 chars
- Client: required (must exist)
- Status: required (from enum)
- Start date: required, valid date
- Support months: required, number, min 0

### Invoices
- Invoice number: required, unique, format MZK-YYYY-XXX
- Client: required (must exist)
- Amount: required, number, min 0
- Date: required, valid date
- Due date: required, valid date, after invoice date
- Status: required (from enum)
- Line items: at least 1 item required

---

## Error Handling

### Storage Errors
- **Quota exceeded:** Alert user, suggest export/clear old data
- **Parse errors:** Show error, offer to reset data
- **Corruption:** Validate on load, offer backup restore

### User Errors
- **Invalid input:** Inline validation messages
- **Duplicate invoice number:** Suggest next available
- **Delete with dependencies:** Warn about related records
- **Import errors:** Show specific validation errors

### Edge Cases
- **Empty states:** Helpful messages with action buttons
- **No search results:** "No results found" message
- **Overdue invoices:** Highlight in red, show days overdue
- **Support ending soon:** Alert on dashboard

---

## Settings

### General Settings
- **Business name:** Mezokuru
- **Email:** mezokuru@gmail.com
- **Phone:** +27 65 666 7826
- **Bank details:** (editable)
- **Invoice prefix:** MZK
- **Default support period:** 6 months
- **Default payment terms:** 14 days

### Password Management
- **Change password**
- **Reset password** (requires current password)

### Data Management
- **Export data** button
- **Import data** button
- **Clear all data** button (dangerous)

---

## Future Enhancements (Not in MVP)

- Email integration (send invoices)
- Recurring invoices
- Payment tracking (partial payments)
- Expense tracking
- Time tracking
- Reports (revenue by month, client, etc.)
- Multi-currency support
- Tax calculations
- Client portal (view invoices)
- Mobile app
- Cloud sync (Firebase)

---

## Success Metrics

### Functionality
- ✅ All CRUD operations work
- ✅ Data persists across sessions
- ✅ Export/import works correctly
- ✅ PDF generation works
- ✅ Search/filter works
- ✅ No data loss

### Performance
- ✅ Page loads < 1 second
- ✅ Actions respond < 100ms
- ✅ Search results < 200ms
- ✅ Handles 1000+ records smoothly

### UX
- ✅ Intuitive navigation
- ✅ Clear error messages
- ✅ Helpful empty states
- ✅ Smooth animations
- ✅ No confusing flows

---

## Implementation Notes

### Phase 1: Core Data Layer
1. Set up localStorage structure
2. Create CRUD functions
3. Add validation
4. Test data persistence

### Phase 2: UI Components
1. Update existing UI
2. Add modals
3. Add forms
4. Add tables with actions

### Phase 3: Features
1. Client management
2. Project management
3. Invoice management
4. Dashboard stats

### Phase 4: Polish
1. PDF generation
2. Export/import
3. Search/filter
4. Error handling
5. Loading states

### Phase 5: Testing
1. Test all CRUD operations
2. Test edge cases
3. Test data integrity
4. Test export/import
5. Test PDF generation

---

## File Structure

```
invoices/
├── admin-panel.html          # Main admin interface
├── admin-panel.js            # Business logic (new)
├── admin-panel.css           # Styles (extracted from HTML)
├── invoice-template.html     # PDF template (existing)
└── data-backup.json          # Example backup file
```

---

## Testing Checklist

### Data Operations
- [ ] Create client
- [ ] Edit client
- [ ] Delete client
- [ ] Search clients
- [ ] Filter clients

- [ ] Create project
- [ ] Edit project
- [ ] Delete project
- [ ] Update project status
- [ ] Track support period

- [ ] Create invoice
- [ ] Edit invoice
- [ ] Delete invoice
- [ ] Mark as sent
- [ ] Mark as paid
- [ ] Generate PDF
- [ ] Duplicate invoice

### Data Integrity
- [ ] Data persists after refresh
- [ ] Relationships maintained (client → projects → invoices)
- [ ] Calculations correct (totals, dates)
- [ ] No duplicate IDs
- [ ] No orphaned records

### Export/Import
- [ ] Export creates valid JSON
- [ ] Import validates structure
- [ ] Import merges correctly
- [ ] Import replaces correctly
- [ ] Backup/restore works

### Edge Cases
- [ ] Empty database
- [ ] Large dataset (1000+ records)
- [ ] Invalid data
- [ ] Quota exceeded
- [ ] Concurrent tabs (localStorage sync)

---

## Deliverables

1. **Enhanced admin-panel.html** - Fully functional admin system
2. **admin-panel.js** - Separated business logic
3. **admin-panel.css** - Extracted styles
4. **User guide** - How to use the system
5. **Backup template** - Example JSON structure

---

## Notes

- Keep it simple - no over-engineering
- Focus on core business needs
- Prioritize data integrity
- Make backup/export easy
- Clear, helpful error messages
- Fast, responsive UI
- No external dependencies (except UUID if needed)

---

**Goal:** A reliable, fast, offline-first business management system that just works.
