import './contact.css';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Linkedin, GitHub, Mail } from 'react-feather';
const Button = React.lazy(() => import('nexus/Button'));

class ButtonErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <button type="submit" style={{ alignSelf: 'flex-end' }}>Send Message</button>;
    }
    return this.props.children;
  }
}

const GITHUB_URL = 'https://github.com/nbonner5';
const LINKEDIN_URL = 'https://linkedin.com/in/nickolas-bonner';
const EMAIL_ADDRESS = 'nbonner5@outlook.com';

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [focused, setFocused] = useState(false);
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({});

    // Regex patterns
    const NAME_REGEX = /^.{2,}$/;
    const EMAIL_REGEX = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
    const MESSAGE_REGEX = /^.{10,}$/;

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                setFocused(entry.isIntersecting && entry.intersectionRatio > 0.8);
            });
        };
        const observer = new window.IntersectionObserver(handleIntersection, {
            threshold: [0.8]
        });
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    function validate(form: HTMLFormElement) {
        const formData = new FormData(form);
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const message = String(formData.get('message') || '').trim();
        const errors: {name?: string; email?: string; message?: string} = {};
        if (!NAME_REGEX.test(name)) {
            errors.name = 'Error: Name must be at least 2 characters.';
        }
        if (!EMAIL_REGEX.test(email)) {
            errors.email = 'Error: Please enter a valid email address.';
        }
        if (!MESSAGE_REGEX.test(message)) {
            errors.message = 'Error: Message must be at least 10 characters.';
        }
        return errors;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSending(true);
        setStatus('idle');
        setErrors({});
        const form = e.currentTarget;
        const validationErrors = validate(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSending(false);
            return;
        }
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        try {
            const res = await fetch('http://localhost:5050/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        } finally {
            setSending(false);
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setErrors(prev => {
            const newErrors = { ...prev };
            if (name === 'name' && NAME_REGEX.test(value)) {
                delete newErrors.name;
            }
            if (name === 'email' && EMAIL_REGEX.test(value)) {
                delete newErrors.email;
            }
            if (name === 'message' && MESSAGE_REGEX.test(value)) {
                delete newErrors.message;
            }
            return newErrors;
        });
    }

    return (
        <section ref={sectionRef} className={`contact-section${focused ? ' focused' : ''}`}>
            <div className="contact-content-row">
                <div className="contact-left">
                    <h2 className="contact-heading">Contact Me</h2>
                    <div className="contact-social-row">
                        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" title="GitHub">
                            <GitHub className="contact-social-icon" size={48} />
                        </a>
                        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <Linkedin className="contact-social-icon" size={48} />
                        </a>
                        <a href={`mailto:${EMAIL_ADDRESS}`} title="Email">
                            <Mail className="contact-social-icon" size={48} />
                        </a>
                    </div>
                </div>
                <div className="contact-right">
                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <label>
                            Name
                            <input
                                type="text"
                                name="name"
                                autoComplete="name"
                                required
                                disabled={sending}
                                pattern={NAME_REGEX.source}
                                onChange={handleInputChange}
                            />
                            {errors.name && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.name}</span>}
                        </label>
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                required
                                disabled={sending}
                                pattern={EMAIL_REGEX.source}
                                onChange={handleInputChange}
                            />
                            {errors.email && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.email}</span>}
                        </label>
                        <label>
                            Message
                            <textarea
                                name="message"
                                required
                                rows={5}
                                disabled={sending}
                                onChange={handleInputChange}
                            />
                            {errors.message && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.message}</span>}
                        </label>
                        <ButtonErrorBoundary>
                            <Suspense fallback={<button type="submit" style={{ alignSelf: 'flex-end' }}>Send Message</button>}>
                                <Button type="submit" variant="primary" style={{ alignSelf: 'flex-end' }} disabled={sending}>
                                    {sending ? 'Sending...' : 'Send Message'}
                                </Button>
                            </Suspense>
                        </ButtonErrorBoundary>
                        {status === 'success' && (
                            <div style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Message sent successfully!</div>
                        )}
                        {status === 'error' && (
                            <div style={{ color: 'red', marginTop: '1rem' }}>Error: Failed to send message. Please try again.</div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}