export interface INavItem {
	id: number;
	label: string;
	value: string;
	href?: string;
	children?: {
		links: {
			[key: string]: Array<{
				id: number;
				label: string;
				value: string;
				href: string;
			}>;
		};
		featured: Array<{
			id: number;
			label: string;
			href: string;
			imageSrc: string;
		}>;
	};
}