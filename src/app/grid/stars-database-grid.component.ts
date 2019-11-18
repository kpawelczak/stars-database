import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { GuiCellView, GuiDataType, GuiSorting } from '@generic-ui/ngx-grid';
import { StarsDatabase } from '../database/stars-database.firebase';
import { Star } from '../database/star';
import { FabricDialogService } from '../util/dialog/fabric-dialog.service';
import { StarsCellEditComponent } from './stars-cell-edit/stars-cell-edit.component';
import { SelectedStarService } from './selected-star.service';


@Component({
	selector: 'stars-database-grid',
	templateUrl: 'stars-database-grid.component.html'
})
export class StarsDatabaseGridComponent implements OnInit, OnDestroy {
	loading: boolean = true;

	columns = [
		{
			header: '#',
			field: (stars) => {
				return this.source.indexOf(stars) + 1;
			},
			type: GuiDataType.NUMBER,
			width: 50
		},
		{
			header: 'Name',
			field: (stars: Array<any>) => Object.values(stars)[1].name,
			type: GuiDataType.STRING
		}, {
			header: 'Distance [ly]',
			field: (stars: Star) => Object.values(stars)[1].distance,
			type: GuiDataType.NUMBER
		}, {
			header: 'Cord X [ly]',
			field: (stars: Star) => Object.values(stars)[1].x,
			type: GuiDataType.NUMBER
		}, {
			header: 'Cord Y [ly]',
			field: (stars: Star) => Object.values(stars)[1].y,
			type: GuiDataType.NUMBER
		}, {
			header: 'Cord Z [ly]',
			field: (stars: Star) => Object.values(stars)[1].z,
			type: GuiDataType.NUMBER
		}
	];

	source: Array<Star>;

	sorting: GuiSorting = {
		enabled: true
	};

	private starsSubscription: Subscription;

	constructor(private starsDatabase: StarsDatabase,
				private dialogService: FabricDialogService,
				private selectedStarService: SelectedStarService) {
	}

	ngOnInit(): void {
		this.starsSubscription = this.starsDatabase.observeStarsData()
									 .subscribe((stars) => {
										 this.source = stars;
										 this.loading = false;
										 // console.log(stars);
									 });
	}

	ngOnDestroy() {
		this.starsSubscription.unsubscribe();
	}

	onStarSelection(selectedStar) {
		if (!selectedStar[0]) {
			return;
		}

		this.dialogService.open(StarsCellEditComponent);
		this.selectedStarService.starSelected(selectedStar[0]);
	}

}
