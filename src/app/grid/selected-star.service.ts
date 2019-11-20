import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Star } from '../database/star';

@Injectable()
export class SelectedStarService {

	selectedStar$ = new Subject<Star>();

	observeSelectedStar(): Observable<Star> {
		return this.selectedStar$.asObservable();
	}

	starSelected(selectedStar): void {
		this.selectedStar$.next(selectedStar);
	}

}
