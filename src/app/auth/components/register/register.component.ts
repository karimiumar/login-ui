import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLogin: boolean = false
  errorMessage: any

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLogin(); 
  }

  onSubmit(form: NgForm) {
    this.apiService.postTypeRequest('/register', form.value).subscribe((res: any) => {
      if (res.status) { 
        console.log(res)
        this.authService.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this.authService.setDataInLocalStorage('token', res.token);  
        this.router.navigate(['login']);
      } else { 
        console.log(res)
        alert(res.msg)
      }
    });
  }
  isUserLogin(){
    
    if(this.authService.getUserDetails() != null){
        this.isLogin = true;
    }
  }
}
