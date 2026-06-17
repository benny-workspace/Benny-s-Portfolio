/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { FAQS } from "../data";
import SectionHeader from "./SectionHeader";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-transparent" id="faq-section">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          leftLabel="© KNOWLEDGE BASE ヘルプ"
          rightLabel="COMMON INQUIRIES"
          title="Frequently Asked Questions"
          description="Pragmatic answers regarding schedules, creative feedback loops, and billing structures."
          className="mb-14"
        />

        <style>{`
          .faq-accordion {
            font-family: 'Inter', sans-serif;
            background: transparent;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            --token-9811e40b-3ed8-4237-98e5-61535bb22d2f: var(--text-primary, #ffffff);
            --token-01c07c7e-a9ae-45ca-a79a-cc49e2fa5e89: var(--border-custom, rgba(187, 187, 187, 0.2));
            --speechify-bg-dimmer: rgba(255, 255, 255, 0.03);
          }

          .light-mode .faq-accordion {
            --speechify-bg-dimmer: rgba(0, 0, 0, 0.03);
          }

          .faq-item {
            border-top: 1px solid var(--token-01c07c7e-a9ae-45ca-a79a-cc49e2fa5e89, rgba(187, 187, 187, 0.2));
            overflow: hidden;
          }

          .faq-item:last-child {
            border-bottom: 1px solid var(--token-01c07c7e-a9ae-45ca-a79a-cc49e2fa5e89, rgba(187, 187, 187, 0.2));
          }

          .faq-trigger {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 1.5rem 0;
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            text-align: left;
            gap: 1.25rem;
            transition: background-color 0.2s ease;
            font-family: inherit;
          }

          .faq-trigger:hover {
            background-color: var(--speechify-bg-dimmer, rgba(255, 255, 255, 0.03));
          }

          .faq-number {
            font-size: 1.125rem;
            font-weight: 500;
            color: var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, #ffffff);
            min-width: 2ch;
            opacity: 0.8;
            flex-shrink: 0;
            font-family: 'Satoshi', sans-serif;
          }

          .faq-question {
            flex: 1;
            font-size: 1.125rem;
            font-weight: 500;
            color: var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, #ffffff);
            line-height: 1.4;
            margin: 0;
            font-family: 'Satoshi', sans-serif;
          }

          .faq-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .faq-item.open .faq-icon {
            transform: rotate(45deg);
          }

          .faq-icon svg {
            width: 100%;
            height: 100%;
            fill: var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, #ffffff);
            color: var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, #ffffff);
          }

          .faq-answer-wrapper {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          }

          .faq-item.open .faq-answer-wrapper {
            max-height: 500px;
          }

          .faq-answer {
            padding: 0 0 1.5rem 0;
            font-size: 1rem;
            line-height: 1.6;
            color: var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, #ffffff);
            opacity: 0.85;
            margin-left: calc(2ch + 1.25rem);
            font-family: 'Inter', sans-serif;
          }

          .faq-trigger:focus-visible {
            outline: 2px solid var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f, rgba(255, 255, 255, 0.6));
            outline-offset: -2px;
            border-radius: 4px;
          }
        `}</style>

        <div className="faq-accordion" role="list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const itemElementId = `faq-item-${faq.id}`;
            return (
              <div
                key={faq.id}
                id={itemElementId}
                className={`faq-item ${isOpen ? "open" : ""}`}
                role="listitem"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="faq-trigger"
                  aria-expanded={isOpen}
                >
                  <span className="faq-number">{faq.number}</span>
                  <span className="faq-question">{faq.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <path
                        d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
