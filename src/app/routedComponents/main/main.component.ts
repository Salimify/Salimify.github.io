import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Salim Ben Hassine | CV Ingénieur Développeur Web Full Stack Tunisie');
    // tslint:disable-next-line:max-line-length
    this.meta.updateTag({name: 'description', content: 'CV ingénieur et développeur web front-end et back-end Tunisien, Freelance, étudiant a ESPRIT, dévloppement web full stack, maîtrise plusieurs technologies javascript: angular js, nodejs et vuejs et php: ajax, symfony et autre java ee, asp.net, android, ionic, mongoDB. motivé et actif'});
  }

  ngOnInit() {
  }

}
