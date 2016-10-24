import { Injectable } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

@Injectable()
export class AppUtil {
  constructor() {

  }

  /**
   * 获取当前path
   */
  getCurrentPath(route) {
    let currPath = '';
    let urlArr = route.url._value;
    urlArr.forEach(function(item){
      currPath += '/' + item.path;
    });
    return currPath;
  }

}
