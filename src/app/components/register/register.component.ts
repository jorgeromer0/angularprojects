import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
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

  MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

  profileForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    this.MatchValidator('password', 'confirmPassword')
  );

  get passwordMatchError() {
    return (
      this.profileForm.getError('mismatch') &&
      this.profileForm.get('confirmPassword')?.touched
    );
  }

  submit(): void {
    let usuario: User = {
      email: this.registerForm.get('email')?.value,
      password: this.profileForm.get('password')?.value,
    };

    if (
      this.registerForm.get('password')?.value !=
      this.registerForm.get('confirmPassword')?.value
    ) {
      console.log("no");
      
      this.passwordError = true;
    } else {

      console.log("si");
      
      this.registerService.register(usuario).subscribe({
        next: (user) => {
          this.router.navigate(['/auth']);
        },
      });
    }
  }
}
