# Decap CMS Setup Guide

Your portfolio now includes Decap CMS (formerly Netlify CMS) for managing clients, projects, invoices, and testimonials.

## What's Included

### Collections You Can Manage:

1. **Clients** - Manage your client database
   - Business name, contact person, email, phone
   - Address and notes
   - Active/inactive status

2. **Projects** - Manage portfolio projects
   - Project details and descriptions
   - Link to clients (auto-populated from Clients collection)
   - Project status (planning, development, honey-period, retainer, completed)
   - Support period tracking
   - Images and tags

3. **Invoices** - Track invoicing
   - Invoice numbers and amounts
   - Link to clients
   - Status tracking (draft, sent, paid, overdue)
   - Due dates and descriptions

4. **Testimonials** - Collect client feedback
   - Client testimonials with ratings
   - Publish/unpublish control

5. **Site Settings** - Update site configuration
   - Contact information
   - Social media links

## Setup Steps

### 1. Deploy to Netlify

```bash
git add .
git commit -m "Add Decap CMS setup"
git push
```

### 2. Enable Netlify Identity

1. Go to your Netlify dashboard
2. Select your site (rcmuller25.github.io)
3. Go to **Site settings** → **Identity**
4. Click **Enable Identity**
5. Under **Registration preferences**, select **Invite only**
6. Under **Services** → **Git Gateway**, click **Enable Git Gateway**

### 3. Invite Yourself

1. In Netlify dashboard, go to **Identity** tab
2. Click **Invite users**
3. Enter your email address
4. Check your email and accept the invitation
5. Set your password

### 4. Access the CMS

Visit: `https://rcmuller25.github.io/admin/`

Login with your Netlify Identity credentials.

## Using the CMS

### Managing Clients

1. Click **Clients** in the sidebar
2. Click **New Clients** to add a client
3. Fill in business details
4. Save and publish

### Creating Invoices

1. Click **Invoices** in the sidebar
2. Click **New Invoices**
3. Select client from dropdown (populated from Clients collection)
4. Enter invoice details
5. Set status (draft/sent/paid/overdue)
6. Save

### Managing Projects

1. Click **Projects** in the sidebar
2. Click **New Projects**
3. Select client from dropdown
4. Upload project image
5. Set project type (featured/client/personal)
6. Set status and support period
7. Save and publish

### Netlify Forms

Your contact form is now connected to Netlify Forms. View submissions:

1. Go to Netlify dashboard
2. Click **Forms** tab
3. View all contact form submissions
4. Set up email notifications in Form settings

## File Structure

```
content/
├── clients/          # Client data (markdown files)
├── projects/         # Project data (markdown files)
├── invoices/         # Invoice data (markdown files)
├── testimonials/     # Testimonial data (markdown files)
└── settings/         # Site settings (JSON)

admin/
├── config.yml        # CMS configuration
└── index.html        # CMS interface
```

## Notes

- All changes made in the CMS are committed directly to your GitHub repository
- Changes trigger automatic Netlify deployments
- The CMS uses markdown files for data storage (Git-based CMS)
- No database needed - everything is version controlled
- The admin-panel.html is a separate local tool for offline management

## Differences: admin-panel.html vs Decap CMS

**admin-panel.html:**
- Local HTML file with JavaScript
- Data stored in browser memory (not persistent)
- Good for quick mockups and testing
- No authentication needed

**Decap CMS:**
- Web-based, accessible from anywhere
- Data stored in Git (persistent)
- Requires Netlify Identity authentication
- Changes are version controlled
- Automatic deployments on save

Use Decap CMS for actual client/invoice management. Keep admin-panel.html as a reference or local tool.
