import React, { useCallback } from 'react';
import './Hero.css';

const Button = React.lazy(() => import("nexus/Button"));

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
      return <button disabled style={{opacity: 0.6}}>Button Unavailable</button>;
    }
    return this.props.children;
  }
}

interface HeroProps {
  theme: 'light' | 'dark';
}

const Hero: React.FC<HeroProps> = ({ theme='dark' }) => {
  const handleViewProjects = useCallback(() => {
    const projectsSection = document.querySelector('.projects-section');
        if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
  }, []);

  const handleContactMe = useCallback(() => {
    const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

  return (
    <div className="hero">
      <h1 className="hero-heading">Nickolas R Bonner</h1>
      <p className="hero-description">
        Software Engineer | Web Developer
      </p>
      <div className="hero-buttons">
        <ButtonErrorBoundary>
          <React.Suspense fallback={<button disabled style={{opacity: 0.6}}>Loading...</button>}>
            <Button variant="primary" onClick={handleContactMe} theme={theme}>Contact Me</Button>
          </React.Suspense>
        </ButtonErrorBoundary>
        <ButtonErrorBoundary>
          <React.Suspense fallback={<button disabled style={{opacity: 0.6}}>Loading...</button>}>
            <Button variant="secondary" onClick={handleViewProjects} theme={theme}>View Projects</Button>
          </React.Suspense>
        </ButtonErrorBoundary>
      </div>
    </div>
  );
};

export default Hero;
