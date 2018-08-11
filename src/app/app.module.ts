import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms"
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutesModule } from './modules/routes.module';
import { ErrorComponent } from './error/error.component';
import { RecipeService } from './recipe-book/recipe.service';
import { Api } from './api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { DataStorageService } from './common/data-storage.service';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './common/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { SharedModule } from './common/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ShoppingListModule,
    CoreModule,
    RoutesModule,
    HttpClientModule,
  ],
  providers: [
    DataStorageService,
    AuthService,
    ShoppingListService,
    RecipeService,
    Api,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
