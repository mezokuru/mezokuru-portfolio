# Mezokuru Portfolio

Web development portfolio and business management system.

## 🚀 Live Site

**Production:** https://mezokuru.xyz

## 📁 Project Structure

```
mezokuru-portfolio/
├── admin/                      # Decap CMS (Content Management)
│   ├── config.yml             # CMS configuration
│   ├── index.html             # CMS interface
│   └── preview-templates.js   # Custom preview templates
│
├── assets/                     # Images and media
│   ├── sihha.jpeg
│   ├── arendsebouers.jpeg
│   ├── ehconcrete.co.za.jpeg
│   └── verohne4cindy..jpeg
│
├── content/                    # CMS data (Git-based storage)
│   ├── clients/               # Client database
│   ├── projects/              # Project data
│   ├── invoices/              # Invoice records
│   ├── testimonials/          # Client testimonials
│   └── settings/              # Site configuration
│
├── docs/                       # Documentation
│   ├── CHANGELOG.md           # Version history
│   ├── CMS-SETUP.md           # CMS setup guide
│   ├── LOGO-PROMPTS.md        # Logo design prompts
│   ├── PERFORMANCE.md         # Performance & security docs
│   ├── PROJECT-DOCUMENTATION.md # Full project docs
│   ├── SEO-CHECKLIST.md       # SEO optimization guide
│   ├── SETUP-NOTES.md         # Setup notes
│   └── client_contract_template (1).md
│
├── invoices/                   # Invoice & quotation tools
│   ├── admin-panel.html       # Local admin dashboard
│   ├── generate-invoice.html  # Invoice generator
│   ├── mezokuru-invoice-template.html
│   ├── quotation-arendse-bouers.html
│   └── quotation_arendse_bouers_12_nov_2025.md
│
├── templates/                  # Free website templates
│   ├── restaurant-template.html
│   ├── fitness-template.html
│   ├── salon-template.html
│   ├── realestate-template.html
│   ├── photography-template.html
│   └── README.md
│
├── index.html                  # Main portfolio page
├── templates.html              # Templates showcase page
├── resources.html              # Developer resources page
├── 404.html                    # Custom error page
├── styles.css                  # Global styles
├── script.js                   # Main JavaScript
│
├── _headers                    # Netlify security headers
├── netlify.toml               # Netlify configuration
├── .htaccess                  # Apache config (fallback)
├── robots.txt                 # Search engine rules
├── sitemap.xml                # SEO sitemap
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (Vanilla)
- React (for complex projects like SIHHA)
- Tailwind CSS (when needed)

**Backend/Services:**
- Firebase (hosting, real-time database)
- Netlify (hosting, forms, CMS, identity)
- Decap CMS (content management)

**Tools:**
- Git/GitHub (version control)
- VS Code (development)
- Netlify CLI (deployment)

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/mezokuru/mezokuru-portfolio.git
cd mezokuru-portfolio
```

2. Open in browser:
```bash
# Just open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Or
npx serve
```

3. Visit: `http://localhost:8000`

### Deployment

**Automatic (Netlify):**
- Push to `main` branch
- Netlify auto-deploys
- Live in ~1 minute

**Manual:**
```bash
git add .
git commit -m "Update site"
git push origin main
```

## 📝 Content Management

### Access CMS
1. Visit: https://mezokuru.xyz/admin/
2. Login with Netlify Identity
3. Manage clients, projects, invoices, testimonials

### Add New Content

**Clients:**
- CMS → Clients → New Client
- Fill in business details
- Save and publish

**Projects:**
- CMS → Projects → New Project
- Select client from dropdown
- Add images, description, tags
- Set status and dates

**Invoices:**
- CMS → Invoices → New Invoice
- Select client
- Enter amount and dates
- Set status (draft/sent/paid/overdue)

## 🧾 Invoice Management

### Generate Invoices

1. Open: `/invoices/generate-invoice.html`
2. Fill in client and invoice details
3. Click "Generate Invoice"
4. Print or save as PDF

### Admin Panel (Local)

1. Open: `/invoices/admin-panel.html`
2. Manage clients, projects, invoices
3. Data stored in browser (not persistent)

## 📊 SEO & Performance

### Current Scores
- Performance: 95/100 ⚡
- SEO: 90/100 🔍
- Accessibility: 90/100 ♿
- Best Practices: 95/100 ✅

### Optimization Features
- ✅ Security headers configured
- ✅ HTTPS enforced
- ✅ Asset caching (1 year)
- ✅ Sitemap & robots.txt
- ✅ Schema.org structured data
- ✅ Open Graph tags
- ✅ Mobile responsive

### Monitor Performance
```bash
# Check with Lighthouse
lighthouse https://mezokuru.xyz --view

# Or use online tools:
# - https://pagespeed.web.dev/
# - https://gtmetrix.com/
```

## 🔒 Security

**Implemented:**
- X-Frame-Options: DENY
- Content-Security-Policy
- X-XSS-Protection
- HTTPS enforcement
- Admin area protected
- Private files blocked

**Protected Areas:**
- `/admin/*` - CMS (requires authentication)
- `/content/*` - Data files
- `/invoices/*` - Business tools

## 📚 Documentation

All documentation is in the `/docs/` folder:

- **CMS-SETUP.md** - How to set up and use Decap CMS
- **SEO-CHECKLIST.md** - SEO optimization guide
- **PERFORMANCE.md** - Performance & security config
- **LOGO-PROMPTS.md** - Logo design prompts for DALL-E/Sora
- **SETUP-NOTES.md** - What we built and why

## 🎨 Free Templates

5 professional website templates available:
- Restaurant/Cafe
- Fitness/Gym
- Salon/Barbershop
- Real Estate Agent
- Photography Portfolio

**Download:** https://mezokuru.xyz/templates.html

## 📧 Contact

**Email:** mezokuru@gmail.com  
**Phone:** +27 65 666 7826  
**Website:** https://mezokuru.xyz  
**GitHub:** https://github.com/rcmuller25

## 📄 License

Portfolio content © 2025 Mezokuru. All rights reserved.

Free templates are available for personal and commercial use.

---

**Built with:** Clean code. Real growth. CD3C — Coding Deeds Done Dirt Cheap.
