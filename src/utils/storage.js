const STORAGE_KEY = 'annalise_site_data';

const defaultData = {
  home: {
    logoImage: "/assets/Images/altura-logo.png",
    heroHeadline: "Taking your business to new heights",
    heroSubheadline: "Altura Marketing is a growth-focused marketing studio specializing in paid advertising and brand design. We help brands turn attention into measurable results through intentional creative and data-driven execution.",
    heroCTAText: "Let's Chat",
    heroImage: "/assets/Images/Branding-Photoshoot/home-cover-page.png",
    heroVideoUrl: "/hero-video-web.mp4",
    uspHeadline: "It's about understanding people... not just platforms.",
    uspBody: "We focus on uncovering what your audience actually cares about, then shaping creative and messaging that feels natural, emotional, and aligned with how they think and buy. When strategy leads, performance follows.",
    uspImage: "/assets/images/computer.jpg", // Placeholder - to be uploaded later
    staticShowcaseHeadline: "See the Creative Strategy Come to Life",
    staticShowcaseSubheading: "These ads are real examples of how insight, intention, and execution come together. Each piece is designed to speak to a specific audience, highlight what matters most, and make the message feel natural, not forced.",
    videoShowcaseHeadline: "",
    videoShowcaseSubheading: "Sometimes the UGC comes back less than ideal. Sometimes all you have are still images from a recent shoot. This portfolio highlights how creative strategy and thoughtful editing can transform what you have into video ads that actually work."
  },
  about: {
    photo: "/assets/images/about-photo.jpg",
    bio: "Marketing strategist passionate about helping brands connect with their audiences through authentic storytelling and data-driven creative."
  },
  services: [
    {
      id: "1",
      number: "01",
      title: "Creative Strategist Consultant",
      description: "For teams that already have execution covered but need sharper thinking behind the creative. I partner with in-house designers and media buyers to uncover insights, refine messaging, and generate ideas that actually resonate and perform."
    },
    {
      id: "2",
      number: "02",
      title: "Paid Media Consultant",
      description: "Campaign strategy and management across Meta, Pinterest, and TikTok. I approach paid media through a creative-first lens, helping brands make smarter decisions, improve performance, and scale with intention."
    },
    {
      id: "3",
      number: "03",
      title: "Organic Social Consultant",
      description: "Organic social strategy focused on clarity, consistency, and connection. From content direction to messaging frameworks, I help brands show up in a way that feels natural, aligned, and worth engaging with."
    },
    {
      id: "4",
      number: "04",
      title: "Graphic Design",
      description: "Strategic, conversion-focused design that supports your marketing goals. Every deliverable is created with clarity, consistency, and performance in mind. Design isn't just about looking good, it's about communicating quickly and effectively."
    },
    {
      id: "5",
      number: "05",
      title: "Brand Design",
      description: "Intentional brand identities built to position you clearly and confidently in your market. From visual identity systems and typography to color palettes and foundational brand elements, we create brands that feel cohesive, elevated, and built for long-term growth. This is more than a logo, it's a strategic foundation for everything that follows."
    }
  ],
  portfolio: [
    {
      id: "1",
      slug: "sample-project-1",
      title: "Sample Project 1",
      shortDescription: "Strategic campaign for lifestyle brand focusing on millennial audience engagement.",
      image: "/assets/portfolio/placeholder-1.jpg",
      tagline: "Where authenticity meets strategy",
      strategyBullets: [
        "Identified core audience pain points through social listening",
        "Developed messaging framework emphasizing emotional connection",
        "Created cohesive visual system across all touchpoints"
      ]
    },
    {
      id: "2",
      slug: "sample-project-2",
      title: "Sample Project 2",
      shortDescription: "Paid social campaign driving 3x ROAS for e-commerce client.",
      image: "/assets/portfolio/placeholder-2.jpg",
      tagline: "Data-driven creative that converts",
      strategyBullets: [
        "Conducted competitive analysis and market positioning",
        "Tested 15+ creative variants to optimize performance",
        "Scaled winning concepts across Meta and TikTok"
      ]
    }
  ],
  blog: [
    {
      id: "1",
      slug: "importance-of-creative-strategy",
      title: "Importance of Creative Strategy",
      date: "2026-03-01",
      coverImage: "",
      body: "In today's crowded digital landscape, throwing money at ads isn't enough. The brands that win are the ones who lead with strategy—understanding their audience deeply and crafting messages that resonate on an emotional level.\n\nCreative strategy is the bridge between knowing your audience and actually reaching them. It's the difference between content that gets scrolled past and content that stops someone mid-scroll.\n\nWhen I work with a brand, the first thing I do is dig into the why behind the creative. What does your audience actually care about? What language do they use? What problems keep them up at night?\n\nOnce you understand the people, the creative writes itself. The visuals, the copy, the hooks—they all flow from a place of genuine understanding rather than guesswork.\n\nThe brands I've seen win consistently are the ones willing to invest in strategy before they invest in spend. They take the time to get the foundation right, and the performance follows."
    },
    {
      id: "2",
      slug: "competitive-analysis-framework",
      title: "Competitive Analysis Framework, What Hole Does Your Company Fill?",
      date: "2026-03-15",
      coverImage: "",
      body: "Understanding your competitive landscape is about more than knowing who else exists in your space. It's about identifying the gaps—the unmet needs, the overlooked audiences, the messaging no one else is owning.\n\nA strong competitive analysis doesn't just map out what others are doing; it reveals where you can position yourself to stand out and win.\n\nHere's the framework I use with every client:\n\n1. Map the landscape — Who are your direct and indirect competitors? What are they saying, and to whom?\n\n2. Identify the gaps — Where is messaging falling flat? What audiences are underserved? What positioning is unclaimed?\n\n3. Define your unique value — Based on the gaps, what can you own? What story can only your brand tell?\n\n4. Build your positioning statement — A clear, concise articulation of who you serve, what you offer, and why it matters.\n\n5. Test and refine — Put your positioning into the market through creative and paid media, measure response, and iterate.\n\nThe brands that win aren't always the biggest or the loudest. They're the ones that understand exactly where they fit—and lean into it with confidence."
    },
    {
      id: "3",
      slug: "fix-ads-high-ctr-low-purchases",
      title: "How to Fix Ads with High Click-Through Rates But Low Purchases (And Vice Versa)",
      date: "2026-03-22",
      coverImage: "",
      body: "You're getting clicks but no conversions. Or worse—your ads aren't getting clicked at all, even though your product is solid. Both scenarios are frustrating, but they point to very different problems in your funnel.\n\nLet's break down what's actually happening and how to fix it.\n\nScenario 1: High CTR, Low Purchases\nYour ad is doing its job—it's grabbing attention and driving traffic. But something breaks down after the click. Common causes:\n\n- Landing page disconnect: The page doesn't match the promise of the ad\n- Pricing friction: The product costs more than the audience expected\n- Trust gap: Not enough social proof or reviews on the landing page\n- Too many steps: The checkout process is too complex\n\nScenario 2: Low CTR, Healthy Conversion Rate\nYour landing page converts well, but your ads aren't driving enough traffic. This usually means:\n\n- Weak hook: Your opening doesn't stop the scroll\n- Wrong audience: You're targeting people who aren't in-market\n- Creative fatigue: Your audience has seen the same ad too many times\n- Poor thumb-stop: The visual doesn't stand out in the feed\n\nThe fix for both scenarios starts with alignment. Your ad creative, your landing page, and your audience targeting all need to tell the same story to the same person at the right time."
    }
  ],
  testimonials: [
    {
      id: "1",
      quote: "“[Annalise] came to every meeting prepared, organized, and clearly knowledgeable about what she was doing. We always felt confident in her strategy and recommendations because she truly understood the numbers and how they connected to our brand goals.",
      logo: "/assets/Home-Page-Defaults/lime-ricki-signature.png",
      avatar: "Alacia Maloy, Dir. of Comms & Ops"
    },
    {
      id: "2",
      quote: "After one of our lowest months on record, we saw 90% month-over-month growth throughout the second half of 2025, and that momentum has continued into the first months of 2026. Annalise has been a key driver of our growth, and I cannot recommend her or Altura Marketing highly enough.",
      logo: "public/assets/Home-Page-Defaults/salt-logo.png",
      avatar: "Sabrina Gardner, CEO"
    },
    {
      id: "3",
      quote: "[Annalise] is incredibly hardworking, creative, and genuinely committed to helping her clients succeed. She takes the time to understand each business and consistently looks for ways to help them grow and improve. Her dedication, attention to detail, and passion for what she does really set her apart.",
      logo: "public/assets/Home-Page-Defaults/BoostedSafe-Logo.png",
      avatar: "Skyler Baird, CEO"
    }
  ],
  videos: [
    {
      id: "1",
      url: "/assets/Porfolio/Videos/SBS_WithAndWithout_Video_Feed_V2.mp4",
      title: "SBS With & Without Video Feed",
      thumbnail: ""
    },
    {
      id: "2",
      url: "/assets/Porfolio/Videos/YouArentAnAccountant_4x5.mp4",
      title: "You Aren't An Accountant",
      thumbnail: ""
    },
    {
      id: "3",
      url: "/assets/Porfolio/Videos/Ekko_CinematicStorytelling_V1A_TG%20-%20Feed.mp4",
      title: "Ekko Cinematic Storytelling",
      thumbnail: ""
    }
  ]
};

export const getData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultData;
  }
};

export const setData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const resetData = () => {
  setData(defaultData);
  return defaultData;
};
