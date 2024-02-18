// Background.tsx
import React from "react";
import "../styles/Background.css";

interface Icon {
	id: number;
	position: string;
}

const Background = ({ children, title }: { children: React.ReactNode, title?: string }) => {
	const icons: Icon[] = [
		{ id: 1, position: "middle-right" },
		{ id: 2, position: "top-right" },
		{ id: 3, position: "bottom-center" },
		{ id: 4, position: "bottom-right" },
		{ id: 5, position: "middle-left" },
		{ id: 6, position: "top-left" },
		{ id: 7, position: "footer-right" },
		{ id: 8, position: "center" },
	];

	const getBackgroundColor = (title: string | undefined) => {
		switch (title) {
			case 'Rick and Morty':
				return '#B3C9D7';
			default:
				return '#BFBCE3';
		}
	};

	return (
		<div className="background" style={{
			backgroundColor: getBackgroundColor(title) }}>
			<h1>{title}</h1>
			<div className="main-container">
				{icons.map((icon) => (
					<div key={icon.id} className={`icon ${icon.position}`} />
				))}
				{children}
			</div>
		</div>
	);
};

export default Background;
