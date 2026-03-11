const projects = [
  {
    id: 0,
    title: "Area Operations Dashboard",
    type: "Internal Platform",
    stack: ["React", "WeWeb", "Xano", "Tailwind"],
    description:
      "A command center for area managers to track staff activity, timeclocks, logs, approvals, and operational reports in one calm UI.",
    highlights: [
      "Real-time presence indicators for field teams",
      "Approval workflows for time-off and incident reports",
      "Exportable analytics for leadership stand-ups"
    ],
    featured: true
  },
  {
    id: 1,
    title: "Community Management Platform",
    type: "Client Dashboard",
    stack: ["WeWeb", "Xano", "SendGrid", "Chart.js"],
    description:
      "Dashboard for community managers to handle support tickets, broadcasts, and resident activity with context-rich reporting.",
    highlights: [
      "Multi-tenant reporting with drill-downs",
      "Support workflow automation with email notifications",
      "Activity tracking for HOA boards and committees"
    ],
    featured: true
  },
  {
    id: 2,
    title: "Sales Call Grading System",
    type: "Insights Platform",
    stack: ["React", "Node", "Postgres", "OpenAI"],
    description:
      "Review and scoring platform for sales calls with rich transcripts, AI-assisted grading, and performance insights.",
    highlights: [
      "Custom rubric builder for QA teams",
      "Scorecards with trend analysis",
      "AI suggestions to accelerate grading"
    ],
    featured: true
  },
  {
    id: 3,
    title: "Housing Application Management",
    type: "Multi-dashboard System",
    stack: ["WeWeb", "Xano", "Webflow", "SendGrid", "Twilio", "OpenAI"],
    description:
      "Dashboards for agents to process housing applicants, collaborate with caseworkers, and track case progress. Integrated OpenAI to review past communications and applicant details.",
    highlights: [
      "Role-specific dashboards for agents and managers",
      "SMS + email updates via Twilio & SendGrid",
      "AI-powered review of past communications and applicant history"
    ]
  },
  {
    id: 4,
    title: "Tenant Transfer Matching",
    type: "Matching Engine",
    stack: ["WeWeb", "Xano", "SendGrid", "Twilio"],
    description:
      "Matching logic that pairs tenants with available properties, supporting direct transfers, two-way swaps, and complex chains.",
    highlights: [
      "Automated compatibility scoring",
      "Multi-party workflow management",
      "SMS + email notifications throughout process"
    ]
  },
  {
    id: 5,
    title: "Internal Communication Platform",
    type: "Company Tool",
    stack: ["Knack", "Integromat", "SendGrid"],
    description:
      "Announcements, updates, and team communication hub for distributed operations teams.",
    highlights: [
      "Segmented announcements per department",
      "Read receipts & engagement tracking",
      "Automated digests sent daily"
    ]
  },
  {
    id: 6,
    title: "AI Call Analysis Tool",
    type: "AI Workflow",
    stack: ["React", "Xano", "OpenAI"],
    description:
      "Call grading platform that ingests transcripts, runs AI analysis, and assists QA reps with scoring suggestions.",
    highlights: [
      "Prompt-engineered summaries of each call",
      "Outlier detection for coaching sessions",
      "Secure data pipeline with audit logs"
    ]
  },
  {
    id: 7,
    title: "Website Builder",
    type: "Personal Project · Ongoing",
    stack: ["Nuxt", "React", "Supabase"],
    description:
      "An ongoing personal project — a site builder that lets users create and publish custom websites with their own design preferences and content.",
    highlights: [
      "Custom component system with live preview",
      "Supabase-backed auth and storage",
      "Continuously evolving as a personal experiment"
    ],
    ongoing: true
  },
  {
    id: 8,
    title: "Private Event Media Sharing",
    type: "Mobile / Web App",
    stack: ["React", "Expo", "Supabase"],
    description:
      "Media sharing app for events with controlled guest access, moderation, and lightweight editing.",
    highlights: [
      "Invite-only galleries with expiring links",
      "Automatic compression + quality presets",
      "Web + mobile parity with offline-friendly queue"
    ]
  },
  {
    id: 9,
    title: "Church Community Platform",
    type: "Internal Tool",
    stack: ["React", "Supabase", "Claude MCP"],
    description:
      "Portal for prayer requests, communications, and a searchable song lyric + chords library with live transposition. Built with Claude MCP integration.",
    highlights: [
      "Chord transposition engine per instrument",
      "Moderation queue for prayer requests",
      "Claude MCP integration for AI-assisted community features"
    ]
  },
  {
    id: 10,
    title: "Car Rental Management System",
    type: "Operations App",
    stack: ["React", "Supabase"],
    description:
      "Fleet, booking, and operations portal for a regional car rental business.",
    highlights: [
      "Vehicle status tracking with maintenance logs",
      "Booking + billing workflows",
      "Driver assignment + route planning"
    ]
  }
];

export default projects;
