import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.css"],
})
export class ItemListComponent implements OnInit {
  selectedCategory;
  todoItems;
  checkedFlag: boolean;
  constructor(
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute
  ) {}
  selectedCategoryId: number;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.selectedCategoryId = +params.get("id");
      this.selectedCategory = this.todoService.getSelectedCategory(
        this.selectedCategoryId
      );
      if (this.selectedCategory) {
        this.todoItems = [...this.selectedCategory.items.values()];
      } else {
        this.todoItems = [];
      }
    });
    this.todoService.items$.subscribe(() => {
      this.selectedCategory = this.todoService.getSelectedCategory(
        this.selectedCategoryId
      );
      this.todoItems = [...this.selectedCategory.items.values()];
    });
  }
  addItem() {
    let item;
    item = prompt("Add an item to to do list:");
    if (item && item.trim()) {
      this.todoService.setItem(item.trim(), this.selectedCategoryId);
    }
  }
  deleteItem(itemId: number) {
    const deleteFalg = confirm("Do you want to delete the to do item?");
    if (deleteFalg) {
      this.todoService.deleteItem(itemId, this.selectedCategoryId);
    }
  }
  itemStatus(event, itemId) {
    const isItemFinished = event.target.checked;
    this.todoService.updateItemStatus(
      isItemFinished,
      itemId,
      this.selectedCategoryId
    );
  }
}
