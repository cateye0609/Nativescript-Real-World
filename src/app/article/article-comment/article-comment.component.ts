import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ArticleComment } from '../../_model/article.model';
import { Profile } from '../../_model/profile.model';
import { ArticleService } from '../../_service/article.service';
import { UserService } from '../../_service/user.service';
import * as applicationSettings from '@nativescript/core/application-settings';

@Component({
  selector: 'ns-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnChanges {
  @Input() slug: string;
  comments: ArticleComment[];
  current_user: Profile;

  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) { }

  ngOnChanges(): void {
    if (this.slug) {
      this.getComments(this.slug);
      this.getCurrentUser();
    }
  }

  getComments(slug: string) {
    this.articleService.getComments(slug).subscribe(
      res => this.comments = res.comments
    )
  }

  getCurrentUser() {
    this.userService.getProfile(applicationSettings.getString('username')).subscribe(
      res => this.current_user = res
    )
  }

  deleteComment(id: string) {
    this.articleService.deleteComment(id, this.slug).subscribe(
      res => this.getComments(this.slug)
    );
  }

  onCommentRefesh(args) {
    const pullRefresh = args.object;
    this.getComments(this.slug);
    pullRefresh.refreshing = false;
  }
}
