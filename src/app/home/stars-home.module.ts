import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarsHomeComponent } from './stars-home.component';
import { StarsDatabase } from '../database/stars-database.firebase';
import { StarsDatabaseService } from '../database/stars-database.service';
import { StarsDatabaseGridModule } from '../grid/stars-database-grid.module';
import { StarsFormComponent } from '../form/stars-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		StarsDatabaseGridModule,
	],
	declarations: [
		StarsHomeComponent,
		StarsFormComponent
	],
	exports: [
		StarsHomeComponent
	],
	providers: [
		StarsDatabase,
		StarsDatabaseService
	]
})
export class StarsHomeModule {

}
