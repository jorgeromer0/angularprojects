import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLogged:boolean=false;
  email:string | undefined;


  constructor(private login: LoginService,private router:Router) { }

  ngOnInit(): void {
    this.isLogged=this.login.isLogged();
    this.login.logged.subscribe(log=> { 
      this.isLogged=log; 
      this.email=this.isLogged ? localStorage.getItem("email")!: "" }); 
  }


  logout(){
    this.login.logout();
    
  }

}
