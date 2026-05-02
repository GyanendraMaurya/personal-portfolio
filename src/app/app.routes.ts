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
  { path: '', component: HomePage, title: 'Gyanendra Maurya | Full Stack Developer' },
  { path: 'about', component: AboutPage, title: 'About | Gyanendra Maurya' },
  { path: 'work', component: WorkPage, title: 'Work | Gyanendra Maurya' },
  { path: 'work/:slug', component: ProjectDetailPage, title: 'Project | Gyanendra Maurya' },
  { path: 'services', component: ServicesPage, title: 'Services | Gyanendra Maurya' },
  { path: 'skills', component: SkillsPage, title: 'Skills | Gyanendra Maurya' },
  { path: 'experience', component: ExperiencePage, title: 'Experience | Gyanendra Maurya' },
  { path: 'contact', component: ContactPage, title: 'Contact | Gyanendra Maurya' },
  { path: '**', redirectTo: '' },
];
