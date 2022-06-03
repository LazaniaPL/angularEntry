import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



export interface Data{
  id: string;
  dataUrl: string;
}

@Injectable()
export class ComService {
  dataUrl='assets/data.json'

  constructor(private http:HttpClient) {  }

  getData(): Observable<Data[]>{
    return this.http.get<Data[]>(this.dataUrl)
    .pipe(
      retry(5),
      catchError(this.handleError)
    );
  }

private handleError(error:HttpErrorResponse){
  if (error.status ===0) {
    console.error(error.error);
  }else{
    console.error(
      `Error status is ${error.status}`, error.error
    );
  }
return throwError(()=> new Error('Please try again later.'))

}



}

