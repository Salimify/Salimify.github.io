import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'salimbenhassine';
  particleRoutes = ['/fr', '/en', '/frr/about', '/enr/about'];

  constructor(private translate: TranslateService, private activatedRoute: ActivatedRoute, private router: Router) {
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    if (this.particleRoutes.indexOf(this.router.url.toLowerCase()) > -1) {
      particlesJS.load('particles-js', 'assets/particles.json');
    }
    this.activatedRoute.params.subscribe((params: Params) => {
      const language = params['lang'];
      if (language !== undefined) {
        switch (language.toLowerCase()) {
          case 'fr': {
            this.translate.use('fr');
            break;
          }
          case 'en': {
            this.translate.use('en');
            break;
          }
        }
      }
    });
  }

}
