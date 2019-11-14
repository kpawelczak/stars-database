import { Star } from './star';

export class Stars {

	constructor(private stars: Array<any>) {
	}

	createStars(): Array<Star> {
		return this.stars.map((star: any) => {
			return new Star(star.name, star.distance, star.x, star.y, star.z);
		});
	}
}
