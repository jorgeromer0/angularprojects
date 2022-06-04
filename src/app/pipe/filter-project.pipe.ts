import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../interface/project';

@Pipe({
  name: 'filterProject'
})
export class FilterProjectPipe implements PipeTransform {
  transform(project: any[], criteri: string): any {
    const filter = criteri ? criteri.toLocaleLowerCase() : null;
    console.log(filter, project);
    
    return filter ?
    project.filter(prod => prod[1].name?.toLocaleLowerCase().includes(filter))
    : project;
   

  }

}
