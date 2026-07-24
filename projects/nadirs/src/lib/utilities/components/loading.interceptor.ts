import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('Interceptor: Request started', request.url); 

    if (request.headers.has('X-Skip-Loading')) {
      return next.handle(request);
    }

    if (this.count === 0) {
      this.loadingService.show();
    }
    this.count++;

    return next.handle(request).pipe(
      delay(3000),
      
      finalize(() => {
        console.log('Interceptor: Request completed', request.url); 
        this.count--;
        if (this.count === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
