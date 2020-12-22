import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse } from '../models/data-response';

const url = 'http://localhost:3000/api/share/';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(private http: HttpClient) {}

  /**
   * Upload image
   * @param image image
   * @param folder folder's name save image
   */
  uploadImage(image: File, folder: string): Observable<DataResponse<string>> {
    const params = { folder };
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this.http.post<DataResponse<string>>(`${url}upload`, formData, {
      params,
    });
  }
}
