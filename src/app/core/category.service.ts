import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Category } from '../model/category.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath = `${environment.url}/categories`;
  constructor(
    private http: HttpClient
  ) { }

  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiPath, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiPath}/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiPath}/${category.id}`, category, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.log('Ocorreu um erro => ', error);
    return throwError(error);
  }
}
