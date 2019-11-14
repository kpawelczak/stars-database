import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { GuiSorting } from '@generic-ui/ngx-grid';
import { StarsDatabase } from '../database/stars-database.firebase';
import { Star } from '../database/star';
import { StarsDatabaseService } from '../database/stars-database.service';
import { delay } from 'rxjs/operators';

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

	source: Array<Star>;

	sorting: GuiSorting = {
		enabled: true
	};

	private starsSubscription: Subscription;

	constructor(private starsDatabase: StarsDatabase,
				private dbS: StarsDatabaseService,
				private changeDetectorRef: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		this.starsSubscription = this.starsDatabase.observeStarsData()
									 .subscribe((stars) => {
										 this.source = stars;
										 // console.log(stars)
									 });
	}

	ngOnDestroy() {
		this.starsSubscription.unsubscribe();
	}

	AddStar() {
		let x = new Star('x', 1, 2, 3, 4),
			y = new Star('z', 1, 2, 3, 4);
		this.dbS.addStar(y);
	}
}
