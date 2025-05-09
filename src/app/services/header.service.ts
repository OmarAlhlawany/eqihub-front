import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private titleSubject = new BehaviorSubject<string>('Angel East'); // Default title
  title$ = this.titleSubject.asObservable();

  setTitle(newTitle: string) {
    this.titleSubject.next(newTitle);
  }
}