import { Injectable } from '@angular/core';
import { StarsDatabase } from './stars-database.firebase';
import { Star } from './star';
import { AngularFireDatabase } from '@angular/fire/database';
import { Stars } from './stars';

@Injectable()
export class StarsDatabaseService {

	// private localStars = localStorage.setItem('localStars', '1');
	private readonly localStarsDataKey = 'starsData';

	constructor(private fireDatabase: AngularFireDatabase,
				private starsDatabase: StarsDatabase) {
	}

	addStar(star: Star): void {
		let storedStars = JSON.parse(localStorage.getItem(this.localStarsDataKey)),
			newStars = new Stars(storedStars).createStars();
		newStars.push(star);
		// this.fireDatabase.list('stars').push(star);
		this.starsDatabase.changeDatabase(newStars);
	}

	removeStar(): void {

	}

}
