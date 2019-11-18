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
	private firebaseChangesSubscription: Subscription;
	private firebaseDataSubscription: Subscription;
	private readonly localStarsDataKey = 'starsData';
	private readonly localChangesId = 'storedID';

	constructor(public database: AngularFireDatabase) {
		this.observeFirebaseChanges();
	}

	ngOnDestroy() {
		this.firebaseChangesSubscription.unsubscribe();
		this.unsubscribe(this.firebaseDataSubscription);
	}

	private observeFirebaseChanges() {
		this.firebaseChangesSubscription =
			this.database.list('stars changes').valueChanges()
				.subscribe(
					(collection: any) => {
						this.firebaseChanges = collection[0].changesId;
						this.loadData();
					}
				);
	}

	private loadData() {
		const storedStars = JSON.parse(localStorage.getItem(this.localStarsDataKey));

		if (!storedStars) {
			this.loadDataFromFirebase();
		}

		if (storedStars) {
			const storedChanges = +localStorage.getItem(this.localChangesId);

			if (this.firebaseChanges !== storedChanges) {
				this.loadDataFromFirebase();
			} else {
				const localStars = this.createStars(storedStars);
				this.stars$.next(localStars);
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

	private loadDataFromFirebase(): void {
		this.firebaseDataSubscription =
			this.database.list('stars').snapshotChanges()
				.pipe(map((stars: any) => {
					return stars.map(star_ => {
						const star = star_.payload.val(),
							key = star_.payload.key;
						return { key, star };
					});
				}))
				.subscribe((payload) => {
					const stars = this.createStars(payload);
					localStorage.setItem(this.localStarsDataKey, JSON.stringify(stars));
					this.changesLoaded();
					this.stars$.next(stars);
					console.log('loaded from firebase');
					this.refreshOnce();
				});
	}

	private createStars(stars: Array<any>): Array<Star> {
		return new Stars(stars).createStars();
	}

	private unsubscribe(sub: Subscription) {
		if (sub) {
			sub.unsubscribe();
		}
	}

	private changesLoaded() {
		console.log('changes loaded from firebase');
		localStorage.setItem(this.localChangesId, this.firebaseChanges.toString());
	}

	private refreshOnce() {
		if (window.localStorage) {
			if (!localStorage.getItem('firstLoad')) {
				window.location.reload();
			} else {
				localStorage.removeItem('firstLoad');
			}
		}
	}

}
