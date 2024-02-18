import '../styles/CharactersList.css';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Card from '../components/Card';
import { Character } from '../interface';


const CharactersList = () => {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
				if (!response.ok) {
					throw new Error('Failed to fetch characters');
				}
				const data = await response.json();
				setCharacters(data.results);
			} catch (error) {
				console.error('Error fetching characters:', error);
			}
		};

		fetchCharacters();
	}, [page]);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<>
		<div className='characters-list'>
			{characters.map((character) => (
				<Card key={character.id} character={character} />
				))}
		</div>
		<Pagination count={42} color="secondary" page={page} onChange={handlePageChange} />
		</>
	)
}

export default CharactersList
