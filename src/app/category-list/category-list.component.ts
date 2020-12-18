import { Component, Input, OnInit } from "@angular/core";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"],
})
export class CategoryListComponent implements OnInit {
  @Input() categories;

  constructor(private todoService: TodoService) {}

  ngOnInit() {}
  addCategory() {
    let category;
    category = prompt("please enter category");
    this.todoService.setCategory(category);
  }
}
