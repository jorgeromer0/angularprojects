import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'my-app';
  usuarios = [];
  lenguaje = ['Angular', 'PHP', 'JS'];
  name: string | undefined;
  addLenguaje(newLenguaje: any) {
    this.name = newLenguaje;
    this.lenguaje.push(newLenguaje);

  }
  constructor(
    private _http: HttpClient
  ) {
  
  }

  ngOnInit(): void {

    // this._http.get('https://jsonplaceholder.typicode.com/users')
    // .subscribe((datos:any) => {
    //   this.usuarios = datos;
    // })
  }
  // borrarUsuario(id:number): any {
  //   console.log(id);
    
  //   this.usuarios = this.usuarios.filter( usuario => usuario.id != id)
  // }
  
}
