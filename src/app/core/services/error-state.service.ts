import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ErrorStateService {
  private errorStateSubject = new BehaviorSubject<boolean>(false);
  errorState$ = this.errorStateSubject.asObservable();

  setErrorState(state: boolean): void {
    this.errorStateSubject.next(state);
  }
}
