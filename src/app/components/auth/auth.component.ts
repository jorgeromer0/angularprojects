import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  email!: string;
  password!: string;
  username: any;
  
  public emailError:string|undefined;
  public passwdError:string|undefined;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  public onSubmit(): void {
    let user:User = { email: this.email, password: this.password};
    this.loginService.login(user).subscribe({
      next: user=>{
        console.log(user);
        this.router.navigate(['/sobre-mi']);
       },
      error: error=>{
        this.emailError=undefined;
        this.passwdError=undefined;
       if(error=="INVALID_PASSWORD") this.passwdError=error;
       else if(error=="EMAIL_NOT_FOUND") this.emailError=error;

      }
     });
  }


}
