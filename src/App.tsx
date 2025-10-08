import './App.css'
import React, { useState } from 'react'
import About from './sections/about/About'
import Hero from './sections/hero/Hero'
import Projects from './sections/projects/Projects'
import Contact from './sections/contact/contact'
import Footer from './sections/footer/Footer'

class AppErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--bg-color)',
          color: 'var(--text-color)'
        }}>
          <h1>Something went wrong</h1>
          <p>There was an error loading the application. Please refresh the page to try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              padding: '0.5rem 1rem', 
              marginTop: '1rem',
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <AppErrorBoundary>
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </AppErrorBoundary>
  )
}

export default App
