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
  const [showAllCourses, setShowAllCourses] = useState(false);
  const INITIAL_COURSE_COUNT = 3;

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
    {
      // AWS Cloud Practitioner
      id: '101',
      titleKey: 'certificateAWSCloudPractitioner',
      descriptionKey: 'certificateAWSCloudPractitionerDesc',
      categoryKey: 'categoryArchitecture',
      date: '2025',
      status: 'completed',
      certificateUrl: '/education/certificates/AWS_Cloud_Practitioner.pdf',
      duration: undefined,
      durationUnit: undefined,
      type: 'certificate',
    },
  ];

  const formalCourses = courses.filter(c => c.type === 'formal');
  const certificates = courses.filter(c => c.type === 'certificate');

  const courseCategories = ['all', ...Array.from(new Set(courses.filter(c => c.type === 'course').map(c => c.categoryKey)))];
  const filteredCourses = courses
    .filter(course => course.type === 'course')
    .filter(course => selectedCategory === 'all' || course.categoryKey === selectedCategory);

  // Sort courses by ongoing first, if it's ongoing sort by date ascending, if its completed sort by date descending
  const sortCourses = (items: Course[]) => {
    return [...items].sort((a, b) => {
      if (a.status === b.status) {
        return a.status === 'ongoing' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
      }
      return a.status === 'ongoing' ? -1 : 1;
    });
  };

  const sortedFilteredCourses = sortCourses(filteredCourses);

  const renderDuration = (course: Course) => {
    if (!course.duration || !course.durationUnit) return null;
    return `${course.duration} ${t[course.durationUnit]}`;
  };

  const renderCourseCard = (course: Course) => (
    <div key={course.id} className="card bg-base-200 shadow-xl hover:scale-105 transition-transform">
      <div className="card-body">
        <div className="flex items-start gap-2 mb-2">
          <h4 className="card-title text-2xl min-w-0 flex-1">{t[course.titleKey as keyof typeof t]}</h4>
          <div className="flex items-center gap-2 shrink-0">
            {course.status === 'ongoing' && (
              <span className="badge badge-primary">
                {t.ongoing}
              </span>
            )}
            {course.certificateUrl && (
              <a
                href={course.certificateUrl}
                download
                className="btn btn-primary btn-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> {t.downloadCertificate}
              </a>
            )}
          </div>
        </div>
        <p className="text-base-content/70 mb-2">{t[course.descriptionKey as keyof typeof t]}</p>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="badge badge-outline">{t[course.categoryKey as keyof typeof t]}</span>
          <span className="text-sm text-base-content/60">{course.date}</span>
        </div>
      </div>
    </div>
  );

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

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left Column: Formal Education + Certificates */}
          <div className="lg:w-2/5 space-y-8">
            {/* Formal Education */}
            <div>
              <h3 className="text-2xl font-bold mb-6">{t.formalEducationTitle}</h3>
              <div className="space-y-6">
                {formalCourses.map(renderCourseCard)}
              </div>
            </div>

            <div className="divider"></div>

            {/* Certificates */}
            <div>
              <h3 className="text-2xl font-bold mb-6">{t.certificatesTitle}</h3>
              <div className="space-y-6">
                {certificates.map(renderCourseCard)}
              </div>
            </div>
          </div>

          {/* Right Column: Courses */}
          <div className="lg:w-3/5">
            <h3 className="text-2xl font-bold mb-6">{t.coursesTitle}</h3>
            {courseCategories.length > 1 && (
              <div className="flex justify-center mb-6">
                <div className="tabs tabs-boxed">
                  {courseCategories.map((category) => (
                    <button
                      key={category}
                      className={`tab ${selectedCategory === category ? 'tab-active text-primary' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === 'all' ? t.filterAll : t[category as keyof typeof t]}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-6">
              {(showAllCourses ? sortedFilteredCourses : sortedFilteredCourses.slice(0, INITIAL_COURSE_COUNT)).map(renderCourseCard)}
              {sortedFilteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-base-content/70">No courses found in this category.</p>
                </div>
              )}
              {sortedFilteredCourses.length > INITIAL_COURSE_COUNT && (
                <div className="text-center pt-2">
                  <button
                    className="btn btn-outline btn-primary"
                    onClick={() => setShowAllCourses(!showAllCourses)}
                  >
                    {showAllCourses ? t.viewLess : t.viewMore} ({sortedFilteredCourses.length - INITIAL_COURSE_COUNT})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
