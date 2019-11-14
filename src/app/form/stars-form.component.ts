import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'stars-form',
	templateUrl: 'stars-form.component.html',
	styleUrls:['./stars-form.component.scss']
})
export class StarsFormComponent {
	starsForms: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.starsForms = this.formBuilder.group({
			'starName': [],
			'starDistance': [],
			'starX': [],
			'starY': [],
			'starZ': []
		});
	}
}
