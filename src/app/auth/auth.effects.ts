import { Effect, Actions } from "@ngrx/effects"
import { Injectable } from "@angular/core";

import * as firebase from 'firebase';
import * as AuthActions from "./auth.actions";
import { map, switchMap, mergeMap, tap } from "rxjs/operators";
import { from } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGN_UP)
        .pipe(map(
            (data: AuthActions.TrySignUp) => {
                return data.payload;
            }
        ), switchMap(
            (data: { email: string, pass: string }) => {
                return from(firebase.auth().createUserWithEmailAndPassword(data.email, data.pass));
            }), switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());
            }), mergeMap(
                (token: string) => {
                    this.router.navigate(['/']);
                    return [
                        {
                            type: AuthActions.SIGN_UP
                        },
                        {
                            type: AuthActions.SET_TOKEN,
                            payload: token
                        }
                    ]
                }
            )
        );
    @Effect()
    authSignin = this.actions$.ofType(AuthActions.TRY_SIGN_IN).pipe(
        map((auth: AuthActions.TrySignIn) => {
            return auth.payload;
        }),
        switchMap((auth: { email: string, pass: string }) => {
            console.log(auth);
            return from(firebase.auth().signInWithEmailAndPassword(auth.email, auth.pass));
        }),
        switchMap((c) => {
            // console.log(c);
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [{
                type: AuthActions.SIGN_IN
            },
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }
            ]
        })
    );
    @Effect({ dispatch: false })
    logout = this.actions$.ofType(AuthActions.SIGN_OUT).pipe(tap(() => {
        this.router.navigate(['/']);
    }));
    constructor(private actions$: Actions, private router: Router) { }
}