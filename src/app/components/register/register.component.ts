import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.userService.register(this.registerForm.value).subscribe({
        next: (res) => this.message = 'Registration successful ✅',
        error: (err) => this.message = 'Registration failed ❌: ' + err.error.message
      });
    }
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
