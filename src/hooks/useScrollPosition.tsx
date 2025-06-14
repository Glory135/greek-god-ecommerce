import { useEffect, useState } from 'react';

export default function useScrollPosition() {
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		setScrollPosition(window.scrollY);
	}, []);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return scrollPosition;
}
