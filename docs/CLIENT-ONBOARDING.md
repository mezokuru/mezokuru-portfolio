# Client Onboarding Process - Mezokuru

## The Domain Problem (Why Clients Must Buy Their Own)

### What Went Wrong: Eagle Homes Case Study

**The Mistake:**
- I bought domain on Afrihost for client
- Built website over 3 weeks
- Tried to transfer domain to client
- Afrihost blocked transfer: "not in service long enough", "not enough payments"
- Client couldn't take ownership
- I couldn't afford ongoing costs
- **Website went down**

**The Lesson:**
- Never buy domains for clients
- SA vendors (Afrihost, Xneelo, etc.) make transfers difficult
- Transfer locks, payment requirements, waiting periods
- You get stuck paying or site goes down

---

## New Process: Client Buys Domain

### Step 1: Domain Purchase (Client's Responsibility)

**Before any work starts:**

1. Client chooses domain name
2. Client purchases domain themselves
3. Client provides login credentials (read-only access)

**Recommended Registrars:**
- **Xneelo** (formerly Hetzner) - R 199/year (.co.za)
- **Afrihost** - R 199/year (.co.za)
- **Namecheap** - $10/year (.com)
- **Google Domains** - Easy transfers

**Email to Client:**

```
Hi [Client Name],

Before we start building your website, you'll need to purchase your domain name.

Domain Name: [suggested-domain.co.za]

Where to buy:
- Xneelo.co.za (R 199/year for .co.za)
- Afrihost.co.za (R 199/year for .co.za)

Why you buy it:
- You own it from day one
- No transfer hassles later
- You control renewals
- Simpler for everyone

Once purchased, please send me:
1. Domain name
2. Login details (I'll only configure DNS, won't change anything else)

Let me know once it's done and we can start building!

Cheers,
[Your Name]
```

---

## Step 2: Hosting Setup (You Handle This)

**Two Options:**

### Option A: Client Pays Hosting Directly (Recommended for Long-term)

**Pros:**
- Client owns everything
- No transfer issues
- They pay renewals directly

**Cons:**
- More setup for client
- Need their payment details

**Process:**
1. Client creates Netlify/Vercel account
2. You get added as collaborator
3. You deploy site
4. Client pays hosting bills

### Option B: You Include Hosting in Quote (Current Method)

**Pros:**
- Simpler for client
- You control deployment
- Included in your pricing

**Cons:**
- You're responsible for renewals
- Need to invoice annually
- Risk of non-payment

**Process:**
1. You deploy on your Netlify/Vercel
2. Connect to their domain
3. Invoice them annually for hosting
4. If they don't pay, site goes down (their problem)

---

## Step 3: DNS Configuration

**You handle this part:**

1. Client gives you domain registrar login
2. You configure DNS records:
   ```
   Type: A
   Name: @
   Value: [Netlify IP]
   
   Type: CNAME
   Name: www
   Value: [your-site].netlify.app
   ```
3. SSL auto-configures (Netlify/Vercel handles this)
4. Site goes live

**Important:** Only touch DNS settings, nothing else in their account.

---

## Step 4: Handover

**What Client Gets:**
- Website files (GitHub repo or ZIP)
- Admin access (if CMS)
- Documentation
- Support for 6 months

**What Client Owns:**
- Domain (they bought it)
- Content (their photos, text)
- Code (you built it, they own it)

**What You Control (During Support Period):**
- Hosting account (if Option B)
- Deployment access
- Technical updates

---

## Email Templates

### 1. Initial Onboarding Email

```
Subject: Let's Get Started - [Project Name]

Hi [Client Name],

Excited to start building your website! Here's what we need to kick things off:

STEP 1: Domain Name (You purchase this)
- Choose your domain: [suggestion].co.za
- Buy it from: Xneelo.co.za or Afrihost.co.za (R 199/year)
- Send me the login details once purchased

STEP 2: Content
- Logo (if you have one)
- Photos for gallery
- Text for About/Services pages
- Contact information

STEP 3: Payment
- 75% deposit: R [amount]
- Bank details: [your details]
- Reference: [PROJECT-NAME]

Once I receive the deposit and domain details, I'll start building!

Timeline: 2-3 weeks from deposit

Questions? Just reply to this email.

Cheers,
[Your Name]
Mezokuru
mezokuru@gmail.com
+27 65 666 7826
```

### 2. Domain Purchase Reminder

```
Subject: Quick Reminder - Domain Purchase

Hi [Client Name],

Just a friendly reminder to purchase your domain name so we can get started!

Domain: [suggested-domain.co.za]
Where: Xneelo.co.za or Afrihost.co.za
Cost: R 199/year

Why you buy it:
✓ You own it from day one
✓ No transfer complications later
✓ You control renewals

Once purchased, send me the login details and we're good to go!

Cheers,
[Your Name]
```

### 3. Handover Email

```
Subject: [Project Name] - Website Complete!

Hi [Client Name],

Your website is complete and live! 🎉

Website: https://[domain].co.za

WHAT YOU HAVE:
✓ Fully functional website
✓ Mobile responsive
✓ SSL certificate (secure)
✓ 6 months support included

YOUR LOGINS:
- Domain: [registrar] (you already have this)
- Hosting: [if applicable]
- Admin Panel: [if applicable]

SUPPORT PERIOD:
- 6 months of free updates, bug fixes, and technical support
- After that: R 350/month retainer (optional)

RENEWALS:
- Domain: Renews automatically with [registrar] (R 199/year)
- Hosting: [if applicable] I'll invoice you annually

Need changes or have questions? Just email me!

Cheers,
[Your Name]
```

---

## Red Flags to Avoid

### ❌ DON'T:
- Buy domains for clients
- Use your personal accounts for client sites
- Promise "free hosting forever"
- Give clients access to your hosting account
- Forget to document who owns what

### ✅ DO:
- Make clients buy their own domains
- Keep hosting separate (your account or theirs)
- Document everything in writing
- Set clear renewal expectations
- Have exit strategy (what happens if they don't pay)

---

## Hosting Renewal Strategy

### Year 1: Included in Quote
- Hosting covered by initial payment
- No surprises for client

### Year 2+: Annual Invoice

**Option 1: Auto-renew and invoice**
- You pay hosting
- Invoice client R 2,000 annually
- If they don't pay, site goes down after 30 days

**Option 2: Transfer to their account**
- Help them set up Netlify/Vercel account
- Transfer site ownership
- They pay directly going forward
- You lose control but also lose liability

**Recommended:** Option 2 after first year. Clean break, no ongoing hassle.

---

## The Eagle Homes Fix (If It Happens Again)

**If you're stuck with a domain you bought:**

1. **Immediate:** Contact client, explain situation
2. **Option A:** Client pays you for domain + transfer fee, you transfer when possible
3. **Option B:** Client buys new domain, you migrate site, old domain expires
4. **Option C:** You keep paying until transfer is possible (not ideal)

**Prevention:** Never buy domains for clients again.

---

## Client Onboarding Checklist

**Before Starting Work:**
- [ ] Quotation accepted and signed
- [ ] 75% deposit received
- [ ] Client purchased domain
- [ ] Domain login details received
- [ ] Content received (logo, photos, text)
- [ ] Project timeline agreed

**During Development:**
- [ ] Regular updates to client
- [ ] Staging site for review
- [ ] Revisions completed

**Before Launch:**
- [ ] Final 25% payment received
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Client testing completed

**After Launch:**
- [ ] Handover email sent
- [ ] Logins provided
- [ ] Documentation delivered
- [ ] Support period starts

---

## Summary

**The Rule:** Client buys domain, you handle everything else.

**Why:** Avoids transfer nightmares, ownership issues, and sites going down.

**How:** Clear communication upfront, make it part of the process.

**Result:** Professional, clean handovers with no drama.

---

## Quick Reference

**Domain:** Client buys (R 199/year)  
**Hosting:** You include in quote (Year 1)  
**Renewals:** Invoice annually or transfer ownership  
**Support:** 6 months included, then R 350/month  
**Handover:** Clean, documented, no loose ends  

**Never again:** Buy domains for clients. Ever.
