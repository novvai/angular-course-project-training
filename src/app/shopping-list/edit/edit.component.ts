import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../common/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  editedIngredient: Ingredient;

  @ViewChild('nameInput')
  nameInput: ElementRef;
  @ViewChild('amountInput')
  amountInput: ElementRef;
  @ViewChild("shoplistItemForm") shoplistForm: NgForm;

  static MODES: any = {
    EDIT: "Edit",
    ADD: 'Add'
  }

  buttonMode: string = EditComponent.MODES.ADD;

  public itemId: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.edit.subscribe((index: number) => {
      this.itemId = index;
      this.editedIngredient = this.shoppingListService.getIngredient(index);
      this.shoplistForm.setValue({
        itemName: this.editedIngredient.name,
        itemAmount: this.editedIngredient.amount
      });
      this.buttonMode = EditComponent.MODES.EDIT;
    })
  }
  clearFormInputs() {
    this.itemId = undefined;
    this.editedIngredient = undefined;
    this.buttonMode = EditComponent.MODES.ADD;
    this.shoplistForm.reset();
  }

  onDelete(){
    this.shoppingListService.deleteAt(this.itemId);
    this.clearFormInputs();
  }

  addToShoppingList() {
    if (this.editedIngredient !== undefined) {
      this.editedIngredient.amount = this.shoplistForm.value.itemAmount;
      this.editedIngredient.name = this.shoplistForm.value.itemName;
    } else {
      const newIngredient = new Ingredient(this.shoplistForm.value.itemName, this.shoplistForm.value.itemAmount);
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.clearFormInputs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
