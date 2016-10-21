import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { ReplyComp } from '../../component/reply';

import { Blog } from '../../models/blog';
import { BlogType } from '../../models/blogType';
import { Reply } from '../../models/reply';
import { BlogServ } from '../../services/blog.service';

@Component({
  templateUrl: './blogDetail.template.html',
  styleUrls: ['./blogDetail.component.scss'],
  providers: [
    BlogServ
  ],
})
export class BlogDetail implements OnInit {

  public blog: Blog;
  public htmlContent = '';
  public replies: Reply[];

  constructor(
    private blogServ: BlogServ,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    let channel, id;
    this.route.params.forEach((params: Params) => {
      channel = params['channel'];
      id = params['id'];
    });

    this.blogServ.getBlogDetailData({channel: channel, tab: 'all'}, id)
      .then(blog => {
        this.blog = blog;
        this.htmlContent = blog.content;
      });

    this.blogServ.getReplyData(channel, id)
      .then(replies => {
        console.log(replies);
        this.replies = replies;
      });
  }

}
