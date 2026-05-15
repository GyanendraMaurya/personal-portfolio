import { Component, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { projects } from '../portfolio-data';

@Component({
  selector: 'app-project-detail-page',
  imports: [RouterLink],
  template: `
    @if (project(); as project) {
      <section class="page-hero page-section">
        <a class="text-link" routerLink="/work"><span aria-hidden="true">←</span> Back to work</a>
        <p class="eyebrow">{{ project.eyebrow }}</p>
        <h1>{{ project.title }}</h1>
        <p>{{ project.summary }}</p>
        @if (project.note) {
          <p class="project-note">{{ project.note }}</p>
        }
        @if (project.liveUrl) {
          <div class="action-row">
            <a class="button button-primary" [href]="project.liveUrl" target="_blank" rel="noopener noreferrer">
              Visit live product
            </a>
          </div>
        }
      </section>

      <section class="page-section detail-layout">
        <div class="prose-stack">
          <h2>Project shape</h2>
          @for (paragraph of project.details; track paragraph) {
            <p>{{ paragraph }}</p>
          }
        </div>

        <aside class="surface-card detail-aside">
          <h3>Highlights</h3>
          <ul>
            @for (item of project.impact; track item) {
              <li>{{ item }}</li>
            }
          </ul>
          <div class="tag-row">
            @for (item of project.stack; track item) {
              <span>{{ item }}</span>
            }
          </div>
        </aside>
      </section>
    } @else {
      <section class="page-hero page-section">
        <a class="text-link" routerLink="/work"><span aria-hidden="true">←</span> Back to work</a>
        <p class="eyebrow">Project not found</p>
        <h1>This project page is not available.</h1>
        <p>Browse the selected work page for current case studies and product examples.</p>
      </section>
    }
  `,
})
export class ProjectDetailPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly project = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug');
    return projects.find((project) => project.slug === slug) ?? null;
  });
}
