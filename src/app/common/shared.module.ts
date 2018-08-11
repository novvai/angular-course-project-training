import { NgModule } from "@angular/core";
import { DropdownDirective } from "../directives/dropdown.directive";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        DropdownDirective,
    ],
    exports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownDirective
    ]
})
export class SharedModule{

}