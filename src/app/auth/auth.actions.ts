import { Action } from "@ngrx/store";

export const TRY_SIGN_IN = "TRY_SIGN_IN";
export const TRY_SIGN_UP = "TRY_SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_UP = "SIGN_UP";
export const SET_TOKEN = "SET_TOKEN";

export class SignIn implements Action {
    readonly type: string = SIGN_IN;
    constructor(public payload?){};
}
export class SignOut implements Action {
    readonly type: string = SIGN_OUT;
    constructor(public payload?){};
}
export class SignUp implements Action {
    readonly type: string = SIGN_UP;
    constructor(public payload?){};
}
export class SetToken implements Action {
    readonly type: string = SET_TOKEN;
    constructor(public payload:string){};
}
export class TrySignUp implements Action {
    readonly type: string = TRY_SIGN_UP;
    constructor(public payload:{email:string, pass:string}){};
}

export class TrySignIn implements Action {
    readonly type: string = TRY_SIGN_IN;
    constructor(public payload:{email:string, pass:string}){};
}
export type Actions = SignIn | SignOut | SignUp;