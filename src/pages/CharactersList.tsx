import '../styles/CharactersList.css';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Card from '../components/Card';
import { Character } from '../interface';
import { Autocomplete, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const CharactersList = () => {
	const [allCharacters, setAllCharacters] = useState<Character[]>([]);
	const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
	const [charactersToShow, setCharactersToShow] = useState<Character[]>([]);
	const [page, setPage] = useState<number>(1);
	const [numberOfPage, setNumberOfPage] = useState<number>(1);
	const [speciesFilter, setSpeciesFilter] = useState<string>("");
	const [speciesOptions, setSpeciesOptions] = useState<{ label: string; value: string }[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const itemsPerPage = 20;

	const fetchAllCharacters = async () => {
		try {
			const allCharactersData: Character[] = [];
			const speciesSet = new Set<string>();
			for (let i = 1; i <= 42; i++) {
				const response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
				const data = await response.json();
				allCharactersData.push(...data.results);
				data.results.forEach((character: Character) => speciesSet.add(character.species));
			}
			setAllCharacters(allCharactersData);
			setSpeciesOptions(Array.from(speciesSet).map(species => ({ label: species, value: species })));
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching all characters:", error);
			setIsLoading(false);
		}
	};

	const filterCharacters = (species: string) => {
		if (species === "") {
			setFilteredCharacters(allCharacters);
		} else {
			const filtered = allCharacters.filter((character) =>
				character.species.toLowerCase().includes(species.toLowerCase())
			);
			setFilteredCharacters(filtered);
		}
	};

	useEffect(() => {
		fetchAllCharacters();
	}, []);

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
			setNumberOfPage(Math.ceil(allCharacters.length / itemsPerPage))
			setCharactersToShow(allCharacters.slice(startIndex, endIndex));
		}
	}, [page, speciesFilter, filteredCharacters, allCharacters]);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleSpeciesFilterChange = (value: { label: string; value: string } | null) => {
		const species = value ? value.value : "";
		setSpeciesFilter(species);
	};

	return (
		<>
			<Autocomplete
				disablePortal
				options={speciesOptions}
				onChange={(event, value) => handleSpeciesFilterChange(value)}
				sx={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="Species" />}
			/>
			<div className='characters-list'>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					charactersToShow.map((character: Character) => (
						<Link
							key={character.id}
							className="link"
							to={`/characters/${character.id}`}
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
