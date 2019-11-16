import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { GuiSorting } from '@generic-ui/ngx-grid';
import { StarsDatabase } from '../database/stars-database.firebase';
import { Star } from '../database/star';
import { StarsDatabaseService } from '../database/stars-database.service';

@Component({
	selector: 'stars-database-grid',
	templateUrl: 'stars-database-grid.html'
})
export class StarsDatabaseGrid implements OnInit, OnDestroy {

	columns = [
		{
			header: 'Name',
			field: (stars: Star) => Object.values(stars)[1].name
		}, {
			header: 'Distance',
			field: (stars: Star) => Object.values(stars)[1].distance
		}, {
			header: 'Cord X',
			field: (stars: Star) => Object.values(stars)[1].x
		}, {
			header: 'Cord Y',
			field: (stars: Star) => Object.values(stars)[1].y
		}, {
			header: 'Cord Z',
			field: (stars: Star) => Object.values(stars)[1].z
		}
	];

	source: Array<Star>;

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
										 // console.log(stars);
									 });
	}

	ngOnDestroy() {
		this.starsSubscription.unsubscribe();
	}

}
