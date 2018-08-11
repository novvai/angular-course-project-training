import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorComponent } from "../error/error.component";
import { RegisterComponent } from "../register/register.component";
import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "../core/home/home.component";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "recipes", loadChildren:'../recipe-book/recipes.module#RecipesModule' },
    { path: 'not-found', component: ErrorComponent },
    { path: '**', redirectTo: 'not-found' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class RoutesModule {

}