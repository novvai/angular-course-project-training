import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//Models
import { Recipe } from '../../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
  recipe: Recipe;
  @Input()
  index: number;

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
