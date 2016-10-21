import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';


@Component({
  selector: 'my-header',
  styleUrls: [ './header.style.css' ],
  templateUrl: './header.template.html'
})

export class MyHeader {
  constructor(private router: Router) { }

  onMenuClick(channel): void {
    let link = ['/blogs', channel];
    this.router.navigate(link);
  }
}
