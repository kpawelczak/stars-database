import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@generic-ui/ngx-grid';

import { StarsHomeComponent } from './stars-home.component';
import { StarsDatabaseGrid } from '../grid/stars-database-grid';
import { StarsFormModule } from '../form/stars-form.module';
import { StarsDatabase } from '../database/stars-database.firebase';
import { StarsDatabaseService } from '../database/stars-database.service';


@NgModule({
	imports: [
		CommonModule,
		GridModule,
		StarsFormModule
	],
	declarations: [
		StarsHomeComponent,
		StarsDatabaseGrid
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
