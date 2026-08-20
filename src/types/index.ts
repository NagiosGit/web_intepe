export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'outsourcing' | 'infrastructure' | 'cloud' | 'maintenance' | 'software';
  icon: string;
  badge?: string;
  features: string[];
  benefits: string[];
  ctaText: string;
  ctaLink: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  fullDescription: string;
  features: string[];
  highlights: string[];
  targetAudience: string;
  icon: string;
  demoUrl?: string;
  modules?: { name: string; desc: string }[];
}

export interface SoftwareCapability {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface MethodologyStep {
  step: string;
  title: string;
  description: string;
  details: string;
}

export interface ValueCard {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
