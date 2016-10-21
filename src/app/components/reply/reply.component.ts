import { Component, Input } from '@angular/core';
import { Reply } from '../../models/reply';

@Component({
  selector: 'reply-comp',
  styleUrls: [ './reply.style.scss' ],
  templateUrl: './reply.template.html'
})

export class ReplyComp {
  constructor() { }

  @Input()
  replies: Reply[];

}
