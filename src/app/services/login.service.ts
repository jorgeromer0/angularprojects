import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, mergeMap, Observable, Subject, throwError } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  [x: string]: any;


  private loginURL =  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaIxVwpnF4CnEdq31nQCWIrpJLEM3pQi4';
  private registerUrl="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaIxVwpnF4CnEdq31nQCWIrpJLEM3pQi4"

    userSubject = new Subject<User>();
  userData$: any;


  logged = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient,private router: Router
    ) {
  
    }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };



  
  saveLoginData(localId:string,email:string,nickname:string,idToken:string,expiresIn:string){

    let data=new Date();
    
    let expires=data.getTime()+parseInt(expiresIn)*1000;
    
    localStorage.setItem("localId", localId);
    localStorage.setItem("email", email);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("IDToken", idToken);
    localStorage.setItem("expiresIn",expires.toString());
}



isLogged():boolean{
  let expiresIn=localStorage.getItem("expiresIn");
  let now=new Date();
  
  if(expiresIn){
    if(parseInt(expiresIn)>now.getTime()){
      return true;  
    }
    this.logout();
    return false;
  }    
    return false;

}



  login(data: User): Observable<User> {
    let usuario={...data,returnSecureToken : true};
    
    return this.http.post<{email:string,idToken:string,localId:string,displayName:string,expiresIn:string}>(this.loginURL,JSON.stringify(usuario),this.httpOptions).pipe(
      map(response=>{
          this.saveLoginData(response.localId,response.email,response.displayName,response.idToken,response.expiresIn);
          this.logged.next(true);
          return usuario;
      }),
      catchError((resp:HttpErrorResponse)=> throwError(()=>{
        return resp.error.error.message;}
      ))
    )
  }
  
  register(userAuth:User):Observable<User>{
    let usuario={...userAuth,returnSecureToken : true}

    console.log(usuario);
    
    return this.http.post<{email:string,idToken:string,localId:string,displayName:string,expiresIn:string}>(this.registerUrl,JSON.stringify(usuario),this.httpOptions).pipe(
    map(response=>{
        this.saveLoginData(response.localId,response.email,response.displayName,response.idToken,response.expiresIn);
        this.logged.next(true);
        console.log(usuario);        
        return usuario;

        
      }),
      catchError((resp:HttpErrorResponse)=>throwError(()=>new Error(`Error de registro: ${resp.message}`)))
    )
  } 

  logout(){
    localStorage.removeItem("localId");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    localStorage.removeItem("IDToken");
    localStorage.removeItem("expiresIn");
    this.logged.next(false);
    this.router.navigate(['/auth']);
  }




  // isAuth() {
  //   const user = localStorage.getItem('localId');
  //   let token = JSON.parse(user!);
  //      /* Observable amb subject */
  //   if(token.length > 0) {
  //     this.logged.next(true)
  //     return true;
  //   }
  //   this.logged.next(false)
  //   return false;
  // }

}
