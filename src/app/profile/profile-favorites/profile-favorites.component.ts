import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleQueryOption } from '../../_model/article-list-config.model';

@Component({
  selector: 'ns-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.css']
})
export class ProfileFavoritesComponent implements OnInit {
  query_options: ArticleQueryOption;

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
      let username = params['username'];
      this.query_options.option.favorited = username;
    });
  }
}
