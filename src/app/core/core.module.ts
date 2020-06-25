import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDatabase } from '../in-memory-database';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    HttpClientModule
  ]
})
export class CoreModule { }
