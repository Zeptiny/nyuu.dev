// Portfolio Data Template
// Copy this file and rename it to 'portfolioData.ts' to use your own data

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  websiteUrl?: string;
  githubUrl?: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TechCategory {
  category: string;
  technologies: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: 'ongoing' | 'completed';
  certificateUrl?: string;
}

export interface ContactMethod {
  id: string;
  name: string;
  icon: string;
  value: string;
  url: string;
  color: string;
}

// Example data - Replace with your own

export const projects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    description: 'A comprehensive web application built with modern technologies.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    websiteUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
  },
  // Add more projects here
];

export const services: Service[] = [
  {
    id: '1',
    icon: '💻',
    title: 'Web Development',
    description: 'Full-stack web development using modern technologies and best practices.',
  },
  // Add more services here
];

export const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'DaisyUI'],
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'Python', 'FastAPI'],
  },
  // Add more categories here
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Computer Science Degree',
    description: 'Bachelor\'s degree in Computer Science.',
    category: 'University',
    date: '2024',
    status: 'ongoing',
  },
  // Add more courses here
];

export const contactMethods = {
  email: 'your.email@example.com',
  github: 'yourusername',
  discord: 'yourusername#0000',
};
