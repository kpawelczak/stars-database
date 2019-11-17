import { NgModule } from '@angular/core';
import { GridModule } from '@generic-ui/ngx-grid';
import { StarsDatabaseGridComponent } from './stars-database-grid.component';
import { CommonModule } from '@angular/common';

import { FabricDialogModule } from '../util/dialog/fabric-dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarsCellEditComponent } from './stars-cell-edit/stars-cell-edit.component';
import { SelectedStarService } from './selected-star.service';


@NgModule({
	imports: [
		CommonModule,
		GridModule,
		FormsModule,
		ReactiveFormsModule,
		FabricDialogModule
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
	providers: [SelectedStarService]
})
export class StarsDatabaseGridModule {

}
