import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { AuthGuard } from "../guards/auth-guard.service";

const shopRoutes: Routes = [
    { path: "shop-list", component: ShoppingListComponent, canActivate: [AuthGuard] },
]

@NgModule({
    imports:[
        RouterModule.forChild(shopRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class ShopListRouter{

}