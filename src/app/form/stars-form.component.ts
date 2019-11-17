import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StarsDatabaseService } from '../database/stars-database.service';
import { FabricDialogService } from '../util/dialog/fabric-dialog.service';

@Component({
	selector: 'stars-form',
	templateUrl: 'stars-form.component.html',
	styleUrls: ['./stars-form.component.scss']
})
export class StarsFormComponent {
	starsForms: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private starsDatabaseService: StarsDatabaseService,
				private dialogService: FabricDialogService) {
		this.starsForms = this.formBuilder.group({
			'starName': ['', Validators.required],
			'starDistance': ['', Validators.required],
			'starX': ['', Validators.required],
			'starY': ['', Validators.required],
			'starZ': ['', Validators.required]
		});
	}

	addStar(): void {
		const star = {
			name: this.starsForms.controls['starName'].value,
			distance: this.starsForms.controls['starDistance'].value,
			x: this.starsForms.controls['starX'].value,
			y: this.starsForms.controls['starY'].value,
			z: this.starsForms.controls['starZ'].value
		};

		this.starsDatabaseService.addStar(star);
		this.dialogService.close();
	}
}
