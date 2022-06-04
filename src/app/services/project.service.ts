import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Project} from '../models/project'
import { Global } from './global';
import { Observable } from 'rxjs/internal/Observable';
import { map, Subject } from 'rxjs';
import { Project } from '../interface/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public url: string;
  public  _url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
    this._url = Global.url2;
  }

  testService() {
    return 'Probando el sevicio de Angular';
  }

  saveProject(project: Project): Observable<any> {
    let params = JSON.stringify(project);
    console.log(params);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url, params, { headers: headers });
  }


  projectSubject = new Subject<Project[]>();

  getProjects():Observable<Project[]> {
    const obsCities = this._http.get<{[key: string]: Project}>(this.url)
    .pipe(
      map( sObjecte => Object.entries(sObjecte)),
      map( sArray => sArray.map(s=> { s[1]._id = s[0]; return s[1]})) )
    .subscribe(cities => this.projectSubject.next(cities))

     return this.projectSubject;
  }





  getProjecto(id:string):Observable<Project> {
    return this._http.get<Project>(`${this._url}/${id}.json`)
    .pipe(map(s=>{ s._id = id; return s} ))
  }


  deleteProject(id:string): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this._url+'/'+id+'.json', {headers:headers});

  }

  updateProject(project: Project): Observable<Project> {
    let auxProject: any = {...project};
    delete auxProject._id;
    return this._http.put<Project>(`${this._url}/${project._id}.json`,JSON.stringify(auxProject))
    .pipe(map(s=> {s._id = project._id; return s} ))
  }

}
