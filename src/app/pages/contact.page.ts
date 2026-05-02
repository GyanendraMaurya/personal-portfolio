import { Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule],
  template: `
    <section class="page-hero page-section">
      <p class="eyebrow">Contact</p>
      <h1>Tell me what you want to build, improve, or untangle.</h1>
      <p>
        Best fit: MVP builds, web interfaces, Spring Boot APIs, document tools, AI workflows,
        dashboards, and ongoing product support.
      </p>
    </section>

    <section class="page-section contact-layout">
      <form class="contact-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
        @if (submitted()) {
          <div class="form-note" role="status">
            Thanks. This form is ready; backend email delivery can be connected next.
          </div>
        }

        <label>
          <span>Full name</span>
          <input type="text" formControlName="name" autocomplete="name" />
          @if (showError('name')) {
            <small>Please enter your name.</small>
          }
        </label>

        <label>
          <span>Email address</span>
          <input type="email" formControlName="email" autocomplete="email" />
          @if (showError('email')) {
            <small>Please enter a valid email.</small>
          }
        </label>

        <label>
          <span>Project type</span>
          <select formControlName="projectType">
            <option value="MVP build">MVP build</option>
            <option value="Web interface">Web interface</option>
            <option value="Backend API">Backend API</option>
            <option value="AI document workflow">AI document workflow</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </label>

        <label>
          <span>Message</span>
          <textarea rows="7" formControlName="message"></textarea>
          @if (showError('message')) {
            <small>Please share at least 20 characters.</small>
          }
        </label>

        <button class="button button-primary" type="submit">Send message</button>
      </form>

      <aside class="contact-aside">
        <div>
          <p class="eyebrow">Direct</p>
          <h2>Prefer another way?</h2>
        </div>
        <a href="mailto:gmaurya973@gmail.com">gmaurya973&#64;gmail.com</a>
        <a href="https://www.linkedin.com/in/gyanendramaurya/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/GyanendraMaurya" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <p>
          A useful first message includes the goal, current state, timeline, and whether you need a
          one-time build or ongoing help.
        </p>
      </aside>
    </section>
  `,
})
export class ContactPage {
  private readonly formBuilder = new FormBuilder();
  protected readonly submitted = signal(false);
  protected readonly attemptedSubmit = signal(false);

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    projectType: ['MVP build', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  protected readonly invalid = computed(() => this.form.invalid && this.attemptedSubmit());

  protected showError(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.attemptedSubmit());
  }

  protected submit(): void {
    this.attemptedSubmit.set(true);
    this.submitted.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.set(true);
    this.form.reset({
      name: '',
      email: '',
      projectType: 'MVP build',
      message: '',
    });
    this.attemptedSubmit.set(false);
  }
}
