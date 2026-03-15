import React from 'react';
import { motion } from 'framer-motion';
import { SiZapier, SiTwilio, SiXero, SiMicrosoft, SiOpenai } from 'react-icons/si';
import { FiMail, FiCpu, FiCreditCard, FiGrid, FiRepeat, FiPhone, FiGitBranch, FiSend } from 'react-icons/fi';
import integrations from '../../data/integrations';
import { useHolographic } from '../../hooks/useHolographic';

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
    border: 'border-orange-500/20',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
  },
  {
    icon: FiMail,
    title: 'Notifications & Messaging',
    description: 'SMS alerts, transactional email, and multi-channel outreach at scale.',
    tools: ['Twilio', 'SendGrid'],
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: FiCpu,
    title: 'AI & Intelligence',
    description: 'Embed LLMs, semantic search, and smart analysis directly into your product.',
    tools: ['OpenAI APIs', 'Claude MCP'],
    border: 'border-sky-500/20',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
  },
  {
    icon: FiCreditCard,
    title: 'Finance & Reporting',
    description: 'Sync invoices, reconcile accounts, and surface financial insights inside your app.',
    tools: ['Xero'],
    border: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: FiPhone,
    title: 'Call Analytics',
    description: 'Track call volumes, agent performance, and customer interactions in real time.',
    tools: ['Akixi'],
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: FiGrid,
    title: 'Microsoft Ecosystem',
    description: 'Azure AD auth, calendar sync, email integration, and M365 data access.',
    tools: ['Microsoft Graph'],
    border: 'border-sky-500/20',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
  },
];

const UseCaseCard = ({ uc }) => {
  const { cardRef, handleMouseMove, handleMouseLeave } = useHolographic();
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
      }}
      className={`holo-card relative rounded-2xl p-6 bg-white/[0.02] border ${uc.border}`}
    >
      <div className="holo-glow" />
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${uc.iconBg}`}>
          <uc.icon className={`w-5 h-5 ${uc.iconColor}`} />
        </div>
        <h3 className="font-semibold text-sm text-[#fafafa]">{uc.title}</h3>
      </div>
      <p className="text-sm text-[#71717a] leading-relaxed mb-4">{uc.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {uc.tools.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-[#d4d4d8] font-medium border border-white/[0.08]"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const IntegrationPill = ({ item, Icon }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] shrink-0 hover:border-white/[0.16] hover:shadow-md transition-all duration-200 cursor-default group">
    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shrink-0">
      {Icon ? (
        <Icon className="w-4 h-4 text-[#d4d4d8]" />
      ) : (
        <span className="text-xs font-bold text-[#d4d4d8]">
          {item.name.charAt(0)}
        </span>
      )}
    </div>
    <div>
      <div className="text-sm font-semibold text-[#fafafa] whitespace-nowrap">{item.name}</div>
      <div className="text-xs text-[#71717a] whitespace-nowrap">{item.description}</div>
    </div>
  </div>
);

const Integrations = () => {
  const row1 = [...integrations, ...integrations];
  const row2 = [...integrations].reverse().concat([...integrations].reverse());

  return (
    <section id="integrations" className="section-passthrough section-padding bg-transparent overflow-hidden">
      <div className="container-wrapper">

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="section-label mb-3">Integrations & Automation</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Built to plug into your ecosystem
          </h2>
          <p className="text-[#71717a] max-w-lg text-base leading-relaxed">
            Every product lives inside an ecosystem. I wire your app directly into the tools your team and customers already depend on.
          </p>
        </motion.div>

        <motion.div
          className="relative mb-14 space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />

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
            <UseCaseCard key={uc.title} uc={uc} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Integrations;
