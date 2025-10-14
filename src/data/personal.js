const personalData = {
  name: "Josh Macaraig",
  title: "WeWeb + Xano Developer",
  tagline: "Launch Your MVP in 7 Days, Not 7 Weeks",
  summary: "I build web apps, dashboards, and MVPs for indie hackers and startups globally using WeWeb + Xano. Fast delivery. Transparent pricing. Timezone-flexible.",
  positioning: "I launch MVPs in 7 days for indie hackers who can't afford $8k agencies but need better than Fiverr.",
  email: "bajejosh@gmail.com",
  calendly: "https://calendly.com/joshmacaraig/free-mvp-strategy-audit",
  github: "https://github.com/joshmacaraig",
  linkedin: "https://linkedin.com/in/joshmacaraig",
  twitter: "https://twitter.com/joshmacaraig",
  memoryAthleteProfile: "https://global-memory.org/athlete.php?id=14786",
  aboutMe: `I help indie hackers and bootstrapped startups worldwide launch fast. Using WeWeb + Xano, I deliver MVPs in days instead of months—at a fraction of traditional agency costs.

I work with clients across the US, Europe, and beyond. English-first communication, timezone-flexible scheduling, and direct access to a developer who understands both no-code efficiency and traditional development precision.

Beyond coding, I'm a memory athlete and AI enthusiast, constantly exploring ways to leverage technology to enhance productivity and create innovative solutions.`,
  services: {
    starter: {
      name: "Speed Starter MVP",
      price: "$1,500",
      timeline: "5 days",
      features: [
        "1-3 core features",
        "Basic UI (template-based)",
        "Xano backend with authentication",
        "1 integration (Stripe, email, etc.)",
        "Deployed & live"
      ]
    },
    sprint: {
      name: "7-Day MVP Sprint",
      price: "$2,500",
      timeline: "7 days",
      popular: true,
      features: [
        "5-7 key features",
        "Custom UI design",
        "Xano backend with auth & permissions",
        "2-3 integrations",
        "Basic admin panel",
        "Deployed with custom domain",
        "1 week of bug fixes"
      ],
      guarantee: "If it takes longer than 7 days, 10% refund per extra day"
    },
    pro: {
      name: "Pro App Build",
      price: "$4,500",
      timeline: "2-3 weeks",
      features: [
        "Full feature set (10+ features)",
        "Custom UI/UX design",
        "Advanced Xano backend (workflows, webhooks)",
        "5+ integrations",
        "User analytics setup",
        "Testing & QA",
        "Documentation",
        "2 weeks of support"
      ]
    },
    retainer: {
      name: "Ongoing Retainer",
      price: "$750/month",
      timeline: "Monthly",
      features: [
        "10 hours/month of development",
        "Priority support (4-hour response)",
        "Monthly feature additions",
        "Bug fixes & monitoring",
        "Performance optimization"
      ]
    }
  }
};

export default personalData;
