import '../styles/CharactersList.css';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Card from '../components/Card';
import { Character } from '../interface';
import { Autocomplete, TextField } from '@mui/material';
import { Link } from 'react-router-dom';



const CharactersList = () => {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [page, setPage] = useState<number>(1);
	const [filterSpecies, setFilterSpecies] = useState<string | null>('');
	const [speciesOptions, setSpeciesOptions] = useState<string[]>([]);


	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
				if (!response.ok) {
					throw new Error('Failed to fetch characters');
				}
				const data = await response.json();
				const filteredCharacters = data.results.filter((character: Character) =>
					!filterSpecies || character.species.toLowerCase().includes(filterSpecies.toLowerCase())
				);
				setCharacters(filteredCharacters);
				const uniqueSpecies = new Set <string>(data.results.map((character: Character) => character.species));
				setSpeciesOptions(Array.from(uniqueSpecies));
			} catch (error) {
				console.error('Error fetching characters:', error);
			}
		};

		fetchCharacters();
	}, [page, filterSpecies]);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleSpeciesChange = (newValue: string | null) => {
		setFilterSpecies(newValue);
	};

	return (
		<>
		<Autocomplete
			disablePortal
			options={speciesOptions}
			onChange={(event, value) => handleSpeciesChange(value)}
			sx={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Species" />}
		/>
		<div className='characters-list'>
			{characters.map((character: Character) => (
				<Link
					key={character.id}
					className="link"
					to={`/characters/${character.id}`}
					>
					<Card key={character.id} character={character} />
				</Link>
			))}
		</div>
		<Pagination count={42} color="secondary" page={page} onChange={handlePageChange} />
		</>
	)
}

export default CharactersList
