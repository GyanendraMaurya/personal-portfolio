import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactMessageRequest, ContactMessageResponse } from '../models/contact-message';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private readonly http = inject(HttpClient);
  private readonly contactEndpoint = '/api/contact';

  submitContactMessage(
    message: ContactMessageRequest,
  ): Observable<ContactMessageResponse> {
    return this.http.post<ContactMessageResponse>(this.contactEndpoint, message);
  }
}
