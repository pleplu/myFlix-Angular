// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {

  @Input() userData = { Username: '', Password: '' };

  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      private router: Router,
      public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * This function invokes the userLogin function and returns a user and token then navigates to the movies page
   * @param userData
   * @returns user
   * @returns token
   */
  loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      this.router.navigate(['movies']);
      this.dialogRef.close();
      this.snackBar.open(response, 'OK', {
          duration: 2000
      });
      }, (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
  }
}
