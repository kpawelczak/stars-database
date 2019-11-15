import { Star } from './star';

export class Stars {

	constructor(private stars: Array<any>) {
	}

	createStars(): Array<any> {
		return this.stars.map((s: any) => {
			return new Star(s.key, s.star.name, s.star.distance, s.star.x, s.star.y, s.star.z).createStar();
		});
	}
}
