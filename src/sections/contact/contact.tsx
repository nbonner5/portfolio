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
                        onSubmit={e => {
                            e.preventDefault();
                            alert('Message sent!');
                        }}
                    >
                        <label>
                            Name
                            <input type="text" name="name" autoComplete="name" required />
                        </label>
                        <label>
                            Email
                            <input type="email" name="email" autoComplete="email" required />
                        </label>
                        <label>
                            Message
                            <textarea name="message" required rows={5} />
                        </label>
                        <ButtonErrorBoundary>
                            <Suspense fallback={<button type="submit" style={{ alignSelf: 'flex-end' }}>Send Message</button>}>
                                <Button type="submit" variant="primary" style={{ alignSelf: 'flex-end' }}>
                                    Send Message
                                </Button>
                            </Suspense>
                        </ButtonErrorBoundary>
                    </form>
                </div>
            </div>
        </section>
    );
}