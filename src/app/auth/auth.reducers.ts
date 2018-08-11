import * as AppAuth from "./auth.actions"

export interface AuthState {
    token: string | null,
    authenticated: boolean
}

const initialState = {
    token: null,
    authenticated: false
}

export function authReducer(state = initialState, action: AppAuth.Actions) {
    switch (action.type) {
        case AppAuth.SIGN_IN:
        case AppAuth.SIGN_UP:
            return {
                ...state,
                authenticated: true
            };
        case AppAuth.SIGN_OUT:
            return {
                ...state,
                authenticated: false,
                token: null,
            };
        case AppAuth.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            }
        default:
            return state;
    }
}