import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  show() {
    console.log('Loading: SHOW'); // Debug log
    this.isLoading.next(true);
  }

  hide() {
    console.log('Loading: HIDE'); // Debug log
    this.isLoading.next(false);
  }
}
