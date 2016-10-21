import { Component } from '@angular/core';

import { AppState } from '../../app.service';

import { BlogServ } from '../../services/blog.service';

import { Blog } from '../../models/blog';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    BlogServ
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.template.html'
})
export class Home {
  loadError = false;
  blogs: Blog[];
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public blogServ: BlogServ) {

  }

  ngOnInit() {

  }




}
