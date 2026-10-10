'use client';

import React, { useState } from 'react';
import { Plus, Minus } from '@phosphor-icons/react/ssr';

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: 'What services does TBR Groups offer?',
    answer:
      "Custom software development, computer & mobile sales with expert repair, government e-Seva and document registration, insurance, ticket booking, banking assistance and everyday retail essentials — all under one trusted roof.",
  },
  {
    question: 'Where are your branches located?',
    answer:
      'Our head office is in Marthandam, with branches in Panamugam and Mankad. Three locations serving homes and small businesses across Kanyakumari district, Tamil Nadu.',
  },
  {
    question: 'Do you develop custom software for small businesses?',
    answer:
      'Yes. Our in-Home team builds billing systems, websites and tailored business software, backed by ongoing local support from the people who built it.',
  },
  {
    question: 'Are you an authorised partner for the products you sell?',
    answer:
      'We are a Net Protector authorised channel partner (Dealer Code T-903), an official Pine Labs POS distributor and a Go Point regional dealer, so every device and licence comes with genuine warranty and local service.',
  },
  {
    question: 'Which government and e-Seva services can you process?',
    answer:
      'CSC & e-Seva applications, document registration, ticket booking, insurance services and banking transactions, processed through authorised partners with transparent timelines.',
  },
  {
    question: 'How fast are computer repairs usually completed?',
    answer:
      "Most common repairs are diagnosed the same day by our certified technicians. We always confirm cost and timeline with you before any work begins.",
  },
  {
    question: 'What can I buy at your stores besides services?',
    answer:
      'Computer and mobile accessories, journals & books, organic foods and project/designing materials, with premium quality, competitive pricing and quick delivery support.',
  },
  {
    question: 'How do I get started with TBR Groups?',
    answer:
      'Call us, walk into any branch during working hours (Mon–Sat, 9 AM–6 PM), or send the enquiry form below. One call is usually all it takes.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="faq-section">
      <div className="container">
        <div className="faq-head">
          <div className="section-label d-inline-flex">Support</div>
          <h2 className="section-title mb-3">Most asked FAQs</h2>
          <p className="faq-sub">
            We're here to help you and solve doubts. Find answers to the most
            common questions below.
          </p>
        </div>

        <div className="faq-grid">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-card${isOpen ? ' open' : ''}`}
                onClick={() => toggleFaq(index)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFaq(index);
                  }
                }}
              >
                <div className="faq-top">
                  <span className="faq-q">{faq.question}</span>
                  <span className="faq-toggle">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </div>
                <div className="faq-answer-wrap">
                  <div className="faq-answer-inner">
                    <p className="faq-a">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
