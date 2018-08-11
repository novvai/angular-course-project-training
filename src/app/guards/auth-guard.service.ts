import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AppState } from "../app.reducers";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs/operators";
import { AuthState } from "../auth/auth.reducers";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select('auth').pipe(
            take(1)
            ,map(
            (state:AuthState) => {
                return state.authenticated;
            }
        ));
    }
}