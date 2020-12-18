import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private _categories = new Map();
  categories$ = new Subject();
  items$ = new Subject();
  constructor() {
    this._categories.set(0, {
      id: 0,
      name: "Groceries",
      items: new Map(),
    });
  }

  getCategories() {
    return [...this._categories.values()];
  }

  getSelectedCategory(id: number) {
    return this._categories.get(id);
  }

  setCategory(name: string) {
    const categories = [...this._categories.keys()];
    this._categories.set(categories[categories.length - 1] + 1, {
      id: categories[categories.length - 1] + 1,
      name: name,
      items: new Map(),
    });
    this.categories$.next();
  }

  setItem(name, id) {
    const category = this._categories.get(id);
    const items = [...category.items.values()];
    const lastItem = items[items.length - 1];
    if (lastItem) {
      category.items.set(lastItem.id + 1, { id: lastItem.id + 1, name: name });
    } else {
      category.items.set(0, { id: 0, name: name });
    }
    this.items$.next();
  }

  deleteItem(itemId, categoryId) {
    const category = this._categories.get(categoryId);
    category.items.delete(itemId);
    this.items$.next();
  }
  updateItemStatus(itemStatus, itemId, categoryId) {
    const category = this._categories.get(categoryId);
    const item = category.items.get(itemId);
    item.finished = itemStatus;
    this.items$.next();
  }
}
