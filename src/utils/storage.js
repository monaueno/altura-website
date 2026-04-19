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
  portfolioHero: {
    title: "Luxury Home Brand Case Study",
    subtitle: "From inconsistent returns to a 5x+ scalable paid system",
    backgroundImage: "/public/assets/Porfolio/Ad-Photos/salt-drawer.png",
    logo: "/assets/Home-Page-Defaults/salt-logo.png"
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
      slug: "why-creative-strategy-matters",
      title: "Why Creative Strategy Matters More Than Your Budget",
      date: "2025-03-01",
      coverImage: "",
      body: "In today's crowded digital landscape, throwing money at ads isn't enough. The brands that win are the ones who lead with strategy—understanding their audience deeply and crafting messages that resonate on an emotional level..."
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
