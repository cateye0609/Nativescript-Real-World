import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { TextField } from '@nativescript/core';
import { Article } from '../../_model/article.model';
import { ArticleService } from '../../_service/article.service';

@Component({
  selector: 'ns-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  article: Article;

  constructor(
    private activatedRoute: ActivatedRoute,
    private acticleService: ArticleService,
    private router: RouterExtensions,
    private zone: NgZone
  ) {
    this.article = {
      title: '',
      description: '',
      body: '',
      tagList: []
    } as Article;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data['article']) {
        this.article = data['article'];
      }
    });
  }

  addTag(event: any) {
    const tag = event.target.value;
    if (!this.article.tagList.includes(tag)) {
      this.article.tagList.push(tag);
    }
    event.target.value = '';
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  formSubmit() {
    if (this.article.slug) {
      this.acticleService.updateArticle(this.article).subscribe(
        res => this.router.navigate([`/article/${res.article.slug}`])
      );
    } else {
      this.acticleService.createArticle(this.article).subscribe(
        res => this.router.navigate([`/article/${res.article.slug}`])
      );
    }
  }

  tagFieldLoaded(args: any) {
    let field: TextField = args.object;
    field.android.setOnKeyListener(new android.view.View.OnKeyListener({
      onKey: (view, keyCode, keyevent) => {
        if (keyCode == android.view.KeyEvent.KEYCODE_ENTER && keyevent.getAction() == android.view.KeyEvent.ACTION_DOWN) {
          const tag = field.text;
          if (!this.article.tagList.includes(tag)) {
            this.article.tagList.push(tag);
            // https://stackoverflow.com/questions/59867430/nativescript-listview-isnt-updating
            this.zone.run(() => this.article = this.article);
          }
          field.text = '';
        }

        return false;
      }
    }));
  }
}