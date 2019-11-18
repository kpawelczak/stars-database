import { Component } from '@angular/core';
import { FabricDialogService } from '../util/dialog/fabric-dialog.service';
import { StarsFormComponent } from '../form/stars-form.component';

@Component({
	selector: 'stars-home',
	templateUrl: './stars-home.component.html',
	styleUrls: ['./stars-home.component.scss']
})
export class StarsHomeComponent {

	constructor(private dialogService: FabricDialogService) {
	}

	openAddStarForm() {
		this.dialogService.open(StarsFormComponent);
	}
}
