import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { projects, services, skillGroups } from './portfolio-data';

type SeoData = {
  title: string;
  description: string;
  path: string;
  image?: string;
  robots?: string;
};

type JsonLdNode = Record<string, unknown>;

const SITE_NAME = 'Gyanendra Maurya Portfolio';
const PERSON_NAME = 'Gyanendra Maurya';
const DEFAULT_IMAGE = '/profile-photo.jpg';
const DEFAULT_ROBOTS = 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1';
const DEFAULT_DESCRIPTION =
  'Gyanendra Maurya is a full stack developer building Angular, React, Spring Boot, API integration, dashboard, payment, file tooling, and AI document workflow products.';

const SOCIAL_LINKS = [
  'https://www.linkedin.com/in/gyanendramaurya/',
  'https://github.com/GyanendraMaurya',
];

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.updateHead();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateHead());
  }

  private updateHead(): void {
    const path = this.currentPath();
    const seo = this.resolveSeo(path);
    const canonicalUrl = this.absoluteUrl(seo.path);
    const imageUrl = this.absoluteUrl(seo.image ?? DEFAULT_IMAGE);
    const robots = seo.robots ?? DEFAULT_ROBOTS;

    this.title.setTitle(seo.title);
    this.setMetaName('description', seo.description);
    this.setMetaName('author', PERSON_NAME);
    this.setMetaName('robots', robots);
    this.setMetaName('googlebot', robots);
    this.setMetaName('theme-color', '#2f7678');

    this.setMetaProperty('og:type', 'website');
    this.setMetaProperty('og:site_name', SITE_NAME);
    this.setMetaProperty('og:title', seo.title);
    this.setMetaProperty('og:description', seo.description);
    this.setMetaProperty('og:url', canonicalUrl);
    this.setMetaProperty('og:image', imageUrl);
    this.setMetaProperty('og:image:alt', PERSON_NAME);

    this.setMetaName('twitter:card', 'summary_large_image');
    this.setMetaName('twitter:title', seo.title);
    this.setMetaName('twitter:description', seo.description);
    this.setMetaName('twitter:image', imageUrl);

    this.setCanonical(canonicalUrl);
    this.setStructuredData(this.buildStructuredData(seo, canonicalUrl, imageUrl, path));
  }

  private resolveSeo(path: string): SeoData {
    const project = this.projectFromPath(path);

    if (project) {
      return {
        title: `${project.title} Case Study | ${PERSON_NAME}`,
        description: `${project.summary} Stack: ${project.stack.slice(0, 5).join(', ')}.`,
        path,
      };
    }

    if (path.startsWith('/work/')) {
      return {
        title: `Project Not Found | ${PERSON_NAME}`,
        description: 'This project page could not be found. View selected work by Gyanendra Maurya.',
        path: '/work',
        robots: 'noindex,follow',
      };
    }

    return this.deepestRouteSeo() ?? {
      title: `${PERSON_NAME} | Full Stack Developer`,
      description: DEFAULT_DESCRIPTION,
      path: '/',
    };
  }

  private deepestRouteSeo(): SeoData | null {
    let currentRoute = this.route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return (currentRoute.snapshot.data['seo'] as SeoData | undefined) ?? null;
  }

  private buildStructuredData(
    seo: SeoData,
    canonicalUrl: string,
    imageUrl: string,
    path: string,
  ): Record<string, unknown> {
    const origin = this.siteOrigin();
    const personId = `${origin}/#person`;
    const websiteId = `${origin}/#website`;
    const webpageId = `${canonicalUrl}#webpage`;
    const breadcrumbId = `${canonicalUrl}#breadcrumb`;

    const person: JsonLdNode = {
      '@type': 'Person',
      '@id': personId,
      name: PERSON_NAME,
      url: origin,
      image: imageUrl,
      jobTitle: 'Full Stack Developer',
      description: DEFAULT_DESCRIPTION,
      email: 'mailto:gmaurya973@gmail.com',
      sameAs: SOCIAL_LINKS,
      knowsAbout: [
        'Angular',
        'React',
        'TypeScript',
        'Spring Boot',
        'REST APIs',
        'Dashboards',
        'Payment integrations',
        'PDF tools',
        'AI document workflows',
      ],
    };

    const website: JsonLdNode = {
      '@type': 'WebSite',
      '@id': websiteId,
      url: origin,
      name: SITE_NAME,
      publisher: { '@id': personId },
      inLanguage: 'en',
    };

    const webpage: JsonLdNode = {
      '@type': this.webPageType(path),
      '@id': webpageId,
      url: canonicalUrl,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': personId },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      inLanguage: 'en',
    };

    const graph: JsonLdNode[] = [person, website, webpage];

    if (path !== '/') {
      webpage['breadcrumb'] = { '@id': breadcrumbId };
      graph.push(this.breadcrumbList(path, canonicalUrl, breadcrumbId));
    }

    if (path === '/about') {
      webpage['mainEntity'] = { '@id': personId };
    }

    if (path === '/work') {
      const itemListId = `${canonicalUrl}#projects`;
      webpage['mainEntity'] = { '@id': itemListId };
      graph.push(this.projectItemList(itemListId));
    }

    if (path === '/services') {
      const catalogId = `${canonicalUrl}#services`;
      webpage['mainEntity'] = { '@id': catalogId };
      graph.push(this.serviceCatalog(catalogId, personId));
    }

    const project = this.projectFromPath(path);

    if (project) {
      const projectId = `${canonicalUrl}#project`;
      webpage['mainEntity'] = { '@id': projectId };
      graph.push({
        '@type': 'CreativeWork',
        '@id': projectId,
        name: project.title,
        headline: project.title,
        url: canonicalUrl,
        description: project.summary,
        creator: { '@id': personId },
        keywords: project.stack.join(', '),
      });
    }

    if (path === '/skills') {
      webpage['mainEntity'] = {
        '@type': 'ItemList',
        itemListElement: skillGroups.map((group, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: group.title,
          description: group.skills.join(', '),
        })),
      };
    }

    return {
      '@context': 'https://schema.org',
      '@graph': graph,
    };
  }

  private projectItemList(itemListId: string): JsonLdNode {
    return {
      '@type': 'ItemList',
      '@id': itemListId,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: this.absoluteUrl(`/work/${project.slug}`),
        name: project.title,
        description: project.summary,
      })),
    };
  }

  private serviceCatalog(catalogId: string, personId: string): JsonLdNode {
    return {
      '@type': 'OfferCatalog',
      '@id': catalogId,
      name: 'Full stack development services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.text,
          provider: { '@id': personId },
        },
      })),
    };
  }

  private breadcrumbList(path: string, canonicalUrl: string, breadcrumbId: string): JsonLdNode {
    const crumbs = [{ name: 'Home', item: this.absoluteUrl('/') }];

    if (path.startsWith('/work/')) {
      const project = this.projectFromPath(path);
      crumbs.push({ name: 'Work', item: this.absoluteUrl('/work') });
      crumbs.push({ name: project?.title ?? 'Project', item: canonicalUrl });
    } else {
      crumbs.push({ name: this.pageLabel(path), item: canonicalUrl });
    }

    return {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    };
  }

  private webPageType(path: string): string {
    if (path === '/about') {
      return 'ProfilePage';
    }

    if (path === '/contact') {
      return 'ContactPage';
    }

    if (path === '/work') {
      return 'CollectionPage';
    }

    return 'WebPage';
  }

  private currentPath(): string {
    const [path] = this.router.url.split(/[?#]/);
    const normalized = path.replace(/\/+$/, '');
    return normalized || '/';
  }

  private projectFromPath(path: string) {
    const slug = path.match(/^\/work\/([^/]+)$/)?.[1];
    return slug ? projects.find((project) => project.slug === slug) : undefined;
  }

  private pageLabel(path: string): string {
    const label = path.replace(/^\//, '');
    return label ? label.charAt(0).toUpperCase() + label.slice(1) : 'Home';
  }

  private setMetaName(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name="${name}"`);
  }

  private setMetaProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property="${property}"`);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private setStructuredData(data: Record<string, unknown>): void {
    const scriptId = 'portfolio-structured-data';
    let script = this.document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  private absoluteUrl(pathOrUrl: string): string {
    return new URL(pathOrUrl, this.siteOrigin()).toString();
  }

  private siteOrigin(): string {
    const origin = this.document.location?.origin;
    return origin && origin !== 'null' ? origin : 'https://gyanendramaurya.com';
  }
}
