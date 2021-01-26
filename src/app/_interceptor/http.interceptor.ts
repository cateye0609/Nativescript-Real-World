import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as applicationSettings from '@nativescript/core/application-settings';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const token = applicationSettings.getString('token');

        if (token) {
            headers['Authorization'] = `Token ${token}`;
        }

        const request = req.clone({ setHeaders: headers });
        return next.handle(request);
    }
}