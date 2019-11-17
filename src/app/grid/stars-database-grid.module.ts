import { NgModule } from '@angular/core';
import { GridModule } from '@generic-ui/ngx-grid';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StarsDatabaseGridComponent } from './stars-database-grid.component';
import { StarsCellEditComponent } from './stars-cell-edit/stars-cell-edit.component';
import { SelectedStarService } from './selected-star.service';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';


@NgModule({
	imports: [
		CommonModule,
		GridModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule
	],
	declarations: [
		StarsDatabaseGridComponent,
		StarsCellEditComponent
	],
	exports: [
		StarsDatabaseGridComponent
	],
	entryComponents: [
		StarsCellEditComponent
	],
	providers: [
		SelectedStarService
	]
})
export class StarsDatabaseGridModule {

}
