import { Component, OnInit } from '@angular/core';
import { Project } from '../../interface/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  public url: string;
  public project!: Project;
  public confirm: boolean;
  projecto:any ;

  constructor(
  	private _projectService: ProjectService,
  	private _router: Router,
  	private activatedRoute: ActivatedRoute
    
  ){
  	this.url = Global.url;
    this.confirm = false;
  }
  ngOnInit(){
  	this.activatedRoute.params.subscribe(params => {
  		let id = params['id'];
console.log(id);

  		this.getProject(id);
  	});
  }

  getProject(id:any){
  	this._projectService.getProjecto(id).subscribe(
  		response => {
        // console.log(response+"holA");
        // var arr = Object.entries(response);
        // console.log(arr);
        this.projecto = response;
        console.log(this.projecto.name);
        console.log(this.projecto.projecto);
        
        
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }


  setConfirm(confirm:any){
    this.confirm = confirm;
  }

deleteProject(id:any){
  this._projectService.deleteProject(id).subscribe(
    response => {

      
    
        this._router.navigate(['/proyecto']);
      
    },
    error => {
      console.log(<any>error);
      
    }
  )
}



}
