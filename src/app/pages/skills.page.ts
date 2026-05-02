import { Component } from '@angular/core';
import { skillGroups } from '../portfolio-data';

@Component({
  selector: 'app-skills-page',
  template: `
    <section class="page-hero page-section">
      <p class="eyebrow">Skills</p>
      <h1>A stack shaped around product delivery.</h1>
      <p>
        The tools matter, but the aim is always the same: interfaces that feel good, APIs that
        behave clearly, and systems that can keep growing.
      </p>
    </section>

    <section class="page-section skills-grid">
      @for (group of skillGroups; track group.title) {
        <article class="skill-card">
          <h2>{{ group.title }}</h2>
          <div class="tag-row">
            @for (skill of group.skills; track skill) {
              <span>{{ skill }}</span>
            }
          </div>
        </article>
      }
    </section>
  `,
})
export class SkillsPage {
  protected readonly skillGroups = skillGroups;
}
