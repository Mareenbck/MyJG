import Background from "../components/Background"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Character, Location } from "../interface";
import "../styles/CharacterPage.css";


const CharacterPage = () => {
	const { id } = useParams();
	const [character, setCharacter] = useState<Character>();
	const [actualLocation, setActualLocation] = useState<Location>();

	useEffect(() => {
		const fetchCharacter = async () => {
			try {
				const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
				if (!response.ok) {
					throw new Error('Failed to fetch character');
				}
				const data = await response.json();
				setCharacter(data);
				if (data && data.location && data.location.url) {
					fetchLocation(data.location.url);
				}
			} catch (error) {
				console.error('Error fetching character:', error);
			}
		};
		fetchCharacter();
	}, [id]);

	const fetchLocation = async (url: string) => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Failed to fetch location: ${response.statusText}`);
			}
			const locationData = await response.json();
			setActualLocation(locationData);
		} catch (error) {
			console.error("Error fetching location:", error);
		}
	};

	const getStatusIcon = () => {
		if (character?.status === 'Alive') {
			return <span className="status-icon alive">🟢</span>;
		} else {
			return <span className="status-icon dead"></span>;
		}
	};

	return (
		<Background title={character?.name}>
			{character ? (
				<div className='identity-container'>
					<div className="left-column">
						<h2>{character.name}</h2>
						<p>Status: {character.status} {getStatusIcon()}</p>
						<p>Species: {character.species}</p>
						<p>Gender: {character.gender}</p>
						<p>Actual Location: {character.location.name} - Type : {actualLocation?.type}</p>
					</div>
					<div className="right-column">
						<img src={character.image} alt="" />
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</Background>
	)
}


export default CharacterPage
