export interface Character {
	id: number;
	name: string;
	image: string;
	species: string;
	status: string;
	gender: string;
	origin?: {
		name: string;
		url: string;
	}
	location: {
		name: string;
		url: string;
	}
	episode: string[];
}

export interface Location {
	type: string;
}
