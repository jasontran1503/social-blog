import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataResponse } from 'src/app/shared/models/data-response';
import { ToastMessageService } from 'src/app/shared/notification/toast-message/toast-message.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  submitted = false;

  destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastMessageService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.buildForm();
  }

  /**
   * Build form
   */
  buildForm() {
    return this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9]*$/),
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
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
    // Register
    this.authService
      .register(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: DataResponse) => {
        if (response && response.success) {
          this.toast.showToastSuccess(response.message);
          const loginValue = {
            email: formValue.email,
            password: formValue.password,
          };
          // Login
          this.login(loginValue);
          // Send mail
          this.sendMail(formValue.email);
        }
      });
  }

  /**
   * Login after register success
   * @param loginValue email & password
   */
  login(loginValue: { email: string; password: string }) {
    this.authService
      .login(loginValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: DataResponse) => {
        if (response && response.success) {
          this.authService.token = response.data;
          this.router.navigate(['/', 'post']);
        }
      });
  }

  /**
   * Send mail when register success
   * @param email email
   */
  sendMail(email: string) {
    this.authService.sendMail(email).pipe(takeUntil(this.destroy$)).subscribe();
  }

  /**
   * Match password
   * @param controlName controlName
   * @param matchingControlName matchingControlName
   */
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
