import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { projects } from '../portfolio-data';

@Component({
  selector: 'app-work-page',
  imports: [RouterLink],
  template: `
    <section class="page-hero page-section">
      <p class="eyebrow">Work</p>
      <h1>Selected product work across interfaces, APIs, documents, and tools.</h1>
      <p>
        A compact look at the kinds of systems I build and improve, from full product flows to
        focused integrations.
      </p>
    </section>

    <section class="page-section project-list">
      @for (project of projects; track project.slug) {
        <article class="project-card">
          <div>
            <p class="eyebrow">{{ project.eyebrow }}</p>
            <h2>{{ project.title }}</h2>
            <p>{{ project.summary }}</p>
            @if (project.note) {
              <p class="project-note">{{ project.note }}</p>
            }
          </div>
          <div class="tag-row">
            @for (item of project.stack.slice(0, 4); track item) {
              <span>{{ item }}</span>
            }
          </div>
          <div class="action-row">
            <a class="button button-secondary" [routerLink]="['/work', project.slug]">
              {{ project.primaryCtaLabel ?? 'Read case study' }}
            </a>
            @if (project.liveUrl) {
              <a
                class="button button-primary"
                [href]="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live product
              </a>
            }
          </div>
        </article>
      }
    </section>
  `,
})
export class WorkPage {
  protected readonly projects = projects;
}
