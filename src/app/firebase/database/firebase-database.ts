import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class StarsDatabase {

	stars$: Subject<any> = new Subject<any>();

	constructor(public database: AngularFireDatabase) {
		this.loadDataFromFirebase();
	}

	loadDataFromFirebase() {
		const storedStars = JSON.parse(localStorage.getItem('starsData'));

		if (!storedStars) {
			this.database.list('stars').valueChanges()
				.subscribe((stars) => {
					localStorage.setItem('starsData', JSON.stringify(stars));
					this.stars$.next(stars);
					console.log('loaded from firebase');
				});
		} else {
			setTimeout(() => this.stars$.next(storedStars), 0);
		}

	}

	observeStarsData(): Observable<any> {
		return this.stars$.asObservable();
	}

}
