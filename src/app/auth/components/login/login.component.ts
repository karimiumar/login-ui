import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin = false;
  errorMessage!: any
  
  constructor(private apiService: ApiService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  onSubmit(form: NgForm) {
    console.log("Your form data: ", form.value);
    this.apiService.postTypeRequest('/login', form.value).subscribe(
      (res:any) => {
        if(res.status) {
          this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
          this.auth.setDataInLocalStorage('token', res.token);
          this.router.navigate(['']);
        }
      }
    )
  }

  isUserLogin() {
    if(this.auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  logout() {
    this.auth.clearStorage();
    this.router.navigate(['']);
  }

}
