import './contact.css';
import React, { Suspense } from 'react';
const Button = React.lazy(() => import('nexus/Button'));

const GITHUB_URL = 'https://github.com/yourusername';
const LINKEDIN_URL = 'https://linkedin.com/in/yourusername';
const EMAIL_ADDRESS = 'your.email@example.com';

export default function Contact() {
    return (
        <section className="contact-section">
            <div className="contact-content-row">
                <div className="contact-left">
                    <h2 className="contact-heading">Contact Me</h2>
                    <div className="contact-social-row">
                        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" title="GitHub">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="12" fill="#181717"/>
                                <path fill="#fff" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.34 6.84 9.69.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.65.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.29.1-2.68 0 0 .84-.28 2.75 1.05a9.38 9.38 0 0 1 2.5-.34c.85 0 1.7.11 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.39.2 2.42.1 2.68.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.89 0 1.36-.01 2.45-.01 2.78 0 .27.18.58.69.48A10.26 10.26 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
                            </svg>
                        </a>
                        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="12" fill="#0077B5"/>
                                <path fill="#fff" d="M7.5 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm.75 2.25H6V18h2.25v-7.25zm3.25 0H10V18h2.25v-3.5c0-.94.19-1.88 1.37-1.88 1.17 0 1.18 1.09 1.18 1.94V18H17v-3.75c0-2.01-1.07-2.95-2.5-2.95-1.15 0-1.66.64-1.94 1.09v-1.09z"/>
                            </svg>
                        </a>
                        <a href={`mailto:${EMAIL_ADDRESS}`} title="Email">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="12" fill="#EA4335"/>
                                <path fill="#fff" d="M19 8.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 15.5v-7A1.5 1.5 0 0 1 6.5 7h11A1.5 1.5 0 0 1 19 8.5zm-1.5 0-5.5 4.25L6.5 8.5v7h11v-7z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="contact-right">
                    <form
                        className="contact-form"
                        onSubmit={e => {
                            e.preventDefault();
                            alert('Message sent!');
                        }}
                    >
                        <label>
                            Name
                            <input type="text" name="name" required />
                        </label>
                        <label>
                            Email
                            <input type="email" name="email" required />
                        </label>
                        <label>
                            Message
                            <textarea name="message" required rows={5} />
                        </label>
                        <Suspense fallback={<button type="submit" style={{ alignSelf: 'flex-end' }}>Send Message</button>}>
                            <Button type="submit" variant="primary" style={{ alignSelf: 'flex-end' }}>
                                Send Message
                            </Button>
                        </Suspense>
                    </form>
                </div>
            </div>
        </section>
    );
}