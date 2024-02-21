import React, { useEffect, useState } from "react";
import { Character } from "../interface";
import '../styles/Card.css'

interface CardProps {
	character: Character;
}

const Card: React.FC<CardProps> = ({ character }) => {
	const [lastEpisode, setLastEpisode] = useState<string | null>(null);

	useEffect(() => {
		const getLastEpisode = async () => {
			const lastEpisodeUrl = character.episode[character.episode.length - 1];
			if (!lastEpisodeUrl) {
				return "Unknow";
			}
			try {
				const response = await fetch(lastEpisodeUrl);
				if (!response.ok) {
					throw new Error(`Failed to fetch episode: ${response.statusText}`);
				}
				const episodeData = await response.json();
				setLastEpisode(episodeData.episode);
			} catch (error) {
				console.error("Error fetching episode:", error);
				setLastEpisode("Unknow");
			}
		};
		getLastEpisode();
	}, [character]);

	return (
		<div className="card">
			<div className="image-container">
				<img src={character.image} alt={character.name} />
			</div>
			<div className="info-container">
				<h2>{character.name}</h2>
				<p>
					{character.species} - {character.status}
					<span className={`status-icon ${character.status === 'Alive' ? 'alive' : 'dead'}`}>
						{character.status === 'Alive' ? '🟢' : '☠️'}
					</span>
				</p>
				<p>{character.gender}</p>
				<p>Last Episode: <span>{lastEpisode}</span></p>
			</div>
			<div className="tags-container">
				{character.species && <span className="tag species">{character.species}</span>}
				{character.origin.name && <span className="tag location">{character.origin.name}</span>}
			</div>
		</div>
	);
};

export default Card;
