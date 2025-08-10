import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    const saved = localStorage.getItem('loggedIn');
    this.isLoggedInSubject.next(saved === 'true');
   }

   login(username: string, password: string): boolean {
     if(username === 'kevin@gmail.com' && password === '123456') {
        localStorage.setItem('loggedIn', 'true');
        this.isLoggedInSubject.next(true);
        return true;
     }
     return false;
   }

   logout(): void{
      localStorage.removeItem('loggedIn');
      this.isLoggedInSubject.next(false);
   }
   isLoggedIn$(): Observable<boolean> {
     return this.isLoggedInSubject.asObservable();
   }
   isLoggedInSync(): boolean {
      return this.isLoggedInSubject.getValue();
   }
}
