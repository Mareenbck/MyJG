import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CharactersList from '../pages/CharactersList';

// Données JSON à utiliser pour les tests
const characters = [
	{
		"id": 1,
		"name": "Rick Sanchez",
		"status": "Alive",
		"species": "Human",
		"type": "",
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
		"url": "https://rickandmortyapi.com/api/character/1"
	},
	{
		"id": 2,
		"name": "Morty Smith",
		"status": "Alive",
		"species": "Human",
		"type": "",
		"gender": "Male",
		"origin": {
			"name": "Earth (C-137)",
			"url": "https://rickandmortyapi.com/api/location/1"
		},
		"location": {
			"name": "Earth (C-137)",
			"url": "https://rickandmortyapi.com/api/location/2"
		},
		"image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
		"episode": [
			"https://rickandmortyapi.com/api/episode/1",
			"https://rickandmortyapi.com/api/episode/2",
			// ...
		],
		"url": "https://rickandmortyapi.com/api/character/2"
	},
];

describe('CharacterList', () => {
	it('displays the list of characters by default', async () => {
		render(<CharactersList />);
		expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
	});

});
