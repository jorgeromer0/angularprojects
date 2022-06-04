import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService],
})
export class EditComponent implements OnInit {
  public title: string;
  public project!: Project;
  public save_project: any;
  public status!: string;
  public filesToUpload!: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Editar proyecto';
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params['id'];

      this.getProject(id);
    });
  }

  getProject(id: any) {
    this._projectService.getProjecto(id).subscribe(
      (response) => {
        this.project = response;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  imagenes: any[] = [];

  cargarImagen(event: any) {
    let archivos = event.target.files;
    let nombre = 'jorge';

    for (let i = 0; i < archivos.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(archivos[0]);
      reader.onloadend = () => {
        console.log(reader.result);
        this.imagenes.push(reader.result);
        this._uploadService
          .subirImagen(nombre + '_' + Date.now(), reader.result)
          .then((urlImagen: any) => {
            console.log(urlImagen);
          });
      };
    }
  }

	onSubmit(form:any){
		
		// Guardar datos básicos
		this._projectService.updateProject(this.project).subscribe(
			response => {

				console.log(response);

				
				if (response) {
					this.save_project = response;


					this.status = 'success';
					// this.project = response;
					
				}else{
					this.status = 'failed';
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
