# Quick Start Guide - Portfolio Website

## 🚀 Getting Started

Your portfolio website is now ready! Here's how to customize it with your own content.

## 📝 Step-by-Step Customization

### Step 1: Update Contact Information

Open `app/components/sections/ContactSection.tsx` and update:

```tsx
const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    name: t.email,
    icon: '📧',
    value: 'YOUR_EMAIL@example.com', // ← Change this
    url: 'mailto:YOUR_EMAIL@example.com', // ← Change this
    color: 'btn-primary',
  },
  {
    id: 'github',
    name: t.github,
    icon: '🐙',
    value: 'github.com/YOUR_USERNAME', // ← Change this
    url: 'https://github.com/YOUR_USERNAME', // ← Change this
    color: 'btn-neutral',
  },
  {
    id: 'discord',
    name: t.discord,
    icon: '💬',
    value: 'YOUR_DISCORD#0000', // ← Change this
    url: '#', // Optional: Add Discord profile link
    color: 'btn-secondary',
  },
];
```

### Step 2: Update Hero Section

Open `app/components/sections/HeroSection.tsx` - Currently uses translations, but you can customize the branding:

```tsx
<h1 className="text-5xl md:text-7xl font-bold...">
  nyuu.dev {/* ← Change your brand name */}
</h1>
```

### Step 3: Add Your Services

Open `app/components/sections/ServicesSection.tsx`:

```tsx
const services: Service[] = [
  {
    id: '1',
    icon: '💻', // Choose an emoji
    title: 'Your Service Name',
    description: 'Description of what you offer',
  },
  // Add as many services as you want
];
```

**Popular Service Emojis:**
- 💻 Web Development
- 📱 Mobile Apps
- 🎨 UI/UX Design
- 🔧 API Development
- 🚀 DevOps
- 📊 Data Analysis
- 🤖 Machine Learning
- ☁️ Cloud Solutions

### Step 4: Add Your Projects

Open `app/components/sections/ProjectsSection.tsx`:

```tsx
const projects: Project[] = [
  {
    id: '1',
    title: 'Project Name',
    description: 'What does this project do? What problem does it solve?',
    technologies: ['React', 'Node.js', 'PostgreSQL'], // Technologies used
    websiteUrl: 'https://your-project.com', // Optional
    githubUrl: 'https://github.com/username/repo', // Optional
  },
  // Add more projects...
];
```

### Step 5: Update Tech Stack

Open `app/components/sections/StackSection.tsx`:

```tsx
const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'Vue.js', 'TypeScript'],
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Python', 'Java'],
  },
  {
    category: 'Database',
    technologies: ['PostgreSQL', 'MongoDB', 'Redis'],
  },
  // Add more categories as needed
];
```

**Suggested Categories:**
- Frontend
- Backend
- Database
- DevOps & Tools
- Mobile
- Cloud & Infrastructure
- Testing
- Design Tools

### Step 6: Add Education & Courses

Open `app/components/sections/EducationSection.tsx`:

```tsx
const courses: Course[] = [
  {
    id: '1',
    title: 'Course/Degree Name',
    description: 'What you learned or studied',
    category: 'Category Name', // e.g., 'University', 'Web Development', 'Data Science'
    date: '2024', // Year or date range
    status: 'completed', // or 'ongoing'
    certificateUrl: '/certificates/filename.pdf', // Optional - path to PDF
  },
  // Add more courses...
];
```

**Tips for Education Section:**
- Create categories that make sense for your courses
- Use 'ongoing' for current studies
- Use 'completed' for finished courses
- Add certificate PDFs to the `public/certificates/` folder
- The filter will automatically show all unique categories

### Step 7: Customize Translations (Optional)

Open `app/context/LanguageContext.tsx` to edit text in all three languages:

```tsx
const translations: Record<Language, Translations> = {
  en: {
    heroTitle: 'Your Custom Title',
    // ... other translations
  },
  pt: {
    heroTitle: 'Seu Título Personalizado',
    // ... other translations
  },
  ca: {
    heroTitle: 'El Teu Títol Personalitzat',
    // ... other translations
  },
};
```

## 🎨 Styling Tips

### Change Primary Colors

DaisyUI uses semantic colors. To customize, you can:

1. **Quick Method**: Use different DaisyUI themes in `app/globals.css`:
   ```css
   @plugin "daisyui" {
     themes: cupcake --default, dracula --prefersdark;
   }
   ```

2. **Custom Method**: Create your own theme colors (see DaisyUI docs)

### Available DaisyUI Themes:
- light, dark, cupcake, bumblebee, emerald, corporate, synthwave
- retro, cyberpunk, valentine, halloween, garden, forest, aqua
- lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk
- autumn, business, acid, lemonade, night, coffee, winter

## 📂 Adding Certificate Files

1. Create a `certificates` folder in the `public` directory:
   ```
   public/
   └── certificates/
       ├── course1.pdf
       ├── course2.pdf
       └── ...
   ```

2. Reference them in your courses:
   ```tsx
   certificateUrl: '/certificates/course1.pdf'
   ```

## 🖼️ Adding Project Images

1. Add images to `public/projects/`:
   ```
   public/
   └── projects/
       ├── project1.png
       ├── project2.jpg
       └── ...
   ```

2. Update projects:
   ```tsx
   image: '/projects/project1.png'
   ```

3. Update ProjectsSection.tsx to display images (currently commented out):
   ```tsx
   {project.image && (
     <figure className="px-4 pt-4">
       <img src={project.image} alt={project.title} className="rounded-xl w-full h-48 object-cover" />
     </figure>
   )}
   ```

## 🚀 Running the Website

```bash
# Development mode
npm run dev

# Open http://localhost:3000 in your browser
```

## ✅ Checklist

- [ ] Update contact information (email, GitHub, Discord)
- [ ] Add your services
- [ ] Add your projects with links
- [ ] Update tech stack
- [ ] Add education & courses
- [ ] Add certificate files (if any)
- [ ] Test all sections in both light and dark themes
- [ ] Test all three languages (EN, PT, CA)
- [ ] Verify all links work correctly
- [ ] Test on mobile devices

## 🆘 Need Help?

- **DaisyUI Docs**: https://daisyui.com/
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## 🎉 You're All Set!

Your portfolio is ready to showcase your work. Just fill in your data and deploy!
