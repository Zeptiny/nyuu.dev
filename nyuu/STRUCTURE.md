# Portfolio Website Structure

## 📐 Visual Layout

```
┌─────────────────────────────────────────────────┐
│  NAVBAR (Sticky)                                │
│  [Logo] [Links...] [Theme] [Language]          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│                                                 │
│              ▼ HERO SECTION                     │
│                                                 │
│              nyuu.dev                           │
│         Computer Science Student                │
│    Full Stack Developer & Tech Enthusiast       │
│                                                 │
│      [View Projects]  [Contact]                 │
│                 ↓                               │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              ▼ SERVICES                         │
│                                                 │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│  │  💻   │ │  📱   │ │  🎨   │ │  🔧   │  │
│  │Service1│ │Service2│ │Service3│ │Service4│  │
│  └────────┘ └────────┘ └────────┘ └────────┘  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              ▼ PROJECTS                         │
│                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────┐│
│  │  Project 1  │  │  Project 2  │  │ Project 3││
│  │  ─────────  │  │  ─────────  │  │ ──────── ││
│  │ Description │  │ Description │  │Descript. ││
│  │ [Tech][Tech]│  │ [Tech][Tech]│  │[Tech]    ││
│  │ [View][Git] │  │ [View][Git] │  │[View]    ││
│  └─────────────┘  └─────────────┘  └──────────┘│
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              ▼ TECH STACK                       │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Frontend │  │ Backend  │  │ Database │     │
│  │ ──────── │  │ ──────── │  │ ──────── │     │
│  │[React]   │  │[Node.js] │  │[Postgres]│     │
│  │[Next.js] │  │[Python]  │  │[MongoDB] │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ DevOps   │  │  Mobile  │  │  Other   │     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│          ▼ EDUCATION & COURSES                  │
│                                                 │
│  [All] [University] [Web Dev] [Data Science]   │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ Course Title              [Completed]     │  │
│  │ Description | Category | Date            │  │
│  │                         [📄 Certificate] │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │ Course Title              [Ongoing]       │  │
│  │ Description | Category | Date            │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              ▼ GET IN TOUCH                     │
│                                                 │
│    ┌──────┐      ┌──────┐      ┌──────┐       │
│    │  📧  │      │  🐙  │      │  💬  │       │
│    │Email │      │GitHub│      │Discord│       │
│    │[Send]│      │[Open]│      │[Open] │       │
│    └──────┘      └──────┘      └──────┘       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│                  FOOTER                         │
│         Made with ❤️ using Next.js              │
│           © 2024 nyuu.dev                       │
└─────────────────────────────────────────────────┘
```

## 🎯 Key Features Per Section

### Navbar
- **Sticky**: Stays at top while scrolling
- **Responsive**: Hamburger menu on mobile
- **Smooth Scroll**: Click links to smoothly scroll to sections
- **Theme Toggle**: Sun/moon icon to switch themes
- **Language Selector**: Flag dropdown with 3 languages

### Hero Section
- **Full Viewport Height**: Takes up entire screen
- **Centered Content**: All text centered
- **Gradient Title**: Colorful gradient on main heading
- **CTA Buttons**: Primary and outline buttons
- **Animated Arrow**: Bouncing down arrow

### Services Section
- **Grid Layout**: 4 columns on desktop, responsive
- **Cards**: Hover effect with shadow
- **Icons**: Large emoji icons
- **Background**: Alternating color (base-200)

### Projects Section
- **Card Grid**: 3 columns on large screens
- **Technology Badges**: Colored badges for each tech
- **Dual Links**: Website + GitHub buttons
- **Hover Effect**: Cards lift on hover

### Stack Section
- **Category Cards**: Technologies grouped by category
- **Badge Display**: Each tech as a badge
- **6 Categories**: Default categories, easy to add more
- **Background**: Alternating color (base-200)

### Education Section
- **Tab Filters**: Filter by category
- **Status Badges**: Visual indicators for ongoing/completed
- **Certificate Downloads**: PDF download buttons
- **Scrollable**: Handles many courses efficiently
- **Detailed Cards**: Full information per course

### Contact Section
- **3 Contact Methods**: Email, GitHub, Discord
- **Large Icons**: Eye-catching emoji icons
- **Action Buttons**: Each with appropriate link
- **Card Layout**: Clean, centered presentation

### Footer
- **Centered**: All content centered
- **Simple**: Brand name and copyright
- **Subtle**: Doesn't distract from content

## 📱 Responsive Breakpoints

```
Mobile (< 768px)
- Single column layout
- Hamburger menu
- Stacked cards
- Smaller text sizes

Tablet (768px - 1024px)
- 2 column grids
- Visible navbar links
- Medium card sizes

Desktop (> 1024px)
- 3-4 column grids
- Full navbar
- Large cards
- Optimal spacing
```

## 🎨 Design System

### Colors
- **Primary**: Main brand color
- **Secondary**: Accent color
- **Neutral**: For neutral elements
- **Base-100**: Page background
- **Base-200**: Alternate sections
- **Base-300**: Deeper backgrounds

### Typography
- **Headings**: 4xl - 7xl font sizes
- **Body**: Base to lg sizes
- **Font**: Geist Sans (default Next.js font)
- **Mono**: Geist Mono for code

### Spacing
- **Sections**: py-20 (5rem vertical padding)
- **Cards**: Consistent gap-6 or gap-8
- **Containers**: mx-auto with max-width

### Components
- **Cards**: rounded corners, shadow, hover effects
- **Badges**: Small pills for tags
- **Buttons**: Primary, outline, ghost variants
- **Animations**: Smooth transitions, bounce effect

## 🔄 User Flow

1. **Land on Hero** → See overview
2. **Scroll/Click Services** → Understand what you offer
3. **View Projects** → See your work
4. **Check Stack** → Know your skills
5. **Browse Education** → See credentials
6. **Contact** → Get in touch

Each section flows naturally to the next!
