import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private toastr: ToastrService,
        public router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401].indexOf(err.status) !== -1) {
                // auto logout if 401 response returned from api
                this.authService.logout();
                this.router.navigateByUrl('auth/login');
            }
            this.toastr.error('Il y a eu une erreur.', 'Erreur !');

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
