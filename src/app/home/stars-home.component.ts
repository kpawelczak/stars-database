import { Component } from '@angular/core';
import { FabricDialogService } from '@generic-ui/fabric';
import { StarsFormComponent } from '../form/stars-form.component';

@Component({
	selector: 'stars-home',
	templateUrl: './stars-home.component.html',
	styleUrls: ['./stars-home.component.scss']
})
export class StarsHomeComponent {

	constructor(private dialogService: FabricDialogService) {
	}

	openAddStarForm(): void {
		this.dialogService.open(StarsFormComponent);
	}
}
