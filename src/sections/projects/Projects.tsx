import React, { useRef, useEffect, useState } from 'react';
import './Projects.css';

const Card = React.lazy(() => import('nexus/Card'));

class CardErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="card-fallback">
          <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-color)' }}>
            <h3>Card Component Unavailable</h3>
            <p>Unable to load card component</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const projects = [
	{
		title: 'Portfolio Website',
		description: 'A personal portfolio built with React, Vite, and module federation.',
		link: 'https://github.com/nbonner5/portfolio',
		image: 'images/portfolio.png',
	},
	{
		title: 'Remote UI Library',
		description: 'A federated component library for sharing UI across apps.',
		link: 'https://github.com/nbonner5/nexus',
		image: 'images/nexus.png',
	},
	{
		title: 'Small Business Website Rebuild',
		description: 'Rebuilt a small business website with a modern design and responsive layout.',
		link: 'https://www.bonnerelectric.com',
		image: 'images/bonnerelectric.png',
	},
	{
		title: 'VR Crime Scene Investigation Training App',
		description: 'Pedagogical training app for crime scene investigation using VR.',
		link: 'https://github.com/nbonner5/FSC_CSI',
		image: 'images/fsc_csi.png',
	},
	{
		title: 'Autonomous RC Car Project',
		description: 'Using a Raspberry Pi and a camera, built an autonomous RC car that can navigate a track and avoid obstacles.',
		link: 'https://github.com/nbonner5/',
		image: 'images/gremlin.png',
	},
];

const Projects: React.FC = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [focused, setFocused] = useState(false);
	const [theme, setTheme] = useState<'light' | 'dark'>(
		document.documentElement.className as 'light' | 'dark'
	);

	useEffect(() => {
		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				setFocused(entry.isIntersecting && entry.intersectionRatio > 0.7);
			});
		};
		const observer = new window.IntersectionObserver(handleIntersection, {
			threshold: [0.7],
		});
		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const observer = new MutationObserver(() => {
			setTheme(document.documentElement.className as 'light' | 'dark');
		});
		observer.observe(document.documentElement, { attributes: true });
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={sectionRef}
			className={`projects-section${focused ? ' focused' : ''}`}
		>
			<div className="projects-content">
				<h2 className="projects-heading">Projects</h2>
				<div className="projects-list">
					{projects.map((project) => (
						<div key={project.title} className="carousel-item">
							<CardErrorBoundary>
								<React.Suspense fallback={<div className="card-fallback">Loading...</div>}>
									<Card
										title={project.title}
										description={project.description}
										link={project.link}
										image={project.image}
										theme={theme}
									/>
								</React.Suspense>
							</CardErrorBoundary>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Projects;