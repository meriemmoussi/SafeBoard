import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LostandfoundService } from './service/lostandfound.service';
import { Lostandfound } from './models/lostandfound.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lostandfound',
  templateUrl: './lostandfound.component.html',
  styleUrls: ['./lostandfound.component.css']
})
export class LostandfoundComponent implements OnInit , OnDestroy {
  loadedPosts: Lostandfound[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private lostandfoundService: LostandfoundService, private element : ElementRef) { }

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

  onCreatePost(postData: Lostandfound) {
    // Send Http request
    this.lostandfoundService.createAndStorePost(postData.label, postData.image, postData.date);
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
