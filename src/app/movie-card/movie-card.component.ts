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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

  getGenre(Name: string, Description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: Name,
        content: Description,
      }
    })
  }

  getDirector(Name: string, Bio: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: Name,
        content: Bio,
      }
    })
  }

  getDescription(Description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: "Description",
        content: Description,
      }
    })
  }

  addFavorite(MovieID: string): void {
    this.fetchApiData.addFavoriteMovie(MovieID).subscribe((result) => {
    });
  }

  isFavorite(MovieID: string): boolean {
    return this.fetchApiData.isFavoriteMovie(MovieID);
  }

  removeFavorite(MovieID: string): void {
    this.fetchApiData.deleteFavoriteMovie(MovieID).subscribe((result) => {
    });
  }

  toProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}