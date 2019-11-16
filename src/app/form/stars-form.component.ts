import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StarsDatabaseService } from '../database/stars-database.service';

@Component({
	selector: 'stars-form',
	templateUrl: 'stars-form.component.html',
	styleUrls: ['./stars-form.component.scss']
})
export class StarsFormComponent {
	starsForms: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private starsDatabaseService: StarsDatabaseService) {
		this.starsForms = this.formBuilder.group({
			'starName': ['test'],
			'starDistance': ['1'],
			'starX': ['2'],
			'starY': ['3'],
			'starZ': ['4']
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
	}
}
