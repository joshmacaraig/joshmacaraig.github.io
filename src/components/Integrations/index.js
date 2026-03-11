import React from 'react';
import { motion } from 'framer-motion';
import { SiZapier, SiTwilio, SiXero, SiMicrosoft, SiOpenai } from 'react-icons/si';
import { FiMail, FiCpu, FiCreditCard, FiBarChart2, FiGrid, FiRepeat, FiPhone, FiGitBranch, FiSend } from 'react-icons/fi';
import integrations from '../../data/integrations';

const iconMap = {
  zapier:    SiZapier,
  twilio:    SiTwilio,
  xero:      SiXero,
  microsoft: SiMicrosoft,
  openai:    SiOpenai,
  n8n:       FiGitBranch,
  sendgrid:  FiSend,
  akixi:     FiPhone,
};

const useCases = [
  {
    icon: FiRepeat,
    title: 'Workflow Automation',
    description: 'Trigger actions across tools automatically — no manual hand-offs between systems.',
    tools: ['Zapier', 'n8n'],
    gradient: 'from-orange-500/10 to-amber-500/5',
    border: 'border-orange-200/50 dark:border-orange-500/20',
    iconBg: 'bg-orange-100 dark:bg-orange-500/10',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    icon: FiMail,
    title: 'Notifications & Messaging',
    description: 'SMS alerts, transactional email, and multi-channel outreach at scale.',
    tools: ['Twilio', 'SendGrid'],
    gradient: 'from-blue-500/10 to-indigo-500/5',
    border: 'border-blue-200/50 dark:border-blue-500/20',
    iconBg: 'bg-blue-100 dark:bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: FiCpu,
    title: 'AI & Intelligence',
    description: 'Embed LLMs, semantic search, and smart analysis directly into your product.',
    tools: ['OpenAI APIs', 'Claude MCP'],
    gradient: 'from-violet-500/10 to-purple-500/5',
    border: 'border-violet-200/50 dark:border-violet-500/20',
    iconBg: 'bg-violet-100 dark:bg-violet-500/10',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    icon: FiCreditCard,
    title: 'Finance & Reporting',
    description: 'Sync invoices, reconcile accounts, and surface financial insights inside your app.',
    tools: ['Xero'],
    gradient: 'from-cyan-500/10 to-sky-500/5',
    border: 'border-cyan-200/50 dark:border-cyan-500/20',
    iconBg: 'bg-cyan-100 dark:bg-cyan-500/10',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    icon: FiPhone,
    title: 'Call Analytics',
    description: 'Track call volumes, agent performance, and customer interactions in real time.',
    tools: ['Akixi'],
    gradient: 'from-emerald-500/10 to-teal-500/5',
    border: 'border-emerald-200/50 dark:border-emerald-500/20',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: FiGrid,
    title: 'Microsoft Ecosystem',
    description: 'Azure AD auth, calendar sync, email integration, and M365 data access.',
    tools: ['Microsoft Graph'],
    gradient: 'from-sky-500/10 to-blue-500/5',
    border: 'border-sky-200/50 dark:border-sky-500/20',
    iconBg: 'bg-sky-100 dark:bg-sky-500/10',
    iconColor: 'text-sky-600 dark:text-sky-400',
  },
];

const IntegrationPill = ({ item, Icon }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] shrink-0 hover:border-black/[0.16] dark:hover:border-white/[0.16] hover:shadow-md transition-all duration-200 cursor-default group">
    <div className="w-9 h-9 rounded-xl bg-[#f4f4f5] dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shrink-0">
      {Icon ? (
        <Icon className="w-4 h-4 text-[#3f3f46] dark:text-[#d4d4d8]" />
      ) : (
        <span className="text-xs font-bold text-[#3f3f46] dark:text-[#d4d4d8]">
          {item.name.charAt(0)}
        </span>
      )}
    </div>
    <div>
      <div className="text-sm font-semibold text-[#09090b] dark:text-[#fafafa] whitespace-nowrap">{item.name}</div>
      <div className="text-xs text-[#71717a] whitespace-nowrap">{item.description}</div>
    </div>
  </div>
);

const Integrations = () => {
  const row1 = [...integrations, ...integrations];
  const row2 = [...integrations].reverse().concat([...integrations].reverse());

  return (
    <section id="integrations" className="section-padding bg-[#fafafa] dark:bg-[#0c0c10] overflow-hidden">
      <div className="container-wrapper">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="section-label mb-3">Integrations & Automation</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#09090b] dark:text-white">
            Built to plug into your ecosystem
          </h2>
          <p className="text-[#71717a] max-w-lg text-base leading-relaxed">
            Every product lives inside an ecosystem. I wire your app directly into the tools your team and customers already depend on.
          </p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          className="relative mb-14 space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fafafa] dark:from-[#0c0c10] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fafafa] dark:from-[#0c0c10] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-3 overflow-hidden">
            <div className="flex gap-3 shrink-0" style={{ animation: 'marquee 30s linear infinite' }}>
              {row1.map((item, i) => {
                const Icon = iconMap[item.slug];
                return <IntegrationPill key={`r1-${i}`} item={item} Icon={Icon} />;
              })}
            </div>
          </div>

          <div className="flex gap-3 overflow-hidden">
            <div className="flex gap-3 shrink-0" style={{ animation: 'marquee-reverse 36s linear infinite' }}>
              {row2.map((item, i) => {
                const Icon = iconMap[item.slug];
                return <IntegrationPill key={`r2-${i}`} item={item} Icon={Icon} />;
              })}
            </div>
          </div>
        </motion.div>

        {/* Use-case grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {useCases.map((uc) => (
            <motion.div
              key={uc.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
              }}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br ${uc.gradient} border ${uc.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${uc.iconBg}`}>
                  <uc.icon className={`w-5 h-5 ${uc.iconColor}`} />
                </div>
                <h3 className="font-semibold text-sm text-[#09090b] dark:text-[#fafafa]">
                  {uc.title}
                </h3>
              </div>

              <p className="text-sm text-[#71717a] leading-relaxed mb-4 mt-0">
                {uc.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {uc.tools.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/70 dark:bg-white/10 text-[#3f3f46] dark:text-[#d4d4d8] font-medium border border-white/80 dark:border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Integrations;
