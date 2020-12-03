import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Comment } from 'src/app/shared/models/comment';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css'],
})
export class EditCommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() eventEditComment = new EventEmitter();

  formGroup: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.formGroup = this.buildForm();
    this.patchValue(this.comment.content);
  }

  /**
   * Build form
   */
  buildForm() {
    return this.fb.group({
      content: ['', Validators.required],
    });
  }

  /**
   * Patch data to form
   * @param content comment's content
   */
  patchValue(content: string) {
    this.formGroup.patchValue({ content });
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
    const content = this.formGroup.value.content;
    // Emit value edit comment
    this.eventEditComment.emit(content);
    this.close();
  }

  /**
   * Close modal
   */
  close() {
    this.modalRef.hide();
  }
}
