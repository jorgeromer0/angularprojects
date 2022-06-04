import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../interface/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  // public projects!: Project[] ;
  @Input() projects:Project[]| undefined;

  public url: string;
  projecto!:any ;
  criteri: string =  '';
  constructor(
  	private _projectService: ProjectService
  ){
  	this.url = Global.url;
  }

  ngOnInit(){
  	// this.getProjects();

    this._projectService.getProjects().subscribe(
     (element) =>{
        console.log(element);
    
        var arr = Object.entries(element);
        console.log(arr);
    
  

        this.projecto = arr;
   
     }
  
    )
  }
  // getProjects(){
  // 	this._projectService.getProjects().subscribe(
  //     (res: any[]) => {
  //        console.log(res);
        
  		
  // 				this.projects = res;
  			
  // 		},
  //     (  		error: any) => {
  // 			console.log(error);
  // 		}
  // 	);
  // }

}
