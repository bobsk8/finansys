import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/core/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  isEdit = false;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessage: string[] = null;
  submittingForm = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngSubmit() {
    this.submittingForm = true;
    if (this.isEdit) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }

  private createCategory() {
    const category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category).subscribe(catcategory => this.actionsForsuccess(category));
  }

  private actionsForsuccess(category: Category): void {
    toastr.success('Solicitação Processada com sucesso');
    this.router.navigateByUrl('categories', { skipLocationChange: true })
      .then(() => this.router.navigate(['categories', category.id, 'edit']));
  }

  private updateCategory() {
    const category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.update(category).subscribe(cat => this.actionsForsuccess(category));
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  private setPageTitle() {
    if (this.isEdit) {
      const categoryName = this.category.name || '';
      this.pageTitle = `Editando a categoria: ${categoryName}`;
    } else {
      this.pageTitle = 'Cadatro de nova Categoria';
    }
  }

  private setCurrentAction() {
    this.isEdit = this.route.snapshot.url[0].path.includes('new') ? false : true;
  }

  private buildCategoryForm() {
    this.categoryForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required]
    });
  }

  loadCategory() {
    if (this.isEdit) {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      ).subscribe(category => {
        this.category = category;
        this.categoryForm.patchValue(category);
      });
    }
  }
}
