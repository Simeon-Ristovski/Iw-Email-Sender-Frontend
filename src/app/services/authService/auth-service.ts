import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Account } from '../../models/Account';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    private isBrowser = typeof window !== 'undefined'; // проверка за browser

    constructor(private http: HttpClient) {
        if (this.isBrowser) {
            const user = sessionStorage.getItem('user');
            this.isLoggedInSubject.next(!!user);
        }
    }
    login(email: string, password: string): Observable<Account> {
        return this.http.post<Account>('http://localhost:8080/api/v1/auth/login', { email, password }, { withCredentials: true })
            .pipe(
                tap(user => {
                    if (this.isBrowser) {
                        sessionStorage.setItem('user', JSON.stringify(user));
                    }
                    this.isLoggedInSubject.next(true);
                })

            );
    }
    public addAccount(account: Account): Observable<Account> {
        return this.http.post<Account>(`http://localhost:8080/api/v1/auth/register`, account, { withCredentials: true });
    }

   logout(): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/auth/logout', {}, { responseType: 'text', withCredentials: true })
        .pipe(
            tap(() => {
                if (this.isBrowser) {
                    sessionStorage.removeItem('user'); // чистење на session
                }
                this.isLoggedInSubject.next(false); // известување на сите компоненти дека нема најавен корисник
            })
        );
}



    getLoggedInUser(): Account | null {
        if (!this.isBrowser) return null;
        const userJson = sessionStorage.getItem('user');
        return userJson ? JSON.parse(userJson) : null;
    }

    getLoggedInStatus(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
    }
    checkSession(): Observable<any> {
        return this.http.get(`http://localhost:8080/api/v1/auth/session`, { withCredentials: true });
    }

    setLoggedIn(value: boolean) {
        this.isLoggedInSubject.next(value);
    }
}
