# Portfolio Website - nyuu.dev

A modern, one-page portfolio website built with Next.js, React, and DaisyUI.

## 🎨 Features

- **Responsive Design**: Mobile-first approach with beautiful responsive layouts
- **Theme Switching**: Light/Dark mode with persistent preferences
- **Multi-language Support**: English, Portuguese (Brazil), and Catalan
- **Smooth Navigation**: Sticky navbar with smooth scrolling to sections
- **Modern UI**: Built with DaisyUI components and Tailwind CSS

## 📋 Sections

### 1. Hero Section
The main landing section with:
- Large title and subtitle
- Brief description
- Call-to-action buttons
- Animated scroll indicator

### 2. Services Section
Displays services offered in a card layout:
- Icon representation
- Service title
- Service description
- Hover effects

### 3. Projects Section
Showcases your projects with:
- Project title and description
- Technologies used (as badges)
- Links to live website and GitHub repository
- Card-based responsive layout

### 4. Tech Stack Section
Organized by categories:
- Frontend
- Backend
- Database
- DevOps & Tools
- Mobile
- Other

Each category shows technologies as badges.

### 5. Education & Courses Section
Comprehensive education history with:
- Filterable by category
- Status badges (Ongoing/Completed)
- Course description
- Date of completion
- Certificate download links
- Designed to handle many courses efficiently

### 6. Contact Section
Easy ways to get in touch:
- Email with direct mailto link
- GitHub profile
- Discord username
- Icon-based card layout

## 🗂️ Project Structure

```
app/
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── StackSection.tsx
│   │   ├── EducationSection.tsx
│   │   └── ContactSection.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── context/
│   └── LanguageContext.tsx
├── globals.css
├── layout.tsx
└── page.tsx
```

## 🌍 Adding Content

### Update Projects
Edit `app/components/sections/ProjectsSection.tsx`:

```tsx
const projects: Project[] = [
  {
    id: '1',
    title: 'Your Project Name',
    description: 'Project description here',
    technologies: ['React', 'Next.js', 'TypeScript'],
    websiteUrl: 'https://your-project.com',
    githubUrl: 'https://github.com/yourusername/project',
  },
  // Add more projects...
];
```

### Update Services
Edit `app/components/sections/ServicesSection.tsx`:

```tsx
const services: Service[] = [
  {
    id: '1',
    icon: '💻',
    title: 'Service Name',
    description: 'Service description here',
  },
  // Add more services...
];
```

### Update Tech Stack
Edit `app/components/sections/StackSection.tsx`:

```tsx
const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'Vue.js'],
  },
  // Add more categories...
];
```

### Update Education & Courses
Edit `app/components/sections/EducationSection.tsx`:

```tsx
const courses: Course[] = [
  {
    id: '1',
    title: 'Course Name',
    description: 'Course description',
    category: 'Web Development',
    date: '2024',
    status: 'completed', // or 'ongoing'
    certificateUrl: '/path/to/certificate.pdf', // optional
  },
  // Add more courses...
];
```

### Update Contact Information
Edit `app/components/sections/ContactSection.tsx`:

```tsx
const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    name: t.email,
    icon: '📧',
    value: 'your.email@example.com',
    url: 'mailto:your.email@example.com',
    color: 'btn-primary',
  },
  // Update other contact methods...
];
```

## 🌐 Adding Translations

To add or modify translations, edit `app/context/LanguageContext.tsx`:

1. Add the translation key to the `Translations` interface
2. Add translations for all three languages (en, pt, ca)

Example:
```tsx
interface Translations {
  // ... existing translations
  newKey: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // ... existing translations
    newKey: 'New text in English',
  },
  pt: {
    // ... existing translations
    newKey: 'Novo texto em Português',
  },
  ca: {
    // ... existing translations
    newKey: 'Nou text en Català',
  },
};
```

## 🎨 Customizing Themes

The website uses DaisyUI themes. To customize colors:

1. Open `app/globals.css`
2. The current setup uses built-in `light` and `dark` themes
3. To create custom themes, refer to the DaisyUI documentation

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📱 Responsive Design

All sections are fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ✨ DaisyUI Components Used

- **Navbar**: Sticky navigation with mobile menu
- **Hero**: Landing section layout
- **Card**: For services, projects, and education items
- **Badge**: For technologies and status indicators
- **Tabs**: For category filtering in education section
- **Button**: Call-to-action and links
- **Swap**: Theme toggle animation
- **Dropdown**: Language and mobile menu

## 🔧 Technologies

- **Framework**: Next.js 15.4.6
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **Language**: TypeScript
- **Deployment**: Cloudflare (configured with OpenNext)

## 📝 License

This is a personal portfolio template. Feel free to use and modify as needed.
