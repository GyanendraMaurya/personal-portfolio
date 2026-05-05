import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
  website?: unknown;
};

type ValidContactMessage = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

type Database = {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          project_type: string;
          message: string;
          email_status: 'pending' | 'sent' | 'failed';
          email_provider_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          project_type: string;
          message: string;
          email_status?: 'pending' | 'sent' | 'failed';
          email_provider_id?: string | null;
          created_at?: string;
        };
        Update: {
          email_status?: 'pending' | 'sent' | 'failed';
          email_provider_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type ContactSupabaseClient = ReturnType<typeof createClient<Database>>;

const contactTable = 'contact_messages';
const allowedProjectTypes = new Set([
  'MVP build',
  'Web interface',
  'Backend API',
  'AI document workflow',
  'Maintenance',
]);

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const body = parseBody(req.body);

  if (hasHoneypotValue(body.website)) {
    res.status(200).json({ success: true, message: 'Message received.' });
    return;
  }

  const validation = validateContactMessage(body);

  if ('message' in validation) {
    res.status(400).json({ success: false, message: validation.message });
    return;
  }

  const env = readContactEnv();

  if ('missingKeys' in env) {
    console.error('Contact API configuration is incomplete', env.missingKeys);
    res.status(500).json({
      success: false,
      message: 'Contact form is not configured yet. Please try again later.',
    });
    return;
  }

  const supabase = createClient<Database>(env.values.supabaseUrl, env.values.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  const resend = new Resend(env.values.resendApiKey);

  const { data: insertedMessage, error: insertError } = await supabase
    .from(contactTable)
    .insert({
      name: validation.value.name,
      email: validation.value.email,
      project_type: validation.value.projectType,
      message: validation.value.message,
      email_status: 'pending',
    })
    .select('id')
    .single();

  if (insertError || !insertedMessage) {
    console.error('Contact insert failed', insertError);
    res.status(500).json({
      success: false,
      message: 'Unable to save your message right now. Please try again later.',
    });
    return;
  }

  const { data: emailData, error: emailError } = await resend.emails.send({
    from: env.values.resendFromEmail,
    to: [env.values.contactEmailTo],
    replyTo: validation.value.email,
    subject: `Portfolio contact: ${validation.value.projectType}`,
    text: buildEmailText(validation.value),
    html: buildEmailHtml(validation.value),
  });

  if (emailError) {
    console.error('Contact email failed', emailError);
    await updateEmailStatus(supabase, insertedMessage.id, 'failed', null);
    res.status(500).json({
      success: false,
      message: 'Your message was saved, but the email notification could not be sent.',
    });
    return;
  }

  await updateEmailStatus(supabase, insertedMessage.id, 'sent', emailData?.id ?? null);

  res.status(201).json({ success: true, message: 'Message sent.' });
}

function parseBody(body: unknown): ContactRequestBody {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as ContactRequestBody;
    } catch {
      return {};
    }
  }

  if (body && typeof body === 'object') {
    return body as ContactRequestBody;
  }

  return {};
}

function validateContactMessage(
  body: ContactRequestBody,
): { ok: true; value: ValidContactMessage } | { ok: false; message: string } {
  const name = normalizeText(body.name);
  const email = normalizeText(body.email).toLowerCase();
  const projectType = normalizeText(body.projectType);
  const message = normalizeText(body.message);

  if (!name) {
    return { ok: false, message: 'Please enter your name.' };
  }

  if (!isValidEmail(email)) {
    return { ok: false, message: 'Please enter a valid email address.' };
  }

  if (!allowedProjectTypes.has(projectType)) {
    return { ok: false, message: 'Please choose a valid project type.' };
  }

  if (message.length < 20) {
    return { ok: false, message: 'Please share at least 20 characters.' };
  }

  return { ok: true, value: { name, email, projectType, message } };
}

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function hasHoneypotValue(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(email);
}

function readContactEnv():
  | {
      ok: true;
      values: {
        supabaseUrl: string;
        supabaseServiceRoleKey: string;
        resendApiKey: string;
        resendFromEmail: string;
        contactEmailTo: string;
      };
    }
  | { ok: false; missingKeys: string[] } {
  const envMap = {
    SUPABASE_URL: process.env['SUPABASE_URL'],
    SUPABASE_SERVICE_ROLE_KEY: process.env['SUPABASE_SERVICE_ROLE_KEY'],
    RESEND_API_KEY: process.env['RESEND_API_KEY'],
    RESEND_FROM_EMAIL: process.env['RESEND_FROM_EMAIL'],
    CONTACT_EMAIL_TO: process.env['CONTACT_EMAIL_TO'],
  };
  const missingKeys = Object.entries(envMap)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    return { ok: false, missingKeys };
  }

  return {
    ok: true,
    values: {
      supabaseUrl: envMap.SUPABASE_URL,
      supabaseServiceRoleKey: envMap.SUPABASE_SERVICE_ROLE_KEY,
      resendApiKey: envMap.RESEND_API_KEY,
      resendFromEmail: envMap.RESEND_FROM_EMAIL,
      contactEmailTo: envMap.CONTACT_EMAIL_TO,
    },
  };
}

function buildEmailText(message: ValidContactMessage): string {
  return [
    'New portfolio contact message',
    '',
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Project type: ${message.projectType}`,
    '',
    'Message:',
    message.message,
  ].join('\n');
}

function buildEmailHtml(message: ValidContactMessage): string {
  return `
    <h2>New portfolio contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(message.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
    <p><strong>Project type:</strong> ${escapeHtml(message.projectType)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message.message).replace(/\n/g, '<br />')}</p>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function updateEmailStatus(
  supabase: ContactSupabaseClient,
  id: string,
  emailStatus: 'sent' | 'failed',
  emailProviderId: string | null,
): Promise<void> {
  const { error } = await supabase
    .from(contactTable)
    .update({
      email_status: emailStatus,
      email_provider_id: emailProviderId,
    })
    .eq('id', id);

  if (error) {
    console.error('Contact email status update failed', error);
  }
}
