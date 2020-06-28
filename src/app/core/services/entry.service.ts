import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Entry } from '../../model/entry.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = `${environment.url}/entries`;
  constructor(
    private http: HttpClient
  ) { }

  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.apiPath, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Entry> {
    return this.http.get<Entry>(`${this.apiPath}/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(entry: Entry): Observable<Entry> {
    return this.http.put<Entry>(`${this.apiPath}/${entry.id}`, entry, httpOptions)
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
