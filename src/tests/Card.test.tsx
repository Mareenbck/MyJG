import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Card from '../components/Card';
import { Character } from '../interface';

const character: Character = {
	"id": 1,
	"name": "Rick Sanchez",
	"status": "Alive",
	"species": "Human",
	"gender": "Male",
	"origin": {
		"name": "Earth (C-137)",
		"url": "https://rickandmortyapi.com/api/location/1"
	},
	"location": {
		"name": "Citadel of Ricks",
		"url": "https://rickandmortyapi.com/api/location/3"
	},
	"image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	"episode": [
		"https://rickandmortyapi.com/api/episode/1",
		"https://rickandmortyapi.com/api/episode/2",
		// ...
	],
}

describe('Card component', () => {
	it('renders character information', () => {
		render(<Card character={character} />);
		expect(screen.getByText(character.name)).toBeInTheDocument();
		expect(screen.getByText(character.species)).toBeInTheDocument();
		expect(screen.getByAltText(character.name)).toHaveAttribute('src', character.image);
	});
	it('renders tags for species and origin', () => {
		render(<Card character={character} />);
		expect(screen.getByText(character.species)).toHaveAttribute('class', 'tag species');
		expect(screen.getByText(character.origin.name)).toHaveAttribute('class', 'tag location');
	});
	it('updates last episode after fetching', async () => {
		render(<Card character={character} />);
		expect(screen.getByText('Last Episode:')).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText('Last Episode:')).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(screen.getByText('S01E02')).toBeInTheDocument();
		});
	});

})
