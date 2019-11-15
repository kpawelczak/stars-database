export class Star {

	constructor(private readonly key: any,
				private readonly name: string,
				private readonly distance: number,
				private readonly x: number,
				private readonly y: number,
				private readonly z: number) {

	}

	createStar() {
		const star = {
			name: this.name,
			distance: this.distance,
			x: this.x,
			y: this.y,
			z: this.z
		};
		return { key: this.key, star: star };
	}
}
