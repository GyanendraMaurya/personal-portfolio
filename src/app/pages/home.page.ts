import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { projects, services } from '../portfolio-data';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  template: `
    <section class="hero-section page-section">
      <div class="hero-copy reveal">
        <p class="eyebrow">Full Stack Developer</p>
        <h1>Building calm, useful web products from interface to backend.</h1>
        <p class="hero-text">
          I am Gyanendra Maurya, a full stack developer with 7 years of experience building
          modern web apps, APIs, AI document workflows, dashboards, file tools, and
          payment-focused product journeys.
        </p>
        <div class="action-row">
          <a class="button button-primary" routerLink="/work">View work</a>
          <a class="button button-secondary" routerLink="/contact">Contact me</a>
        </div>
      </div>

      <div class="hero-panel reveal delay-1" aria-label="Portfolio highlights">
        <div class="signal-line"></div>
        <p>7 years of web product delivery</p>
        <ul>
          <li>Frontend, backend, and cloud-ready features</li>
          <li>React, Angular, Node, and API integrations</li>
          <li>AI document workflows</li>
          <li>Dashboards, payments, and file tools</li>
        </ul>
      </div>
    </section>

    <section class="page-section split-section">
      <div>
        <p class="eyebrow">Featured work</p>
        <h2>ConvertLab shows the product range.</h2>
      </div>
      <article class="feature-card">
        <p>{{ featured.eyebrow }}</p>
        <h3>{{ featured.title }}</h3>
        <span>{{ featured.summary }}</span>
        <a routerLink="/work/convertlab">Read case study</a>
      </article>
    </section>

    <section class="page-section">
      <div class="section-heading">
        <p class="eyebrow">Services</p>
        <h2>Focused help for real product work.</h2>
      </div>
      <div class="card-grid">
        @for (service of servicePreview; track service.title) {
          <article class="surface-card">
            <span class="card-index">0{{ $index + 1 }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </article>
        }
      </div>
    </section>
  `,
})
export class HomePage {
  protected readonly featured = projects[0];
  protected readonly servicePreview = services.slice(0, 3);
}
