import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataResponse } from 'src/app/shared/models/data-response';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  submitted = false;

  destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.buildForm();
  }

  /**
   * Build form
   */
  buildForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  /**
   * Submit form
   */
  onSubmit() {
    this.formGroup.markAllAsTouched();
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    const formValue = this.formGroup.getRawValue();
    // Login
    this.authService
      .login(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: DataResponse) => {
        if (response && response.success) {
          this.authService.token = response.data;
          this.router.navigate(['/', 'post']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
