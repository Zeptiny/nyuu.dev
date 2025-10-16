'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: 'ongoing' | 'completed';
  certificateUrl?: string;
}

export default function EducationSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Placeholder courses - replace with actual data
  const courses: Course[] = [
    {
      id: '1',
      title: 'Computer Science Degree',
      description: 'Bachelor\'s degree in Computer Science focusing on software engineering and algorithms.',
      category: 'University',
      date: '2024',
      status: 'ongoing',
    },
    {
      id: '2',
      title: 'Full Stack Web Development',
      description: 'Complete course covering frontend and backend development.',
      category: 'Web Development',
      date: '2023',
      status: 'completed',
      certificateUrl: '#',
    },
    {
      id: '3',
      title: 'Advanced React & Next.js',
      description: 'Modern React patterns and Next.js framework.',
      category: 'Frontend',
      date: '2023',
      status: 'completed',
      certificateUrl: '#',
    },
    {
      id: '4',
      title: 'Docker & Kubernetes',
      description: 'Container orchestration and deployment strategies.',
      category: 'DevOps',
      date: '2024',
      status: 'ongoing',
    },
    {
      id: '5',
      title: 'Database Design & SQL',
      description: 'Relational database design and advanced SQL queries.',
      category: 'Database',
      date: '2023',
      status: 'completed',
      certificateUrl: '#',
    },
    {
      id: '6',
      title: 'Python for Data Science',
      description: 'Data analysis, visualization, and machine learning basics.',
      category: 'Data Science',
      date: '2023',
      status: 'completed',
      certificateUrl: '#',
    },
  ];

  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))];
  
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <section id="education" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.educationTitle}</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            {t.educationSubtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="tabs tabs-boxed">
            {categories.map((category) => (
              <button
                key={category}
                className={`tab ${selectedCategory === category ? 'tab-active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? t.filterAll : category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="card-title text-2xl">{course.title}</h3>
                      <span className={`badge ${course.status === 'ongoing' ? 'badge-primary' : 'badge-success'}`}>
                        {course.status === 'ongoing' ? t.ongoing : t.completed}
                      </span>
                    </div>
                    <p className="text-base-content/70 mb-2">{course.description}</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="badge badge-outline">{course.category}</span>
                      <span className="text-sm text-base-content/60">{course.date}</span>
                    </div>
                  </div>
                  {course.certificateUrl && (
                    <div className="card-actions">
                      <a
                        href={course.certificateUrl}
                        download
                        className="btn btn-primary btn-sm"
                      >
                        📄 {t.downloadCertificate}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-base-content/70">No courses found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
