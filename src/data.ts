/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, PracticeService, Testimonial, FAQItem, ServiceOffer } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "DigiDental - AI Receptionist System",
    client: "DigiDental (Founder)",
    category: "AI Systems & Business Development",
    year: "2026",
    description: "A 24/7 AI receptionist built for US dental clinics. Handles calls, books appointments, and sounds completely human, without hiring a single extra staff member.",
    longDescription: "DigiDental was built from scratch to solve one specific, expensive problem: dental clinics losing patients to missed calls after hours and during overflow. Denty, the AI receptionist at the core of DigiDental, answers every call, books appointments directly into the clinic calendar, and delivers a human-grade interaction every time. Setup takes one day. The system is fully operational and in active outreach to US dental practices.",
    image: "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Images/digi_dental_linkedin_2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvZGlnaV9kZW50YWxfbGlua2VkaW5fMi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxNjk0MTA5LCJleHAiOjE4MTMyMzAxMDl9.5Q5I0le3izVOnnrlbnx6YTpDQXsC3KL5DQqL1YlsWWU",
    role: "Founder & Systems Architect",
    tags: ["AI Development", "B2B Outreach", "System Design"],
    link: "#",
    calloutBox: {
      label: "BUSINESS MODEL & PRICING",
      content: "Setup fee covers full system build and personalization to the practice. Monthly retainer keeps Denty live, updated, and running 24/7. First client pricing available."
    },
    frameworksDetail: "Outbound via Facebook group targeting. VSL funnel for inbound leads. One onboarding call. One day to go live. Zero ongoing management required from the clinic side."
  },
  {
    id: "proj-2",
    title: "Coimbra Client Work - Web & Content",
    client: "Business Owners & NGO, Coimbra Portugal",
    category: "Web Design & Content Production",
    year: "2025",
    description: "Websites built and deployed for local business owners in Coimbra, Portugal, all live, all on Google Maps. Plus branded video production for one of Coimbra's most recognized NGOs.",
    longDescription: "During my time in Coimbra I designed and deployed websites for local business owners, all hosted on Vercel and actively linked through their Google Maps profiles, meaning real customers find and use these sites daily. I also produced a branded video for one of Coimbra's most recognized NGOs, credited on the final production published to their Facebook page. Additional work included a full website build and social content for a calisthenics fitness coach, with content posted directly to his public page. Real clients. Real deliverables. All still live and in use.",
    image: "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Images/before&afterwebclienttestimonials.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvYmVmb3JlJmFmdGVyd2ViY2xpZW50dGVzdGltb25pYWxzLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODE2OTY0ODgsImV4cCI6MTgxMzIzMjQ4OH0.sBfh-pjLSfQZw002VELYOrZfCHIlIxD5eLrz8tYTCvo",
    role: "Web Designer, Frontend Developer & Content Producer",
    tags: ["Web Design", "Vercel Deploy", "Video Production"],
    link: "#",
    calloutBox: {
      label: "LIVE & VERIFIED",
      content: "All websites remain active and are indexed on Google Maps under their respective business profiles. NGO video credit is publicly visible on their official Facebook page."
    },
    frameworksDetail: "Discovery call to understand brand. Rapid Vercel deploy with custom domain mapping. Google Maps profile update with live site link. Video produced, edited, and handed over for direct publishing."
  },
  {
    id: "proj-3",
    title: "0 to 2,000 - Facebook Organic Growth Experiment",
    client: "Independent Facebook Page",
    category: "Organic Social Growth & Monetization Strategy",
    year: "2026",
    description: "A Facebook page taken from zero to 2,000+ followers in ten days flat, with videos pushing near 100K views and monetization threshold in active sight.",
    longDescription: "Built as a pure organic growth experiment with zero paid promotion. The page crossed 2,000 followers in under ten days from its first post. Individual videos have reached close to 100,000 views with no ad spend. The page runs on a daily posting cadence and is actively approaching Facebook monetization threshold. The entire strategy is rooted in studying what is working in the current viral content landscape and iterating on it with a distinct angle: not copying, building on top.",
    image: "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Images/FBgrowth.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvRkJncm93dGgucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTY5NjU1NCwiZXhwIjoxODEzMjMyNTU0fQ.He5bRJuIRtGFwIEROaaMCG6ve5_wK1U7FXszZtPACBM",
    role: "Strategist, Creator & Editor",
    tags: ["Organic Growth", "Facebook Strategy", "Viral Content"],
    link: "#",
    calloutBox: {
      label: "GROWTH METRICS",
      content: "2,000+ followers acquired in 10 days. Select videos approaching 100,000 views organically. Zero paid promotion. Active daily posting cadence maintained throughout."
    },
    frameworksDetail: "Daily content output with no rest days. Trend analysis and rapid iteration cycle. Platform monetization requirements tracked and benchmarked per post."
  },
  {
    id: "proj-4",
    title: "Dual Personal Brand System - @ceobennyco & @bennyuncrowned",
    client: "Self",
    category: "Personal Branding & Multi-Platform Content",
    year: "2023",
    description: "Two distinct personal brands built from scratch and maintained simultaneously. Entrepreneurship on one, lifestyle and calisthenics on the other. Daily output. No team. Three languages.",
    longDescription: "Starting with zero budget and a basic phone, both brands were built and iterated over years of daily posting across Instagram, YouTube, TikTok, and Facebook. @ceobennyco documents the raw entrepreneurship journey, covering ventures, lessons, failures, and wins in real time. @bennyuncrowned captures the lifestyle, travel, and calisthenics side. Both operate simultaneously. Two Shorts exceeded 100,000 organic views. Calisthenics progress documented includes muscle-ups, handstands, and front lever training. Content produced across three languages. No team. No agency. Every frame shot, edited, and published solo.",
    image: "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Images/screenshot%20(41).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2NyZWVuc2hvdCAoNDEpLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODE2OTU1MjMsImV4cCI6MTgxMzIzMTUyM30.gD0NJFkc6T_vE7DDZCSOqCD17b3jEcyPzrPAHorQ0hU",
    role: "Founder, Creator, Editor & Strategist",
    tags: ["Personal Branding", "Content Creation", "Calisthenics"],
    link: "#",
    calloutBox: {
      label: "OUTPUT & REACH",
      content: "Daily posting maintained across multiple platforms simultaneously. Two Shorts crossed 100,000 views organically. Content produced in English, Portuguese, and Sinhalese."
    },
    frameworksDetail: "Shoot, edit, and publish cycle handled solo end to end. Content strategy built around personal documentation rather than trend chasing. Both brands maintained actively alongside business operations."
  },
  {
    id: "proj-5",
    title: "DTC Health Store - Portugal 2025",
    client: "Self - Independent E-Commerce Venture",
    category: "E-Commerce & DTC Strategy",
    year: "2025",
    description: "A direct-to-consumer health and beauty store launched from Portugal targeting the US market. 450+ sessions. Real data. A hard lesson in fulfillment that cost money and built more than any course ever could.",
    longDescription: "Launched a DTC health and beauty e-commerce store in Portugal targeting US consumers. Product lineup focused on health-forward electronics: a portable blending bottle for on-the-go nutrition and thermal skincare devices. The store generated over 450 website sessions with the majority of traffic sourced from the US market. Order fulfillment and cash flow became the breaking point. The store closed at a net loss of approximately $400. Screenshots of bank statements showing -3 euros are retained as proof. The data, the process, and the lesson stayed. This was the most expensive education paid for out of pocket and also one of the most formative.",
    image: "https://mdotuapbbscuxdnbudri.supabase.co/storage/v1/object/sign/Images/skin&guthealth.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjhkZWMyNC1kZGI4LTQzYTQtYWNmYy0yOGVhZmZmNDc5YmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2tpbiZndXRoZWFsdGgucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTY5NjE1MywiZXhwIjoxODEzMjMyMTUzfQ.AN25irVqhd7aG6ZadOXXhyoyqrg_CtZzrzHEqn__hjM",
    role: "Founder, Product Curator & Marketing Lead",
    tags: ["E-Commerce", "DTC Strategy", "US Market Targeting"],
    link: "#",
    calloutBox: {
      label: "VERIFIED DATA",
      content: "450+ website sessions recorded. Primary traffic source: United States. Bank statement and session screenshot documentation retained. Store launched and operated independently from Portugal."
    },
    frameworksDetail: "Product research and supplier sourcing handled independently. Store built and launched solo. Marketing directed entirely at US audience. Fulfillment breakdown documented as primary failure point and learning outcome."
  }
];

export const PRACTICES: PracticeService[] = [
  {
    id: "prac-1",
    name: "Content Creation & Personal Branding",
    description: "Daily multi-platform content across entrepreneurship, lifestyle, and calisthenics. Two Shorts crossed 100K organic views. No team. No agency.",
    status: "Ongoing",
    category: "Content"
  },
  {
    id: "prac-2",
    name: "B2B Sales & Cold Outreach",
    description: "End-to-end outbound sales handling - from cold prospecting and DM sequences to discovery calls and close. US market focused.",
    status: "Active",
    category: "Sales"
  },
  {
    id: "prac-3",
    name: "Organic Social Growth",
    description: "Viral content strategy built on iteration and pattern recognition. 2,000 followers acquired in 10 days. Zero ad spend.",
    status: "Ongoing",
    category: "Growth"
  },
  {
    id: "prac-4",
    name: "Web Design & React Engineering",
    description: "Custom React builds, Tailwind UI systems, and Vercel deployments for real clients. All sites live and indexed on Google Maps.",
    status: "Active",
    category: "Development"
  },
  {
    id: "prac-5",
    name: "Video Production & Cinematic Editing",
    description: "High-production solo edits, brand storytelling, and content produced for businesses and NGOs. Credited on published productions.",
    status: "Ongoing",
    category: "Filmmaking"
  },
  {
    id: "prac-6",
    name: "AI Systems & Business Automation",
    description: "Building and deploying AI receptionist systems for US dental clinics. Make.com and n8n automation stacks for scalable business operations.",
    status: "New",
    category: "AI"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Kento Takahashi",
    handle: "@kentotak_kyoto",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    content: "Benny's understanding of visual atmosphere is unmatched. He turned our winter Kyoto tour campaign into an active work of art. Conversions spiked, but more importantly, our brand reputation reached high-fashion circles.",
    date: "April 2026",
    verified: true
  },
  {
    id: "test-2",
    author: "Sarah Jenkins",
    handle: "@sarahj_dental",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    content: "He built our Digi Dental experience from scratch. Every interaction feels incredibly smooth and premium. He works on a loop, understands business objectives deeply, and requires minimal hand-holding. Incredible partner.",
    date: "May 2026",
    verified: true
  },
  {
    id: "test-3",
    author: "Hiroshi Matsumoto",
    handle: "@hmBrewery",
    avatar: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    content: "The brand video he produced for Sake Horizon captured the ancestral pride of our brewery, yet presented it in a package that speaks flawlessly to modern young audiences in Berlin and SF. Masterful directing.",
    date: "March 2026",
    verified: true
  },
  {
    id: "test-4",
    author: "Aimi Sato",
    handle: "@aimi_design_art",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    content: "His AI Filmmaking workflows blew our mind. Benny constructed a 30-second teaser in 3 days that looked like a multi-million-yen studio shoot. He's at the cutting absolute edge of generative design. Do not hesitate to work with him.",
    date: "June 2026",
    verified: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    number: "01",
    question: "What services do you offer?",
    answer: "AI receptionist systems for dental clinics, high-end web and React UI builds, cinematic video and AI filmmaking, and personal brand content strategy. Everything runs under one roof. You get the full picture, not a single piece of it."
  },
  {
    id: "faq-2",
    number: "02",
    question: "What is your typical turnaround time?",
    answer: "Web and product work: two to four weeks. Video and AI creative: one to three weeks depending on scope. AI dental systems: one day from call to live. That one's already built. It just gets tailored to your practice."
  },
  {
    id: "faq-3",
    number: "03",
    question: "Do you work with international clients?",
    answer: "Primarily US based clients. That's the market I operate in and build for. Everything runs remotely with structured feedback loops, so location is never a blocker on your end."
  },
  {
    id: "faq-4",
    number: "04",
    question: "Do you take on redesign and rebuild projects?",
    answer: "Selectively. I work with established names and brands that have something worth rebuilding. If your site or brand is clunky and you know it, I'll strip it back, remove the noise, and turn it into something that actually performs."
  },
  {
    id: "faq-5",
    number: "05",
    question: "Do you handle branding and content strategy?",
    answer: "For the right partners, yes. I don't take on high volume content work anymore. What I offer is premium, strategic, and tailored. If your brand needs direction and not just output, that's where I come in."
  },
  {
    id: "faq-6",
    number: "06",
    question: "What does your payment structure look like?",
    answer: "50% upfront to lock the project in. 50% on final delivery and handover. For dental AI systems, delivery means your practice is live and running. Monthly retainers are available for select ongoing partners only."
  }
];

export const OFFERS: ServiceOffer[] = [
  {
    id: "off-1",
    title: "AI Call Receptionist",
    price: "$2,000 Setup + $299/mo",
    period: "Ongoing",
    description: "24/7 AI Call Reception & Automated Booking. Never let a lead slip through the cracks again. Our voice-AI receptionist answers every call, schedules directly into your calendar, and handles standard volume effortlessly.",
    features: [
      "24/7 live call answering & intelligent routing",
      "Direct calendar booking with smart conflict resolution",
      "Overage billed at cents/min—only pay for what you use"
    ],
    recommended: true,
    timeline: "Recommended for busy founders & agencies"
  },
  {
    id: "off-2",
    title: "Website Launch",
    price: "From €499",
    period: "Packages",
    description: "Pixel-Perfect Web Design & Development. From a clean single-page site to a fully managed multi-page ecosystem with blog integration and lead magnets. All builds are mobile-responsive, SEO-tuned, and delivered in under 24 hours for starter tiers.",
    features: [
      "Single or multi-page layouts with zero template reuse",
      "1 month post-launch support & SSL certification",
      "Priority updates and custom lead funnel pages included"
    ],
    recommended: false,
    timeline: "Flexible packages for digital presence"
  },
  {
    id: "off-3",
    title: "Calisthenics Coaching",
    price: "$1,000",
    period: "Per Month",
    description: "Bodyweight Strength & Movement Mastery. Progressive calisthenics coaching designed to take you from fundamental control to advanced static holds and dynamic flows. Each month includes custom programming based on your video form analysis.",
    features: [
      "Custom progressive workout cycles scaled to your level",
      "Deep-dive video form correction & mobility prehab",
      "Weekly 1-on-1 check-in calls for accountability"
    ],
    recommended: false,
    timeline: "For intermediate & below athletes"
  },
  {
    id: "off-4",
    title: "Online Business Coaching",
    price: "$2,500",
    period: "Per Month",
    description: "The Business Accelerator & Course Blueprint. High-ticket 1:1 mentorship to architect, launch, and scale your digital knowledge business. We build your funnel, systematize your operations, and map out your path to consistent six-figure months.",
    features: [
      "Weekly deep-dive 1-on-1 strategy & funnel audits",
      "Complete course creation blueprint + sales architecture",
      "Done-for-you systems setup (email, CRM, & offer sequencing)"
    ],
    recommended: false,
    timeline: "For course creators & scaling entrepreneurs"
  }
];
