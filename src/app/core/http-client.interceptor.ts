import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {getAuth, logout} from './auth';
import {catchError} from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(
    private notify: NzNotificationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        setHeaders: getAuth(!(req.body instanceof FormData))
      })
    ).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.notify.error('Thất bại', 'Lỗi xác thực hoặc phiên làm việc đã hết hạn.');
          // this.router.navigate(['/' + ERouters.login]);
          logout();
        } else if (err.status === 403) {
          this.notify
            .warning(
              'Thất bại',
              'Bạn không có quyền truy cập tài nguyên này, vui lòng liên hệ admin để được cấp quyền'
            );
        } else if (err.error) {
          this.notify.error('Thất bại', err.error.message);
        } else {
          this.notify.error('Thất bại', 'Vui lòng thử lại sau');
        }
        return throwError(err);
      })
    );
  }
}
