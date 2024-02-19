import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Character, Species } from '../interface';
import CharactersList from '../pages/CharactersList'; // Assuming correct import path

const mockCharactersData: Character[] = [
	{
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
	},
	{
		"id": 2,
		"name": "Morty Smith",
		"status": "Alive",
		"species": "Human",
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
	},
	{
		"id": 435,
		"name": "Pripudlian",
		"status": "Alive",
		"species": "Alien",
		"gender": "Male",
		"origin": {
			"name": "Earth (C-137)",
			"url": "https://rickandmortyapi.com/api/location/1"
		},
		"location": {
			"name": "Earth (Replacement Dimension)",
			"url": "https://rickandmortyapi.com/api/location/2"
		},
		"image":"https://rickandmortyapi.com/api/character/avatar/435.jpeg",
		"episode": [
			"https://rickandmortyapi.com/api/episode/1",
			"https://rickandmortyapi.com/api/episode/2",
			// ...
		],
	}
];

const speciesOptionsData: Species[] = [
	{
		label: 'Human',
		value: 'Human'
	},
	{
		label: 'Alien',
		value: 'Alien'
	},

]

describe('CharactersList component', () => {
	it('renders loading state initially', async () => {
		render(
			<BrowserRouter>
				<CharactersList characters={[]} speciesType = {[]} />;
			</BrowserRouter>
		)
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('renders the correct number of characters', async () => {
		render(
			<BrowserRouter>
				<CharactersList characters={mockCharactersData} speciesType={speciesOptionsData} />
			</BrowserRouter>
		)

		await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
		const characterCards = screen.getAllByTestId(/^character-card-\d+$/);
		expect(characterCards).toHaveLength(mockCharactersData.length);
	});

	it('renders characters filtered by species', async () => {
		render(
			<BrowserRouter>
				<CharactersList characters={mockCharactersData} speciesType={speciesOptionsData} />
			</BrowserRouter>
		);

		await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
		const input = screen.getByTestId('Species');

		act(() => {
			userEvent.type(input, 'Alien');
		});

		await waitFor(() => {
			expect(screen.getByRole('option', { name: 'Alien' })).toBeInTheDocument();
		});

		act(() => {
			const optionToSelect = screen.getByRole('option', { name: 'Alien' });
			userEvent.click(optionToSelect);
		});

		await waitFor(() => {
			const characterCards = screen.getAllByTestId(/^character-card-\d+$/);
			const alienCharacters = mockCharactersData.filter(character => character.species === 'Alien');
			expect(characterCards).toHaveLength(alienCharacters.length);
		});
	});
});

