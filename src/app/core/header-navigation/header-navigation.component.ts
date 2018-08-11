import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../common/data-storage.service';
import { AuthService } from '../../common/auth.service';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit {
  ngOnInit() {
  }

  constructor(private dbService: DataStorageService, public auth: AuthService) {

  }

  onSaveRecipes() {
    this.dbService.saveRecipes();
  }
  onFetchRecipes() {
    this.dbService.fetchRecipes();
  }

  onLogout() {
    this.auth.logout()
  }
}
