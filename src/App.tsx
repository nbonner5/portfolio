import './App.css'
import React, { useState } from 'react'
import About from './sections/about/About'
import Hero from './sections/hero/Hero'
import Projects from './sections/projects/Projects'
import Contact from './sections/contact/contact'
import Footer from './sections/footer/Footer'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <>
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
    </>
  )
}

export default App
