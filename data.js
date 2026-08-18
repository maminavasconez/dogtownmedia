(function(){
const PROJECTS = [{
  id: "human-content-strategy",
  cat: "SEO & PR",
  client: "Confidential",
  title: "Human-centered content strategy for an HR software company",
  blurb: "Built a contributor-led content strategy: expert guest contributors, structured outlines, author bios and hubs, and internal linking between profiles and articles. Improved E-E-A-T signals and contributed to a +7 DR increase.",
  metric: "+7 DR · 8 trust signals · contributor-led system",
  caseStudyUrl: "project-human-content-strategy"
}, {
  id: "content-audit-software",
  cat: "SEO & PR",
  client: "Confidential",
  title: "Content audit for a software brand",
  blurb: "Built a 4-phase content audit: weighted scoring, search intent mapping, lifecycle alignment, and a prioritized roadmap. Identified 60+ underperforming pages and secured leadership buy-in to scale the editorial program.",
  metric: "60+ pages audited · 4-phase framework · leadership buy-in",
  caseStudyUrl: "project-content-audit-software"
}, {
  id: "knowledge-base-fix",
  cat: "Growth",
  client: "Confidential",
  title: "Knowledge base fix for a software company",
  blurb: "Audited, restructured, and rebuilt a fast-growing knowledge base: reworked categories, merged duplicated articles, improved formatting for LLM and search visibility, and created a repeatable update process.",
  metric: "Full audit · LLM-ready structure · repeatable process",
  caseStudyUrl: "project-knowledge-base"
}, {
  id: "keyword-cannibalization",
  cat: "SEO & PR",
  client: "Confidential",
  title: "Fixing keyword cannibalization",
  blurb: "Removed keyword overlap between SEO and PPC, consolidated authority into stronger pages, rebuilt retargeting, and refocused paid campaigns on BOFU keywords — saving $9.6K in annual ad spend.",
  metric: "$9.6K saved annually · 2 channels realigned",
  caseStudyUrl: "project-keyword-cannibalization"
}, {
  id: "content-calendar-hr",
  cat: "Growth",
  client: "Confidential",
  title: "Content calendar for an HR brand",
  blurb: "Built and executed a 3-month content calendar serving SEO, sales, product, PPC, and customer success. Every topic had a defined role and repurposing plan — contributing to a 22% increase in job seeker sign-ups.",
  metric: "22% more sign-ups · 3-month calendar · 6 teams served",
  caseStudyUrl: "project-content-calendar-hr"
}, {
  id: "content-strategy-gtm",
  cat: "Growth",
  client: "Confidential",
  title: "Content strategy for a GTM consulting agency",
  blurb: "Built a content strategy from scratch: keyword research, TOFU/MOFU/BOFU mapping, topic clusters, content siloing, and a repeatable system for blog planning and SEO growth.",
  metric: "3 funnel stages · 6 topic clusters · repeatable system",
  caseStudyUrl: "project-content-strategy-gtm"
}, {
  id: "pr-internal-data",
  cat: "SEO & PR",
  client: "Confidential",
  title: "PR campaigns using internal data",
  blurb: "Turned an HR brand's internal job posting, salary, and hiring data into research reports that earned 150+ backlinks across news, business, and industry sites.",
  metric: "150+ backlinks · 7 journalist beats · 3x use per report",
  caseStudyUrl: "project-pr-internal-data"
}, {
  id: "ppc-msp",
  cat: "Growth",
  client: "Confidential",
  title: "Built a PPC strategy for an MSP",
  blurb: "Built a full Google Ads launch strategy for an MSP: competitor research, keyword priorities, CPC benchmarks, intent mapping, campaign structure, landing page recommendations, and conversion tracking setup.",
  metric: "Full PPC roadmap · 9 service clusters · launch-ready",
  caseStudyUrl: "project-ppc-msp"
}, {
  id: "b2b-sales",
  cat: "Growth",
  client: "Personal",
  title: "My experience in B2B sales",
  blurb: "Nine frameworks for B2B sales built from experience: mapping the sale, picking the right entry point, leading with insight, diagnosis-style discovery, building offers, making value concrete, handling objections, follow-up, and next steps.",
  metric: "9 frameworks · 6 book recs · weak vs. strong examples",
  caseStudy: true,
  caseStudyUrl: "case-study-b2b-sales"
}, {
  id: "lead-magnets",
  cat: "Growth",
  client: "Confidential",
  title: "How I built lead magnets for lead gen",
  blurb: "A framework for building lead magnets that create sales conversations: scorecards, audits, calculators, checklists, templates, and first-step offers. With 3 framework questions and sales follow-up angles.",
  metric: "6 formats · 3 framework questions · sales-ready",
  caseStudy: true,
  caseStudyUrl: "case-study-lead-magnets"
}, {
  id: "linkedin",
  cat: "Growth",
  client: "IGTMS",
  title: "$250K in pipeline in 60 days",
  blurb: "Multi-channel outbound system: ICP lists, A/B-tested LinkedIn messages, lead magnets, and coordinated email sequences that pre-qualified buyers before a single call.",
  metric: "$250K qualified pipeline · 60 days",
  caseStudyUrl: "case-study-pipeline"
}, {
  id: "dripify-linkedin",
  cat: "LinkedIn",
  client: "Confidential",
  title: "Automated LinkedIn outreach using Dripify",
  blurb: "Built a targeted LinkedIn outreach system using Dripify: connection sequences, follow-up flows, profile visits, and multi-channel sync. 1,006 invites sent, 187 accepted, 10 calls booked.",
  metric: "1,006 invites · 187 accepted · 10 calls booked",
  caseStudyUrl: "project-dripify"
}, {
  id: "seo-foundation",
  cat: "SEO & PR",
  client: "Confidential",
  title: "SEO Foundation presentation",
  blurb: "A beginner-friendly SEO presentation covering research, writing, on-page optimisation, E-E-A-T, and user research. Built to make search strategy clear for teams new to SEO.",
  metric: "Full training deck · available to download",
  caseStudy: true,
  caseStudyUrl: "case-study-seo-foundation"
}, {
  id: "email-process",
  cat: "Email",
  client: "Confidential",
  title: "My process for building an email campaign",
  blurb: "A complete breakdown of how I build outbound email campaigns from scratch: ICP, signal, lead magnets, data sourcing, cleanup, enrichment, personalization, and sending infrastructure.",
  metric: "9-step end-to-end process · signal-led outreach",
  caseStudy: true,
  caseStudyUrl: "case-study-email-process"
},
// gtm-playbook removed — will redo latereStudy: true, caseStudyUrl: "case-study-gtm-playbook" },
{
  id: "gtm-roadmap",
  cat: "Growth",
  client: "Confidential",
  title: "12-month GTM execution roadmap",
  blurb: "Built a full go-to-market plan for a B2B travel platform entering the US market: positioning, ICP, outbound, paid media, CRM structure, and month-by-month execution priorities.",
  metric: "Full GTM operating plan · US market entry",
  caseStudyUrl: "project-gtm-roadmap"
}, {
  id: "intent-campaigns",
  cat: "Growth",
  client: "Confidential",
  title: "Multi-channel campaigns based on intent signals",
  blurb: "Built an outbound system using Lead Fridays, web scraping for job intent signals, Clay enrichment, email verification, and unique AI-written copy per company based on their specific buying signal.",
  metric: "Intent-based outreach · coordinated email and LinkedIn",
  caseStudyUrl: "project-intent-campaigns"
}, {
  id: "hubspot-cleanup",
  cat: "Growth",
  client: "Confidential",
  title: "HubSpot CRM Clean-up",
  blurb: "Pulled HubSpot data into Clay, removed irrelevant leads, scored contacts against the ICP, verified every email, enriched the best matches, and bulk updated HubSpot. Then built automations to keep it clean.",
  metric: "Full CRM rebuilt · automated hygiene system",
  caseStudyUrl: "project-hubspot"
}, {
  id: "email-intent",
  cat: "Growth",
  client: "Confidential",
  title: "Email campaign built on intent data",
  blurb: "Combined purchased data, GovSpend intent signals, Clay enrichment, enrollment data, and Gemini API email sequences to turn a raw lead list into a qualified outbound campaign.",
  metric: "4 meetings per 1,000 emails sent",
  caseStudyUrl: "project-email-intent"
}, {
  id: "visitor-outreach",
  cat: "Growth",
  client: "Confidential",
  title: "Website visitor outreach system",
  blurb: "Connected Leadfeeder and Clay to turn anonymous website traffic into qualified outbound leads for an education ICP, with filters, enrichment, and AI-written email copy.",
  metric: "Anonymous traffic converted to outbound pipeline",
  caseStudyUrl: "case-study-visitor"
}, {
  id: "seo-ai-2026",
  cat: "SEO & PR",
  client: "Confidential",
  title: "How I think about SEO and AI in 2026",
  blurb: "A 9-pillar framework for search visibility across Google, AI Overviews, ChatGPT, Perplexity, Reddit, and more. Covers intent, keyword research, topic clusters, on-page, technical, backlinks, and AI visibility.",
  metric: "9 pillars · 4 intent types · full framework",
  caseStudy: true,
  caseStudyUrl: "case-study-seo-ai-2026"
}, {
  id: "gymshark",
  cat: "SEO & PR",
  client: "Confidential",
  title: "Gymshark SEO teardown for an ecommerce client",
  blurb: "Analysed Gymshark's full organic strategy across category pages, product pages, blog content, internal links, and SERP patterns to build a practical SEO roadmap.",
  metric: "Full SEO strategy board · 8 key findings",
  caseStudy: true,
  caseStudyUrl: "case-study-gymshark"
}, {
  id: "linkedin-algorithm",
  cat: "LinkedIn",
  client: "Confidential",
  title: "How the LinkedIn Algorithm Works",
  blurb: "A breakdown of the 3-stage distribution filter, engagement multipliers (shares at 6×, comments at 4×), posting frameworks, and the first-hour tactics behind consistent LinkedIn reach.",
  metric: "11 chapters · full guide + download",
  caseStudy: true,
  caseStudyUrl: "case-study-linkedin-algorithm"
}, {
  id: "claude-code-marketing",
  cat: "Growth",
  client: "Confidential",
  title: "12 ways to use Claude Code for marketing",
  blurb: "Automation patterns for marketing teams: lead digests, email intelligence, campaign assets, contact enrichment, webinar follow-up, content repurposing, QA, customer stories, partner coordination, lead scoring, and analytics summaries.",
  metric: "12 use cases · 4h saved weekly",
  caseStudy: true,
  caseStudyUrl: "case-study-claude-code-marketing"
}, {
  id: "intent-signals",
  cat: "Growth",
  client: "Confidential",
  title: "5 intent signals for lead gen",
  blurb: "How to identify and stack behavioral buying signals to prioritize outbound outreach: job change, technographic, hiring, content intent, and social engagement. With step-by-step tooling for each.",
  metric: "5 signals · 4 tools each · stacking framework",
  caseStudy: true,
  caseStudyUrl: "case-study-intent-signals"
}, {
  id: "tumodo",
  cat: "Growth",
  client: "Tumodo",
  title: "US-market GTM and investor deck",
  blurb: "Positioning, financials, and proof points aligned to US VC expectations for a Middle-East-to-US relocation.",
  metric: "Funding round closed · US launch by end-2025",
  caseStudy: true
}, {
  id: "portfolio-website",
  cat: "Website",
  client: "Personal",
  title: "Building my portfolio website",
  blurb: "Full concept-to-launch process: design system, site structure, high-fidelity pages, content refinement, code build, animations, local testing, and deployment through GitHub and Vercel.",
  metric: "8 steps · design to live site",
  caseStudyUrl: "project-portfolio-website"
}, {
  id: "blog",
  cat: "Website",
  client: "Confidential",
  title: "Blog UX revamp to increase engagement",
  blurb: "Redesigned a recruiting blog with cleaner hierarchy, improved article previews, a persistent CTA, and A/B testing. Coordinated with a UX designer to turn the blog into an active engagement asset.",
  metric: "+63% time on page · 5x CTR",
  caseStudyUrl: "project-blog-ux"
}, {
  id: "councils",
  cat: "SEO & PR",
  client: "Confidential",
  title: "Earning DR 90+ backlinks through council memberships",
  blurb: "Leveraged Forbes, Fast Company, and Newsweek council memberships to earn 120+ NF links from top-tier publications through expert panels and bylined articles.",
  metric: "120+ NF links · 30+ articles · DR 90+ average",
  caseStudyUrl: "project-councils"
}, {
  id: "competitor-backlinks",
  cat: "SEO & PR",
  client: "Confidential",
  title: "Stealing competitors' backlinks",
  blurb: "Built a scalable outreach system targeting competitor backlink profiles. Used Ahrefs, Clay for enrichment and AI personalization, and Instantly for automated sending and follow-ups.",
  metric: "200+ monthly links · 3 competitors · 5 verticals",
  caseStudyUrl: "project-competitor-backlinks"
}, {
  id: "sculpture-cancun",
  cat: "Website",
  client: "Sculpture Cancun",
  title: "Premium website for a plastic surgery clinic",
  blurb: "Built a bilingual English and Spanish website for a plastic surgery clinic in Cancún: premium visual identity, service pages, before-and-after sections, and a design system built to establish trust with local and international patients.",
  metric: "Bilingual · EN + ES · Live at sculpturecancun.com",
  caseStudyUrl: "project-sculpture-cancun"
}, {
  id: "influencer-network",
  cat: "Growth",
  client: "Confidential",
  title: "Building an influencer network for an SEO agency",
  blurb: "Built an expert quote strategy, LinkedIn content system, and conference campaigns that grew the company page from 1,000 to 6,000 followers in 5 months through organic visibility.",
  metric: "1K to 6K LinkedIn followers · 5 months · 0 paid",
  caseStudyUrl: "project-influencer-network"
}, {
  id: "reddit-monitoring",
  cat: "Growth",
  client: "Personal",
  title: "Reddit monitoring automation",
  blurb: "Built a weekly automated workflow using Claude Code: scrapes selected subreddits, filters posts with AI, generates suggested responses, and delivers a curated digest by email.",
  metric: "Weekly automated workflow · 4-layer prompt pipeline",
  caseStudyUrl: "project-reddit-monitoring"
}, {
  id: "newsletter-recruitment",
  cat: "Email",
  client: "Confidential",
  title: "Newsletter rebuild for a recruitment company",
  blurb: "Rebuilt a broken newsletter program for a recruitment company with 600K+ dormant applicants. Email verification, separate sending domains, audience segmentation, and a gradual rollout that cut acquisition costs by 39%.",
  metric: "39% lower acquisition costs · 18% more applicants per job",
  caseStudyUrl: "project-newsletter-recruitment"
}, {
  id: "slack-community",
  cat: "SEO & PR",
  client: "Confidential",
  title: "Managing a paid backlink community in Slack",
  blurb: "Managed member entry, prospect outreach, and quality control for a paid Slack community built around backlink collaboration. 75% monthly retention and 400+ quarterly DR 50+ links.",
  metric: "75% retention · 400+ quarterly links · DR 50+ avg",
  caseStudyUrl: "project-slack-community"
}, {
  id: "backlinks",
  cat: "SEO & PR",
  client: "Confidential",
  title: "Backlinks from unclaimed brand mentions",
  blurb: "Mined Ahrefs for DR-50+ mentions, found contacts via Hunter, ran personalized BuzzStream sequences.",
  metric: "200+ backlinks/month · 45% reply rate",
  caseStudyUrl: "project-backlinks"
}, {
  id: "temple",
  cat: "Website",
  client: "Confidential",
  title: "Revamp an MSP website to stand out",
  blurb: "Repositioned an MSP away from generic IT language, built service-specific PPC landing pages, developed real case studies, and improved CTAs and user journeys across the site.",
  metric: "New brand presence + PPC-ready site",
  caseStudyUrl: "project-msp-website"
}];
const FEATURED_IDS = ["seo-foundation", "email-process", "dripify-linkedin", "linkedin", "gtm-roadmap", "b2b-sales"];
const EXPERIENCE = [{
  range: "2025 — Now",
  role: "Growth & Marketing Lead",
  company: "Senturo",
  initials: "SE",
  bullets: ["Run cold email strategies for demand generation", "Support all media content and conferences", "Run data analysis and lead support for SDRs", "Design assets: presentations, web prototypes, decks"]
}, {
  range: "2025",
  role: "Growth Consultant",
  company: "Howl Louder",
  initials: "HL",
  bullets: ["Support outbound strategy across LinkedIn and email for B2B teams", "Work on LinkedIn content and community strategy", "Help refine ICPs, messaging, and sequencing for outbound programs", "Focus on execution, testing, and signal-based strategies for lead-gen and retention", "Create sales strategies for Howl"]
}, {
  range: "2024",
  role: "Head of Growth",
  company: "IGTMS",
  initials: "IG",
  bullets: ["Develop go-to-market strategies for clients", "Manage multichannel lead generation campaigns and client acquisition", "Manage outbound automation and lead collection (Apollo.io, Clay, Instantly)", "Manage content strategy across blogs and social media"]
}, {
  range: "2024",
  role: "Brand Manager",
  company: "Digital Olympus",
  initials: "DO",
  bullets: ["Oversaw PR campaigns for clients including G2, Ramp, and Credo", "Managed content creation on LinkedIn, Instagram, X, and YouTube — including webinars and podcasts", "Co-managed a Slack-based link-building community of 1,000+ members", "Found sponsorships and sold tickets for conferences through cold outreach", "Created an influencer brand-promotion network"]
}, {
  range: "2022 — 2024",
  role: "Brand Manager",
  company: "Lensa",
  initials: "LE",
  bullets: ["Ran content strategy across the blog, website, and social media channels", "Aligned Google, Instagram, and Facebook ad campaigns with target keywords", "Conducted SEO audits and led optimization efforts for clients", "Performed monthly SEO audits and managed website health", "Created an affiliate and influencer network"]
}, {
  range: "2021 — 2023",
  role: "SEO & Content Strategist",
  company: "Digital Pipl",
  initials: "DP",
  bullets: ["Managed client LinkedIn profiles and social media content calendars", "Supported job ad campaigns across Google and LinkedIn", "Provided SEO consultation for career landing pages and internal job-board visibility", "Supported PR and media positioning for executive and B2B client profiles"]
}, {
  range: "2020 — 2022",
  role: "SEO & Digital PR Consultant",
  company: "LuckBooster",
  initials: "LB",
  bullets: ["Managed LinkedIn accounts of client profiles", "Supported Google, LinkedIn, and Instagram ad campaigns", "Ghostwrote content for clients across industries", "Provided SEO services: link-building campaigns, content optimization, content audits, and thought leadership opportunities"]
}];
const QUOTES = [{
  text: "When it comes to growth marketing, Martina is a swiss army knife. She understands every strategy and lever to pull and makes it look effortless. Martina was the spark that really got our company going on our most recent growth cycle. She has an owners mentality and took our growth personally in a way you rarely see. I couldn't recommend her more!",
  name: "Dan Cooley",
  role: "CEO @ Howl",
  initials: "DC"
}, {
  text: "I've worked with Martina on a few projects, and she consistently brings sharp thinking around growth, GTM, and lead generation. She knows how to connect strategy, messaging, and outreach in a way that helps turn ideas into real opportunities.",
  name: "Stefan Repin",
  role: "ABM @ Backbase",
  initials: "SR"
}, {
  text: "Martina's work across SEO and content is always creative, actionable, and most importantly, fun! Her ability to drive growth with a strong strategy never fails.",
  name: "Eric Hoover",
  role: "SEO & AI Director @ Keepler",
  initials: "EH"
}, {
  text: "We brought Martina in because she'd already worked with agencies and had experience in industries adjacent to ours, so she ramped up fast. She's proactive at spotting trends and turning them into timely, relevant posts (reactive marketing), and she consistently brings fresh ideas to the table. What stood out most was her ability to use humor in a smart, business-appropriate way, making more technical topics feel relatable and easy to consume.",
  name: "Zacharias Xiroudakis",
  role: "Managing Director @ Minuttia",
  initials: "ZX"
}, {
  text: "There are many great designers around the world, but it is extremely difficult to find one who can truly understand what you want to communicate through your brand. Martina is very professional, and from the very beginning, she understood what we were looking for.\n\nShe is a true artist because she designed everything from scratch and played an essential role in giving our brand the level of professionalism we wanted. She was very receptive, punctual, and organized. Easy to talk to, an incredible experience, and we highly recommend her.",
  name: "Adolfo Moreno",
  role: "CEO @ Sculpture Cancun",
  initials: "AM"
}];
const SKILLS = [{
  title: "01 Growth & GTM strategies",
  tags: ["GTM positioning", "ICP & ABM", "Lifecycle & retention", "Sales enablement"]
}, {
  title: "02 Content marketing",
  tags: ["LinkedIn social media", "Editorial calendars", "Brand storytelling", "Community"]
}, {
  title: "03 Lead generation",
  tags: ["Outbound automation", "Paid campaigns", "Email sequences", "List building"]
}, {
  title: "04 SEO & digital PR",
  tags: ["Technical audits", "Link building", "Thought leadership", "E-E-A-T"]
}, {
  title: "05 Paid acquisition",
  tags: ["Google", "Meta", "LinkedIn", "TikTok", "YouTube"]
}];
const TOOLS = ["HubSpot", "Apollo.io", "Clay", "Instantly", "EmailBison", "Dripify", "LinkedIn Sales Nav", "Ahrefs", "SEMrush", "Hunter.io", "Looker Studio", "Tableau", "Figma", "Notion", "Click Up", "Claude Code", "Google Analytics", "Go High Level", "Canva", "Social Seed"];
const LANGUAGES = [{
  name: "Spanish",
  level: "Native",
  flag: "🇪🇨"
}, {
  name: "English",
  level: "Native",
  flag: "🇺🇸"
}, {
  name: "German",
  level: "Conversational",
  flag: "🇩🇪"
}];
const COMPANIES = ["IGTMS", "Lensa", "Digital Olympus", "Digital Pipl", "G2", "Ramp", "Credo", "ScaleArmy", "Tumodo", "Senturo", "Temple-IT", "Platforce", "Projective Staffing", "Fast Talent", "Howl", "Cumbayá Padel Club", "Minuttia", "LuckBooster"];
const WRITING = [{
  tag: "Growth",
  title: "How to build a backlink engine that runs without you",
  summary: "What a paid Slack community taught me about scaling SEO without spam, paid placements, or PBNs. A teardown of the model that delivered 400 quality backlinks every quarter.",
  date: "Coming soon",
  read: "8 min read",
  variant: "featured"
}, {
  tag: "GTM",
  title: "Intent signals over volume",
  summary: "Why I traded big lists for small ones, and the 3× reply rates that came with it.",
  date: "Coming soon",
  read: "5 min read",
  variant: "lime"
}, {
  tag: "Leadership",
  title: "Notes from leading growth at three startups at once",
  summary: "What changes when you stop optimizing channels and start designing systems.",
  date: "Coming soon",
  read: "6 min read",
  variant: "violet"
}, {
  tag: "SEO",
  title: "The keyword cannibalization audit nobody runs",
  summary: "A simple cross-reference of GSC + Google Ads that saved one client $18k a year. The query, the spreadsheet, the rules.",
  date: "Coming soon",
  read: "7 min read"
}, {
  tag: "Brand",
  title: "How to make your CEO famous (and why it's worth it)",
  summary: "On council memberships, the Forbes path, and the difference between thought leadership and thought-leadership-shaped content.",
  date: "Coming soon",
  read: "9 min read"
}, {
  tag: "Career",
  title: "Things I wish someone told me before going from IC to lead",
  summary: "Managing managers, picking your battles, and learning to stop touching the work.",
  date: "Coming soon",
  read: "4 min read"
}];
const TIMELINE = [{
  year: "2026",
  imgId: "timeline-img-2026",
  pos: "center center",
  title: "Join the Senturo Team",
  place: "REMOTE",
  body: "Currently leading growth and marketing at Senturo. A picture of me in one of the conferences we attend as a team.",
  img: "violet"
}, {
  year: "2025",
  imgId: "timeline-img-2025",
  pos: "center center",
  title: "Became a Jeweler",
  place: "LATAM",
  body: "Learned how to make jewelry and completely fell in love with the process. I work mostly with silver and gold, and I love how much patience and attention to detail it requires.",
  img: "lime"
}, {
  year: "2025",
  imgId: "timeline-img-2025b",
  pos: "center center",
  title: "Backpacked South America",
  place: "SOUTH AMERICA",
  body: "6 countries, 5 months, from Patagonia to Ecuador.",
  img: "default"
}, {
  year: "2024",
  imgId: "timeline-img-2024",
  pos: "center center",
  title: "Brand Manager at Digital Olympus",
  place: "EINDHOOVEN",
  body: "Helped organize a conference in Holland, making sure the day ran smoothly from speakers to ticket sales. I also helped build an influencer network that supported promotion and helped sell out the event.",
  img: "default"
}, {
  year: "2021",
  imgId: "timeline-img-2021",
  pos: "center 30%",
  title: "Graduated University",
  place: "BUDAPEST",
  body: "I studied Business at IBS in Budapest through their partnership with the University of Buckingham, which is where my degree is from. I graduated summa cum laude, top of my class, with a 4.2 GPA.",
  img: "violet"
}, {
  year: "2020",
  imgId: "timeline-img-2020",
  pos: "center center",
  title: "Started my career at Lensa",
  place: "BUDAPEST",
  body: "While I had a few jobs before this, Lensa will always hold a special place in my heart. I started as a link builder and grew into the official Brand Manager, working alongside the Head of Marketing and helping lead the marketing department.",
  img: "lime"
}, {
  year: "2019",
  imgId: "timeline-img-2019",
  pos: "center 55%",
  title: "Moved to Lisboa",
  place: "LISBOA",
  body: "Studied abroad in Lisbon for one semester at ISCTE.",
  img: "default"
}, {
  year: "2018",
  imgId: "timeline-img-2018",
  pos: "center 25%",
  title: "Lived in Germany",
  place: "HAMBURG, GERMANY",
  body: "I lived in Hamburg with Rotary, learned German, and spent the year supporting the organization through community and charity work. A very special little chapter with many new experiences, lessons, and really good memories.",
  img: "black"
}, {
  year: "2017",
  imgId: "timeline-img-2017",
  pos: "center center",
  title: "Live in the UAE",
  place: "ABU DHABI",
  body: "I lived in the UAE while studying online, which gave me a lot of flexibility to experience a new place in my own rhythm. It was a really special chapter, full of new routines, new places, and a lot of growing up.",
  img: "default"
}, {
  year: "2015",
  imgId: "timeline-img-2015",
  pos: "center 40%",
  title: "Lived in Jordan",
  place: "JORDAN",
  body: "I lived in Amman for a year and attended an international school. I also learned a bit of Arabic, met people from all over the world, and experienced Jordan in a special way.",
  img: "default"
}, {
  year: "2011",
  imgId: "timeline-img-2011",
  pos: "center center",
  title: "Lived in Cameroon",
  place: "CAMEROON",
  body: "I spent a year in Cameroon, where I went to a French school and learned french. It was a beautiful experience and a really special part of my life.",
  img: "lime"
}];
Object.assign(window, {
  PROJECTS,
  FEATURED_IDS,
  EXPERIENCE,
  QUOTES,
  SKILLS,
  TOOLS,
  LANGUAGES,
  COMPANIES,
  WRITING,
  TIMELINE
});
})();
