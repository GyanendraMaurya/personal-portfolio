import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';

import { ContactApiService } from '../services/contact-api.service';

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
            Thanks. Your message has been sent.
          </div>
        }

        @if (submitError()) {
          <div class="form-note form-note-error" role="alert">
            {{ submitError() }}
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

        <label class="contact-honeypot" aria-hidden="true">
          <span>Website</span>
          <input type="text" formControlName="website" autocomplete="off" tabindex="-1" />
        </label>

        <label>
          <span>Message</span>
          <textarea rows="7" formControlName="message"></textarea>
          @if (showError('message')) {
            <small>Please share at least 20 characters.</small>
          }
        </label>

        <button class="button button-primary" type="submit" [disabled]="isSending()">
          {{ isSending() ? 'Sending...' : 'Send message' }}
        </button>
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
  private readonly contactApi = inject(ContactApiService);
  protected readonly submitted = signal(false);
  protected readonly attemptedSubmit = signal(false);
  protected readonly isSending = signal(false);
  protected readonly submitError = signal('');

  protected readonly form = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, publicEmailDomainValidator]],
    projectType: ['MVP build', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]],
    website: [''],
  });

  protected showError(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.attemptedSubmit());
  }

  protected submit(): void {
    this.attemptedSubmit.set(true);
    this.submitted.set(false);
    this.submitError.set('');

    if (this.form.invalid || this.isSending()) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    this.isSending.set(true);

    this.contactApi
      .submitContactMessage({
        name: formValue.name ?? '',
        email: formValue.email ?? '',
        projectType: formValue.projectType ?? 'MVP build',
        message: formValue.message ?? '',
        website: formValue.website ?? '',
      })
      .pipe(finalize(() => this.isSending.set(false)))
      .subscribe({
        next: () => {
          this.submitted.set(true);
          this.form.reset({
            name: '',
            email: '',
            projectType: 'MVP build',
            message: '',
            website: '',
          });
          this.attemptedSubmit.set(false);
        },
        error: () => {
          this.submitError.set('Something went wrong while sending your message. Please try again.');
        },
      });
  }
}

function publicEmailDomainValidator(control: AbstractControl): ValidationErrors | null {
  const email = typeof control.value === 'string' ? control.value.trim() : '';

  if (!email) {
    return null;
  }

  return /^[^\s@]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(email)
    ? null
    : { publicEmailDomain: true };
}
