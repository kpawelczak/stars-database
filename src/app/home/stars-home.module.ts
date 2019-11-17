import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarsHomeComponent } from './stars-home.component';
import { StarsDatabase } from '../database/stars-database.firebase';
import { StarsDatabaseService } from '../database/stars-database.service';
import { StarsDatabaseGridModule } from '../grid/stars-database-grid.module';
import { StarsFormComponent } from '../form/stars-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FabricDialogModule } from '../util/dialog/fabric-dialog.module';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		StarsDatabaseGridModule,
		FabricDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule
	],
	declarations: [
		StarsHomeComponent,
		StarsFormComponent
	],
	exports: [
		StarsHomeComponent
	],
	entryComponents:[
		StarsFormComponent
	],
	providers: [
		StarsDatabase,
		StarsDatabaseService
	]
})
export class StarsHomeModule {

}
