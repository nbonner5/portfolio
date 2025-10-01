import React, { useRef, useEffect, useState } from 'react';
import './About.css';

const techSkills = [
  'React', '.NET', 'Python'
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        setFocused(entry.isIntersecting && entry.intersectionRatio > 0.7);
      });
    };
    const observer = new window.IntersectionObserver(handleIntersection, {
      threshold: [0.7]
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={`about-section${focused ? ' focused' : ''}`}>
      <div className="about-profile">
        <img
          src="/images/profile.jpg"
          alt="Profile"
          className="about-profile-pic"
        />
      </div>
      <div className="about-content">
        <h2 className="about-heading">About</h2>
        <p className="about-description">
          I'm a software engineer specializing in web development with React, .NET, and SQL.
          I have experience building APIs, ensuring accessibility compliance,
          and collaborating in Agile team. I enjoy solving real-world problems through
          clean, scalable code and am always exploring new technologies to grow as a developer.
        </p>
        <div className="about-tags">
          {techSkills.map(skill => (
            <span className="about-tag" key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;