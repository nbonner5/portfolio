import './App.css'
import React, { useState } from 'react'
import About from './sections/about/About'
import Hero from './sections/hero/Hero'
import Projects from './sections/projects/Projects'

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
    </>
  )
}

export default App
