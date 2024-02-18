import React from "react";
import { Character } from "../interface";
import '../styles/Card.css'

interface CardProps {
	character: Character;
}

const Card: React.FC<CardProps> = ({ character }) => {
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
			tags.push(<span className="tag" key="species">{character.species}</span>);
		}
		if (character.origin && character.origin.name) {
			tags.push(<span className="tag" key="location">{character.origin.name}</span>);
		}
		return tags;
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
				<p>{character.origin?.name}</p>
			</div>
			<div className="tags-container">{createTags()}</div>
		</div>
	);
};

export default Card;
