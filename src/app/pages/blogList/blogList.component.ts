import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params }   from '@angular/router';

import { AppState } from '../../app.service';

import { BlogServ } from '../../services/blog.service';

import { Blog } from '../../models/blog';

import { BlogType } from '../../models/blogType';

import { AppUtil } from '../../share/app.util';


@Component({
  providers: [
    BlogServ, AppUtil
  ],
  templateUrl: './blogList.template.html'
})
export class BlogList implements OnInit {
  loadError = false;
  blogs: Blog[];
  localState = { value: '' };
  blogType: BlogType = {channel: 'v2ex', tab: 'all'};

  constructor(
    public appState: AppState,
    public blogServ: BlogServ,
    public appUtil: AppUtil,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {

    let currPath = this.appUtil.getCurrentPath(this.route);
    let channel = currPath.split('/')[2];
    if (channel) {
      this.blogType.channel = channel;
    }

    this.getListData(this.blogType);
  }



  getListData(blogType) {

    let channel = blogType.channel;
    let data_key = 'blogs_' + channel;

    var blogs = this.appState.state[data_key];
    if (blogs) {
      console.log('get data from cache');
      this.blogs = blogs;
    } else {
      this.blogServ.getBlogsData(blogType)
        .then(blogs => {
          console.log('get data from server');
          this.blogs = blogs;
          this.appState.set(data_key, blogs);
        })
        .catch(err => this.loadError = true);
    }

  }


  /**
  * 列表数据点击处理
  */
 onSelect(blog: Blog): void {
   let link = ['/blogDetail', this.blogType.channel, blog.id];
   this.router.navigate(link);
 }


}
