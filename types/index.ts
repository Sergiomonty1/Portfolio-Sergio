// Types para Portfolio

export interface Profile {
  id?: string;
  name: string;
  title: string;
  description: string;
  avatar?: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    behance?: string;
    website?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Experience {
  id?: string;
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  technologies: string[];
  current: boolean;
  location?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  id?: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  images?: string[];
  videos?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order?: number;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}
