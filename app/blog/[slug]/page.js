'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal';

/* ─── ALL BLOG POST DATA WITH FULL CONTENT ─── */
const allPosts = [
  {
    slug: 'journey-of-nakshatra-reaching-millions',
    category: 'Case Studies',
    title: 'Journey of Nakshatra Reaching Millions — A CreatorStick Media Success Story',
    excerpt: 'How CreatorStick Media transformed Nakshatra Cultural Fest\'s digital presence from zero to 2M+ reach through strategic content growth, brand building, and creative storytelling.',
    date: 'April 1, 2026',
    readTime: '12 min read',
    author: 'CreatorStick Media',
    tag: 'Case Study',
    tagColor: '#10b981',
    heroColor: 'rgba(255,107,0,0.12)',
    content: [
      {
        type: 'lead',
        text: 'Nakshatra Cultural Fest at MIT Academy of Engineering is one of Western India\'s most vibrant college festivals. But before CreatorStick Media stepped in, their Instagram page had minimal reach, inconsistent content, and zero brand strategy. What followed was a digital transformation that generated over 2 million impressions.',
      },
      {
        type: 'heading',
        text: 'The Brief',
      },
      {
        type: 'paragraph',
        text: 'The Nakshatra organizing committee reached out to CreatorStick Media with one clear goal: make the fest impossible to ignore on social media. They wanted awareness, engagement, and footfall — all driven through Instagram.',
      },
      {
        type: 'metrics',
        items: [
          { value: '2M+', label: 'Total Reach' },
          { value: '500%', label: 'Follower Growth' },
          { value: '15K+', label: 'Engagements' },
          { value: '45+', label: 'Posts Published' },
        ],
      },
      {
        type: 'heading',
        text: 'Our Strategy',
      },
      {
        type: 'paragraph',
        text: 'We broke the campaign into three phases: Pre-Fest Hype, Fest Day Coverage, and Post-Fest Amplification. Each phase had specific content goals, a publishing cadence, and a targeted hashtag strategy.',
      },
      {
        type: 'list',
        title: 'Phase 1 — Pre-Fest Hype (6 weeks out)',
        items: [
          'Dramatic countdown reels with motion graphics and original music',
          'Artist and performer reveal content with teaser edits',
          'Interactive stories: polls, quizzes, countdown stickers',
          'Collaboration outreach with 20+ college pages for shoutouts',
          'Hashtag research: identified 15 high-reach, low-competition tags',
        ],
      },
      {
        type: 'list',
        title: 'Phase 2 — Fest Day Coverage',
        items: [
          'Live story updates every 30 minutes throughout the event',
          'Rapid-cut performance reels uploaded within 2 hours of each set',
          'Crowd energy and vibe content for organic shares',
          'Real-time engagement: replying to comments and DMs',
        ],
      },
      {
        type: 'list',
        title: 'Phase 3 — Post-Fest Amplification',
        items: [
          'Cinematic aftermovie cut to trending audio',
          'Top moments compilation reels',
          'Thank you posts driving community loyalty',
          'Archive-worthy highlight collections',
        ],
      },
      {
        type: 'heading',
        text: 'The Results',
      },
      {
        type: 'paragraph',
        text: 'The campaign exceeded every benchmark. The Nakshatra Instagram page went from a dormant account to one of the most active college fest pages in Maharashtra. The aftermovie alone crossed 500K views in 48 hours.',
      },
      {
        type: 'quote',
        text: '"CreatorStick Media didn\'t just manage our Instagram — they built a brand. The fest felt bigger because of the digital energy they created around it."',
        author: '— Nakshatra Cultural Fest Team',
      },
      {
        type: 'heading',
        text: 'What This Means for Your Brand',
      },
      {
        type: 'paragraph',
        text: 'The Nakshatra story proves that with the right content strategy, any brand or events can achieve massive organic reach without heavy paid media spend. Strategy, consistency, and storytelling are the real amplifiers.',
      },
    ],
  },
  {
    slug: 'building-brand-identity-that-lasts',
    category: 'Brand Strategy',
    title: 'How to Build a Brand Identity That Lasts — Brand Building Guide by CreatorStick Media',
    excerpt: 'Your brand is more than a logo — it\'s a promise. CreatorStick Media shares the strategic foundations of brand building that create lasting recognition and content growth.',
    date: 'March 28, 2026',
    readTime: '6 min read',
    author: 'CreatorStick Media',
    tag: 'Strategy',
    tagColor: '#FF6B00',
    heroColor: 'rgba(255,107,0,0.08)',
    content: [
      { type: 'lead', text: 'A brand is not what you say it is — it\'s what they say it is. Building an identity that lasts means creating something that resonates beyond the visual, into the emotional and rational minds of your audience.' },
      { type: 'heading', text: 'Start with Purpose, Not Pixels' },
      { type: 'paragraph', text: 'Every great brand begins with a clear answer to three questions: Why do you exist? Who do you serve? What do you stand for? These aren\'t marketing taglines — they\'re the strategic foundation that every visual, copy, and campaign decision flows from.' },
      { type: 'heading', text: 'The 4 Pillars of Lasting Brand Identity' },
      { type: 'list', title: '', items: ['Visual Consistency — Logo, colors, typography used uniformly', 'Voice Consistency — Tone that sounds the same across all channels', 'Value Clarity — What you stand for is unmistakably clear', 'Audience Alignment — You speak like your audience thinks'] },
      { type: 'heading', text: 'Common Mistakes to Avoid' },
      { type: 'paragraph', text: 'Most brands fail because they confuse logo design with brand identity. A logo is just one element. The real brand lives in the experience — how quickly you respond, what your packaging feels like, how your team talks about the product.' },
      { type: 'quote', text: '"Consistency is the mother of mastery. For brands, consistency is the mother of recognition."', author: '— CreatorStick Media Strategy Team' },
      { type: 'heading', text: 'How CreatorStick Media Builds Brands' },
      { type: 'paragraph', text: 'Our brand strategy process starts with a deep discovery session, moves into competitive landscape mapping, then into identity design and voice development — all before a single piece of content goes live.' },
    ],
  },
  {
    slug: 'creator-economy-india-2026',
    category: 'Creator Economy',
    title: 'The State of the Creator Economy in India — 2026',
    excerpt: 'India\'s creator economy has crossed ₹3,000 crore. CreatorStick Media breaks down the trends, niches, and content growth opportunities every brand needs to understand right now.',
    date: 'March 21, 2026',
    readTime: '9 min read',
    author: 'CreatorStick Media',
    tag: 'Trends',
    tagColor: '#6366f1',
    heroColor: 'rgba(99,102,241,0.1)',
    content: [
      { type: 'lead', text: 'India\'s creator economy is no longer emerging — it has arrived. With over 80 million content creators, ₹3,000+ crore in market size, and platforms doubling down on monetization tools, this is the biggest opportunity for brands and creators alike.' },
      { type: 'heading', text: 'The Numbers That Matter' },
      { type: 'metrics', items: [{ value: '80M+', label: 'Active Creators' }, { value: '₹3,000Cr', label: 'Market Size' }, { value: '2x', label: 'YoY Growth' }, { value: '65%', label: 'Aged Under 35' }] },
      { type: 'heading', text: 'Top Niches Growing Fast' },
      { type: 'list', title: '', items: ['Finance & Investing — regional-language creators are dominating', 'Health & Wellness — post-pandemic curiosity converted to loyalty', 'Gaming — mobile gaming creators have 3x higher engagement', 'Edu-Tech — micro-learning content is having its moment', 'Regional Lifestyle — tier 2 and tier 3 city creators outperforming metro counterparts'] },
      { type: 'heading', text: 'What Brands Need to Do Now' },
      { type: 'paragraph', text: 'The brands winning the creator economy in 2026 are the ones who treat creators as partners, not vendors. Long-term collaborations, co-created content, and authentic alignment are outperforming one-off sponsored posts by 4x in engagement.' },
      { type: 'quote', text: '"The creator economy isn\'t a trend. It\'s the next phase of how trust is built between businesses and consumers."', author: '— CreatorStick Media Report, 2026' },
    ],
  },
  {
    slug: 'winning-influencer-campaign-blueprint',
    category: 'Case Studies',
    title: 'Inside a Winning Influencer Campaign: CreatorStick Media Blueprint',
    excerpt: 'Behind the scenes of a brand building campaign that generated 2.8x ROI and 4.2M impressions — including brief frameworks, creator selection, and measurement.',
    date: 'March 14, 2026',
    readTime: '8 min read',
    author: 'CreatorStick Media',
    tag: 'Case Study',
    tagColor: '#10b981',
    heroColor: 'rgba(16,185,129,0.1)',
    content: [
      { type: 'lead', text: 'Behind every successful influencer campaign is a framework that most brands never see. Here\'s exactly how CreatorStick Media planned, executed, and measured a D2C brand campaign that delivered 2.8x ROI and 4.2M impressions.' },
      { type: 'heading', text: 'Step 1: Define the Brief with Surgical Precision' },
      { type: 'paragraph', text: 'A campaign without a tight brief is a campaign without direction. We start every campaign with a one-page brief that covers campaign objective (awareness, traffic, conversions), target audience persona, brand do\'s and don\'ts, and success KPIs.' },
      { type: 'heading', text: 'Step 2: Creator Selection (The Science Behind the Art)' },
      { type: 'list', title: 'Our 5-point creator vetting framework:', items: ['Audience authenticity score (fake follower detection)', 'Engagement rate benchmarked against category average', 'Content quality and aesthetic alignment', 'Audience-brand overlap (psychographic match)', 'Past brand collaboration performance data'] },
      { type: 'heading', text: 'Step 3: Content Strategy and Approval' },
      { type: 'paragraph', text: 'We brief creators with enough direction to be brand-safe and enough freedom to be authentic. The most important element: the hook. The first 3 seconds determine 70% of view-through rate.' },
      { type: 'metrics', items: [{ value: '2.8x', label: 'ROI Delivered' }, { value: '4.2M', label: 'Impressions' }, { value: '12', label: 'Creators Used' }, { value: '6 wks', label: 'Campaign Duration' }] },
      { type: 'quote', text: '"Great influencer campaigns are 30% creator selection, 40% brief quality, and 30% post-campaign amplification."', author: '— CreatorStick Media Strategy Team' },
    ],
  },
  {
    slug: 'social-media-trends-brands-2026',
    category: 'Marketing',
    title: 'Social Media Trends Every Brand Should Know in 2026',
    excerpt: 'From AI-generated content to long-form video and micro-communities — CreatorStick Media covers the platforms, formats and content growth strategies winning attention this year.',
    date: 'March 7, 2026',
    readTime: '7 min read',
    author: 'CreatorStick Media',
    tag: 'Trends',
    tagColor: '#6366f1',
    heroColor: 'rgba(99,102,241,0.08)',
    content: [
      { type: 'lead', text: 'The social media landscape in 2026 is faster, noisier, and more competitive than ever. But the brands cutting through aren\'t necessarily the ones with the biggest budgets — they\'re the ones who understand the platforms deeply.' },
      { type: 'heading', text: '1. Long-Form is Back (and Winning)' },
      { type: 'paragraph', text: 'Counterintuitively, long-form content is outperforming short-form in watch time and conversion. YouTube videos over 10 minutes, Instagram carousels with 10+ slides, and LinkedIn articles with 1,500+ words are all seeing algorithm boosts.' },
      { type: 'heading', text: '2. AI-Assisted ≠ AI-Generated' },
      { type: 'paragraph', text: 'Audiences are getting better at detecting fully AI-generated content. The winning formula is AI-assisted creation: using AI for ideation, scripting, and editing while keeping the human voice and perspective intact.' },
      { type: 'heading', text: '3. Micro-Communities are the New Mass Market' },
      { type: 'paragraph', text: 'Niche communities on Reddit, Telegram, Discord, and private Instagram groups are driving higher-quality engagement and conversion than broadcast content. Brands building owned communities are seeing 5x higher retention.' },
      { type: 'list', title: 'Platforms to Watch in 2026:', items: ['Instagram — still the #1 brand platform in India', 'YouTube Shorts — fastest growing short-form in India', 'LinkedIn — creators are monetizing like never before', 'Threads — growing fast among urban professionals', 'Substack — newsletters are the new podcast'] },
      { type: 'quote', text: '"In 2026, distribution is not the problem. Attention is the problem. Build content worth paying attention to."', author: '— CreatorStick Media' },
    ],
  },
  {
    slug: 'content-calendar-brand-growth',
    category: 'Marketing',
    title: 'Why Your Brand Needs a Proper Content Calendar for Content Growth',
    excerpt: 'Consistency beats creativity in the long run. Learn how CreatorStick Media uses structured content calendars for brand building and doubling output without burnout.',
    date: 'February 28, 2026',
    readTime: '5 min read',
    author: 'CreatorStick Media',
    tag: 'Strategy',
    tagColor: '#FF6B00',
    heroColor: 'rgba(255,107,0,0.08)',
    content: [
      { type: 'lead', text: 'The biggest content growth hack isn\'t a viral formula. It\'s consistency. And consistency at scale requires a system — specifically, a well-built content calendar that your team can actually stick to.' },
      { type: 'heading', text: 'What a Good Content Calendar Actually Contains' },
      { type: 'list', title: '', items: ['Post date and time (platform-specific optimal windows)', 'Content type (reel, carousel, story, post)', 'Topic / campaign pillar', 'Assigned team member', 'Status (draft, review, approved, published)', 'Performance target (reach, saves, shares)'] },
      { type: 'heading', text: 'The 3-Pillar Content Framework' },
      { type: 'paragraph', text: 'We use a simple 3-pillar framework for every brand: Educational (30%) — teach your audience something valuable. Engagement (40%) — invite interaction, shares, saves. Promotional (30%) — direct CTA and product/service focus. This ratio keeps audiences engaged without feeling sold to.' },
      { type: 'heading', text: 'How to Build One That Actually Gets Used' },
      { type: 'paragraph', text: 'The best calendar is the one your team opens every Monday morning. Keep it simple, visual, and synced to your communication tool. We use Notion for most of our clients — it\'s flexible, shareable, and free.' },
      { type: 'quote', text: '"Content without a calendar is like a road trip without a map. You might get somewhere interesting, but you probably won\'t get where you need to go."', author: '— CreatorStick Media' },
    ],
  },
  {
    slug: 'small-business-digital-marketing-guide',
    category: 'Industry Insights',
    title: 'The Small Business Digital Marketing & Brand Building Guide for 2026',
    excerpt: 'Digital marketing on a lean budget doesn\'t mean low results. CreatorStick Media covers the channels and content growth tactics that deliver the highest ROI for small brands.',
    date: 'February 20, 2026',
    readTime: '10 min read',
    author: 'CreatorStick Media',
    tag: 'Guide',
    tagColor: '#0ea5e9',
    heroColor: 'rgba(14,165,233,0.08)',
    content: [
      { type: 'lead', text: 'You don\'t need a ₹50 lakh marketing budget to build a powerful brand in 2026. What you need is a clear strategy, smart channel selection, and consistent execution. Here\'s the CreatorStick Media playbook for small business digital marketing.' },
      { type: 'heading', text: 'Start with One Platform, Not Five' },
      { type: 'paragraph', text: 'Small businesses make the mistake of trying to be everywhere at once. Pick the single platform where your ideal customer spends the most time, master it completely, then expand. For most Indian small businesses, that\'s Instagram first.' },
      { type: 'heading', text: 'The Highest-ROI Channels for Small Brands' },
      { type: 'list', title: '', items: ['Instagram Organic — zero cost, massive reach potential if consistent', 'Google My Business — free, drives local discovery and trust', 'WhatsApp Business — highest open rate of any channel (98%)', 'Email (if B2B) — ₹1 spend = ₹38 average return', 'YouTube — builds authority over time, algorithm rewards consistency'] },
      { type: 'heading', text: 'Content That Converts for Small Businesses' },
      { type: 'paragraph', text: 'Behind-the-scenes content, customer testimonials, and process videos outperform polished brand content for small businesses. Authenticity is your unfair advantage over big brands.' },
      { type: 'metrics', items: [{ value: '₹0', label: 'Min. Budget Needed' }, { value: '3-6M', label: 'Months to See Results' }, { value: '98%', label: 'WhatsApp Open Rate' }, { value: '4x', label: 'ROI vs Paid Ads' }] },
      { type: 'quote', text: '"The best marketing for a small business is a great product and one customer who tells their friends. Everything else amplifies that."', author: '— CreatorStick Media' },
    ],
  },
];

function ContentBlock({ block, index }) {
  switch (block.type) {
    case 'lead':
      return (
        <ScrollReveal delay={index * 0.05}>
          <p className="text-xl md:text-2xl leading-relaxed font-medium mb-10" style={{ color: 'var(--heading)' }}>
            {block.text}
          </p>
        </ScrollReveal>
      );
    case 'heading':
      return (
        <ScrollReveal delay={index * 0.05}>
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat mt-12 mb-5" style={{ color: 'var(--heading)' }}>
            {block.text}
          </h2>
        </ScrollReveal>
      );
    case 'paragraph':
      return (
        <ScrollReveal delay={index * 0.05}>
          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            {block.text}
          </p>
        </ScrollReveal>
      );
    case 'list':
      return (
        <ScrollReveal delay={index * 0.05}>
          <div className="mb-8">
            {block.title && (
              <p className="font-semibold mb-3" style={{ color: 'var(--heading)' }}>{block.title}</p>
            )}
            <ul className="space-y-3">
              {block.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-base" style={{ color: 'var(--muted)' }}>
                  <span className="text-orange mt-1 flex-shrink-0 text-xs">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      );
    case 'metrics':
      return (
        <ScrollReveal delay={index * 0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
            {block.items.map((m, i) => (
              <div key={i} className="text-center p-5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="text-3xl md:text-4xl font-bold font-montserrat gradient-text">{m.value}</div>
                <div className="text-xs uppercase tracking-wider mt-2" style={{ color: 'var(--muted)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      );
    case 'quote':
      return (
        <ScrollReveal delay={index * 0.05}>
          <blockquote className="my-10 pl-6 border-l-4 border-orange">
            <p className="text-lg md:text-xl italic leading-relaxed mb-3" style={{ color: 'var(--heading)' }}>
              {block.text}
            </p>
            {block.author && (
              <cite className="text-sm not-italic" style={{ color: 'var(--muted)' }}>{block.author}</cite>
            )}
          </blockquote>
        </ScrollReveal>
      );
    default:
      return null;
  }
}

/* ─── PAGE COMPONENT ─── */
export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug;
  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">📭</div>
          <h1 className="text-3xl font-bold font-montserrat mb-4" style={{ color: 'var(--heading)' }}>
            Article Not Found
          </h1>
          <p className="mb-8" style={{ color: 'var(--muted)' }}>
            This article doesn't exist or may have been moved.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-orange text-white px-8 py-3 rounded-full font-semibold transition hover:bg-[#ff8533]"
            style={{ color: '#fff' }}
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <div className="relative">
      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${post.heroColor}, transparent)` }}
      >
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--muted)' }}>
              <Link href="/" className="hover:text-orange transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-orange transition-colors">Blog</Link>
              <span>/</span>
              <span style={{ color: 'var(--heading)' }}>{post.category}</span>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: `${post.tagColor}20`, color: post.tagColor }}
              >
                {post.tag}
              </span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>{post.category}</span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-[1.05] mb-6"
              style={{ color: 'var(--heading)' }}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: '#FF6B00' }}
                >
                  C
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--heading)' }}>{post.author}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{post.date} · {post.readTime}</div>
                </div>
              </div>
              {/* Share */}
              <div className="flex items-center gap-3 ml-auto">
                <a
                  href={`https://www.instagram.com/creatorstick/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition hover:bg-orange hover:text-white"
                  style={{ background: 'var(--glass-light-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                  aria-label="Share on Instagram"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>
                <a
                  href={`https://x.com/creatorstick`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition hover:bg-orange hover:text-white"
                  style={{ background: 'var(--glass-light-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                  aria-label="Share on X"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l11.733 16h4.267l-11.733-16z" /><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" /></svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <article>
              {post.content.map((block, i) => (
                <ContentBlock key={i} block={block} index={i} />
              ))}

              {/* CTA */}
              <ScrollReveal>
                <div
                  className="mt-16 p-8 rounded-3xl text-center relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.08), var(--surface))', border: '1px solid rgba(255,107,0,0.2)' }}
                >
                  <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #FF6B00, #ff8533)' }} />
                  <h3 className="text-2xl font-bold font-montserrat mb-3" style={{ color: 'var(--heading)' }}>
                    Ready to Grow Your Brand?
                  </h3>
                  <p className="mb-6" style={{ color: 'var(--muted)' }}>
                    Let CreatorStick Media build your content growth strategy from scratch.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/book"
                      className="bg-orange text-white px-8 py-3 rounded-full font-semibold transition hover:bg-[#ff8533] hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]"
                      style={{ color: '#fff' }}
                    >
                      Start Your Project
                    </Link>
                    <a
                      href="https://www.instagram.com/creatorstick/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition"
                      style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                      DM Us on Instagram
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Back */}
              <div className="mt-10">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-orange"
                  style={{ color: 'var(--muted)' }}
                >
                  ← Back to all articles
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {/* Reading Time */}
                <div
                  className="p-5 rounded-2xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>About this article</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--muted)' }}>Read time</span>
                      <span style={{ color: 'var(--heading)' }}>{post.readTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--muted)' }}>Category</span>
                      <span style={{ color: '#FF6B00' }}>{post.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--muted)' }}>Published</span>
                      <span style={{ color: 'var(--heading)' }}>{post.date}</span>
                    </div>
                  </div>
                </div>

                {/* More Articles */}
                <div>
                  <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>More Articles</p>
                  <div className="space-y-4">
                    {relatedPosts.map(related => (
                      <Link key={related.slug} href={`/blog/${related.slug}`}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="p-4 rounded-xl transition-all"
                          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                        >
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: `${related.tagColor}20`, color: related.tagColor }}
                          >
                            {related.tag}
                          </span>
                          <p className="text-sm font-semibold mt-2 leading-snug" style={{ color: 'var(--heading)' }}>
                            {related.title.length > 60 ? related.title.slice(0, 60) + '…' : related.title}
                          </p>
                          <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{related.readTime}</p>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div
                  className="p-5 rounded-2xl text-center"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Follow Us</p>
                  <div className="flex justify-center gap-3">
                    {[
                      { href: 'https://www.instagram.com/creatorstick/', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                      { href: 'https://x.com/creatorstick', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733-16z" /><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" /></svg> },
                      { href: 'https://www.linkedin.com/company/creatorstick', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
                    ].map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center transition hover:bg-orange hover:text-white"
                        style={{ background: 'var(--glass-light-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
