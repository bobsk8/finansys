import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/core/category.service';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAll()
    .subscribe(categories => this.categories = categories);
  }

  deleteCategory(id: number) {
    const mustDelete = confirm('Deseja realmente excluir essa categoria?');
    if (mustDelete) {
      this.categoryService.delete(id)
      .subscribe(() => this.categories = this.categories.filter(c => c.id !== id));
    }
  }

}
