import { Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  template: `
    <section class="page-hero page-section">
      <p class="eyebrow">About</p>
      <h1>I like building software that feels clear, dependable, and quietly polished.</h1>
      <p>
        My work sits across web interfaces and backend practicality. I care about clean user
        journeys, maintainable implementation, and shipping features that help people get their
        work done without friction.
      </p>
    </section>

    <section class="page-section story-layout">
      <div class="portrait-card">
        <div class="portrait-mark">GM</div>
        <p>Web developer with a practical product mindset.</p>
      </div>
      <div class="prose-stack">
        <h2>Seven years of building useful web products.</h2>
        <p>
          I work on modern interfaces, Spring Boot APIs, document and file workflows, dashboards,
          authentication, payment journeys, and AI-powered product ideas. I enjoy the parts of
          software where good structure and thoughtful UX meet.
        </p>
        <p>
          The common thread is usefulness. Whether I am improving a form, connecting an API,
          designing a dashboard, or shaping a document chat flow, I want the final product to feel
          direct, legible, and ready for real use.
        </p>
      </div>
    </section>
  `,
})
export class AboutPage {}
