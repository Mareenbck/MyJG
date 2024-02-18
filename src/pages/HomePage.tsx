import '../styles/HomePage.css'
import CharactersList from "./CharactersList";

interface Icon {
	id: number,
	position: string
}

const HomePage = () => {
	const icons: Icon[] = [
		{ id: 1, position: 'middle-right' },
		{ id: 2, position: 'top-right' },
		{ id: 3, position: 'bottom-center' },
		{ id: 4, position: 'bottom-right' },
		{ id: 5, position: 'middle-left' },
		{ id: 6, position: 'top-left' },
		{ id: 7, position: 'footer-right' },
		{ id: 8, position: 'center' },
	];

	return (
		<div className='home-page'>
			<h1>Rick and Morty</h1>
			<div className="main-container">
				{icons.map((icon) => (
					<div
					key={icon.id}
					className={`icon ${icon.position}`}
					/>
				))}
			<CharactersList></CharactersList>
			</div>
		</div>
	)
}

export default HomePage
