import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'stars-home',
	templateUrl: './stars-home.component.html',
	styleUrls: ['./stars-home.component.scss']
})
export class StarsHomeComponent implements OnInit {


	ngOnInit() {
	}

	clearStorage() {
		localStorage.clear();
	}
}
