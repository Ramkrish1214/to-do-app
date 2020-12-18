import { Component, OnInit } from "@angular/core";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-to-do-list",
  templateUrl: "./to-do-list.component.html",
  styleUrls: ["./to-do-list.component.css"],
})
export class ToDoListComponent implements OnInit {
  categories;
  selectedCategory;
  constructor(private todoService: TodoService) {
    this.categories = this.todoService.getCategories();
    this.selectedCategory = this.todoService.getSelectedCategory(0);
  }

  ngOnInit() {
    this.todoService.categories$.subscribe(() => {
      this.categories = this.todoService.getCategories();
    });
  }
}
