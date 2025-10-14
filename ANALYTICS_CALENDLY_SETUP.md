# Google Analytics & Calendly Setup Guide
## Critical Setup for Client Acquisition

---

# 🔍 PART 1: Google Analytics Setup

## Why You Need This NOW

From your playbook success metrics:
- **Track conversion rate:** 8%+ of visitors should book calls
- **Measure engagement:** 2+ minutes on site, 75% scroll depth
- **Optimize what works:** Which sections get most interaction
- **Prove ROI:** Show outreach effectiveness

---

## Step 1: Create GA4 Account (5 minutes)

1. Go to https://analytics.google.com
2. Click **"Start measuring"**
3. **Account setup:**
   - Account name: `JoshMacaraig Agency`
   - Check all data sharing settings (helps with benchmarks)
   - Click "Next"

4. **Property setup:**
   - Property name: `joshmacaraig.com`
   - Time zone: `Asia/Manila` (or your location)
   - Currency: `USD`
   - Click "Next"

5. **Business details:**
   - Industry: `Technology`
   - Business size: `Small (1-10)`
   - Click "Next"

6. **Business objectives:**
   - Select: `Generate leads`
   - Click "Create"

7. **Accept Terms of Service**

---

## Step 2: Get Your Measurement ID

1. After creating property, you'll see **"Web"** option
2. Click **"Web"**
3. **Set up data stream:**
   - Website URL: `https://joshmacaraig.com` (or your actual domain)
   - Stream name: `Main Website`
   - Click "Create stream"

4. **Copy your Measurement ID**
   - Format: `G-XXXXXXXXXX`
   - Save this somewhere safe

---

## Step 3: Add to Your Website

✅ **I've already added the code template to your site!**

**File:** `/public/index.html`

**What you need to do:**
1. Open `/public/index.html`
2. Find this line: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>`
3. Replace **BOTH** instances of `G-XXXXXXXXXX` with your actual Measurement ID
4. Save the file

**Example:**
```html
<!-- Before -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- After (with your real ID) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC123XYZ');
</script>
```

---

## Step 4: Verify It's Working

1. Deploy your site (or run `npm start`)
2. Visit your site in a browser
3. In GA4, go to **Reports** → **Realtime**
4. You should see yourself as an active user
5. If not, wait 5 minutes and refresh

---

## Step 5: Set Up Custom Events (Important!)

Track specific actions that matter:

### In GA4 Dashboard:

1. Go to **Configure** → **Events**
2. Click **"Create event"**
3. Create these events:

#### Event 1: CTA Clicks
- Event name: `cta_click`
- Matching conditions:
  - Parameter: `event_name`
  - Operator: `equals`
  - Value: `click`
  - AND
  - Parameter: `link_url`
  - Operator: `contains`
  - Value: `calendly.com`

#### Event 2: Section Views
- Event name: `section_view`
- Matching conditions:
  - Parameter: `event_name`
  - Operator: `equals`
  - Value: `scroll`
  - AND
  - Parameter: `percent_scrolled`
  - Operator: `greater than`
  - Value: `75`

---

## Step 6: Key Metrics to Monitor

### Daily (First 2 Weeks):
- **Users:** How many people visit
- **Sessions:** How many browsing sessions
- **Bounce rate:** % who leave immediately (target: <60%)
- **Average engagement time:** Target 2+ minutes

### Weekly:
- **Top pages:** Which pages get most views
- **Traffic sources:** Where visitors come from (Twitter, LinkedIn, Reddit)
- **Events:** How many CTA clicks
- **Conversions:** Calendly bookings (if integrated)

### Key Reports to Check:

1. **Realtime:** See who's on your site right now
2. **Acquisition** → **Traffic acquisition:** Where users come from
3. **Engagement** → **Pages and screens:** Most viewed pages
4. **Engagement** → **Events:** CTA clicks, scrolls

---

# 📅 PART 2: Calendly Setup

## Why This Matters

Your entire funnel leads to Calendly. If it's not optimized, you lose clients even after they decide to book.

---

## Step 1: Create Event Type (The "MVP Audit")

1. Log into Calendly
2. Click **"+ Create"** → **"Event Type"**
3. **Event name:** `Free MVP Strategy Audit`
   - Not "consultation" (sounds salesy)
   - Not "discovery call" (sounds like work)
   - "Audit" = value + expertise

4. **Location:**
   - Select: `Zoom` or `Google Meet`
   - Set up integration if needed

5. **Duration:** `15 minutes`
   - Short enough to book easily
   - Long enough to qualify
   - Stick to 15 mins max

6. **Description/Instructions:**

```
🚀 FREE 15-Minute MVP Strategy Audit

In this call, we'll:
✅ Review your MVP idea and goals
✅ Identify the fastest path to launch
✅ Discuss realistic timeline and cost
✅ Answer your questions (no pitch)

What to prepare:
• Brief description of your MVP (1-2 sentences)
• Your target launch date (if any)
• Rough budget range

This is a strategy session, not a sales call. Even if we don't work together, you'll leave with actionable insights.
```

---

## Step 2: Availability Settings

### **Buffer Times:**
- Before event: `15 minutes`
- After event: `15 minutes`
- Why: Gives you prep time and breathing room

### **Meeting Hours:**
- **Best practice:** Limited hours = scarcity
- Example: Monday-Friday, 9am-12pm, 2pm-5pm (your timezone)
- Block out: Early mornings, late evenings, weekends

### **Date Range:**
- **Rolling:** 60 days into future
- Shows you're busy but available
- Creates slight urgency

### **Scheduling Conditions:**
- Minimum notice: `4 hours` (prevents last-minute chaos)
- Maximum per day: `3 calls` (quality over quantity)
- Time increment: `15 minutes`

---

## Step 3: Booking Questions

**Keep it SHORT.** Only ask what you need.

### Required Questions:

1. **What's your name?** (First & Last Name)
   - Field type: Text

2. **Email address**
   - Auto-collected by Calendly

3. **Best number to reach you (optional)**
   - Field type: Phone number
   - Optional: Yes
   - Why: Backup if they miss the call

4. **Tell me about your MVP idea (2-3 sentences)**
   - Field type: Multi-line text
   - Required: Yes
   - Why: Pre-qualifies leads, lets you prepare

5. **What's your timeline?**
   - Field type: Multiple choice
   - Options:
     - ASAP (within 2 weeks)
     - 1 month
     - 2-3 months
     - Just exploring
   - Why: Prioritize hot leads

6. **Budget range?**
   - Field type: Multiple choice
   - Options:
     - Under $1,500
     - $1,500 - $3,000
     - $3,000 - $5,000
     - $5,000+
     - Not sure yet
   - Why: Qualify fit with your packages

### ❌ DON'T Ask:
- Company size
- How they found you (track with UTM instead)
- Long questionnaires (kills conversion)

---

## Step 4: Email Confirmations

### Confirmation Email (Auto-sent):

**Subject:** "Your MVP Audit is Confirmed - Next Steps"

**Body:**
```
Hi {Name},

Your 15-minute MVP Strategy Audit is confirmed!

📅 {Date & Time}
🔗 {Zoom/Meet Link}

To make the most of our time:
1. Think about your MVP's core feature (the ONE thing it must do)
2. Have a rough timeline in mind
3. Know your approximate budget

No need to prepare a deck or formal presentation—this is a casual strategy chat.

Looking forward to it!

Josh Macaraig
WeWeb + Xano Developer
{Your email}

P.S. Can't make it? You can reschedule anytime using this link: {Reschedule Link}
```

### Reminder Email (1 day before):

**Subject:** "Tomorrow: Your MVP Audit with Josh"

**Body:**
```
Hi {Name},

Quick reminder about our call tomorrow:

📅 {Date & Time}
🔗 {Zoom/Meet Link}

I've reviewed your project idea: "{Their MVP description}"

See you tomorrow!
Josh
```

---

## Step 5: Post-Booking Experience

### Thank You Page:

After booking, redirect to a custom thank you page with:

1. **Confirmation message:**
   "✅ You're all set! Check your email for details."

2. **What to expect:**
   - "I'll review your project before our call"
   - "We'll discuss the fastest path to launch"
   - "No pressure to work together"

3. **Optional:**
   - Link to your demo project
   - Link to a relevant case study
   - "While you wait, check out how I built this MVP in 48 hours →"

---

## Step 6: Calendly Settings Checklist

Go through these settings:

### General:
- [ ] Profile photo uploaded (professional headshot)
- [ ] Time zone set correctly
- [ ] Calendar connected (Google Calendar, etc.)

### Notifications:
- [ ] Email notifications ON for bookings
- [ ] SMS notifications (if available) ON
- [ ] Slack notifications (optional, if you use it)

### Integrations:
- [ ] Zoom or Google Meet connected
- [ ] Calendar sync enabled
- [ ] Optional: Zapier for CRM (later)

### Branding:
- [ ] Add your logo (if you have one)
- [ ] Brand color: `#3b82f6` (matches your site)
- [ ] Remove "Powered by Calendly" (paid plan only)

---

## Step 7: Test Your Booking Flow

**Before going live:**

1. **Book a test call** (use a friend's email)
2. **Check the emails:**
   - Does confirmation email look good?
   - Does reminder email arrive?
   - Are links working?
3. **Check the calendar:**
   - Does event show in your calendar?
   - Is the Zoom/Meet link generated?
4. **Test the meeting:**
   - Join the Zoom/Meet 5 mins early
   - Make sure audio/video works

---

# 🎯 PART 3: Tracking Calendly Bookings in GA4

Want to track how many bookings you get? Here's how:

## Option 1: Manual Event Tracking (Simple)

In GA4:
1. Go to **Reports** → **Engagement** → **Events**
2. Check for `page_view` events
3. Filter by page: `/scheduled` or `/confirmed`
4. Count = bookings

## Option 2: Custom Event (Better)

Add this to your Calendly "Event Scheduled" webhook:

```javascript
// This fires when someone books
gtag('event', 'generate_lead', {
  'event_category': 'calendly',
  'event_label': 'MVP Audit Booked',
  'value': 2500
});
```

---

# 📊 What to Track Weekly

## Week 1-4 Checklist:

| Metric | Where to Find | Target |
|--------|---------------|--------|
| **Total Visitors** | GA4 → Reports → Users | 100+ |
| **Calendly Views** | Calendly Dashboard | 10+ |
| **Bookings** | Calendly Dashboard | 1-3 |
| **Conversion Rate** | Bookings ÷ Visitors | 1-3% (grow to 8%) |
| **Avg. Time on Site** | GA4 → Engagement | 2+ minutes |
| **Traffic Sources** | GA4 → Acquisition | Note top 3 |

---

# 🚨 Common Mistakes to Avoid

## Google Analytics:
- ❌ Not replacing `G-XXXXXXXXXX` with real ID
- ❌ Forgetting to deploy after adding code
- ❌ Not checking Realtime to verify it works
- ❌ Ignoring data for weeks (check weekly!)

## Calendly:
- ❌ Too many questions (kills conversion)
- ❌ Too many availability slots (looks desperate)
- ❌ No buffer time (burnout + bad calls)
- ❌ Generic confirmation emails
- ❌ Not preparing before calls

---

# 🎯 Your Action Plan (Do Today)

## Step 1: Google Analytics (15 mins)
1. [ ] Create GA4 account
2. [ ] Get Measurement ID
3. [ ] Replace `G-XXXXXXXXXX` in index.html
4. [ ] Deploy site
5. [ ] Verify in Realtime

## Step 2: Calendly (30 mins)
1. [ ] Create "Free MVP Strategy Audit" event
2. [ ] Set availability (limited hours)
3. [ ] Add 6 booking questions
4. [ ] Customize confirmation email
5. [ ] Test booking flow

## Step 3: Integration (5 mins)
1. [ ] Make sure Calendly link in personal.js is correct
2. [ ] Test "Book audit" buttons on site
3. [ ] Verify they open Calendly

---

# 📈 Expected Results

## Week 1:
- 20-50 visitors (if you start outreach)
- 0-1 bookings (normal at start)
- Learn what traffic sources work

## Week 2-4:
- 100+ visitors (with consistent outreach)
- 2-4 bookings (as you optimize)
- Identify best-performing content

## Month 2+:
- 200+ visitors
- 8-10 bookings (8-10% conversion)
- 2-3 closed clients

---

# 💡 Pro Tips

## For GA4:
- Check it DAILY for first week (build the habit)
- Look at "Realtime" when you share your site on social
- Use UTM parameters in outreach emails: `?utm_source=twitter&utm_campaign=launch`

## For Calendly:
- Block "focus time" in your calendar (Calendly respects it)
- Review booking questions before each call
- Use a consistent meeting link (people can bookmark it)
- Update availability weekly based on demand

---

# 🔗 Quick Links

- **Google Analytics:** https://analytics.google.com
- **Calendly:** https://calendly.com
- **UTM Builder:** https://ga-dev-tools.google/campaign-url-builder/
- **Your Calendly Link:** Update in `/src/data/personal.js`

---

# ❓ FAQ

**Q: Do I need Calendly Pro?**
A: Not yet. Free plan works for <100 bookings/month. Upgrade when you hit 5+ bookings/week.

**Q: Should I track every click?**
A: No. Focus on: visits, time on site, CTA clicks, bookings. That's it.

**Q: What if no one books in Week 1?**
A: Normal! Focus on getting traffic first (outreach). Bookings lag behind visits.

**Q: How often should I check GA?**
A: Daily for first 2 weeks (learn patterns), then weekly.

**Q: Should I ask for LinkedIn/Twitter in Calendly?**
A: No. Keep it minimal. You can look them up after they book.

---

**Setup both TODAY. You can't optimize what you don't measure.** 📊

---

**Status:** Ready to implement  
**Time required:** 45 minutes total  
**Priority:** 🔥 CRITICAL
