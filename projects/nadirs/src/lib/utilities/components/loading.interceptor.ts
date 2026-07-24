import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';

let activeRequestCount = 0;

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.headers.has('X-Skip-Loading')) {
    return next(request);
  }

  const loadingService = inject(LoadingService);

  if (activeRequestCount === 0) {
    loadingService.show();
  }
  activeRequestCount++;

  return next(request).pipe(
    finalize(() => {
      activeRequestCount--;
      if (activeRequestCount === 0) {
        loadingService.hide();
      }
    })
  );
};
