import { Component, OnInit, OnDestroy, ElementRef, Output } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { LostandfoundService } from './service/lostandfound.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Lostandfound } from './models/lostandfound.model';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { AppDateAdapter, APP_DATE_FORMATS} from 'app/shared/formats/date.adapter';
import { Subscription } from 'rxjs';
import { Post } from './models/post.model';
import { EventEmitter } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lostandfound',
  templateUrl: './lostandfound.component.html',
  styleUrls: ['./lostandfound.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class LostandfoundComponent implements OnInit , OnDestroy {
  loadedPosts: Lostandfound[] = [];
  visibleImages: any[] = [];
  selectedFile = null;
  isFetching = false;
  date : any ;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private lostandfoundService: LostandfoundService, private element : ElementRef ,private route: Router) { }

  ngOnInit()  {
    let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

      navbar.classList.remove('navbar-transparent');
    this.errorSub = this.lostandfoundService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.lostandfoundService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  

  processFile(event){
    this.selectedFile = event.target.files[0];
    }

  onCreatePost(postData: Lostandfound) {

    const fd = new FormData();
    fd.append('file', this.selectedFile) ;
    fd.append('label',postData.label)
    
    
    //let newDate = new Date(postData.createdAt);
    //let strDate = newDate.getFullYear().toString() +"-" + (newDate.getMonth()+1).toString() +"-"+ newDate.getDate().toString() +"T00:00:00+02:00";    
    this.lostandfoundService.createAndStorePost(fd);
    this.route.navigate(['lostfound']);

    
  }

 


  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.lostandfoundService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  // onClearPosts() {
  //   // Send Http request
  //   this.lostandfoundService.deletePosts().subscribe(() => {
  //     this.loadedPosts = [];
  //   });
  // }

  onHandleError() {
    this.error = null;
  }

  

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    this.errorSub.unsubscribe();
  }

}
