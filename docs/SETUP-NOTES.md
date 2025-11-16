# Portfolio Setup - Netlify Decap CMS & Forms

## What We Did

Added Netlify Decap CMS and Netlify Forms to the Mezokuru portfolio for managing clients, projects, invoices, and contact form submissions.

## Changes Made

### 1. Netlify Forms Integration

**File: `index.html`**
- Added `data-netlify="true"` to contact form
- Added honeypot spam protection (`netlify-honeypot="bot-field"`)
- Added `name` attributes to all form fields (name, email, message)
- Added Netlify Identity widget script
- Added Identity redirect script for CMS login

**Result:** Contact form submissions now go directly to Netlify dashboard.

### 2. Decap CMS Setup

**Created: `admin/` folder**
- `admin/index.html` - CMS interface
- `admin/config.yml` - CMS configuration with 5 collections

**Collections:**
1. **Clients** - Business name, contact, email, phone, address, notes
2. **Projects** - Title, client (linked), description, image, tags, status, dates
3. **Invoices** - Invoice number, client (linked), amount, dates, status
4. **Testimonials** - Name, company, testimonial, rating, date
5. **Site Settings** - Email, phone, social links

### 3. Content Structure

**Created: `content/` folder with data**

```
content/
├── clients/
│   ├── arendse-bouers.md
│   ├── eagle-home-concrete.md
│   └── vc-wedding.md
├── projects/
│   ├── sihha.md
│   ├── arendse-bouers-website.md
│   ├── eagle-home-concrete.md
│   └── vc-wedding-portal.md
├── invoices/
│   ├── MZK-2024-001.md (Arendse Bouers - R8,500 - Paid)
│   ├── MZK-2024-002.md (Eagle Home - R10,750 - Sent)
│   └── MZK-2024-003.md (V&C Wedding - R5,500 - Sent)
├── testimonials/
└── settings/
    └── general.json
```

### 4. Configuration Files

**Created: `netlify.toml`**
- Build settings
- Redirect rules

**Updated: `.gitignore`**
- Added node_modules, .env files

## How It Works

### Netlify Forms
- Form submissions captured automatically
- View in Netlify dashboard → Forms tab
- Can set up email notifications
- Includes spam protection

### Decap CMS
- Git-based CMS (no database needed)
- All changes committed to GitHub
- Triggers automatic Netlify deployments
- Requires Netlify Identity for authentication
- Accessible at `/admin/` route

### Data Flow
1. Edit content in CMS → Saves to markdown files in `content/`
2. Changes committed to GitHub
3. Netlify auto-deploys updated site
4. All changes version controlled

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Netlify Decap CMS and forms"
git push
```

### 2. Enable Netlify Identity
1. Netlify dashboard → Site settings → Identity
2. Click "Enable Identity"
3. Registration: "Invite only"
4. Services → Git Gateway → "Enable"

### 3. Create Admin User
1. Identity tab → "Invite users"
2. Enter your email
3. Accept invitation email
4. Set password

### 4. Access CMS
Visit: `https://rcmuller25.github.io/admin/`

## Files Reference

### New Files
- `admin/index.html` - CMS interface
- `admin/config.yml` - CMS configuration
- `netlify.toml` - Netlify config
- `content/clients/*.md` - Client data
- `content/projects/*.md` - Project data
- `content/invoices/*.md` - Invoice data
- `CMS-SETUP.md` - Detailed setup guide
- `SETUP-NOTES.md` - This file

### Modified Files
- `index.html` - Added Netlify Forms attributes and Identity widget
- `.gitignore` - Added ignore patterns

### Existing Files (Unchanged)
- `admin-panel.html` - Local admin tool (separate from CMS)
- `styles.css` - Site styles
- `script.js` - Site JavaScript
- `assets/` - Project images

## Key Features

### Client Management
- Add/edit/delete clients
- Track contact information
- Mark clients as active/inactive
- Add notes for each client

### Project Management
- Link projects to clients (dropdown)
- Track project status (planning → development → honey-period → retainer → completed)
- Set support periods (months)
- Upload project images
- Add tags and descriptions
- Publish/unpublish projects

### Invoice Management
- Link invoices to clients (dropdown)
- Track amounts and dates
- Status tracking (draft → sent → paid/overdue)
- Add descriptions and notes
- Unique invoice numbers

### Form Submissions
- All contact form submissions in Netlify dashboard
- Spam protection included
- Can export submissions
- Email notification options

## Admin Panel vs CMS

**admin-panel.html (Local Tool):**
- Runs in browser only
- Data not saved (memory only)
- No authentication
- Good for testing/mockups

**Decap CMS (Production Tool):**
- Web-based, accessible anywhere
- Data saved to Git
- Requires authentication
- Version controlled
- Auto-deploys changes

## Notes

- CMS uses markdown files for data storage
- All data is version controlled in Git
- No database or backend needed
- Changes trigger automatic deployments
- Client relationships work via dropdown selects
- Invoice numbers must be unique
- All dates stored in ISO format

## What's Next

After deployment:
1. Test form submissions
2. Add more clients/projects/invoices via CMS
3. Collect testimonials
4. Update site settings as needed
5. Monitor form submissions in Netlify dashboard

## Support

- Decap CMS docs: https://decapcms.org/docs/
- Netlify Forms docs: https://docs.netlify.com/forms/
- Netlify Identity docs: https://docs.netlify.com/visitor-access/identity/
