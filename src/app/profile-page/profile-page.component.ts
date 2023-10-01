import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {

  user: any = {};
  favoriteMovies: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * This function invokes the getUser function and returns user data
   * @returns user.Username
   * @returns user.Password
   * @returns user.Email
   * @returns user.Birthday
   * @returns user.FavoriteMovies
   */
  getUser(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Password = this.user.Password;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: { _id: any; }) => this.user.FavoriteMovies.indexOf(m._id) >= 0);
    });
  }

  /**
   * This function invokes the editUser function
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
    })
    this.snackBar.open('User successfully updated', 'OK', {
      duration: 2000
    });
  }

  /**
   * This function invokes the deleteUser function
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['welcome']);
    })
  }

  /**
   * This function navigates the user to the movies page
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * This function allows a user to logout, clearing local storage, and returning the user to the welcome page
   */
  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
