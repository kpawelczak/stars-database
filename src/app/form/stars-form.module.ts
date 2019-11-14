import { NgModule } from '@angular/core';
import { StarsFormComponent } from './stars-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [StarsFormComponent],
	exports: [
		StarsFormComponent
	],
	providers: []
})
export class StarsFormModule {

}
