import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricDialogComponent } from './fabric-dialog.component';
import { FabricDialogService } from './fabric-dialog.service';

import './fabric-dialog.scss';


@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		FabricDialogComponent
	],
	providers: [
		FabricDialogService
	],
	entryComponents: [
		FabricDialogComponent
	]
})
export class FabricDialogModule {
}
