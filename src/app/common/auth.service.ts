import * as firebase from "firebase"
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    constructor(private router:Router){

    }

    private token: string = '';
    public isAuthenticated: boolean = false;
    signUp(email: string, pass: string) {
        // console.log(email, pass);
        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(
            error => console.error(error)
        ).then(()=>{
            this.router.navigate(['/login']);
        })
    }

    logout(){
        this.isAuthenticated = false;
        this.token = null;
        firebase.auth().signOut();
        this.router.navigate(['/']);
    }

    signIn(email: string, pass: string) {
        // console.log(email, pass);
        firebase.auth().signInWithEmailAndPassword(email, pass).catch(
            error => console.error(error)
        ).then((response) => {
            if(response){
                firebase.auth().currentUser.getIdToken().then((t: string) => {
                    this.token = t;
                    this.isAuthenticated = true;
                    this.router.navigate(['/recipes']);
                });
            }
        });
    }

    getToken() {
        firebase.auth().currentUser.getIdToken().then((t: string) => {
            this.token = t;
        });

        return this.token;
    }

}