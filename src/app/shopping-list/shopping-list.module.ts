import { NgModule } from "@angular/core";

import { EditComponent } from './edit/edit.component';
import { ShopListRouter } from "./shop-list-router.module";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from "../common/shared.module";

@NgModule({
    declarations: [
        EditComponent,
        ShoppingListComponent
    ],
    imports: [
        SharedModule,
        ShopListRouter
    ],
})
export class ShoppingListModule { }