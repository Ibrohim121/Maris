export interface Teacher {
  slug: string;
  name: string;
  role: string;
  bio: string;
  details: string;
  specialties: string[];
  rating: number;
  students: number;
  courses: number;
}

export const teachers: Teacher[] = [
  {
    slug: "sarah-chen",
    name: "Dr. Sarah Chen",
    role: "AI & Machine Learning Lead",
    bio: "Former Google AI researcher with 10+ years in deep learning and neural networks.",
    details:
      "Dr. Sarah Chen spent over a decade at Google AI, where she led the development of large-scale recommendation systems used by millions. She holds a Ph.D. in Computer Science from MIT and has published 40+ peer-reviewed papers. At EduCenter Pro, she designs cutting-edge ML curricula that bridge the gap between academic theory and industry application.",
    specialties: ["Deep Learning", "NLP", "Computer Vision", "MLOps"],
    rating: 4.9,
    students: 12400,
    courses: 6,
  },
  {
    slug: "james-okonkwo",
    name: "James Okonkwo",
    role: "Full-Stack Engineering Director",
    bio: "Senior engineer who built scalable systems serving 10M+ users at Netflix and Stripe.",
    details:
      "James Okonkwo is a seasoned full-stack engineer with 15 years of experience at top-tier tech companies including Netflix and Stripe. He architected payment processing systems handling billions in transactions. His teaching philosophy centers on real-world project-based learning, ensuring students graduate with production-ready skills in React, Node.js, cloud architecture, and system design.",
    specialties: ["React/Next.js", "Node.js", "AWS", "System Design"],
    rating: 4.8,
    students: 9800,
    courses: 8,
  },
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    role: "Finance & Investment Chair",
    bio: "Ex-Goldman Sachs VP turned educator, specializing in financial modeling and valuation.",
    details:
      "Priya Sharma spent 12 years at Goldman Sachs, rising to Vice President in the Investment Banking division. She led M&A transactions totaling over $5B and trained hundreds of junior analysts. Now at EduCenter Pro, she brings real Wall Street expertise into every lesson, teaching financial modeling, valuation techniques, and investment strategies used by top global firms.",
    specialties: ["Financial Modeling", "Valuation", "M&A", "Risk Analysis"],
    rating: 4.7,
    students: 7600,
    courses: 5,
  },
  {
    slug: "marcus-johnson",
    name: "Marcus Johnson",
    role: "Cybersecurity Lead",
    bio: "Ex-NSA cyber analyst and CISSP certified expert in ethical hacking and threat detection.",
    details:
      "Marcus Johnson served as a senior cybersecurity analyst at the NSA for 8 years before transitioning to the private sector as a CISO for a Fortune 500 company. He holds CISSP, CEH, and OSCP certifications. His courses cover everything from penetration testing and network defense to incident response and compliance frameworks like ISO 27001 and NIST.",
    specialties: ["Ethical Hacking", "Network Security", "CTF", "Compliance"],
    rating: 4.9,
    students: 5400,
    courses: 4,
  },
  {
    slug: "elena-petrov",
    name: "Dr. Elena Petrov",
    role: "Data Science Lead",
    bio: "Stanford Ph.D. in Statistics with award-winning research in causal inference and analytics.",
    details:
      "Dr. Elena Petrov earned her Ph.D. in Statistics from Stanford University, where her research on causal inference won the Savage Award. She has worked as a principal data scientist at Uber and Airbnb, optimizing pricing algorithms and growth models. Her courses emphasize practical statistical thinking, Python-based analysis, and reproducible research practices.",
    specialties: ["Statistics", "Python", "Causal Inference", "A/B Testing"],
    rating: 4.8,
    students: 8200,
    courses: 7,
  },
  {
    slug: "david-kim",
    name: "David Kim",
    role: "UX/Product Design Lead",
    bio: "Design lead at Apple and Figma, shaping experiences for hundreds of millions of users.",
    details:
      "David Kim has spent 14 years shaping digital experiences at Apple, Figma, and IDEO. He led the design of core interaction patterns used by over 200M Figma users and contributed to Apple's Human Interface Guidelines. His courses teach human-centered design, design systems, prototyping, and the strategic thinking needed to create products people love.",
    specialties: ["UI/UX Design", "Design Systems", "Figma", "Prototyping"],
    rating: 4.7,
    students: 6700,
    courses: 4,
  },
];
