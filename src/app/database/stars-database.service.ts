import { Injectable } from '@angular/core';
import { StarsDatabase } from './stars-database.firebase';
import { Star } from './star';
import { AngularFireDatabase } from '@angular/fire/database';
import { Stars } from './stars';

@Injectable()
export class StarsDatabaseService {

	// private localStars = localStorage.setItem('localStars', '1');
	private readonly localStarsDataKey = 'starsData';
	private readonly localChangesId = 'storedID';

	constructor(private fireDatabase: AngularFireDatabase,
				private starsDatabase: StarsDatabase) {
	}

	addStar(star: any): void {
		let storedStars = JSON.parse(localStorage.getItem(this.localStarsDataKey)),
			newStars = new Stars(storedStars).createStars();
		newStars.push(star);
		// this.fireDatabase.list('stars').push(star);
		this.starsDatabase.changeDatabase(newStars);
		this.generateChangesId();
	}

	removeStar(): void {

	}

	generateChangesId() {
		const changesId = Math.round(Math.random() * 1000000000);
		localStorage.setItem(this.localChangesId, `${changesId}`);
		this.fireDatabase.list('stars changes').update('changes', { changesId: changesId });
	}

}
