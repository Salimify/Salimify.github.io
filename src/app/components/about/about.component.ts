import {Component, OnInit} from '@angular/core';
import Typed from 'typed.js';
import {ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

declare var typed: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  typedObj = null;

  constructor(private activatedRoute: ActivatedRoute, private translate: TranslateService) {
    this.translate.onLangChange.subscribe(changed => {
      this.execJq();
    });
  }

  ngOnInit() {
  }

  execJq(): void {
    let arr = [];
    this.translate.get('about.descriptionarr').subscribe(value => {
      arr = value;
      const options = {
        strings: arr,
        typeSpeed: 80,
        backSpeed: 20,
        showCursor: true,
        cursorChar: '|',
        loop: true,
        stringsElement: null,
        startDelay: 500,
        backDelay: 1000,
        attr: null,
      };
      if (this.typedObj !== null) { this.typedObj.destroy(); }
      this.typedObj = new Typed('.typed', options);
    });

  }

}
