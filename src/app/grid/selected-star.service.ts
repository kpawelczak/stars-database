import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SelectedStarService {

	selectedStar$ = new Subject();

	observeSelectedStar(): Observable<any> {
		return this.selectedStar$.asObservable();
	}

	starSelected(selectedStar) {
		this.selectedStar$.next(selectedStar);
	}

}
