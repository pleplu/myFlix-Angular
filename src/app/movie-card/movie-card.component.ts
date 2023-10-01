import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * This function invokes the getAllMovies function and returns an array of movies from the database
   * @returns movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

  /**
   * This function returns a dialog with movie genre information
   * @param Name
   * @param Description
   * @returns MovieDetailsComponent
   */
  getGenre(Name: string, Description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: Name,
        content: Description,
      }
    })
  }

  /**
   * This function returns a dialog with movie director information 
   * @param Name
   * @param Bio
   * @returns MovieDetailsComponent
   */
  getDirector(Name: string, Bio: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: Name,
        content: Bio,
      }
    })
  }

  /**
   * This function returns a dialog with movie description information
   * @param Description
   * @returns MovieDetailsComponent
   */
  getDescription(Description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: "Description",
        content: Description,
      }
    })
  }

  /**
   * This function invokes the addFavoriteMovie function, adding a movie to a user's array of favorite movies
   * @param MovieID 
   */
  addFavorite(MovieID: string): void {
    this.fetchApiData.addFavoriteMovie(MovieID).subscribe((result) => {
    });
  }

  /**
   * This function invokes the isFavoriteMovie to determine if a movie is already a user's favorite movie
   * @param MovieID 
   */
  isFavorite(MovieID: string): boolean {
    return this.fetchApiData.isFavoriteMovie(MovieID);
  }

  /**
   * This function invokes the deleteFavoriteMovie function and removes a movie from a user's array of favorite movies
   * @param MovieID 
   */
  removeFavorite(MovieID: string): void {
    this.fetchApiData.deleteFavoriteMovie(MovieID).subscribe((result) => {
    });
  }

  /**
   * This function navigates the user to the profile page
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * This function allows a user to logout, clearing local storage, and returning the user to the welcome page
   */
  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}