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

	removeStar(): void {

	}

	generateChangesId() {
		const changesId = Math.round(Math.random() * 1000000);
		localStorage.setItem(this.localChangesId, `${changesId}`);
		this.fireDatabase.list('stars changes').update('changes', { changesId: changesId });
	}

}
