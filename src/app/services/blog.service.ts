import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

import { Blog } from '../models/blog';
import { BlogType } from '../models/blogType';
import { Reply } from '../models/reply';
import { AppState } from '../components/app/app.service';

@Injectable()
export class BlogServ {
  constructor(public http: Http) { }

  getBlogsData(blogType): Promise<Blog[]> {
    if (blogType.channel == 'v2ex') {
      return this.getV2exListData();
    } else if (blogType.channel == 'cnode') {
      return this.getCnodejsListData();
    } else {
      return this.getCnodejsListData();
    }

  }

  getBlogDetailData(blogType, id): Promise<Blog> {
    let channel = blogType.channel;

    if (channel == 'cnode') {
      return this.getCnodejsDetailData(id);
    } else if (channel == 'v2ex') {
      return this.getV2exDetailData(id);
    } else {
      return this.getCnodejsDetailData(id);
    }

  }

  getReplyData(channel, id): Promise<Reply[]> {
    return this.getV2exReplyData(id);
  }

  // 获取 V2EX 社区列表数据
  private getV2exListData(): Promise<Blog[]> {

    return this.http.get('v2ex_latest')
      .toPromise()
      .then(response => {
        let blogs: Blog[] = [];

        response.json().forEach(item => {
          blogs.push({
            id: item.id,
            title: item.title,
            date: '2016',
            author_id: item.author_id,
            content: ''
          });
        });
        return blogs;
      })
      .catch(this.handleError)
  }

  // 获取 V2EX 社区详细数据
  private getV2exDetailData(id): Promise<Blog> {

    return this.http.get('v2ex_detail?id=' + id).toPromise()
      .then(response => {
        console.log('get v2ex detail data from server');
        let contentData = response.json()[0];
        let blog: Blog = {
          id: id,
          title: contentData.title,
          date: '2016',
          author_id: 'zlm',
          content: contentData.content_rendered
        };
        return blog;
      })
      .catch(this.handleError)
  }

  // 获取 V2EX 社区回复数据
  private getV2exReplyData(id): Promise<Reply[]> {
    return this.http.get('v2ex_reply?topic_id=' + id).toPromise()
      .then(response => {
        let replies: Reply[] = [];

        response.json().forEach(item => {
          console.log(item);
          replies.push({
            topic_id: id,
            date: '2016',
            author_id: item.member.id,
            author_name: item.member.username,
            content: item.content_rendered
          });
        });
        return replies;
      })
      .catch(this.handleError)
  }

  // 获取 CNODEJS 社区列表数据
  private getCnodejsListData(): Promise<Blog[]> {

    return this.http.get('http://cnodejs.org/api/v1/topics?tab=all')
      .toPromise()
      .then(response => {
        let blogs: Blog[] = [];
        response.json().data.forEach(item => {
            blogs.push({
              id: item.id,
              title: item.title,
              date: '2016',
              author_id: item.author_id,
              content: ''
            });
        });
        return blogs;
      })
      .catch(this.handleError)
  }

  // 获取 CNODEJS 社区详细数据
  private getCnodejsDetailData(id): Promise<Blog> {

    return this.http.get('http://cnodejs.org/api/v1/topic/' + id)
      .toPromise()
      .then(response => {
        console.log('get cnodejs detaildata from server');
        let contentData = response.json().data;
        let blog: Blog = {
          id: id,
          title: contentData.title,
          date:'2016',
          author_id: contentData.author_id,
          content: contentData.content};

        return blog;
      })
      .catch(this.handleError)
  }





  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
