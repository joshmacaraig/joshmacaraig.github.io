const projects = [
  {
    id: 0,
    title: "Area Operations Dashboard",
    type: "Internal Platform",
    stack: ["React", "WeWeb", "Xano", "Tailwind"],
    description:
      "Command center for area managers to track staff activity, timeclocks, logs, approvals, and operational reports in one place.",
    highlights: [
      "Replaced fragmented tracking across multiple tools and spreadsheets",
      "Gave leadership faster reporting visibility with exportable analytics",
      "Real-time presence indicators reduced check-in calls to field teams"
    ],
    featured: true
  },
  {
    id: 1,
    title: "Community Management Platform",
    type: "Client Dashboard",
    stack: ["WeWeb", "Xano", "SendGrid", "Chart.js"],
    description:
      "Dashboard for community managers handling resident support tickets, broadcasts, and activity — with context-rich reporting.",
    highlights: [
      "Centralized ticket handling and communication workflows in one portal",
      "Reduced back-and-forth between teams and improved issue visibility",
      "Multi-tenant reporting with drill-downs for HOA boards and committees"
    ],
    featured: true
  },
  {
    id: 2,
    title: "Sales Call Grading System",
    type: "Insights Platform",
    stack: ["React", "Node", "Postgres", "OpenAI"],
    description:
      "Review and scoring platform for QA teams — combining transcripts, AI-assisted grading, and performance insights in one flow.",
    highlights: [
      "Helped QA teams review calls faster with AI-generated scoring suggestions",
      "Custom rubric builder kept grading consistent across reviewers",
      "Trend analysis surfaced coaching opportunities at a team level"
    ],
    featured: true
  },
  {
    id: 3,
    title: "Housing Application Management",
    type: "Case Management System",
    stack: ["WeWeb", "Xano", "Webflow", "SendGrid", "Twilio", "OpenAI"],
    description:
      "Multi-dashboard system for agents and caseworkers to process applicants, collaborate, and track case progress end-to-end.",
    highlights: [
      "Improved case visibility and reduced manual follow-up for agents",
      "SMS + email updates via Twilio & SendGrid kept applicants informed",
      "AI-powered review of past communications cut research time per case"
    ]
  },
  {
    id: 4,
    title: "Tenant Transfer Matching",
    type: "Matching Engine",
    stack: ["WeWeb", "Xano", "SendGrid", "Twilio"],
    description:
      "Matching engine pairing tenants with available properties — supporting direct transfers, two-way swaps, and multi-party chains.",
    highlights: [
      "Reduced manual matching work with automated compatibility scoring",
      "Handled complex chain scenarios that previously required manual coordination",
      "Automated notifications kept all parties updated throughout the process"
    ]
  },
  {
    id: 5,
    title: "Internal Communication Platform",
    type: "Internal Tool",
    stack: ["Knack", "Integromat", "SendGrid"],
    description:
      "Announcements hub for distributed operations teams — segmented by department with read receipts and automated digests.",
    highlights: [
      "Reduced reliance on scattered email threads and chat channels",
      "Read receipts and engagement tracking improved message accountability",
      "Automated daily digests kept remote teams consistently informed"
    ]
  },
  {
    id: 6,
    title: "AI Call Analysis Tool",
    type: "AI Workflow",
    stack: ["React", "Xano", "OpenAI"],
    description:
      "Call grading platform that ingests transcripts, runs AI analysis, and helps QA reps score faster with structured suggestions.",
    highlights: [
      "Prompt-engineered summaries reduced per-call review time significantly",
      "Outlier detection flagged calls that needed coaching attention",
      "Secure data pipeline with audit logs for compliance"
    ]
  },
  {
    id: 7,
    title: "Website Builder",
    type: "Personal Project · Ongoing",
    stack: ["Nuxt", "React", "Supabase"],
    description:
      "Personal product exploring reusable site generation, publishing workflows, and user-controlled design systems.",
    highlights: [
      "Custom component system with live preview for immediate feedback",
      "Supabase-backed auth, storage, and multi-user support",
      "Continuously evolving as a testbed for new product ideas"
    ],
    ongoing: true
  },
  {
    id: 8,
    title: "Private Event Media Sharing",
    type: "Mobile / Web App",
    stack: ["React", "Expo", "Supabase"],
    description:
      "Controlled media-sharing app for private events — focused on guest access, moderation, and lightweight media flows.",
    highlights: [
      "Invite-only galleries with expiring links kept events private",
      "Auto compression and quality presets reduced upload friction",
      "Web and mobile parity with offline-friendly upload queue"
    ]
  },
  {
    id: 9,
    title: "Church Community Platform",
    type: "Internal Tool",
    stack: ["React", "Supabase", "Claude MCP"],
    description:
      "Portal for prayer requests, team communications, and a searchable song lyric and chords library with live transposition.",
    highlights: [
      "Chord transposition engine made the library usable during live gatherings",
      "Moderation queue gave leaders control over prayer request visibility",
      "Claude MCP integration added AI-assisted community features"
    ]
  },
  {
    id: 10,
    title: "Car Rental Management System",
    type: "Operations App",
    stack: ["React", "Supabase"],
    description:
      "Fleet, booking, and operations portal built to simplify day-to-day workflows for a regional car rental business.",
    highlights: [
      "Centralized vehicle status, bookings, and billing in one portal",
      "Maintenance logs and driver assignment reduced coordination overhead",
      "Replaced a mix of spreadsheets and manual tracking"
    ]
  }
];

export default projects;
