export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "signs-your-office-needs-fumigation",
    title: "5 signs your office needs fumigation",
    category: "FUMIGATION",
    date: "2026-06-02",
    excerpt:
      "Termite damage and pest infestations often go unnoticed until they're expensive. Here's what to watch for.",
    content: [
      "Most pest problems don't announce themselves. By the time you see live insects during the day, the infestation is usually well established.",
      "Watch for discarded wings near windows and doors, hollow-sounding wood, small holes in furniture, and a persistent musty smell in storage areas.",
      "If you notice any of these, book an inspection before the damage spreads to structural elements. A same-week fumigation is far cheaper than a full renovation.",
    ],
  },
  {
    slug: "fire-safety-compliance-checklist",
    title: "A simple fire safety compliance checklist for offices",
    category: "INSPECTIONS",
    date: "2026-05-18",
    excerpt:
      "Use this quick checklist before your next audit, or before we arrive for your certified inspection.",
    content: [
      "Fire extinguishers should be inspected monthly, tagged, and placed no more than 23 metres from any point on the floor.",
      "Emergency exits must stay unlocked and unobstructed during working hours, with clear signage visible from every workstation.",
      "Smoke detectors need functional batteries and a documented test date. Keep this log on file for your next inspection.",
    ],
  },
  {
    slug: "choosing-a-safety-consultant",
    title: "What to look for in a safety consultant",
    category: "CONSULTATION",
    date: "2026-04-30",
    excerpt:
      "Not all safety consulting is the same. Here's what separates a compliance checkbox from a real risk reduction partner.",
    content: [
      "A good consultant starts with your actual site, not a generic template. Ask to see a sample report before you commit.",
      "Look for someone who explains findings in plain language your team can act on, not just a list of citations.",
      "Ongoing support matters more than a one-time audit. Safety compliance is a moving target as your operations change.",
    ],
  },
];
