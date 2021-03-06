import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.decodedToken$.pipe(take(1)).subscribe(token => {
      if (token) {
        request = request.clone({
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        })
      }
    });
    
    return next.handle(request);
  }
}
