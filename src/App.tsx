import './App.css'
import React from 'react'

const Button = React.lazy(() => import("nexus/Button"));

function App() {
  return (
    <div className="hero">
      <h1 className="hero-heading">Nickolas R Bonner</h1>
      <p className="hero-description">
        Software Engineer | Web Developer
      </p>
      <div className="hero-buttons">
        <React.Suspense fallback={<span>Loading...</span>}>
          <Button variant="primary">Contact Me</Button>
        </React.Suspense>
        <React.Suspense fallback={<span>Loading...</span>}>
          <Button variant="secondary">View Projects</Button>
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
