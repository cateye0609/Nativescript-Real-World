import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from '../../_model/article.model';
import { Profile } from '../../_model/profile.model';
import { ArticleService } from '../../_service/article.service';
import { AuthService } from '../../_service/auth.service';
import { UserService } from '../../_service/user.service';
import { ArticleCommentComponent } from '../article-comment/article-comment.component';

@Component({
  selector: 'ns-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit, OnChanges {
  @ViewChild(ArticleCommentComponent, { static: false }) articleCommentC: ArticleCommentComponent
  is_logged_in: boolean;
  authState_subscription: Subscription;
  article: Article;
  current_user: Profile;
  comment_body: string = "";
  follow_text: string = "Follow";

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.onLoad();
  }

  ngOnChanges() {
    this.updateFollowText();
  }

  updateFollowText() {
    if (this.article.author.following) {
      this.follow_text = "Unfollow";
    } else this.follow_text = "Follow";
  }

  onLoad() {
    this.article = {} as Article;
    this.activatedRoute.data.subscribe(data => {
      this.article = data['article'];
      this.current_user = data['current_user'];
      this.updateFollowText();
    })
    this.getAuthState();
  }

  favoriteClicked(article: Article) {
    if (article.favorited) {
      this.articleService.unfavoriteArticle(article.slug).subscribe(
        () => {
          article.favorited = false;
          article.favoritesCount--;
        }
      )
    } else {
      this.articleService.favoriteArticle(article.slug).subscribe(
        () => {
          article.favorited = true;
          article.favoritesCount++;
        }
      )
    }
  }

  followClicked(username: string, followed: boolean) {
    if (followed) {
      this.userService.unfollowUser(username).subscribe(
        () => this.article.author.following = false
      );
    } else {
      this.userService.followUser(username).subscribe(
        () => this.article.author.following = true
      );
    }
  }

  addComment(slug: string) {
    this.articleService.addComment(slug, this.comment_body).subscribe(
      () => {
        this.articleCommentC.getComments(slug);
        this.comment_body = '';
      }
    );
  }

  deleteArticle(slug: string) {
    this.articleService.deleteArticle(slug).subscribe();
  }

  // get auth state
  getAuthState() {
    this.authState_subscription = this.authService.logged_in$.subscribe(
      auth => this.is_logged_in = auth
    );
  }

  ngOnDestroy() {
    this.authState_subscription.unsubscribe();
  }
}
