import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Folder } from 'src/app/shared/enum/image-folder';
import { DataResponse } from 'src/app/shared/models/data-response';
import { Post } from 'src/app/shared/models/post';
import { DialogsService } from 'src/app/shared/notification/dialogs/dialogs.service';
import { ToastMessageService } from 'src/app/shared/notification/toast-message/toast-message.service';
import { PostService } from 'src/app/shared/services/post.service';
import { ShareService } from 'src/app/shared/services/share.service';

@Component({
  selector: 'app-post-crupdate-page',
  templateUrl: './post-crupdate-page.component.html',
  styleUrls: ['./post-crupdate-page.component.css'],
})
export class PostCrupdatePageComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  slug: string;
  post: Post;
  submitted = false;

  // Init tinymce
  tinymceinit = {
    automatic_uploads: true,
    image_advtab: true,
    image_description: false,
    file_picker_types: 'image',
    file_picker_callback: (callback, value, meta) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.onchange = () => {
        const file = input.files[0];
        this.checkImage(file);
        this.shareService
          .uploadImage(file, Folder.IMAGE_POST)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: DataResponse) => {
            const reader = new FileReader();
            reader.onload = () => {
              callback(response.data, {});
            };
            reader.readAsDataURL(file);
          });
      };
      input.click();
    },
    height: 500,
    menubar: true,
    plugins: [
      'advlist autolink lists link image charmap preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime nonbreaking save table directionality',
      'emoticons template paste textpattern autoresize',
    ],
    toolbar1:
      'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | preview',
    toolbar2: 'forecolor backcolor emoticons',
  };

  destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private shareService: ShareService,
    private dialog: DialogsService,
    private toast: ToastMessageService
  ) {
    // Get slug
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.slug = params.slug;
      });
  }

  ngOnInit(): void {
    this.formGroup = this.buildForm();
    if (this.slug) {
      this.getPostDetail();
    }
  }

  /**
   * Check image
   * @param image image file
   */
  checkImage(image: File) {
    const maxSize = 1 * 1024 * 1024;
    if (!image) {
      this.toast.showToastError('Không có ảnh nào được chọn');
    } else if (image.size > maxSize) {
      this.toast.showToastError('Ảnh tải lên không quá 1MB');
    } else if (!image.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      this.toast.showToastError('Ảnh tải lên không đúng định dạng');
    }
  }

  /**
   * Build form
   */
  buildForm() {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(128)]],
      content: ['', Validators.required],
    });
  }

  /**
   * Patch data to form
   * @param post post
   */
  patchDataForm(post: Post) {
    this.formGroup.patchValue({
      title: post.title,
      content: post.content,
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  /**
   * Get post detail
   */
  getPostDetail() {
    this.postService
      .getPostDetail(this.slug)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: DataResponse) => {
        if (response && response.success) {
          this.post = response.data;
          this.patchDataForm(this.post);
        }
      });
  }

  /**
   * Create new post
   * @param title post's title
   * @param content post's content
   */
  createPost(title: string, content: string) {
    this.postService
      .createPost(title, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: DataResponse) => {
        if (response && response.success) {
          this.toast.showToastSuccess(response.message);
          const slug = response.data.slug;
          this.router.navigate(['/post', 'detail', slug]);
        }
      });
  }

  /**
   * Update post
   * @param title post's title
   * @param content post's content
   * @param slug post's slug
   */
  updatePost(title: string, content: string, slug: string) {
    this.postService
      .updatePost(title, content, this.slug)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: DataResponse) => {
        if (response && response.success) {
          this.toast.showToastSuccess(response.message);
          this.router.navigate(['/post', 'detail', slug]);
        }
      });
  }

  /**
   * Submit form
   */
  async onSubmit() {
    this.formGroup.markAllAsTouched();
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    const { title, content } = this.formGroup.value;

    const result = await this.dialog
      .showConfirmDialog('Bạn có chắc muốn lưu bài viết?')
      .toPromise();
    if (result) {
      if (this.slug) {
        this.updatePost(title, content, this.slug);
      } else {
        this.createPost(title, content);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
