import { Component } from '@angular/core';
import { experienceItems } from '../portfolio-data';

@Component({
  selector: 'app-experience-page',
  template: `
    <section class="page-hero page-section">
      <p class="eyebrow">Experience</p>
      <h1>Seven years of practical full-stack product work.</h1>
      <p>
        A concise timeline of the experience themes that define how I build: useful interfaces,
        connected services, and steady product iteration.
      </p>
    </section>

    <section class="page-section timeline">
      @for (item of experienceItems; track item.title) {
        <article class="timeline-item">
          <span>{{ item.period }}</span>
          <div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.text }}</p>
          </div>
        </article>
      }
    </section>
  `,
})
export class ExperiencePage {
  protected readonly experienceItems = experienceItems;
}
