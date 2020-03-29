import {NgModule} from '@angular/core';
import {Routes, RouterModule, ActivatedRoute, Params} from '@angular/router';
import {MainComponent} from './routedComponents/main/main.component';
import {RoutedAboutComponent} from './routedComponents/routed-about/routed-about.component';
import {TranslateService} from '@ngx-translate/core';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: ':lang', component: AppComponent ,
    children: [
      { path: '', component: MainComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/fr', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private translate: TranslateService, private route: ActivatedRoute) {
    translate.setDefaultLang('fr');
  }
  onNgInit() {}
}
