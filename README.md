# PersonalPortfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.24.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Contact backend

The contact form posts to the Vercel serverless function at `/api/contact`.

For local verification, add your real values to `.env.local`, then run:

```bash
npm run dev:vercel
```

Open the local URL printed by Vercel, usually `http://localhost:3000`, and submit the contact form. The script loads `.env.local` before starting Vercel, so the `/api/contact` function can read the same values that the VS Code backend debugger reads.

Before deploying, create the Supabase table by running the SQL in `supabase/contact_messages.sql` inside the Supabase SQL editor. The table has row level security enabled and does not expose public insert policies because writes happen through the server-side service role key.

Set these environment variables in Vercel Project Settings:

```bash
SITE_URL=https://yourdomain.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=Portfolio <hello@yourdomain.com>
CONTACT_EMAIL_TO=you@example.com
```

Values in `.env.local` are local only and are not deployed to Vercel. Add the same keys in Vercel under Project Settings -> Environment Variables for Production, Preview, and Development as needed, then redeploy.

For Resend, verify your sending domain when you are ready to use your own `RESEND_FROM_EMAIL`. The visitor's email is sent as the notification `replyTo`, so replying to the notification goes back to the sender.

Recommended Vercel settings:

```bash
Build command: npm run build
Output directory: dist/personal-portfolio/browser
API endpoint: /api/contact
```

If you move to Netlify later, keep the Angular service unchanged and add a Netlify Function wrapper that calls the same backend logic.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
