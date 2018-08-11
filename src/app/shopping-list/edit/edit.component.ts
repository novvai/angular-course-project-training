import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../common/ingredient.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shoppin-list.actions'
import { IngredientState } from '../store/shopping-list.reducers';
import { AppState } from '../../app.reducers';

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

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe((data: IngredientState) => {
      if (data.editIngredientIndex > -1) {
        this.editedIngredient = data.editIngredient;
        this.shoplistForm.setValue({
          itemName: this.editedIngredient.name,
          itemAmount: this.editedIngredient.amount
        });
        this.buttonMode = EditComponent.MODES.EDIT;
      } else {
        this.editedIngredient = null;
        this.buttonMode = EditComponent.MODES.ADD;
      }
    })
  }
  clearFormInputs() {
    this.editedIngredient = undefined;
    this.buttonMode = EditComponent.MODES.ADD;
    this.shoplistForm.reset();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(1));
    this.clearFormInputs();
  }

  addToShoppingList() {
    const newIngredient = new Ingredient(this.shoplistForm.value.itemName, this.shoplistForm.value.itemAmount);
    if (this.editedIngredient !== undefined) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    
    this.clearFormInputs();
  }
  
  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
