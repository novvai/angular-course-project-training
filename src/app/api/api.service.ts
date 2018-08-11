import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class Api {
    private basePath: string = "https://api-new-ng.firebaseio.com/";

    private options = {

    }
    constructor(
        private http: HttpClient
    ) { }

    get(endpoint: string, token?: string): Observable<any> {
        return this.http.get(this.buildEndpoint(endpoint, token), this.options);
    }

    post(endpoint: string, payload: any): Observable<any> {
        return this.http.post(this.buildEndpoint(endpoint), payload, this.options);
    }

    put(endpoint: string, payload: any, queryString?: string): Observable<any> {
        return this.http.put(this.buildEndpoint(endpoint, queryString), payload, this.options);
    }

    private buildEndpoint(endpoint: string, queryString?: string): string {
        endpoint = endpoint.toLocaleLowerCase();
        endpoint = `${this.basePath}${endpoint}.json`;
        return endpoint;
    }

}
