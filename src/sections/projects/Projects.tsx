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
		title: 'Task Management App',
		description: 'A full-stack task management application with real-time updates and team collaboration.',
		link: 'https://github.com/nbonner5/taskmanager',
		image: 'images/taskmanager.png',
	},
	{
		title: 'Weather Dashboard',
		description: 'A responsive weather dashboard with location-based forecasts and interactive maps.',
		link: 'https://github.com/nbonner5/weather-dashboard',
		image: 'images/weather.png',
	},
	{
		title: 'E-commerce Platform',
		description: 'A modern e-commerce platform with payment integration and inventory management.',
		link: 'https://github.com/nbonner5/ecommerce',
		image: 'images/ecommerce.png',
	},
];

const Projects: React.FC = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const [focused, setFocused] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [theme, setTheme] = useState<'light' | 'dark'>(
		document.documentElement.className as 'light' | 'dark'
	);

	const [cardsPerView, setCardsPerView] = useState(3); // Number of cards visible at once
	const maxIndex = Math.max(0, projects.length - cardsPerView);

	// Handle responsive card count
	useEffect(() => {
		const updateCardsPerView = () => {
			if (window.innerWidth <= 480) {
				setCardsPerView(1);
			} else if (window.innerWidth <= 700) {
				setCardsPerView(1);
			} else if (window.innerWidth <= 1100) {
				setCardsPerView(2);
			} else {
				setCardsPerView(3);
			}
		};

		updateCardsPerView();
		window.addEventListener('resize', updateCardsPerView);
		return () => window.removeEventListener('resize', updateCardsPerView);
	}, []);

	// Reset current index when cards per view changes
	useEffect(() => {
		setCurrentIndex(0);
	}, [cardsPerView]);

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

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
	};

	return (
		<div
			ref={sectionRef}
			className={`projects-section${focused ? ' focused' : ''}`}
		>
			<div className="projects-content">
				<h2 className="projects-heading">Projects</h2>
				<div className="carousel-container">
					<button 
						className="carousel-btn carousel-btn-prev"
						onClick={goToPrevious}
						disabled={currentIndex === 0}
						aria-label="Previous projects"
					>
						&#8249;
					</button>
					<div className="carousel-wrapper" ref={carouselRef}>
						<div 
							className="projects-list"
							style={{
								transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
								transition: 'transform 0.3s ease-in-out'
							}}
						>
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
					<button 
						className="carousel-btn carousel-btn-next"
						onClick={goToNext}
						disabled={currentIndex === maxIndex}
						aria-label="Next projects"
					>
						&#8250;
					</button>
				</div>
			</div>
		</div>
	);
};

export default Projects;