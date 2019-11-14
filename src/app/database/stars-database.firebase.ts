import { Injectable, OnDestroy } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Star } from './star';
import { Stars } from './stars';


@Injectable()
export class StarsDatabase implements OnDestroy {

	private stars$: Subject<Array<Star>> = new Subject<Array<Star>>();
	private firebaseChanges: number;
	private firebaseSize: number;
	private firebaseChangesSubscription: Subscription;
	private readonly localStarsDataKey = 'starsData';

	constructor(public database: AngularFireDatabase) {
		this.observeFirebaseChanges();

	}

	ngOnDestroy() {
		this.firebaseChangesSubscription.unsubscribe();
	}

	private observeFirebaseChanges() {
		this.firebaseChangesSubscription =
			this.database.list('collection attributes').valueChanges()
				.subscribe(
					(collection) => {
						this.firebaseChanges = +collection[0];
						this.firebaseSize = +collection[1];
						console.log('changes', this.firebaseChanges, 'size', this.firebaseSize);
						this.loadData();
					}
				);
	}

	private loadData() {
		const storedStars = JSON.parse(localStorage.getItem(this.localStarsDataKey));

		if (!storedStars) {
			this.database.list('stars').valueChanges()
				.pipe(map((stars: any) => {
					return this.createStars(stars)
				}))
				.subscribe((stars) => {
					localStorage.setItem(this.localStarsDataKey, JSON.stringify(stars));
					this.stars$.next(stars);
					console.log('loaded from firebase');
				});
		}

		if (storedStars) {
			const storedStarsLength = storedStars.length,
				storedChanges = +localStorage.getItem('storedChanges');
			console.log('f', this.firebaseSize, 'l', storedStarsLength);

			if (this.firebaseChanges !== storedChanges) {

			} else {
				const localStars = this.createStars(storedStars);
				this.stars$.next(localStars)
			}
		}
	}

	observeStarsData(): Observable<Array<Star>> {
		return this.stars$.asObservable();
	}

	changeDatabase(newStars: Array<Star>): void {
		localStorage.setItem(this.localStarsDataKey, JSON.stringify(newStars));
		this.stars$.next(newStars);
	}

	private createStars(stars: Array<any>): Array<Star> {
		return new Stars(stars).createStars();
	}

}
