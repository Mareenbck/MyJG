import React, { useEffect, useState } from "react";
import { Character } from "../interface";
import '../styles/Card.css'

interface CardProps {
	character: Character;
}

const Card: React.FC<CardProps> = ({ character }) => {
	const [lastEpisode, setLastEpisode] = useState<string | null>(null);

	useEffect(() => {
		const getLastEpisodeFn = async () => {
			const episode = await getLastEpisode();
			setLastEpisode(episode);
		};
		getLastEpisodeFn();
	}, []);

	const getStatusIcon = () => {
		if (character.status === 'Alive') {
			return <span className="status-icon alive">🟢</span>;
		} else {
			return <span className="status-icon dead"></span>;
		}
	};

	const createTags = () => {
		const tags = [];
		if (character.species) {
			tags.push(<span className="tag species" key="species">{character.species}</span>);
		}
		if (character.origin?.name) {
			tags.push(<span className="tag location" key="location">{character.origin.name}</span>);
		}
		return tags;
	};

	const getLastEpisode = async (): Promise<string> => {
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
			return episodeData.episode;
		} catch (error) {
			console.error("Error fetching episode:", error);
			return "Unknow";
		}
	};

	return (
		<div className="card">
			<div className="image-container">
				<img src={character.image} alt={character.name} />
			</div>
			<div className="info-container">
				<h2>{character.name}</h2>
				<p>
					{character.species} - {character.status} {getStatusIcon()}
				</p>
				<p>{character.gender}</p>
				<p>Last Episode: <span>{lastEpisode}</span></p>
			</div>
			<div className="tags-container">{createTags()}</div>
		</div>
	);
};

export default Card;
