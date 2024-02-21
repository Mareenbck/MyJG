import { useEffect, useState } from 'react';
import Background from '../components/Background';
import { Character, Species } from '../interface';
import CharactersList from "./CharactersList";

const HomePage = () => {
	const [allCharacters, setAllCharacters] = useState<Character[]>([]);
	const [speciesOptions, setSpeciesOptions] = useState<Species[]>([]);

	const fetchAllCharacters = async () => {
		try {
			const cachedCharacters = localStorage.getItem('characters_cache');
			const cachedSpecies = localStorage.getItem('species_cache');

			if (cachedCharacters && cachedSpecies) {
				setAllCharacters(JSON.parse(cachedCharacters));
				setSpeciesOptions((JSON.parse(cachedSpecies)))
			} else {
				const pagePromises = [];
				for (let i = 1; i <= 42; i++) {
					const url = `https://rickandmortyapi.com/api/character?page=${i}`;
					pagePromises.push(fetch(url));
				}
				const responses = await Promise.all(pagePromises);

				if (responses.some(response => !response.ok)) {
					throw new Error('Error fetching one or more character pages');
				}

				const allCharactersData: Character[] = [];
				const speciesSet = new Set<string>();
				await Promise.all(responses.map(async (response) => {
					const data = await response.json();
					allCharactersData.push(...data.results);
					data.results.forEach((character: Character) => speciesSet.add(character.species));
				}));

				setAllCharacters(allCharactersData);
				localStorage.setItem('characters_cache', JSON.stringify(allCharactersData));
				setSpeciesOptions(Array.from(speciesSet).map(species => ({ label: species, value: species })));
				localStorage.setItem('species_cache', JSON.stringify(Array.from(speciesSet).map(species => ({ label: species, value: species }))));
			}
		} catch (error) {
			console.error("Error fetching all characters:", error);
		}
	};

	useEffect(() => {
		fetchAllCharacters();
	}, []);

	return (
		<Background title='Rick and Morty'>
			<CharactersList speciesType={speciesOptions} characters={allCharacters}></CharactersList>
		</Background>
	)
}

export default HomePage
