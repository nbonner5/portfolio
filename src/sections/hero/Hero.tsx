import React from 'react';
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

const Hero: React.FC = () => (
  <div className="hero">
    <h1 className="hero-heading">Nickolas R Bonner</h1>
    <p className="hero-description">
      Software Engineer | Web Developer
    </p>
    <div className="hero-buttons">
      <ButtonErrorBoundary>
        <React.Suspense fallback={<button disabled style={{opacity: 0.6}}>Loading...</button>}>
          <Button variant="primary">Contact Me</Button>
        </React.Suspense>
      </ButtonErrorBoundary>
      <ButtonErrorBoundary>
        <React.Suspense fallback={<button disabled style={{opacity: 0.6}}>Loading...</button>}>
          <Button variant="secondary">View Projects</Button>
        </React.Suspense>
      </ButtonErrorBoundary>
    </div>
  </div>
);

export default Hero;
