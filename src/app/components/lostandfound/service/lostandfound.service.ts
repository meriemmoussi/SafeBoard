import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Lostandfound } from '../models/lostandfound.model';
import 'rxjs/add/operator/map';

import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { Post } from '../models/post.model';
@Injectable({
  providedIn: 'root'
})
export class LostandfoundService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  getImages() {


    return this.http.get('http://127.0.0.1:8000/file/');

  }


  createAndStorePost(form :FormData ) {
   
    const headers = { 'content-type': 'json'};
    this.http
      .post<any>(
        'http://127.0.0.1:8000/file/new', form 
        
      )
      .subscribe(
        responseData => {
          console.log(responseData);
          
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  




  fetchPosts() {
    let searchParams = new HttpParams();
    // searchParams = searchParams.append('print', 'pretty');
    // searchParams = searchParams.append('custom', 'key');
    return this.http
      .get('http://127.0.0.1:8000/file/'      
      )
      .pipe(
        map(responseData => {
          const postsArray: Lostandfound[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }
}
