import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { VerticalCutReveal } from '../ui/vertical-cut-reveal';
import { cn } from '../../lib/utils';
import personalData from '../../data/personal';

const plans = [
  {
    name: 'Discovery',
    description: 'For founders and teams exploring a product idea or system redesign. Fast, focused, actionable.',
    projectPrice: 800,
    retainerPrice: 450,
    buttonText: 'Book a sprint',
    buttonVariant: 'outline',
    includes: [
      'What you get:',
      'Product audit & gap analysis',
      'Wireframes & user flows',
      'Tech stack recommendation',
      '1-week turnaround',
      '1 async review session',
      'Delivered via Notion doc',
    ],
  },
  {
    name: 'Full Build',
    description: 'For teams ready to ship a dashboard, internal tool, or workflow system end-to-end.',
    projectPrice: 4500,
    retainerPrice: 1500,
    buttonText: 'Start a project',
    buttonVariant: 'default',
    popular: true,
    includes: [
      'Everything in Discovery, plus:',
      'Full-stack delivery (React + Supabase/Xano)',
      'Design system & component library',
      'API & automation integrations',
      'Mobile-responsive & accessible',
      'Source code + docs handoff',
      'Post-launch support (2 weeks)',
    ],
  },
  {
    name: 'Ongoing Partner',
    description: 'For growing teams who need a reliable product engineer embedded in their operation.',
    projectPrice: 2800,
    retainerPrice: 2200,
    buttonText: "Let's talk",
    buttonVariant: 'outline',
    includes: [
      'Everything in Full Build, plus:',
      'Dedicated engineer on-call',
      'Weekly planning check-ins',
      'Slack access + priority support',
      'Up to 60 hrs / month',
      'Feature iterations & integrations',
      'Ongoing code reviews & QA',
    ],
  },
];

const PricingSwitch = ({ onSwitch }) => {
  const [selected, setSelected] = useState('0');

  const handleSwitch = (value) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-neutral-700/60 p-1">
        {['Project', 'Retainer'].map((label, idx) => {
          const val = String(idx);
          const isActive = selected === val;
          return (
            <button
              key={label}
              onClick={() => handleSwitch(val)}
              className={cn(
                'relative z-10 h-10 rounded-full sm:px-6 px-4 text-sm font-medium transition-colors',
                isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="pricing-switch"
                  className="absolute inset-0 rounded-full border-[3px] border-sky-600 bg-gradient-to-t from-sky-700 to-sky-500 shadow-lg shadow-sky-900/50"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.19, 1, 0.22, 1] },
  }),
};

const Services = () => {
  const [isRetainer, setIsRetainer] = useState(false);

  const togglePricing = (value) => setIsRetainer(parseInt(value) === 1);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#060609] py-24 sm:py-32"
    >
      {/* CSS grid pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial vignette over grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 50% at 50% 0%, transparent 0%, #060609 75%)',
        }}
      />

      {/* Violet glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(124,58,237,0.15) 0%, transparent 65%)',
        }}
      />

      <div className="container-wrapper relative z-10">

        {/* Section label */}
        <motion.p
          className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400 mb-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Services & Pricing
        </motion.p>

        {/* Heading with VerticalCutReveal */}
        <div className="text-center mb-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              containerClassName="justify-center"
              transition={{ type: 'spring', stiffness: 260, damping: 40, delay: 0.1 }}
            >
              Plans built for real
            </VerticalCutReveal>{' '}
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              containerClassName="justify-center"
              elementLevelClassName="text-sky-400"
              transition={{ type: 'spring', stiffness: 260, damping: 40, delay: 0.35 }}
            >
              product teams
            </VerticalCutReveal>
          </h2>
        </div>

        <motion.p
          className="text-center text-neutral-400 max-w-lg mx-auto mb-10 text-sm sm:text-base leading-relaxed"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          Whether you need a focused sprint or a long-term engineering partner,
          I work lean and ship fast. Toggle between project and retainer pricing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-14"
        >
          <PricingSwitch onSwitch={togglePricing} />
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="h-full"
            >
              <Card
                className={cn(
                  'relative text-white border h-full flex flex-col',
                  plan.popular
                    ? 'border-sky-500/50 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 shadow-[0px_-8px_180px_0px_rgba(124,58,237,0.2)] z-20'
                    : 'border-neutral-800/80 bg-gradient-to-b from-neutral-900 to-neutral-950 z-10'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 rounded-b-full text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-sky-700 to-sky-500 text-white shadow-lg shadow-sky-900/40">
                      Most popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-left pb-4">
                  <h3 className="text-2xl font-bold mb-3 text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-0.5 mb-2">
                    <span className="text-neutral-400 text-xl font-semibold">$</span>
                    <NumberFlow
                      value={isRetainer ? plan.retainerPrice : plan.projectPrice}
                      className="text-4xl font-black text-white"
                    />
                    <span className="text-neutral-500 text-sm ml-1.5">
                      /{isRetainer ? 'mo' : 'project'}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0 flex flex-col flex-1">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}&su=${encodeURIComponent(`Inquiry: ${plan.name} plan`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'w-full mb-6 py-3.5 text-sm font-semibold rounded-xl text-center transition-all duration-200 active:scale-[0.97] block',
                      plan.popular
                        ? 'bg-gradient-to-t from-sky-700 to-sky-500 border border-sky-500/60 shadow-lg shadow-sky-900/40 text-white hover:opacity-90'
                        : 'bg-gradient-to-t from-neutral-900 to-neutral-800 border border-neutral-700 text-neutral-200 hover:border-neutral-500 hover:text-white'
                    )}
                  >
                    {plan.buttonText}
                  </a>

                  <div className="space-y-3 pt-4 border-t border-neutral-800/80">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600 mb-3.5">
                      {plan.includes[0]}
                    </h4>
                    <ul className="space-y-2.5">
                      {plan.includes.slice(1).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/70" />
                          <span className="text-sm text-neutral-400 leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="text-center text-neutral-600 text-xs mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          All plans include a free 30-min discovery call.{' '}
          <a
            href={`https://mail.google.com/mail/?view=cm&to=${personalData.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:text-sky-400 transition-colors"
          >
            Email me
          </a>{' '}
          to get started.
        </motion.p>

      </div>
    </section>
  );
};

export default Services;
