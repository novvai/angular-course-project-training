import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { HeaderNavigationComponent } from "./header-navigation/header-navigation.component";
import { RoutesModule } from "../modules/routes.module";
import { SharedModule } from "../common/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../api/interceptors/auth.interceptor";
import { LoggingInterceptor } from "../api/interceptors/logging.interceptor";

@NgModule({
    declarations: [
        HeaderNavigationComponent,
        HomeComponent,
    ],
    imports: [
        SharedModule,
        RoutesModule,
    ],
    exports: [
        RoutesModule,
        HeaderNavigationComponent
    ],
    providers:[
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
        {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi:true}
    ]
})
export class CoreModule { }