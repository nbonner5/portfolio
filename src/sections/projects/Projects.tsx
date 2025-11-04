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
		image: 'images/gremlin.png',
		showModal: true,
	},
];

const RC_CAR_IFRAME = (
  <iframe
    src="https://docs.google.com/presentation/d/e/2PACX-1vQ1F6SBnRl_7CAa03eXXxqfQNr-Ei7nNw2P7dd0t8-g096AjBc4JMOqS3YyD8JPgu2cbfwqOXO-snaO/pubembed?start=true&loop=true&delayms=3000"
    frameBorder="0"
    width="960"
    height="569"
    allowFullScreen
    title="Autonomous RC Car Presentation"
    style={{ maxWidth: '100%', borderRadius: '1rem', boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}
  />
);

const Projects: React.FC = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [focused, setFocused] = useState(false);
	const [theme, setTheme] = useState<'light' | 'dark'>(
		document.documentElement.className as 'light' | 'dark'
	);
	const [modalOpen, setModalOpen] = useState(false);

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

	function handleShowModal() {
		setModalOpen(true);
	}

	function handleCloseModal() {
		setModalOpen(false);
	}

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
										image={project.image}
										theme={theme}
										{...(project.showModal ? {
											onAction: handleShowModal
										} : { link: project.link })}
									/>
								</React.Suspense>
							</CardErrorBoundary>
						</div>
					))}
				</div>
				{modalOpen && (
					<div
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100vw',
							height: '100vh',
							background: 'rgba(0,0,0,0.7)',
							zIndex: 9999,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div style={{ position: 'relative', background: 'var(--bg-main)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--card-shadow)' }}>
							<button
								onClick={handleCloseModal}
								style={{ position: 'absolute', top: 16, right: 16, fontSize: 24, background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
								aria-label="Close"
							>
								&times;
							</button>
							{RC_CAR_IFRAME}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Projects;