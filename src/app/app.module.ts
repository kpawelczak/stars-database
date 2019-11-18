import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { StarsHomeModule } from './home/stars-home.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarsHeaderComponent } from './util/header/header.componet';


@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		StarsHomeModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase, 'stars-database-gui'),
		AngularFireDatabaseModule
	],
	declarations: [
		AppComponent,
		StarsHeaderComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
