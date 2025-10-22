import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  token?: string;
  language?: 'en' | 'pt' | 'ca';
}

// Email translations
const emailTranslations = {
  en: {
    userSubject: 'We received your message',
    userGreeting: 'Thank you for reaching out! I have received your message and will get back to you as soon as possible.',
    userYourMessage: 'Your message:',
    userSignoff: 'Best regards,',
  },
  pt: {
    userSubject: 'Recebemos sua mensagem',
    userGreeting: 'Obrigado por entrar em contato! Recebi sua mensagem e voltarei para você assim que possível.',
    userYourMessage: 'Sua mensagem:',
    userSignoff: 'Melhores cumprimentos,',
  },
  ca: {
    userSubject: 'Hem rebut el teu missatge',
    userGreeting: 'Gràcies per posar-te en contacte! He rebut el teu missatge i et respondré tan aviat com sigui possible.',
    userYourMessage: 'El teu missatge:',
    userSignoff: 'Cordials salutacions,',
  },
};

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate form data
function validateContactData(data: unknown): data is ContactFormData {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.name === 'string' &&
    obj.name.trim().length > 0 &&
    obj.name.length <= 100 &&
    typeof obj.email === 'string' &&
    isValidEmail(obj.email) &&
    typeof obj.subject === 'string' &&
    obj.subject.trim().length > 0 &&
    obj.subject.length <= 200 &&
    typeof obj.message === 'string' &&
    obj.message.trim().length > 0 &&
    obj.message.length <= 5000 &&
    (typeof obj.token === 'string' || obj.token === undefined) &&
    (typeof obj.language === 'string' || obj.language === undefined)
  );
}

// Verify Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification');
      return true; // Allow if not configured
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    const data = (await response.json()) as {
      success?: boolean;
      error_codes?: string[];
    };

    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Only accept POST requests
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate form data
    if (!validateContactData(body)) {
      return NextResponse.json(
        { error: 'Invalid or missing form data' },
        { status: 400 }
      );
    }

    const { name, email, subject, message, token, language = 'en' } = body;

    // CAPTCHA is REQUIRED - verify token
    if (!token) {
      return NextResponse.json(
        { error: 'CAPTCHA verification is required' },
        { status: 400 }
      );
    }

    // Verify the token is valid
    if (process.env.TURNSTILE_SECRET_KEY) {
      const isTokenValid = await verifyTurnstileToken(token);
      if (!isTokenValid) {
        return NextResponse.json(
          { error: 'CAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    } else {
      console.warn('TURNSTILE_SECRET_KEY not configured - cannot verify CAPTCHA');
      return NextResponse.json(
        { error: 'CAPTCHA verification is not configured on the server' },
        { status: 500 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY || !resend) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Validate language
    const validLanguage = language && ['en', 'pt', 'ca'].includes(language) ? (language as 'en' | 'pt' | 'ca') : 'en';
    const trans = emailTranslations[validLanguage];

    // Send email to site owner
    const ownerEmailResult = await resend.emails.send({
      from: 'contact@nyuu.dev',
      to: process.env.CONTACT_EMAIL_TO || 'me@nyuu.dev',
      subject: `New Contact Form Submission: ${subject}`,
      html: generateEmailHtml('owner', { name, email, subject, message }, validLanguage),
      replyTo: email,
    });

    if (ownerEmailResult.error) {
      console.error('Error sending owner email:', ownerEmailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: 'contact@nyuu.dev',
      to: email,
      subject: trans.userSubject,
      html: generateEmailHtml('user', { name, email, subject, message }, validLanguage),
    });

    if (userEmailResult.error) {
      console.error('Error sending confirmation email:', userEmailResult.error);
      // Don't fail the request if confirmation email fails, but log it
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Email template generator
function generateEmailHtml(
  type: 'owner' | 'user',
  data: ContactFormData,
  language: 'en' | 'pt' | 'ca' = 'en'
): string {
  const trans = emailTranslations[language];

  if (type === 'owner') {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #667eea;
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: 600;
              color: #667eea;
              margin-bottom: 5px;
            }
            .value {
              background: white;
              padding: 10px 15px;
              border-radius: 4px;
              border-left: 4px solid #667eea;
            }
            .message-box {
              background: white;
              padding: 15px;
              border-radius: 4px;
              border-left: 4px solid #667eea;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${escapeHtml(data.name)}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${escapeHtml(data.subject)}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${escapeHtml(data.message)}</div>
              </div>
              <div class="footer">
                <p>This email was sent from your contact form at nyuu.dev</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  } else {
    // User confirmation email
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #667eea;
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .message {
              background: white;
              padding: 20px;
              border-radius: 4px;
              margin-bottom: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${trans.userSubject}</h2>
            </div>
            <div class="content">
              <div class="message">
                <p>Hi ${escapeHtml(data.name)},</p>
                <p>${trans.userGreeting}</p>
                <p style="margin-top: 20px;">${trans.userYourMessage}</p>
                <p><strong>${escapeHtml(data.subject)}</strong></p>
              </div>
              <div class="footer">
                <p>${trans.userSignoff}<br />nyuu.dev</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
