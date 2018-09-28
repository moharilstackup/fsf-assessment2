import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GroceriesServiceService } from './groceries-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'ssf-assessB';
  groceries = [];
  sortedData = [];
  keyword = "";
  selectionType = "";
  orderBy = "none";

  selections = [
    { viewValue: "Brand", value: "brand" },
    { viewValue: "Name", value: "name" },
    { viewValue: "Both", value: "both" }
  ]

  searchCriteria = {
    'offset': 0,
    'limit': 20,
    'keyword': '',
    'selectionType': '',
    'orderBy': 'none'
  }

  constructor(private grocerySvc: GroceriesServiceService) { }

  ngOnInit() {
    this.grocerySvc.getDefGroceries(this.searchCriteria).subscribe((results) => {
      console.log(results);
      this.groceries = results;
      this.sortedData = this.groceries.slice();
    })
  }

  search() {
    console.log("subscribe backend...");
    this.searchCriteria.keyword = this.keyword;
    this.searchCriteria.selectionType = this.selectionType;
    this.searchCriteria.orderBy = this.orderBy;

    this.grocerySvc.getAllGroceries(this.searchCriteria).subscribe((results) => {
      console.log(results);
      this.groceries = results;
    })
  }

}
