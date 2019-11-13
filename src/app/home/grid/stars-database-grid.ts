import { Component, OnDestroy, OnInit } from '@angular/core';
import { StarsDatabase } from '../../firebase/database/firebase-database';
import { Subscription } from 'rxjs';
import { GuiSorting } from '@generic-ui/ngx-grid';
import { map } from 'rxjs/operators';

@Component({
	selector: 'stars-database-grid',
	templateUrl: 'stars-database-grid.html'
})
export class StarsDatabaseGrid implements OnInit, OnDestroy {

	columns = [
		{
			header: 'Name',
			field: (stars) => stars.name
		}, {
			header: 'Distance',
			field: (stars) => stars.distance
		}, {
			header: 'Cord X',
			field: (stars) => stars.x
		}, {
			header: 'Cord Y',
			field: (stars) => stars.y
		}, {
			header: 'Cord Z',
			field: (stars) => stars.z
		}
	];

	source: Array<any>;

	sorting: GuiSorting = {
		enabled: true
	};

	private starsSubscription: Subscription;

	constructor(private starsDatabase: StarsDatabase) {
	}

	ngOnInit(): void {
		this.starsSubscription = this.starsDatabase.observeStarsData()
									 .subscribe((stars) => {
										 this.source = stars;
									 });
	}

	ngOnDestroy() {
		this.starsSubscription.unsubscribe();
	}
}
