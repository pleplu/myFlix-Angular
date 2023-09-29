import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-flix-8675-e6ac611a51d9.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { 

  }

// --------------------------------------------------------------------------------------------------------------------------

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  // Making the api call for the user login endpoint
  public userLogin(loginDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', loginDetails).pipe(
    catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  getMovie(token: any, title: any): Observable<any> {
    return this.http.get(apiUrl + 'movies/' + title, token).pipe(
    catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  public getDirector(token: any, director: any): Observable<any> {
    return this.http.get(apiUrl + 'movies/directors/' + director, token).pipe(
    catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  public getGenre(token: any, genre: any): Observable<any> {
    return this.http.get(apiUrl + 'movies/genres/' + genre, token).pipe(
    catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  public getUser(token: any, username: any): Observable<any> {
    return this.http.get(apiUrl + 'users' + username, token).pipe(
    catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  public addFavorite(username: any, movie: any, token: any): Observable<any> {
    return this.http.post(apiUrl + 'users/' + username + 'movies/' + movie, token).pipe(
    catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  public editUser(userDetails: any, username: any, token: any): Observable<any> {
    console.log(userDetails);
    return this.http.put(apiUrl + 'users/' + username, userDetails, token).pipe(
    catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  public deleteUser(username: any, token: any): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username, token).pipe(
    catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  public removeFavorite(username: any, movie: any, token: any): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username + 'movies/' + movie, token).pipe(
    catchError(this.handleError)
    );
  }

// --------------------------------------------------------------------------------------------------------------------------

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}