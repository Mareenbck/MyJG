import { useEffect, useState } from 'react';
import Background from '../components/Background';
import { Character } from '../interface';
import CharactersList from "./CharactersList";

const HomePage = () => {
	const [allCharacters, setAllCharacters] = useState<Character[]>([]);
	const [speciesOptions, setSpeciesOptions] = useState<{ label: string; value: string }[]>([]);

	const fetchAllCharacters = async () => {
		try {
			const allCharactersData: Character[] = [];
			const speciesSet = new Set<string>();
			const cachedData = localStorage.getItem('characters_cache');
			const species = localStorage.getItem('species');
			if (cachedData && species) {
				setAllCharacters(JSON.parse(cachedData));
				setSpeciesOptions((JSON.parse(species)))
			} else {
				for (let i = 1; i <= 42; i++) {
					const response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
					const data = await response.json();
					allCharactersData.push(...data.results);
					data.results.forEach((character: Character) => speciesSet.add(character.species));
				}
				setAllCharacters(allCharactersData);
				localStorage.setItem('characters_cache', JSON.stringify(allCharactersData));
				setSpeciesOptions(Array.from(speciesSet).map(species => ({ label: species, value: species })));
				localStorage.setItem('species', JSON.stringify(Array.from(speciesSet).map(species => ({ label: species, value: species }))));
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
