import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-routed-about',
  templateUrl: './routed-about.component.html',
  styleUrls: ['./routed-about.component.css']
})
export class RoutedAboutComponent implements OnInit {

  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('About');
  }

  ngOnInit() {
  }

}
