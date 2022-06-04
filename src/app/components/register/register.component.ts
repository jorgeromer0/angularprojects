import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  passwordError: boolean = false;

  constructor(
    private registerService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.crearForm();
  }

  ngOnInit(): void {}

  crearForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      password2: [''],
    });
  }

  inputsValidos(campo: string, error: string): string {
    if (
      this.registerForm.get(campo)!.hasError(error) &&
      this.registerForm.get(campo)!.touched
    ) {
      return 'is-invalid';
    }
    if (
      !this.registerForm.get(campo)!.hasError(error) &&
      this.registerForm.get(campo)!.touched
    ) {
      return 'is-valid';
    }
    return '';
  }

  submit(): void {
    let usuario: User = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };

    if (
      this.registerForm.get('password')?.value !=
      this.registerForm.get('password2')?.value
    ) {
      this.passwordError = true;
    } else {
      this.registerService.register(usuario).subscribe({
        next: (user) => {
          this.router.navigate(['/auth']);
        },
      });
    }
  }
}
