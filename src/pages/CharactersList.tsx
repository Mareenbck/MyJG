import '../styles/CharactersList.css';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Card from '../components/Card';
import { Character, Species } from '../interface';
import { Autocomplete, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

interface CharactersListProps {
	characters: Character[];
	speciesType: Species[]
}

const CharactersList: React.FC<CharactersListProps> = ({ characters, speciesType }) => {
	const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
	const [charactersToShow, setCharactersToShow] = useState<Character[]>([]);
	const [page, setPage] = useState<number>(1);
	const [numberOfPage, setNumberOfPage] = useState<number>(1);
	const [speciesFilter, setSpeciesFilter] = useState<string>("");

	const itemsPerPage = 20;

	const filterCharacters = (species: string) => {
		if (species === "") {
			setFilteredCharacters(characters);
		} else {
			const filtered = characters.filter((character) =>
				character.species.toLowerCase().includes(species.toLowerCase())
			);
			setFilteredCharacters(filtered);
		}
	};

	useEffect(() => {
		filterCharacters(speciesFilter);
	}, [speciesFilter]);

	useEffect(() => {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		if (speciesFilter) {
			setNumberOfPage(Math.ceil(filteredCharacters.length / itemsPerPage))
			setCharactersToShow(filteredCharacters.slice(startIndex, endIndex));
		} else {
			setNumberOfPage(Math.ceil(characters.length / itemsPerPage))
			setCharactersToShow(characters.slice(startIndex, endIndex));
		}
	}, [page, speciesFilter, filteredCharacters, characters]);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleSpeciesFilterChange = (value: Species | null) => {
		const species = value ? value.value : "";
		setSpeciesFilter(species);
	};

	return (
		<>
			<Autocomplete
				disablePortal
				options={speciesType}
				data-testid={'Species'}
				onChange={(event, value) => handleSpeciesFilterChange(value)}
				sx={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="Species" />}
			/>
			<div className='characters-list'>
				{!charactersToShow.length ? (
					<p>Loading...</p>
				) : (
					charactersToShow.map((character: Character) => (
						<Link
							key={character.id}
							className="link"
							to={`/characters/${character.id}`}
							data-testid={`character-card-${character.id}`}
						>
							<Card key={character.id} character={character} />
						</Link>
					))
				)}
			</div>
			<Pagination count={numberOfPage} color="secondary" page={page} onChange={handlePageChange} />
		</>
	)
}

export default CharactersList
