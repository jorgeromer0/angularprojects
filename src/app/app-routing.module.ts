import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DetailComponent} from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: 'sobre-mi', canActivate: [AuthGuard], component: AboutComponent}, 
  {path: 'proyecto', canActivate: [AuthGuard], component: ProjectsComponent}, 
  {path: 'create-proyecto', canActivate: [AuthGuard], component: CreateComponent}, 
  {path: 'contacto', canActivate: [AuthGuard], component: ContactComponent},
  {path: 'proyecto/:id', canActivate: [AuthGuard], component: DetailComponent},
  {path: 'editar-proyecto/:id', canActivate: [AuthGuard], component: EditComponent,pathMatch: 'full'},
  {path: 'auth' ,component: AuthComponent },
  {path: 'register', component: RegisterComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
