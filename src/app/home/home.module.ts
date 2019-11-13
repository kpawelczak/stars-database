import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { StarsDatabaseGrid } from './grid/stars-database-grid';
import { GridModule } from '@generic-ui/ngx-grid';
import { CommonModule } from '@angular/common';
import { StarsDatabase } from '../firebase/database/firebase-database';


@NgModule({
	imports: [
		CommonModule,
		GridModule
	],
	declarations: [
		HomeComponent,
		StarsDatabaseGrid
	],
	exports: [
		HomeComponent
	],
	providers: [
		StarsDatabase
	]
})
export class HomeModule {

}
