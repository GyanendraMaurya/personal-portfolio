import { Component } from '@angular/core';
import { services } from '../portfolio-data';

@Component({
  selector: 'app-services-page',
  template: `
    <section class="page-hero page-section">
      <p class="eyebrow">Services</p>
      <h1>Development support for products that need clear execution.</h1>
      <p>
        I can help with new builds, product improvements, integrations, dashboards, and practical
        AI-assisted document workflows.
      </p>
    </section>

    <section class="page-section card-grid">
      @for (service of services; track service.title) {
        <article class="surface-card">
          <span class="card-index">0{{ $index + 1 }}</span>
          <h2>{{ service.title }}</h2>
          <p>{{ service.text }}</p>
        </article>
      }
    </section>
  `,
})
export class ServicesPage {
  protected readonly services = services;
}
