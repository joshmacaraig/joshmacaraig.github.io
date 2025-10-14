# Calendly Setup - Step-by-Step Walkthrough
## Follow this guide to set up your booking system

---

## 🎯 **Step 1: Create Your Event Type**

1. **Log into Calendly:** https://calendly.com
2. Click **"+ Create"** → **"Event Type"**
3. Select **"One-on-One"**

---

## 📝 **Step 2: Event Details**

### **Event Name:**
```
Free MVP Strategy Audit
```
**Why this name:**
- "Free" = removes barrier
- "Strategy" = sounds valuable
- "Audit" = positions you as expert
- NOT "consultation" (sounds salesy)

### **Location:**
Select one:
- ☑️ **Zoom** (recommended - professional)
- ☑️ **Google Meet** (if you prefer)
- ☐ Phone call (less professional)

**Make sure to connect your Zoom/Meet account!**

### **Duration:**
```
15 minutes
```
**Why 15 mins:**
- Short enough people will book easily
- Long enough to qualify them
- Shows you respect their time

### **Event Color:**
Pick blue (matches your site branding)

---

## 📅 **Step 3: Availability Settings**

### **When can people book?**

**Date Range:**
- Select: **"60 calendar days into the future"**
- Creates healthy urgency without seeming desperate

**Available Hours:**
- **Monday-Friday:** 
  - Morning: 9:00 AM - 12:00 PM
  - Afternoon: 2:00 PM - 5:00 PM
- **Saturday-Sunday:** Unavailable

**Why limited hours:**
- Shows you're in demand
- Protects your time
- Better quality calls

### **Buffer Times:**
```
Before event: 15 minutes
After event: 15 minutes
```
**Why:** Gives you time to prep, review their answers, and decompress.

### **Scheduling Conditions:**
```
Minimum notice: 4 hours
Maximum per day: 3 events
```
**Why:**
- 4 hours = prevents last-minute chaos
- 3 per day = quality over quantity

---

## ❓ **Step 4: Booking Questions (CRITICAL)**

**Click "Add Questions"** and add these **6 questions only:**

### **Question 1:**
- **Question:** "What's your name?"
- **Type:** Name (First & Last)
- **Required:** Yes

### **Question 2:**
- **Question:** "What's your email?"
- **Type:** Email
- **Required:** Yes
- *(Auto-collected by Calendly)*

### **Question 3:**
- **Question:** "Best phone number (optional - backup if call drops)"
- **Type:** Phone Number
- **Required:** No
- **Why optional:** Don't want to create barrier, but nice to have

### **Question 4:** ⭐ MOST IMPORTANT
- **Question:** "Tell me about your MVP idea (2-3 sentences)"
- **Type:** Multi-line text
- **Required:** Yes
- **Placeholder text:** "Example: A marketplace connecting freelance designers with startups. Target launch in 2 months. Need help building the booking system and payment flow."

**Why this matters:** Pre-qualifies leads, lets you prepare for the call

### **Question 5:**
- **Question:** "What's your timeline?"
- **Type:** Radio buttons (single choice)
- **Required:** Yes
- **Options:**
  - ASAP (within 2 weeks)
  - Within 1 month
  - 2-3 months
  - Just exploring for now

**Why:** Helps you prioritize hot leads

### **Question 6:**
- **Question:** "What's your budget range?"
- **Type:** Radio buttons (single choice)
- **Required:** Yes
- **Options:**
  - Under $1,500
  - $1,500 - $3,000
  - $3,000 - $5,000
  - $5,000+
  - Not sure yet / need guidance

**Why:** Qualifies if they're a fit for your packages

---

## ✉️ **Step 5: Email Notifications**

### **Confirmation Email (Invitee)**

Click **"Customize"** under Confirmation Email

**Subject:**
```
Your MVP Audit is Confirmed ✅
```

**Email Body:**
```
Hi {INVITEE_NAME},

Your 15-minute MVP Strategy Audit is confirmed! 🚀

📅 {EVENT_TIME}
🔗 {LOCATION}

**To make the most of our time:**
• Think about your MVP's ONE core feature (what must it do?)
• Have a rough timeline in mind
• Know your approximate budget range

No need to prepare a deck or formal presentation—this is a casual strategy chat where I'll give you honest feedback on the fastest path to launch.

Looking forward to meeting you!

Josh Macaraig
WeWeb + Xano Developer
bajejosh@gmail.com

P.S. Can't make it? You can reschedule anytime: {RESCHEDULE_LINK}
```

### **Reminder Email (1 day before)**

Click **"Email Reminders"** and enable **"1 day before"**

**Custom reminder:**
```
Hi {INVITEE_NAME},

Quick reminder about our MVP Strategy Audit tomorrow:

📅 {EVENT_TIME}
🔗 {LOCATION}

I've reviewed your project idea and have some thoughts to share!

See you tomorrow,
Josh

P.S. Need to reschedule? {RESCHEDULE_LINK}
```

---

## 📧 **Step 6: Your Notification Settings**

**Make sure YOU get notified:**

1. Go to **Account** → **Notifications**
2. Enable these:
   - ☑️ Email notification when someone books
   - ☑️ Email reminder 1 day before event
   - ☑️ Email reminder 1 hour before event
   - ☑️ SMS notifications (if available)

**Why:** Never miss a call, always be prepared

---

## 🔗 **Step 7: Get Your Calendly Link**

1. After creating the event, click **"Copy Link"**
2. Your link will look like: `https://calendly.com/yourname/mvp-audit`
3. **Copy this exact link!**

---

## 💻 **Step 8: Update Your Website**

**Your Calendly link is already in your site!**

Current link in `/src/data/personal.js`:
```javascript
calendly: "https://calendly.com/joshmacaraig/mvp-audit"
```

**If your actual Calendly link is different:**
1. Open `/src/data/personal.js`
2. Find the line: `calendly: "https://calendly.com/joshmacaraig/mvp-audit"`
3. Replace with your actual link
4. Save and redeploy

**If your link matches, you're all set!** ✅

---

## 🧪 **Step 9: Test Your Booking Flow**

**CRITICAL: Test before going live!**

1. **Book a test appointment:**
   - Use a friend's email (or a secondary email you own)
   - Go through the entire booking process
   - Answer all 6 questions

2. **Check the emails:**
   - Did confirmation email arrive?
   - Does it look good?
   - Are all the links working?
   - Is the Zoom/Meet link included?

3. **Check your calendar:**
   - Does the event show in your calendar?
   - Is it at the right time/timezone?
   - Is the Zoom/Meet link generated?

4. **Check your notifications:**
   - Did YOU get notified of the booking?
   - Can you see their answers to the questions?

5. **Test the meeting link:**
   - Join the Zoom/Meet 5 minutes before test time
   - Make sure audio/video works
   - Test screen sharing (you'll need this)

6. **Cancel the test:**
   - Cancel the test appointment after verifying
   - Make sure cancellation email works

---

## 📱 **Step 10: Add to Your Social Profiles**

Once tested, add your Calendly link to:

**Twitter Bio:**
```
WeWeb + Xano Developer | Launch your MVP in 7 days
📅 Book free audit: [your-calendly-link]
```

**LinkedIn Headline:**
```
WeWeb + Xano Developer | Fast MVPs for Indie Hackers
```

**LinkedIn About (first line):**
```
Want to launch your MVP fast? Book a free 15-min strategy audit: [your-calendly-link]
```

---

## 🎯 **Step 11: Prepare for Your First Call**

### **Before Each Call (5 mins):**
1. Read their answers to the 6 questions
2. Quick Google search of their company/product
3. Check their LinkedIn
4. Have notepad ready for notes
5. Have your pricing sheet open

### **During the Call (15 mins):**

**First 2 minutes:**
- "Hey [Name], great to meet you!"
- "I read about your [project] - sounds interesting"
- "Tell me more about [specific detail from their answer]"

**Next 8 minutes:**
- Ask about their ONE core feature
- Discuss timeline and urgency
- Understand their budget constraints
- Share similar projects you've built
- Give honest assessment: "This is definitely doable in [X] days"

**Last 5 minutes:**
- Recommend a package: "Based on what you described, the [Package Name] would be perfect"
- Explain what's included
- Share next steps: "I'll send you a detailed proposal by [date]"
- Ask: "Any questions before we wrap up?"

### **After the Call (10 mins):**
1. Send thank you email within 1 hour
2. Send proposal within 24 hours
3. Add them to your CRM/spreadsheet
4. Set reminder to follow up in 3 days

---

## 📋 **Calendly Settings Checklist**

Go through Calendly settings one more time:

### **Event Type Settings:**
- [ ] Event name: "Free MVP Strategy Audit"
- [ ] Duration: 15 minutes
- [ ] Location: Zoom or Google Meet (connected)
- [ ] Event color: Blue

### **Availability:**
- [ ] Date range: 60 days forward
- [ ] Hours: Mon-Fri, limited slots
- [ ] Buffer: 15 mins before/after
- [ ] Max per day: 3 events
- [ ] Minimum notice: 4 hours

### **Questions:**
- [ ] Name (required)
- [ ] Email (required)
- [ ] Phone (optional)
- [ ] MVP idea (required, multi-line)
- [ ] Timeline (required, radio)
- [ ] Budget (required, radio)

### **Emails:**
- [ ] Confirmation email customized
- [ ] Reminder email (1 day before) enabled
- [ ] Your notifications ON (email + SMS)

### **Calendar:**
- [ ] Google Calendar connected
- [ ] Conflict checks enabled
- [ ] Events appear in your calendar

### **Testing:**
- [ ] Booked test appointment
- [ ] Received confirmation email
- [ ] Event showed in calendar
- [ ] Zoom/Meet link generated
- [ ] Cancelled test successfully

---

## 🚨 **Common Mistakes to Avoid**

### ❌ **Too Many Questions**
- Keep it to 6 questions max
- More questions = lower conversion
- You can learn more on the call

### ❌ **Too Many Availability Slots**
- Don't show 9am-9pm every day
- Looks desperate
- You'll burn out
- Limited slots = higher perceived value

### ❌ **No Buffer Time**
- You need time to prep
- Back-to-back calls = exhaustion
- Quality drops without breaks

### ❌ **Generic Confirmation Emails**
- Customize them!
- Add personality
- Set expectations
- Build excitement

### ❌ **Not Reading Answers Before Call**
- Shows you don't care
- Wastes time on call
- Looks unprofessional

---

## 💡 **Pro Tips**

### **Calendly Pro Tips:**
1. **Block "focus time"** in your calendar - Calendly respects it
2. **Review questions daily** - spot patterns in what people ask
3. **Use routing forms** (paid feature) - different packages = different forms
4. **Add video** to booking page (paid feature) - increases trust

### **Call Quality Tips:**
1. **Always be 2 mins early** - shows respect
2. **Have good lighting** - looks professional
3. **Test audio beforehand** - no technical issues
4. **Take notes** - reference them in proposal
5. **Follow up fast** - strike while iron is hot

### **Conversion Tips:**
1. **Listen more than talk** - 70/30 rule
2. **Ask about pain points** - "What's your biggest challenge?"
3. **Don't pitch** - consult and advise
4. **Be honest** - "This might not be a fit because..."
5. **Clear next steps** - "I'll send proposal by [date]"

---

## 📊 **What to Track**

### **Weekly Calendly Metrics:**
| Metric | Where to Find | Target |
|--------|---------------|--------|
| **Page Views** | Calendly Dashboard | 10+ |
| **Bookings** | Calendly Dashboard | 1-3 (first month) |
| **No-Shows** | Calendly Dashboard | <10% |
| **Conversion** | Calls → Clients | 30%+ |

### **Keep a Spreadsheet:**
- Date of call
- Name
- Project type
- Budget mentioned
- Timeline
- Outcome (quoted, declined, pending)
- Follow-up date

---

## ✅ **Your Calendly Setup Checklist**

Complete these in order:

### **Account Setup (5 mins):**
- [ ] Log into Calendly
- [ ] Connect Google Calendar
- [ ] Connect Zoom or Google Meet
- [ ] Upload profile photo
- [ ] Set timezone

### **Event Creation (10 mins):**
- [ ] Create "Free MVP Strategy Audit" event
- [ ] Set 15-minute duration
- [ ] Configure availability (Mon-Fri, limited hours)
- [ ] Add 15-min buffer before/after
- [ ] Set max 3 per day, 4-hour minimum notice

### **Questions (5 mins):**
- [ ] Add all 6 questions (Name, Email, Phone, MVP idea, Timeline, Budget)
- [ ] Make appropriate ones required
- [ ] Add helpful placeholder text

### **Emails (10 mins):**
- [ ] Customize confirmation email
- [ ] Enable 1-day reminder
- [ ] Test how they look

### **Notifications (2 mins):**
- [ ] Enable email notifications for bookings
- [ ] Enable SMS if available
- [ ] Set reminders for yourself

### **Testing (10 mins):**
- [ ] Book test appointment
- [ ] Verify emails received
- [ ] Check calendar sync
- [ ] Test meeting link
- [ ] Cancel test

### **Website Integration (2 mins):**
- [ ] Copy your Calendly link
- [ ] Verify it's in /src/data/personal.js
- [ ] Test "Book audit" buttons on site
- [ ] Confirm they open Calendly correctly

### **Go Live (1 min):**
- [ ] Share Calendly link on social media
- [ ] Add to email signature
- [ ] Start Week 2 outreach!

---

## 🎉 **You're Ready!**

**Once you complete this checklist:**
- ✅ Your booking system is professional
- ✅ You'll pre-qualify leads automatically
- ✅ You'll save time with automation
- ✅ You can focus on closing clients

---

## 📞 **What Happens Next**

**Week 1-2:**
- Get your first few bookings
- Refine your call process
- Learn what questions come up
- Adjust your pitch

**Week 3-4:**
- More confident on calls
- Better at qualifying
- Higher close rate
- First client signed! 🎉

**Month 2+:**
- Consistent bookings
- Refined process
- High conversion rate
- Multiple clients

---

## 🚀 **Ready to Launch?**

**Your next steps:**
1. ✅ Complete Calendly setup (45 mins)
2. ✅ Test booking flow (10 mins)
3. ✅ Start Week 2 outreach (playbook)
4. ✅ Monitor GA4 + Calendly daily

---

**Everything is set up! Now go get those clients!** 💪

**Questions to think about:**
- What time slots work best for your schedule?
- Which days do you want to block off entirely?
- Do you have Zoom/Meet ready to go?

Let me know when you're done setting it up and I can help test it!
