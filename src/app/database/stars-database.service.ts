import { Injectable } from '@angular/core';
import { StarsDatabase } from './stars-database.firebase';
import { Star } from './star';
import { AngularFireDatabase } from '@angular/fire/database';
import { Stars } from './stars';

@Injectable()
export class StarsDatabaseService {

	private readonly localStarsDataKey = 'starsData';
	private readonly localChangesId = 'storedID';

	constructor(private fireDatabase: AngularFireDatabase,
				private starsDatabase: StarsDatabase) {
	}

	addStar(star: any): void {
		const newRef = this.fireDatabase.list('stars').push(star),
			newStarKey = newRef.key,
			newStar = new Star(newStarKey, star.name, star.distance, star.x, star.y, star.z).createStar();

		const storedStars = JSON.parse(localStorage.getItem(this.localStarsDataKey)),
			newStars = new Stars(storedStars).createStars();

		newStars.push(newStar);

		this.starsDatabase.changeDatabase(newStars);
		this.generateChangesId();
	}

	editStar(star: any): void {
		this.fireDatabase.list('stars').update(star.key, {
			name: star.name,
			distance: star.distance,
			x: star.x,
			y: star.y,
			z: star.z
		});

		const storedStars = JSON.parse(localStorage.getItem(this.localStarsDataKey)),
			selectedStar = storedStars.filter((s) => Object.values(s)[0] === Object.values(star)[0])[0],
			selectedStarIndex = storedStars.indexOf(selectedStar);

		storedStars[selectedStarIndex] = new Star(star.key, star.name, star.distance, star.x, star.y, star.z).createStar();

		const changedStars = new Stars(storedStars).createStars();

		this.starsDatabase.changeDatabase(changedStars);
		this.generateChangesId();
	}

	removeStar(starKey: any): void {
		this.fireDatabase.list('stars').remove(starKey);

		const storedStars = JSON.parse(localStorage.getItem(this.localStarsDataKey)),
			selectedStar = storedStars.filter((s) => Object.values(s)[0] === starKey)[0],
			selectedStarIndex = storedStars.indexOf(selectedStar);

		storedStars.splice(selectedStarIndex, 1);

		const changedStars = new Stars(storedStars).createStars();

		this.starsDatabase.changeDatabase(changedStars);
		this.generateChangesId();
	}

	private generateChangesId(): void {
		const changesId = Math.round(Math.random() * 1000000);
		localStorage.setItem(this.localChangesId, `${changesId}`);
		this.fireDatabase.list('stars changes').update('changes', { changesId: changesId });
	}

}
