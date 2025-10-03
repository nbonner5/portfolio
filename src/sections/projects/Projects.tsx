import React, { useRef, useEffect, useState } from 'react';
import './Projects.css';

const Card = React.lazy(() => import('nexus/Card'));

const defaultImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';

const projects = [
	{
		title: 'Portfolio Website',
		description: 'A personal portfolio built with React, Vite, and module federation.',
		link: 'https://github.com/nbonner5/portfolio',
		image: defaultImage,
	},
	{
		title: 'Remote UI Library',
		description: 'A federated component library for sharing UI across apps.',
		link: '',
		image: defaultImage,
	},
	{
		title: 'DevOps Dashboard',
		description: 'A dashboard for monitoring CI/CD pipelines and cloud resources.',
		link: '',
		image: defaultImage,
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
						<React.Suspense
							key={project.title}
							fallback={<div className="card-fallback">Loading...</div>}
						>
							<Card
								title={project.title}
								description={project.description}
								link={project.link}
								image={project.image}
								theme={theme}
							/>
						</React.Suspense>
					))}
				</div>
			</div>
		</div>
	);
};

export default Projects;