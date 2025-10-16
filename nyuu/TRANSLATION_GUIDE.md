# Translation Guide

## Overview

All text content in the portfolio website is now fully translatable across 3 languages:
- **English (EN)**
- **Portuguese Brazilian (PT)**
- **Catalan (CA)**

## What's Translated

### ✅ Fully Translated Sections

1. **Navigation**
   - Menu items
   - Theme toggle labels
   - Language selector

2. **Hero Section**
   - Title, subtitle, description
   - Call-to-action buttons

2. **Services Section**
   - Section titles
   - **Service titles** (Web Development, Mobile Development, UI/UX Design, API Development)
   - **Service descriptions** (Short descriptions)
   - **Service detailed descriptions** (Long, detailed descriptions)

3. **Projects Section**
   - Section titles
   - **Project titles** (Project One, Project Two, Project Three)
   - **Project descriptions** (Full descriptions for each project)
   - Button labels ("View Project", "View on GitHub")
   - Technology labels

5. **Tech Stack Section**
   - Section titles
   - **Category names** (Languages, Cloud Platforms, Containerization, Databases, Monitoring & Logging)
   - Technology names (unchanged - universal)

6. **Education Section**
   - Section titles
   - **Course titles** (Computer Science Degree, Full Stack Web Development, etc.)
   - **Course descriptions** (Full descriptions for each course)
   - **Category names** (University, Web Development, Frontend, DevOps, Database, Data Science)
   - Status labels (Ongoing, Completed)
   - Filter labels (All)

7. **Contact Section**
   - Section titles and descriptions
   - Platform labels

## How Translations Work

### Translation Keys

Each piece of text has a **translation key** in `app/context/LanguageContext.tsx`:

```tsx
interface Translations {
  // Example keys
  heroTitle: string;
  categoryUniversity: string;
  courseCS: string;
  // ... and many more
}
```

### Using Translations in Components

Components use the `useLanguage()` hook to access translations:

```tsx
import { useLanguage } from '@/app/context/LanguageContext';

export default function MyComponent() {
  const { t } = useLanguage();
  
  return <h1>{t.heroTitle}</h1>;
}
```

## Adding New Content

### Services

To add a new service:

1. **Add translation keys** to `LanguageContext.tsx`:
```tsx
// In the Translations interface
serviceNewService: string;
serviceNewServiceDesc: string;
serviceNewServiceDetailed: string;

// In each language object (en, pt, ca)
serviceNewService: 'New Service',
serviceNewServiceDesc: 'Short description of the service.',
serviceNewServiceDetailed: 'Detailed, longer description explaining the service in depth...',
```

2. **Use the keys** in `ServicesSection.tsx`:
```tsx
{
  id: '5',
  titleKey: 'serviceNewService',
  descriptionKey: 'serviceNewServiceDesc',
  detailedDescriptionKey: 'serviceNewServiceDetailed',
  imageLight: '/services/new-service-light.svg',
  imageDark: '/services/new-service-dark.svg',
}
```

### Projects

To add a new project:

1. **Add translation keys** to `LanguageContext.tsx`:
```tsx
// In the Translations interface
projectNewProject: string;
projectNewProjectDesc: string;

// In each language object (en, pt, ca)
projectNewProject: 'Project Name',
projectNewProjectDesc: 'Description of what the project does.',
```

2. **Use the keys** in `ProjectsSection.tsx`:
```tsx
{
  id: '4',
  titleKey: 'projectNewProject',
  descriptionKey: 'projectNewProjectDesc',
  technologies: ['React', 'Node.js', 'PostgreSQL'],
  websiteUrl: 'https://example.com',
  githubUrl: 'https://github.com/user/repo',
}
```

### Tech Stack Categories

To add a new tech stack category:

1. **Add translation keys** to `LanguageContext.tsx`:
```tsx
// In the Translations interface
categoryNewCategory: string;

// In each language object (en, pt, ca)
categoryNewCategory: 'New Category',        // English
categoryNewCategory: 'Nova Categoria',      // Portuguese
categoryNewCategory: 'Nova Categoria',      // Catalan
```

2. **Use the key** in `StackSection.tsx`:
```tsx
{
  categoryKey: 'categoryNewCategory',
  technologies: [
    { name: 'Technology Name', icon: 'devicon-name-plain' },
  ],
}
```

### Education Courses

To add a new course:

1. **Add translation keys** to `LanguageContext.tsx`:
```tsx
// In the Translations interface
courseNewCourse: string;
courseNewCourseDesc: string;

// In each language object
courseNewCourse: 'Course Title',
courseNewCourseDesc: 'Course description...',
```

2. **Use the keys** in `EducationSection.tsx`:
```tsx
{
  id: '7',
  titleKey: 'courseNewCourse',
  descriptionKey: 'courseNewCourseDesc',
  categoryKey: 'categoryWebDevelopment', // Use existing category
  date: '2024',
  status: 'ongoing',
}
```

### Education Categories

To add a new education category:

1. **Add translation key** to `LanguageContext.tsx`:
```tsx
// In the Translations interface
categoryNewEducationCategory: string;

// In each language object
categoryNewEducationCategory: 'New Category',
```

2. **Use in course objects** in `EducationSection.tsx`:
```tsx
{
  categoryKey: 'categoryNewEducationCategory',
  // ... other course properties
}
```

## Current Translation Keys

### Services
- **Web Development**
  - `serviceWebDev` (title)
  - `serviceWebDevDesc` (short description)
  - `serviceWebDevDetailed` (detailed description)

- **Mobile Development**
  - `serviceMobileDev` (title)
  - `serviceMobileDevDesc` (short description)
  - `serviceMobileDevDetailed` (detailed description)

- **UI/UX Design**
  - `serviceUIUX` (title)
  - `serviceUIUXDesc` (short description)
  - `serviceUIUXDetailed` (detailed description)

- **API Development**
  - `serviceAPI` (title)
  - `serviceAPIDesc` (short description)
  - `serviceAPIDetailed` (detailed description)

### Projects
- **Project One**
  - `projectOne` (title)
  - `projectOneDesc` (description)

- **Project Two**
  - `projectTwo` (title)
  - `projectTwoDesc` (description)

- **Project Three**
  - `projectThree` (title)
  - `projectThreeDesc` (description)

### Tech Stack Categories
- `categoryLanguages`
- `categoryCloudPlatforms`
- `categoryContainerization`
- `categoryDatabases`
- `categoryMonitoring`

### Education Categories
- `categoryUniversity`
- `categoryWebDevelopment`
- `categoryFrontend`
- `categoryDevOps`
- `categoryDatabase`
- `categoryDataScience`

### Education Courses
- **Computer Science Degree**
  - `courseCS` (title)
  - `courseCSDes` (description)

- **Full Stack Web Development**
  - `courseFullStack` (title)
  - `courseFullStackDesc` (description)

- **Advanced React & Next.js**
  - `courseReact` (title)
  - `courseReactDesc` (description)

- **Docker & Kubernetes**
  - `courseDocker` (title)
  - `courseDockerDesc` (description)

- **Database Design & SQL**
  - `courseDatabase` (title)
  - `courseDatabaseDesc` (description)

- **Python for Data Science**
  - `coursePython` (title)
  - `coursePythonDesc` (description)

## Testing Translations

1. **Change language** using the language selector in the navbar
2. **Check all sections** to ensure text updates correctly
3. **Verify category filters** in Education section show translated names
4. **Verify tech stack** category headings show translated names

## Translation File Location

All translations are in: `app/context/LanguageContext.tsx`

## Tips

1. **Keep keys descriptive**: Use clear names like `courseReactDesc` instead of `desc1`
2. **Maintain consistency**: Use same naming pattern for similar items
3. **Update all languages**: When adding a new key, add it to EN, PT, and CA
4. **Test thoroughly**: Switch between languages to verify all text updates

## Example: Adding a New Course

```tsx
// 1. Add to LanguageContext.tsx Translations interface
courseKubernetes: string;
courseKubernetesDesc: string;

// 2. Add to all language objects
en: {
  // ... other translations
  courseKubernetes: 'Kubernetes Administration',
  courseKubernetesDesc: 'Advanced Kubernetes deployment and management.',
},
pt: {
  // ... other translations
  courseKubernetes: 'Administração Kubernetes',
  courseKubernetesDesc: 'Implantação e gerenciamento avançado de Kubernetes.',
},
ca: {
  // ... other translations
  courseKubernetes: 'Administració Kubernetes',
  courseKubernetesDesc: 'Desplegament i gestió avançada de Kubernetes.',
},

// 3. Add to EducationSection.tsx courses array
{
  id: '7',
  titleKey: 'courseKubernetes',
  descriptionKey: 'courseKubernetesDesc',
  categoryKey: 'categoryDevOps',
  date: '2024',
  status: 'ongoing',
}
```

Now your entire portfolio website is fully multilingual! 🌍
