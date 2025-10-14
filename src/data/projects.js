const projects = [
  {
    id: 0,
    title: "SaaS Dashboard MVP Demo",
    period: "2025",
    stack: ["WeWeb", "Xano", "Stripe", "SendGrid"],
    description: "A fully functional SaaS dashboard built in 48 hours to demonstrate rapid MVP development capabilities. Features user management, subscription billing, and email notifications.",
    features: [
      "User authentication & role-based permissions",
      "CRUD operations with data tables & filtering",
      "Stripe subscription integration with webhooks",
      "Automated email notifications via SendGrid",
      "Responsive modern dashboard UI",
      "Admin panel with analytics & user management"
    ],
    achievements: [
      "Built in 48 hours from scratch",
      "Production-ready with error handling",
      "Modern, professional UI/UX design",
      "Fully responsive on all devices"
    ],
    image: "/assets/images/saas-demo.jpg",
    link: "#", // TODO: Add live demo link once deployed
    demoAvailable: true,
    featured: true,
    techStack: "WeWeb + Xano",
    buildTime: "48 hours"
  },
  {
    id: 2,
    title: "Housing Solutions Platform",
    period: "2024",
    stack: ["Webflow", "Wized", "Xano", "SendGrid", "Twilio", "Google Auth", "Xero"],
    description: "A comprehensive property management platform streamlining deal management, applicant tracking, and provider coordination.",
    features: [
      "Deal management system with pipeline tracking",
      "Applicant tracking & communication",
      "Property provider portal & directory",
      "Automated email & SMS notifications",
      "Google OAuth integration for secure login",
      "Xero accounting integration for invoicing"
    ],
    achievements: [
      "Reduced manual workflow by 60%",
      "Improved client acquisition by 40%",
      "Streamlined operations across 3 departments"
    ],
    image: "/assets/images/housing-project.jpg",
    link: "#",
    techStack: "Webflow + Xano",
    featured: true
  },
  {
    id: 1,
    title: "Game Arcade Collection 🎮",
    period: "2025",
    stack: ["React", "Framer Motion", "Web Audio API", "Tailwind CSS"],
    description: "A collection of three engaging browser games showcasing interactive UI development and game mechanics.",
    features: [
      "Slap the Boss - Stress relief with satisfying feedback",
      "Tic Tac Toe - Unbeatable AI with minimax algorithm", 
      "Memory Game - Multiple themes & difficulty levels",
      "Responsive design with touch & keyboard support",
      "Optimized performance with efficient state management"
    ],
    achievements: [
      "Built with React and modern web technologies",
      "Mobile-optimized with accessibility features",
      "Smooth animations and audio feedback"
    ],
    image: "/assets/images/slap-boss.jpg",
    link: "/games",
    isGame: true,
    category: "Personal Project"
  },
  {
    id: 3,
    title: "Trash Butler Management Suite",
    period: "2020-2022",
    stack: ["Knack", "Integromat", "Tadabase"],
    description: "A comprehensive operations management system for waste management services across multiple properties.",
    components: [
      "Area Command Center for regional oversight",
      "Butler Hub with clock-in/out & route tracking",
      "Community Concierge for resident communication"
    ],
    impact: [
      "Enhanced operational efficiency by 45%",
      "Improved service delivery tracking",
      "Real-time reporting for 50+ properties"
    ],
    image: "/assets/images/trash-butler.jpg",
    link: "#",
    category: "Business Application"
  },
  {
    id: 4,
    title: "Enterprise Printing System",
    period: "2020",
    stack: ["Laravel", "Vue.js", "MySQL"],
    description: "Integrated ERP system for a Japanese manufacturing company connecting sales, accounting, and production departments.",
    contribution: "Led backend development and API integration across departments",
    impact: [
      "Unified 3 separate systems into one platform",
      "Reduced data entry errors by 70%",
      "Automated invoice generation and inventory tracking"
    ],
    image: "/assets/images/printing-system.jpg",
    link: "#",
    category: "Enterprise Solution"
  },
  {
    id: 5,
    title: "Developer Directory Platform",
    period: "2020",
    stack: ["Vue.js", "PHP", "MySQL"],
    description: "A matchmaking platform connecting developers with clients based on skills, experience, and project requirements.",
    role: "Led backend development and database architecture",
    features: [
      "Developer profile management",
      "Skill-based matching algorithm",
      "Project posting & bidding system",
      "Integrated messaging & notifications"
    ],
    image: "/assets/images/dev-directory.jpg",
    link: "#",
    category: "Web Platform"
  }
];

export default projects;
