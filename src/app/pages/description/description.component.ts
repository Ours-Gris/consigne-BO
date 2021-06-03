import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
    @ViewChild('player') player: any;
    videoId: string = 'l7xl2bZyIJg';

    @Input()
    set id(id: string) {
        this.videoId = id;
    }
  constructor() {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
  }

  ngOnInit(): void {

  }

}
