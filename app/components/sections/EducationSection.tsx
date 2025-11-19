'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { useState } from 'react';

interface Course {
  id: string;
  titleKey: string; // Translation key for title
  descriptionKey: string; // Translation key for description
  categoryKey: string; // Translation key for category
  date: string;
  status: 'ongoing' | 'completed';
  certificateUrl?: string;
  duration?: number; // Duration value
  durationUnit?: 'hours' | 'weeks' | 'months' | 'years'; // Duration unit
  type: 'formal' | 'course' | 'certificate'; // Type of education
}

export default function EducationSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<'formal' | 'course' | 'certificate'>('formal');

  // Placeholder courses - replace with actual data
  const courses: Course[] = [
    {
      id: '1',
      titleKey: 'courseCS',
      descriptionKey: 'courseCSDes',
      categoryKey: 'categoryUniversity',
      date: '2024',
      status: 'ongoing',
      duration: 4,
      durationUnit: 'years',
      type: 'formal',
    },
    {
      // Certified Kubernetes Administrator (CKA)
      id: '2',
      titleKey: 'courseCKA',
      descriptionKey: 'courseCKADesc',
      categoryKey: 'categoryDevOps',
      date: '2025',
      status: 'ongoing',
      duration: 26.5,
      durationUnit: 'hours',
      type: 'course',
    },
    {
      // Linux Training Course (LTC)
      id: '3',
      titleKey: 'courseLTC',
      descriptionKey: 'courseLTCDesc',
      categoryKey: 'categoryDevOps',
      date: '2025',
      status: 'completed',
      certificateUrl: '/education/courses/certificates/ltc.pdf',
      duration: 41.5,
      durationUnit: 'hours',
      type: 'course',
    },
    {
      // Microservices architecture
      id: '4',
      titleKey: 'courseMSA',
      descriptionKey: 'courseMSADesc',
      categoryKey: 'categoryArchitecture',
      date: '2025',
      status: 'completed',
      certificateUrl: '/education/courses/certificates/msa.pdf',
      duration: 5.5,
      durationUnit: 'hours',
      type: 'course',
    },
    {
      // Zabbix - Network and Application Monitoring
      id: '5',
      titleKey: 'courseZabbix',
      descriptionKey: 'courseZabbixDesc',
      categoryKey: 'categoryMonitoring',
      date: '2025',
      status: 'completed',
      certificateUrl: '/education/courses/certificates/zabbix.pdf',
      duration: 7.5,
      durationUnit: 'hours',
      type: 'course',
    },
    {
      // Kubernetes Fundamentals
      id: '6',
      titleKey: 'courseKubernetes',
      descriptionKey: 'courseKubernetesDesc',
      categoryKey: 'categoryDevOps',
      date: '2025',
      status: 'completed',
      certificateUrl: '/education/courses/certificates/kubernetes.pdf',
      duration: 6.5,
      durationUnit: 'hours',
      type: 'course',
    },
    {
      // Fundamentals of Backend Engineering
      id: '7',
      titleKey: 'courseBackendEngineering',
      descriptionKey: 'courseBackendEngineeringDesc',
      categoryKey: 'categoryArchitecture',
      date: '2025',
      status: 'completed',
      certificateUrl: '/education/courses/certificates/fbe.pdf',
      duration: 19,
      durationUnit: 'hours',
      type: 'course',
    },
    {
      // Ansible Advanced
      id: '8',
      titleKey: 'courseAnsibleAdvanced',
      descriptionKey: 'courseAnsibleAdvancedDesc',
      categoryKey: 'categoryAutomation',
      date: '2025',
      status: 'completed',
      certificateUrl: '/education/courses/certificates/ansible.pdf',
      duration: 4,
      durationUnit: 'hours',
      type: 'course',
    },
    {
      // System Architecture & Design of Modern Large Scale Systems
      id: '9',
      titleKey: 'courseSystemArchitecture',
      descriptionKey: 'courseSystemArchitectureDesc',
      categoryKey: 'categoryArchitecture',
      date: '2025',
      status: 'completed',
      certificateUrl: '/education/courses/certificates/sadmlss.pdf',
      duration: 8,
      durationUnit: 'hours',
      type: 'course',
    },
    {
      // The Complete Cloud Computing Software Architecture Patterns
      id: '10',
      titleKey: 'courseCloudComputingArchitecture',
      descriptionKey: 'courseCloudComputingArchitectureDesc',
      categoryKey: 'categoryArchitecture',
      date: '2025',
      status: 'completed',
      certificateUrl: '/education/courses/certificates/cca.pdf',
      duration: 5,
      durationUnit: 'hours',
      type: 'course',
    },
  ];

  const categories = ['all', ...Array.from(new Set(courses.filter(c => c.type === selectedSection).map(course => course.categoryKey)))];
  
  const filteredCourses = courses
    .filter(course => course.type === selectedSection)
    .filter(course => selectedCategory === 'all' || course.categoryKey === selectedCategory);

  // Sort courses by ongoing first, if it's ongoing sort by date ascending, if its completed sort by date descending
  filteredCourses.sort((a, b) => {
    if (a.status === b.status) {
      return a.status === 'ongoing' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    }
    return a.status === 'ongoing' ? -1 : 1; // Ongoing first
  });

  const renderDuration = (course: Course) => {
    if (!course.duration || !course.durationUnit) return null;
    return `${course.duration} ${t[course.durationUnit]}`;
  };

  return (
    <section id="education" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.educationTitle}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-4"></div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            {t.educationSubtitle}
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex justify-center mb-8">
          <div className="tabs tabs-boxed tabs-lg">
            <button
              className={`tab ${selectedSection === 'formal' ? 'tab-active text-primary' : ''}`}
              onClick={() => {
                setSelectedSection('formal');
                setSelectedCategory('all');
              }}
            >
              {t.formalEducationTitle}
            </button>
            <button
              className={`tab ${selectedSection === 'course' ? 'tab-active text-primary' : ''}`}
              onClick={() => {
                setSelectedSection('course');
                setSelectedCategory('all');
              }}
            >
              {t.coursesTitle}
            </button>
            {/* <button
              className={`tab ${selectedSection === 'certificate' ? 'tab-active text-primary' : ''}`}
              onClick={() => {
                setSelectedSection('certificate');
                setSelectedCategory('all');
              }}
            >
              {t.certificatesTitle}
            </button> */}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="tabs tabs-boxed">
            {categories.map((category) => (
              <button
                key={category}
                className={`tab text-lg ${selectedCategory === category ? 'tab-active text-accent' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? t.filterAll : t[category as keyof typeof t]}
              </button>
            ))}
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card bg-base-200 shadow-xl hover:scale-105 transition-transform">
              <div className="card-body">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="card-title text-2xl">{t[course.titleKey as keyof typeof t]}</h3>
                      <span className={`badge ${course.status === 'ongoing' ? 'badge-primary' : 'badge-success'}`}>
                        {course.status === 'ongoing' ? t.ongoing : t.completed}
                      </span>
                    </div>
                    <p className="text-base-content/70 mb-2">{t[course.descriptionKey as keyof typeof t]}</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="badge badge-outline">{t[course.categoryKey as keyof typeof t]}</span>
                      <span className="text-sm text-base-content/60">{course.date}</span>
                      {/* {course.duration && course.durationUnit && (
                        <span className="text-sm text-base-content/60">• {renderDuration(course)}</span>
                      )} */}
                    </div>
                  </div>
                  {course.certificateUrl && (
                    <div className="card-actions">
                      <a
                        href={course.certificateUrl}
                        download
                        className="btn btn-primary btn-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> {t.downloadCertificate}
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
