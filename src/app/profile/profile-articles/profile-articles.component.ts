import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleQueryOption } from '../../_model/article-list-config.model';

@Component({
  selector: 'ns-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.css']
})
export class ProfileArticlesComponent implements OnInit {
  query_options: ArticleQueryOption;
  private username: string;
  
  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.query_options = { option: {} } as ArticleQueryOption;
  }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.username = params['username'];
      this.query_options.option.author = this.username;
    });
  }
}
