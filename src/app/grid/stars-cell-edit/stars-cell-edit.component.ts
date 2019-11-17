import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StarsDatabaseService } from '../../database/stars-database.service';
import { SelectedStarService } from '../selected-star.service';
import { Subscription } from 'rxjs';
import { Star } from '../../database/star';
import { FabricDialogService } from '../../util/dialog/fabric-dialog.service';

@Component({
	selector: 'app-stars-cell-edit',
	templateUrl: './stars-cell-edit.component.html',
	styleUrls: ['./stars-cell-edit.component.scss']
})
export class StarsCellEditComponent implements OnInit, OnDestroy {
	starsEditForms: FormGroup;
	selectedStarKey: any;

	private selectedStarSubscription: Subscription;

	constructor(private formBuilder: FormBuilder,
				private starsDatabaseService: StarsDatabaseService,
				private selectedStarService: SelectedStarService,
				private dialogService: FabricDialogService) {
		this.starsEditForms = this.formBuilder.group({
			'starEditName': [],
			'starEditDistance': [],
			'starEditX': [],
			'starEditY': [],
			'starEditZ': []
		});
	}

	ngOnInit() {
		this.selectedStarSubscription =
			this.selectedStarService.observeSelectedStar()
				.subscribe(
					(selectedStar: Star) => {
						this.selectedStarKey = Object.values(selectedStar)[0];
						this.starsEditForms.controls['starEditName'].setValue(Object.values(selectedStar)[1].name);
						this.starsEditForms.controls['starEditDistance'].setValue(Object.values(selectedStar)[1].distance);
						this.starsEditForms.controls['starEditX'].setValue(Object.values(selectedStar)[1].x);
						this.starsEditForms.controls['starEditY'].setValue(Object.values(selectedStar)[1].y);
						this.starsEditForms.controls['starEditZ'].setValue(Object.values(selectedStar)[1].z);
					}
				);
	}

	ngOnDestroy() {
		this.selectedStarSubscription.unsubscribe();
	}

	editStar(): void {
		const star = {
			key: this.selectedStarKey,
			name: this.starsEditForms.controls['starEditName'].value,
			distance: this.starsEditForms.controls['starEditDistance'].value,
			x: this.starsEditForms.controls['starEditX'].value,
			y: this.starsEditForms.controls['starEditY'].value,
			z: this.starsEditForms.controls['starEditZ'].value
		};

		this.starsDatabaseService.editStar(star);
		this.dialogService.close();
	}

	removeStar(): void {
		this.starsDatabaseService.removeStar(this.selectedStarKey);
		this.dialogService.close();
	}


}
