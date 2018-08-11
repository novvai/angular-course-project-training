import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AppState } from "../../app.reducers";
import { Store } from "@ngrx/store";
import { switchMap, take } from "rxjs/operators";
import { AuthState } from "../../auth/auth.reducers";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1)
            ,switchMap(
            (authState: AuthState) => {
                const cop = req.clone({
                    params: req.params.append('auth', authState.token)
                });

                return next.handle(cop);
            }
        ))
    }
}