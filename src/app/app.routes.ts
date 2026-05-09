import { Routes } from '@angular/router';
import { AboutPage } from './pages/about.page';
import { ContactPage } from './pages/contact.page';
import { ExperiencePage } from './pages/experience.page';
import { HomePage } from './pages/home.page';
import { ProjectDetailPage } from './pages/project-detail.page';
import { ServicesPage } from './pages/services.page';
import { SkillsPage } from './pages/skills.page';
import { WorkPage } from './pages/work.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Gyanendra Maurya | Full Stack Developer',
    data: {
      seo: {
        title: 'Gyanendra Maurya | Full Stack Developer',
        description:
          'Gyanendra Maurya builds modern web apps, APIs, AI document workflows, dashboards, payment journeys, and file tools with Angular, React, Spring Boot, and TypeScript.',
        path: '/',
      },
    },
  },
  {
    path: 'about',
    component: AboutPage,
    title: 'About | Gyanendra Maurya',
    data: {
      seo: {
        title: 'About Gyanendra Maurya | Full Stack Developer',
        description:
          'Learn about Gyanendra Maurya, a full stack developer with 7 years of experience building web interfaces, Spring Boot APIs, dashboards, payments, file workflows, and AI document products.',
        path: '/about',
      },
    },
  },
  {
    path: 'work',
    component: WorkPage,
    title: 'Work | Gyanendra Maurya',
    data: {
      seo: {
        title: 'Full Stack Developer Work | Gyanendra Maurya',
        description:
          'Selected product work by Gyanendra Maurya across web interfaces, APIs, document workflows, dashboards, integrations, authentication, payments, and practical AI features.',
        path: '/work',
      },
    },
  },
  {
    path: 'work/:slug',
    component: ProjectDetailPage,
    title: 'Project | Gyanendra Maurya',
    data: {
      seo: {
        title: 'Project Case Study | Gyanendra Maurya',
        description:
          'Read a full stack product case study by Gyanendra Maurya covering user experience, APIs, integrations, dashboards, file workflows, and implementation details.',
        path: '/work',
      },
    },
  },
  {
    path: 'services',
    component: ServicesPage,
    title: 'Services | Gyanendra Maurya',
    data: {
      seo: {
        title: 'Full Stack Development Services | Gyanendra Maurya',
        description:
          'Hire Gyanendra Maurya for MVP builds, web interfaces, Spring Boot APIs, AI document workflows, dashboards, product maintenance, payment journeys, and file utilities.',
        path: '/services',
      },
    },
  },
  {
    path: 'skills',
    component: SkillsPage,
    title: 'Skills | Gyanendra Maurya',
    data: {
      seo: {
        title: 'Angular, React, Spring Boot Skills | Gyanendra Maurya',
        description:
          'Explore Gyanendra Maurya’s full stack skills across Angular, React, TypeScript, Spring Boot, Node.js, REST APIs, SQL, AWS, dashboards, payments, and AI document workflows.',
        path: '/skills',
      },
    },
  },
  {
    path: 'experience',
    component: ExperiencePage,
    title: 'Experience | Gyanendra Maurya',
    data: {
      seo: {
        title: 'Full Stack Developer Experience | Gyanendra Maurya',
        description:
          'Seven years of practical full stack product experience across modern web interfaces, backend APIs, document tools, dashboards, business workflows, and product iteration.',
        path: '/experience',
      },
    },
  },
  {
    path: 'contact',
    component: ContactPage,
    title: 'Contact | Gyanendra Maurya',
    data: {
      seo: {
        title: 'Contact Gyanendra Maurya | Full Stack Developer',
        description:
          'Contact Gyanendra Maurya for MVP builds, web interfaces, Spring Boot APIs, dashboard features, product maintenance, payment integrations, and AI document workflows.',
        path: '/contact',
      },
    },
  },
  { path: '**', redirectTo: '' },
];
