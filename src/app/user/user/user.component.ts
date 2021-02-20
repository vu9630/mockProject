import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, switchAll } from 'rxjs/operators';
import { ArticleService } from 'src/app/article/article.service';
import { Articles } from 'src/app/feed/article.model';
import { FeedService } from 'src/app/feed/feed.service';
import { RootProfile } from 'src/app/interface/profile.model';
import { UserRequestObject } from 'src/app/interface/requestObject.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  profile: RootProfile;
  articles: Articles;
  tagEvent: string;
  username: string;
  currentUser: string = localStorage.getItem('username');
  page = 1;
  pageSize = 10;
  articleCount: number;
  listTab = ['My Articles', 'Favorited Articles'];
  currentTab: string = this.listTab[0];
  subject = new Subject();
  userObjectRequest = {
    page: this.page,
    currentTab: this.currentTab
  };

  constructor(
    private ac: ActivatedRoute,
    private userService: UserService,
    private feedService: FeedService,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.ac.params.subscribe((param) => {
      this.userService
        .getProfile(param.username, localStorage.getItem('token'))
        .subscribe((profileResponse: RootProfile) => {
          this.profile = profileResponse;
        });
      this.username = param.username;
    });
    this.subject.pipe(
      map((obj: UserRequestObject) => {
        return this.userService
          .getListProfile(
            this.username,
            localStorage.getItem('token'),
            this.pageSize,
            obj.page,
            obj.currentTab
          );
      }),
      switchAll()
    ).subscribe((articleResponse: Articles) => {
      this.articles = articleResponse;
      this.articleCount = articleResponse.articlesCount;
    });
    this.showListArticle(1, this.currentTab);
  }

  ngOnInit(): void {
  }

  // show list article
  showListArticle(page, currentTab): void {
    this.articles = undefined;
    this.userObjectRequest.page = page;
    this.userObjectRequest.currentTab = currentTab;
    this.subject.next(this.userObjectRequest);
  }

  //
  handlePageChange(page: number): void {
    this.page = page;
    this.showListArticle(page, this.currentTab);
  }

  changeTab(event): void {
    this.currentTab = event;
    this.page = 1;
    this.showListArticle(this.page, this.currentTab);
  }

  addFavorite(slug): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.articles.articles.length; i++) {
      if (this.articles.articles[i].slug === slug) {
        this.articles.articles[i].favorited = true;
        this.articles.articles[i].favoritesCount += 1;
      }
    }
    this.articleService
      .addFavorite(slug, localStorage.getItem('token'))
      .subscribe();
  }

  deleteFavorite(slug): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.articles.articles.length; i++) {
      if (this.articles.articles[i].slug === slug) {
        this.articles.articles[i].favorited = false;
        this.articles.articles[i].favoritesCount -= 1;
      }
    }

    this.articleService
      .deleteFavorite(slug, localStorage.getItem('token'))
      .subscribe();
  }

  follow(username): void {
    // this.authService.navigateIfNotLoged();
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }

    this.profile.profile.following = true;

    this.userService
      .follow(username, localStorage.getItem('token'))
      .subscribe((data) => {
        // console.log(data);
      });
  }

  unFollow(username): void {
    // this.authService.navigateIfNotLoged();
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/', 'login']);
      return;
    }

    this.profile.profile.following = false;
    this.userService
      .unFollow(username, localStorage.getItem('token'))
      .subscribe((data) => {
        // console.log(data);
      });
  }
}
