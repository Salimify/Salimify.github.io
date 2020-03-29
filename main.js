(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _routedComponents_main_main_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routedComponents/main/main.component */ "./src/app/routedComponents/main/main.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");






var routes = [
    { path: ':lang', component: _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        children: [
            { path: '', component: _routedComponents_main_main_component__WEBPACK_IMPORTED_MODULE_3__["MainComponent"] },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '/fr', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule(translate, route) {
        this.translate = translate;
        this.route = route;
        translate.setDefaultLang('fr');
    }
    AppRoutingModule.prototype.onNgInit = function () { };
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--<button (click)=\"useLanguage('en')\">en</button>\n<button (click)=\"useLanguage('fr')\">fr</button>-->\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var AppComponent = /** @class */ (function () {
    function AppComponent(translate, activatedRoute, router) {
        this.translate = translate;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.title = 'salimbenhassine';
        this.particleRoutes = ['/fr', '/en', '/frr/about', '/enr/about'];
        translate.setDefaultLang('fr');
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.particleRoutes.indexOf(this.router.url.toLowerCase()) > -1) {
            particlesJS.load('particles-js', 'assets/particles.json');
        }
        this.activatedRoute.params.subscribe(function (params) {
            var language = params['lang'];
            if (language !== undefined) {
                switch (language.toLowerCase()) {
                    case 'fr': {
                        _this.translate.use('fr');
                        break;
                    }
                    case 'en': {
                        _this.translate.use('en');
                        break;
                    }
                }
            }
        });
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule, HttpLoaderFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/fesm5/ngx-translate-http-loader.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _routedComponents_main_main_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routedComponents/main/main.component */ "./src/app/routedComponents/main/main.component.ts");
/* harmony import */ var _components_about_about_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/about/about.component */ "./src/app/components/about/about.component.ts");
/* harmony import */ var _components_skills_skills_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/skills/skills.component */ "./src/app/components/skills/skills.component.ts");
/* harmony import */ var _components_education_education_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/education/education.component */ "./src/app/components/education/education.component.ts");
/* harmony import */ var _components_experience_experience_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/experience/experience.component */ "./src/app/components/experience/experience.component.ts");
/* harmony import */ var _components_activite_activite_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/activite/activite.component */ "./src/app/components/activite/activite.component.ts");
/* harmony import */ var _components_contact_contact_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/contact/contact.component */ "./src/app/components/contact/contact.component.ts");
/* harmony import */ var _components_reference_reference_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/reference/reference.component */ "./src/app/components/reference/reference.component.ts");
/* harmony import */ var _components_portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/portfolio/portfolio.component */ "./src/app/components/portfolio/portfolio.component.ts");
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/footer/footer.component */ "./src/app/components/footer/footer.component.ts");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/header/header.component */ "./src/app/components/header/header.component.ts");
/* harmony import */ var _components_mobilenav_mobilenav_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/mobilenav/mobilenav.component */ "./src/app/components/mobilenav/mobilenav.component.ts");
/* harmony import */ var _routedComponents_routed_about_routed_about_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./routedComponents/routed-about/routed-about.component */ "./src/app/routedComponents/routed-about/routed-about.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");






















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _routedComponents_main_main_component__WEBPACK_IMPORTED_MODULE_8__["MainComponent"],
                _components_about_about_component__WEBPACK_IMPORTED_MODULE_9__["AboutComponent"],
                _components_skills_skills_component__WEBPACK_IMPORTED_MODULE_10__["SkillsComponent"],
                _components_education_education_component__WEBPACK_IMPORTED_MODULE_11__["EducationComponent"],
                _components_experience_experience_component__WEBPACK_IMPORTED_MODULE_12__["ExperienceComponent"],
                _components_activite_activite_component__WEBPACK_IMPORTED_MODULE_13__["ActiviteComponent"],
                _components_contact_contact_component__WEBPACK_IMPORTED_MODULE_14__["ContactComponent"],
                _components_reference_reference_component__WEBPACK_IMPORTED_MODULE_15__["ReferenceComponent"],
                _components_portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_16__["PortfolioComponent"],
                _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_17__["FooterComponent"],
                _components_header_header_component__WEBPACK_IMPORTED_MODULE_18__["HeaderComponent"],
                _components_mobilenav_mobilenav_component__WEBPACK_IMPORTED_MODULE_19__["MobilenavComponent"],
                _routedComponents_routed_about_routed_about_component__WEBPACK_IMPORTED_MODULE_20__["RoutedAboutComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_21__["FormsModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateLoader"],
                        useFactory: HttpLoaderFactory,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]]
                    }
                })
            ],
            providers: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]],
            exports: [
                _components_mobilenav_mobilenav_component__WEBPACK_IMPORTED_MODULE_19__["MobilenavComponent"],
                _components_about_about_component__WEBPACK_IMPORTED_MODULE_9__["AboutComponent"],
            ]
        })
    ], AppModule);
    return AppModule;
}());

function HttpLoaderFactory(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_5__["TranslateHttpLoader"](http);
}


/***/ }),

/***/ "./src/app/components/about/about.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/about/about.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flexbt{\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n.fleximg{\n  -webkit-box-flex: 1;\n          flex: 1;\n  margin-right: 50px;\n  margin-top: 1em;\n}\n.flextxt{\n  -webkit-box-flex: 3;\n          flex: 3;\n  text-align: center;\n}\n.about-txt-sec{\n  margin-top: 4em;\n  margin-bottom: 3em;\n}\n.abt-p{\n  margin-bottom: 5px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9hYm91dC9hYm91dC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0JBQWE7RUFBYixhQUFhO0VBQ2IseUJBQThCO1VBQTlCLDhCQUE4QjtBQUNoQztBQUNBO0VBQ0UsbUJBQU87VUFBUCxPQUFPO0VBQ1Asa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7QUFDQTtFQUNFLG1CQUFPO1VBQVAsT0FBTztFQUNQLGtCQUFrQjtBQUNwQjtBQUVBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0Usa0JBQWtCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9hYm91dC9hYm91dC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZsZXhidHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuLmZsZXhpbWd7XG4gIGZsZXg6IDE7XG4gIG1hcmdpbi1yaWdodDogNTBweDtcbiAgbWFyZ2luLXRvcDogMWVtO1xufVxuLmZsZXh0eHR7XG4gIGZsZXg6IDM7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmFib3V0LXR4dC1zZWN7XG4gIG1hcmdpbi10b3A6IDRlbTtcbiAgbWFyZ2luLWJvdHRvbTogM2VtO1xufVxuLmFidC1we1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/components/about/about.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/about/about.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"about\" class=\"section section-about\">\n  <div class=\"animate-up\">\n    <div id=\"particles-js\">\n      <h1 class=\"h1-hi\" translate>about.hello</h1>\n      <h2 class=\"h2-name\" translate>about.myname</h2>\n      <h3 class=\"h3-desc\" translate>about.iam<span class=\"typed\"></span></h3>\n      <div class=\"intro-desc\">\n        <p translate>about.description</p>\n      </div>\n    </div>\n    <div class=\"section-txt-btn\">\n      <p><a class=\"btn btn-lg btn-border btn-cstm ripple\" target=\"_blank\"\n            href=\"assets/doc/{{ 'about.cvlink' | translate }}\"\n            translate>about.downloadcv</a></p>\n    </div>\n  </div>\n</section>\n<section class=\"about-txt-sec\">\n  <div>\n    <div class=\"flexbt\">\n      <div class=\"fleximg\">\n        <img src=\"assets/img/salim.png\">\n      </div>\n      <div class=\"flextxt\">\n        <h2 class=\"section-title abt-title sect-title\" translate><span class=\"title-number\">01. </span>about.title</h2>\n        <p class=\"paragraphs abt-p\" translate>about.paragraph1</p>\n        <p class=\"paragraphs abt-p\" translate>about.paragraph2</p>\n        <p class=\"paragraphs abt-p\" translate>about.paragraph3</p>\n        <p class=\"paragraphs abt-p\" translate>about.paragraph4</p>\n        <p class=\"paragraphs abt-p\" translate>about.paragraph5</p>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/about/about.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/about/about.component.ts ***!
  \*****************************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typed.js */ "./node_modules/typed.js/lib/typed.js");
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typed_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");





var AboutComponent = /** @class */ (function () {
    function AboutComponent(activatedRoute, translate) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.translate = translate;
        this.typedObj = null;
        this.translate.onLangChange.subscribe(function (changed) {
            _this.execJq();
        });
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent.prototype.execJq = function () {
        var _this = this;
        var arr = [];
        this.translate.get('about.descriptionarr').subscribe(function (value) {
            arr = value;
            var options = {
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
            if (_this.typedObj !== null) {
                _this.typedObj.destroy();
            }
            _this.typedObj = new typed_js__WEBPACK_IMPORTED_MODULE_2___default.a('.typed', options);
        });
    };
    AboutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-about',
            template: __webpack_require__(/*! ./about.component.html */ "./src/app/components/about/about.component.html"),
            styles: [__webpack_require__(/*! ./about.component.css */ "./src/app/components/about/about.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])
    ], AboutComponent);
    return AboutComponent;
}());



/***/ }),

/***/ "./src/app/components/activite/activite.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/activite/activite.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".text-activite{\n  text-align: left;\n  line-height: 1.5em;\n  font-size: 16px;\n}\n.tint{\n  color: #76f5da;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9hY3Rpdml0ZS9hY3Rpdml0ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9hY3Rpdml0ZS9hY3Rpdml0ZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRleHQtYWN0aXZpdGV7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGxpbmUtaGVpZ2h0OiAxLjVlbTtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuLnRpbnR7XG4gIGNvbG9yOiAjNzZmNWRhO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/components/activite/activite.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/activite/activite.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"interests\" class=\"section section-interests\">\n  <div class=\"animate-up\">\n    <h2 class=\"section-title abt-title sect-title\" translate><span class=\"title-number\">06. </span>activite.title</h2>\n\n    <div class=\"section-box\">\n      <p class=\"text-activite\" translate>\n        <b class=\"tint\" translate>activite.1</b><span translate>activite.1.1</span><br>\n        <b class=\"tint\" translate>activite.2</b><span translate>activite.2.1</span><br>\n        <b class=\"tint\" translate>activite.3</b><span translate>activite.3.1</span><br>\n        <b class=\"tint\" translate>activite.4</b><span translate>activite.4.1</span><br>\n        <b class=\"tint\" translate>activite.5</b><span translate>activite.5.1</span><br>\n        <b class=\"tint\" translate>activite.6</b><span translate>activite.6.1</span><br>\n        <b class=\"tint\" translate>activite.7</b><span translate>activite.7.1</span><br>\n        <b class=\"tint\" translate>activite.8</b><span translate>activite.8.1</span><br>\n        <b class=\"tint\" translate>activite.9</b><span translate>activite.9.1</span>\n      </p>\n\n      <ul class=\"interests-list\">\n        <li>\n          <i class=\"map-icon map-icon-bicycling\"></i>\n          <span translate>activite.10</span>\n        </li>\n        <li>\n          <i class=\"map-icon map-icon-fishing\"></i>\n          <span translate>activite.11</span>\n        </li>\n        <li>\n          <i class=\"map-icon map-icon-book-store\"></i>\n          <span translate>activite.12</span>\n        </li>\n        <li>\n          <i class=\"map-icon map-icon-assistive-listening-system\"></i>\n          <span translate>activite.13</span>\n        </li>\n        <li>\n          <i class=\"map-icon map-icon-movie-theater\"></i>\n          <span translate>activite.14</span>\n        </li>\n      </ul>\n    </div>\n  </div>\n</section>\n\n"

/***/ }),

/***/ "./src/app/components/activite/activite.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/activite/activite.component.ts ***!
  \***********************************************************/
/*! exports provided: ActiviteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActiviteComponent", function() { return ActiviteComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ActiviteComponent = /** @class */ (function () {
    function ActiviteComponent() {
    }
    ActiviteComponent.prototype.ngOnInit = function () {
    };
    ActiviteComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-activite',
            template: __webpack_require__(/*! ./activite.component.html */ "./src/app/components/activite/activite.component.html"),
            styles: [__webpack_require__(/*! ./activite.component.css */ "./src/app/components/activite/activite.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ActiviteComponent);
    return ActiviteComponent;
}());



/***/ }),

/***/ "./src/app/components/contact/contact.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/contact/contact.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".input-field input,textarea{\n  color: #fff!important;\n}\n.submit-btn:disabled{\n  color: #a8a8a8;\n  cursor: not-allowed;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jb250YWN0L2NvbnRhY3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFxQjtBQUN2QjtBQUNBO0VBQ0UsY0FBYztFQUNkLG1CQUFtQjtBQUNyQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvY29udGFjdC9jb250YWN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW5wdXQtZmllbGQgaW5wdXQsdGV4dGFyZWF7XG4gIGNvbG9yOiAjZmZmIWltcG9ydGFudDtcbn1cbi5zdWJtaXQtYnRuOmRpc2FibGVke1xuICBjb2xvcjogI2E4YThhODtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/contact/contact.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/contact/contact.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"contact\" class=\"section section-contact\">\n  <div class=\"animate-up\">\n    <h2 class=\"section-title abt-title sect-title\" translate><span class=\"title-number\">07. </span>contact.title</h2>\n\n    <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <div class=\"section-box contact-form\">\n          <h3 translate>contact.mecontacter</h3>\n\n          <form class=\"contactForm\" (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\">\n            <div class=\"input-field\">\n              <input class=\"contact-name\" required type=\"text\" [(ngModel)]=\"data.name\" name=\"name\"/>\n              <span class=\"line\"></span>\n              <label translate>contact.name</label>\n            </div>\n\n            <div class=\"input-field\">\n              <input class=\"contact-email\" required type=\"email\" [(ngModel)]=\"data.email\" name=\"email\"/>\n              <span class=\"line\"></span>\n              <label translate>contact.email</label>\n            </div>\n\n            <div class=\"input-field\">\n              <input class=\"contact-subject\" required type=\"text\" [(ngModel)]=\"data.subject\" name=\"subject\"/>\n              <span class=\"line\"></span>\n              <label translate>contact.subject</label>\n            </div>\n\n            <div class=\"input-field\">\n              <textarea class=\"contact-message\" required rows=\"4\" [(ngModel)]=\"data.message\" name=\"message\"></textarea>\n              <span class=\"line\"></span>\n              <label translate>contact.message</label>\n            </div>\n\n            <span class=\"btn-outer btn-primary-outer ripple\">\n              <input class=\"btn btn-lg btn-primary submit-btn\" [disabled]=\"f.invalid\" type=\"submit\" value=\"{{ 'contact.send' | translate }}\"/>\n            </span>\n\n            <div class=\"contact-response\">{{successMessage}}</div>\n          </form>\n        </div>\n      </div>\n\n      <div class=\"col-sm-6\">\n        <div class=\"section-box contact-info has-map\">\n          <ul class=\"contact-list\">\n            <li class=\"clearfix\">\n              <strong translate>contact.address</strong>\n              <span>Nabeul, Tunisie</span>\n            </li>\n            <li class=\"clearfix\">\n              <strong translate>contact.phone</strong>\n              <span><a href=\"tel:+21624566386\">+21624566386</a></span>\n            </li>\n            <li class=\"clearfix\">\n              <strong translate>contact.email</strong>\n              <span><a href=\"mailto:salim.benhassine@esprit.tn\">salim.bnhassine@gmail.com</a></span>\n            </li>\n          </ul>\n          <div id=\"map\" data-latitude=\"36.8454047\" data-longitude=\"10.1850718\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/contact/contact.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/contact/contact.component.ts ***!
  \*********************************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_email_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/email.service */ "./src/app/services/email.service.ts");



var ContactComponent = /** @class */ (function () {
    function ContactComponent(emailService) {
        this.emailService = emailService;
        this.successMessage = '';
        this.data = {
            name: '',
            subject: '',
            email: '',
            recipient: 'salimbhassine@gmail.com',
            message: ''
        };
    }
    ContactComponent.prototype.onSubmit = function (value) {
        var _this = this;
        var data = value;
        data.recipient = 'salimbhassine@gmail.com';
        this.emailService.sendEmail(data).subscribe(function (data) {
            _this.successMessage = 'Message sent, thank you!';
            _this.data = {};
        }, function (error) {
            _this.successMessage = 'Message sent, thank you!';
            _this.data = {};
        });
    };
    ContactComponent.prototype.ngOnInit = function () {
    };
    ContactComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-contact',
            template: __webpack_require__(/*! ./contact.component.html */ "./src/app/components/contact/contact.component.html"),
            providers: [_services_email_service__WEBPACK_IMPORTED_MODULE_2__["EmailService"]],
            styles: [__webpack_require__(/*! ./contact.component.css */ "./src/app/components/contact/contact.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_email_service__WEBPACK_IMPORTED_MODULE_2__["EmailService"]])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "./src/app/components/education/education.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/education/education.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".esprit-logo{\n  width: 110px;\n  height: 40px;\n  margin-top: 20px;\n}\n.ensi-logo{\n  width: 70px;\n  height: 75px;\n}\n.desc{\n  font-size: 10px;\n  text-align: center;\n  padding-top: 5px;\n}\n.univ-name{\n  font-size: 12px;\n  margin-top: 20px;\n  margin-left: 10px;\n}\n.cycle-name{\n  font-size: 25px;\n}\n.flex-box{\n  display: -webkit-box;\n  display: flex;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9lZHVjYXRpb24vZWR1Y2F0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDtBQUVBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxvQkFBYTtFQUFiLGFBQWE7QUFDZiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZWR1Y2F0aW9uL2VkdWNhdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVzcHJpdC1sb2dve1xuICB3aWR0aDogMTEwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgbWFyZ2luLXRvcDogMjBweDtcbn1cbi5lbnNpLWxvZ297XG4gIHdpZHRoOiA3MHB4O1xuICBoZWlnaHQ6IDc1cHg7XG59XG5cbi5kZXNje1xuICBmb250LXNpemU6IDEwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDVweDtcbn1cbi51bml2LW5hbWV7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG59XG4uY3ljbGUtbmFtZXtcbiAgZm9udC1zaXplOiAyNXB4O1xufVxuLmZsZXgtYm94e1xuICBkaXNwbGF5OiBmbGV4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/components/education/education.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/education/education.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"education\" class=\"section section-education\">\n  <div class=\"animate-up\">\n    <h2 class=\"section-title abt-title sect-title\" translate><span class=\"title-number\">05. </span>education.title</h2>\n    <div class=\"timeline\">\n      <div class=\"timeline-bar\"></div>\n      <div class=\"timeline-inner clearfix\">\n\n        <div class=\"timeline-box timeline-box-compact timeline-box-left\">\n          <span class=\"dot\"></span>\n\n          <div class=\"timeline-box-inner animate-left\">\n            <span class=\"arrow\"></span>\n            <div class=\"date\"><span translate>education.date2</span></div>\n            <h3 class=\"cycle-name\" translate>education.name2</h3>\n            <div class=\"flex-box\">\n              <img src=\"assets/img/esprit.png\" alt=\"issatso logo\" class=\"esprit-logo\">\n              <h4 class=\"univ-name\" translate>education.school2</h4>\n            </div>\n            <p class=\"desc\" translate>education.desc2</p>\n          </div>\n        </div>\n\n        <div class=\"timeline-box timeline-box-compact timeline-box-right\">\n          <span class=\"dot\"></span>\n\n          <div class=\"timeline-box-inner animate-right\">\n            <span class=\"arrow\"></span>\n            <div class=\"date\"><span translate>education.date3</span></div>\n            <h3 class=\"cycle-name\" translate>education.name3</h3>\n            <div class=\"flex-box\">\n              <img src=\"assets/img/issatso.png\" alt=\"issatso logo\">\n              <h4 class=\"univ-name\" translate>education.school3</h4>\n            </div>\n            <p class=\"desc\" translate>education.desc3</p>\n          </div>\n        </div>\n\n        <div class=\"timeline-box timeline-box-compact timeline-box-left\">\n          <span class=\"dot\"></span>\n\n          <div class=\"timeline-box-inner animate-left\">\n            <span class=\"arrow\"></span>\n            <div class=\"date\"><span translate>education.date4</span></div>\n            <h3 translate>education.name4</h3>\n            <h4 translate>education.school4</h4>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/education/education.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/education/education.component.ts ***!
  \*************************************************************/
/*! exports provided: EducationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EducationComponent", function() { return EducationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var EducationComponent = /** @class */ (function () {
    function EducationComponent() {
    }
    EducationComponent.prototype.ngOnInit = function () {
    };
    EducationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-education',
            template: __webpack_require__(/*! ./education.component.html */ "./src/app/components/education/education.component.html"),
            styles: [__webpack_require__(/*! ./education.component.css */ "./src/app/components/education/education.component.css")]
        })
    ], EducationComponent);
    return EducationComponent;
}());



/***/ }),

/***/ "./src/app/components/experience/experience.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/experience/experience.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZXhwZXJpZW5jZS9leHBlcmllbmNlLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/experience/experience.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/experience/experience.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"experience\" class=\"section section-experience\">\n  <div class=\"animate-up\">\n    <h2 class=\"section-title abt-title sect-title\" translate><span class=\"title-number\">03. </span>experience.title</h2>\n    <div class=\"timeline\">\n      <div class=\"timeline-bar\"></div>\n      <div class=\"timeline-inner clearfix\">\n        <div class=\"timeline-box timeline-box-left\">\n          <span class=\"dot\"></span>\n          <div class=\"timeline-box-inner animate-right\">\n            <span class=\"arrow\"></span>\n            <div class=\"date\" translate>experience.date1</div>\n            <div>\n              <img src=\"assets/img/logo/veamly-logo.svg\" class=\"veam-logo\">\n            </div>\n            <h4 translate>experience.position1</h4>\n            <p translate>experience.description1</p>\n            <h4><b translate>experience.mission</b></h4>\n            <p translate>\n              <span translate>experience.mission1</span><b class=\"bold-important\" translate>experience.spring</b><span translate>experience.mission2</span><b class=\"bold-important\" translate>experience.micronaut</b><br>\n              <span translate>experience.mission3</span><b class=\"bold-important\" translate>experience.react</b><span translate>experience.mission4</span><b class=\"bold-important\" translate>experience.angular</b><br>\n              <span translate>experience.mission5</span><b class=\"bold-important\" translate>experience.electron</b><br>\n              <span translate>experience.mission6</span><b class=\"bold-important\" translate>experience.apis</b><span translate>experience.mission7</span><br>\n              <span translate>experience.mission8</span><b class=\"bold-important\" translate>experience.git</b>, <b class=\"bold-important\" translate>experience.jenkins</b>, <b class=\"bold-important\" translate>experience.docker</b> & <b class=\"bold-important\" translate>experience.gcloud</b><br>\n              <span translate>experience.mission9</span><br>\n              <span translate>experience.mission10</span><br>\n            </p>\n            <div class=\"d-flex\">\n              <span class=\"tag\" translate>experience.microservices</span>\n              <span class=\"tag\" translate>experience.spring</span>\n              <span class=\"tag\" translate>experience.micronaut</span>\n              <span class=\"tag\" translate>experience.angular</span>\n              <span class=\"tag\" translate>experience.react</span>\n              <span class=\"tag\" translate>experience.electron</span>\n              <span class=\"tag\" translate>experience.restapis</span>\n              <span class=\"tag\" translate>experience.git</span>\n              <span class=\"tag\" translate>experience.jenkins</span>\n              <span class=\"tag\" translate>experience.docker</span>\n              <span class=\"tag\" translate>experience.gcloud</span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"timeline-box timeline-box-right\">\n          <span class=\"dot\"></span>\n          <div class=\"timeline-box-inner animate-left\">\n            <span class=\"arrow\"></span>\n            <div class=\"date\" translate>experience.date2</div>\n            <img src=\"assets/img/logo/Pharmalogo.png\" class=\"veam-logo\">\n            <h4 translate>experience.position2</h4>\n            <p translate>experience.description2</p>\n            <h4><b translate>experience.mission</b></h4>\n            <p translate>\n              <span translate>experience.mission11</span><b class=\"bold-important\" translate>experience.node</b><br>\n                <span translate>experience.mission12</span><br>\n                <span translate>experience.mission13</span><b class=\"bold-important\" translate>experience.vue</b><br>\n                <span translate>experience.mission14</span><br>\n            </p>\n            <div class=\"d-flex\">\n              <span class=\"tag\" translate>experience.vue</span>\n              <span class=\"tag\" translate>experience.node</span>\n              <span class=\"tag\" translate>experience.express</span>\n              <span class=\"tag\" translate>experience.mongo</span>\n              <span class=\"tag\" translate>experience.htmlcss</span>\n              <span class=\"tag\" translate>experience.javascript</span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"timeline-box timeline-box-left\">\n          <span class=\"dot\"></span>\n          <div class=\"timeline-box-inner animate-right\">\n            <span class=\"arrow\"></span>\n            <div class=\"date\" translate>experience.date3</div>\n            <div>\n              <img src=\"assets/img/logo-tt.svg\" class=\"tt-logo\">\n            </div>\n            <h4 translate>experience.position3</h4>\n            <p translate>experience.description3</p>\n            <div class=\"d-flex\">\n              <span class=\"tag\" translate>experience.javase</span>\n              <span class=\"tag\" translate>experience.javafx</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n\n<!-- ********* Second Section ************ -->\n\n<section id=\"Projets\" class=\"section section-experience\">\n  <div class=\"animate-up\">\n    <h2 class=\"section-title abt-title sect-title\" translate><span class=\"title-number\">04. </span>projects.title</h2>\n\n    <div class=\"timeline\">\n      <div class=\"timeline-bar\"></div>\n      <div class=\"timeline-inner clearfix\">\n\n        <div class=\"timeline-box timeline-box-left\">\n          <span class=\"dot\"></span>\n          <div class=\"timeline-box-inner animate-right\">\n            <span class=\"arrow\"></span>\n            <div class=\"date\" translate>projects.date1</div>\n            <h3 translate>projects.name1</h3>\n            <h4 translate>projects.label</h4>\n            <p translate>projects.desc</p>\n            <div class=\"d-flex\">\n              <span class=\"tag\" translate>experience.python</span>\n              <span class=\"tag\" translate>experience.django</span>\n              <span class=\"tag\" translate>experience.htmlcss</span>\n              <span class=\"tag\" translate>experience.javascript</span>\n              <span class=\"tag\" translate>experience.webscraping</span>\n              <span class=\"tag\" translate>experience.ml</span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"timeline-box timeline-box-right\">\n          <span class=\"dot\"></span>\n          <div class=\"timeline-box-inner animate-left\">\n            <span class=\"arrow\"></span>\n            <div class=\"date\" translate>projects.date2</div>\n            <h3 translate>projects.name2</h3>\n            <h4 translate>projects.label2</h4>\n            <img src=\"assets/img/camp-full.jpg\" class=\"veam-logo\">\n            <p translate>projects.desc2</p>\n            <div class=\"d-flex\">\n              <span class=\"tag\" translate>experience.javaee</span>\n              <span class=\"tag\" translate>experience.asp</span>\n              <span class=\"tag\" translate>experience.angular</span>\n              <span class=\"tag\" translate>experience.webservices</span>\n              <span class=\"tag\" translate>experience.ionic</span>\n              <span class=\"tag\" translate>experience.wildfly</span>\n              <span class=\"tag\" translate>experience.hibernate</span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"timeline-box timeline-box-left\">\n          <span class=\"dot\"></span>\n          <div class=\"timeline-box-inner animate-right\">\n            <div class=\"date\" translate>projects.date3</div>\n            <h3 translate>projects.name3</h3>\n            <h4 translate>projects.label3</h4>\n            <img src=\"assets/img/mshop.jpg\" class=\"veam-logo\">\n            <p translate>projects.desc3</p>\n            <div class=\"d-flex\">\n              <span class=\"tag\" translate>experience.android</span>\n              <span class=\"tag\" translate>experience.java</span>\n              <span class=\"tag\" translate>experience.firebase</span>\n            </div>\n          </div>\n        </div>\n\n\n        <div class=\"timeline-box timeline-box-right\">\n          <span class=\"dot\"></span>\n          <div class=\"timeline-box-inner animate-left\">\n            <span class=\"arrow\"></span>\n            <span class=\"arrow\"></span>\n            <div class=\"date\" translate>projects.date4</div>\n            <h3 translate>projects.name4</h3>\n            <h4 translate>projects.label4</h4>\n            <img src=\"assets/img/socialpro.jpg\" class=\"veam-logo\">\n            <p translate>projects.desc4</p>\n            <div class=\"d-flex\">\n              <span class=\"tag\" translate>experience.symfony</span>\n              <span class=\"tag\" translate>experience.javase</span>\n              <span class=\"tag\" translate>experience.codename</span>\n              <span class=\"tag\" translate>experience.doctrine</span>\n              <span class=\"tag\" translate>experience.sql</span>\n              <span class=\"tag\" translate>experience.htmlcss</span>\n              <span class=\"tag\" translate>experience.javascript</span>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</section>\n\n"

/***/ }),

/***/ "./src/app/components/experience/experience.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/experience/experience.component.ts ***!
  \***************************************************************/
/*! exports provided: ExperienceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExperienceComponent", function() { return ExperienceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ExperienceComponent = /** @class */ (function () {
    function ExperienceComponent() {
    }
    ExperienceComponent.prototype.ngOnInit = function () {
    };
    ExperienceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-experience',
            template: __webpack_require__(/*! ./experience.component.html */ "./src/app/components/experience/experience.component.html"),
            styles: [__webpack_require__(/*! ./experience.component.css */ "./src/app/components/experience/experience.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ExperienceComponent);
    return ExperienceComponent;
}());



/***/ }),

/***/ "./src/app/components/footer/footer.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/footer/footer.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footername{\n  color: #9d9ea2;\n  text-align: center;\n  font-size: 11px;\n}\n.footer{\n  z-index: 3;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7QUFDQTtFQUNFLFVBQVU7QUFDWiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvb3Rlcm5hbWV7XG4gIGNvbG9yOiAjOWQ5ZWEyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTFweDtcbn1cbi5mb290ZXJ7XG4gIHotaW5kZXg6IDM7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/components/footer/footer.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/footer/footer.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\n  <div class=\"footer-social\">\n    <ul class=\"social2\">\n      <li><a class=\"ripple-centered\" href=\"https://www.linkedin.com/in/salimify\" rel=\"nofollow noopener noreferrer\"\n             target=\"_blank\"><i class=\"rsicon rsicon-linkedin\"></i></a></li>\n      <li><a class=\"ripple-centered\" href=\"https://github.com/Salimify\" rel=\"nofollow noopener noreferrer\"\n             target=\"_blank\"><i class=\"rsicon rsicon-github\"></i></a></li>\n      <li><a class=\"ripple-centered\" href=\"https://www.facebook.com/salimify\" rel=\"nofollow noopener noreferrer\"\n             target=\"_blank\"><i class=\"rsicon rsicon-facebook\"></i></a></li>\n      <li><a class=\"ripple-centered\" href=\"https://www.twitter.com/salimify\" rel=\"nofollow noopener noreferrer\"\n             target=\"_blank\"><i class=\"rsicon rsicon-twitter\"></i></a></li>\n      <li><a class=\"ripple-centered\" href=\"https://instagram.com/salimify\" rel=\"nofollow noopener noreferrer\"\n             target=\"_blank\"><i class=\"rsicon rsicon-instagram\"></i></a></li>\n    </ul>\n    <p class=\"footername\" translate>footer.desc1<a href=\"/about\" translate>footer.desc2</a>footer.desc3</p>\n  </div>\n\n</footer>\n"

/***/ }),

/***/ "./src/app/components/footer/footer.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/footer/footer.component.ts ***!
  \*******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/components/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/components/footer/footer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/components/header/header.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/header/header.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".Slogo{\n  width: 45px;\n  margin-left: 20px;\n  margin-top: 5px;\n}\n.log-cont{\n  display: -webkit-box;\n  display: flex;\n}\n.flag-icon{\n  height: 0.7em;\n}\n.lang-cont{\n  font-size: 16px;\n  color: #76f5da;\n  margin-right: 6px;\n  cursor: pointer;\n}\n.lang-div{\n  margin-top: 15px;\n  margin-left: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLGVBQWU7QUFDakI7QUFDQTtFQUNFLG9CQUFhO0VBQWIsYUFBYTtBQUNmO0FBQ0E7RUFDRSxhQUFhO0FBQ2Y7QUFDQTtFQUNFLGVBQWU7RUFDZixjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLGVBQWU7QUFDakI7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixpQkFBaUI7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5TbG9nb3tcbiAgd2lkdGg6IDQ1cHg7XG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICBtYXJnaW4tdG9wOiA1cHg7XG59XG4ubG9nLWNvbnR7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4uZmxhZy1pY29ue1xuICBoZWlnaHQ6IDAuN2VtO1xufVxuLmxhbmctY29udHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogIzc2ZjVkYTtcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5sYW5nLWRpdntcbiAgbWFyZ2luLXRvcDogMTVweDtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/components/header/header.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/header/header.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n  <div class=\"head-bg\" id=\"particles-js\"></div>\n  <div class=\"head-bar\">\n    <div class=\"head-bar-inner\">\n      <div class=\"row\">\n        <div class=\"col-sm-3 col-xs-6 log-cont\">\n          <div>\n            <a class=\"head-logo\" href=\"\"><img src=\"assets/img/logo.png\" class=\"Slogo\" alt=\"S logo\"/></a>\n          </div>\n          <div class=\"lang-div\">\n            <span class=\"lang-cont\" routerLink=\"/en\"><span class=\"flag-icon flag-icon-us\"></span>EN</span>\n            <span class=\"lang-cont\" routerLink=\"/fr\"><span class=\"flag-icon flag-icon-fr\"></span>FR</span>\n          </div>\n        </div>\n        <div class=\"col-sm-9 col-xs-6 nav-cont \">\n          <div class=\"nav-wrap\">\n            <nav id=\"nav\" class=\"nav\">\n              <ul class=\"clearfix\">\n                <li class=\"navitm\"><a href=\"#about\" translate>header.about</a></li>\n                <li class=\"navitm\"><a href=\"#skills\" translate>header.skills</a></li>\n                <li class=\"navitm\"><a href=\"#experience\" translate>header.experience</a></li>\n                <li class=\"navitm\"><a href=\"#Projets\" translate>header.projects</a></li>\n                <li class=\"navitm\"><a href=\"#education\" translate>header.education</a></li>\n                <li class=\"navitm\"><a href=\"#interests\" translate>header.activities</a></li>\n                <li class=\"navitm\"><a href=\"/blog\" translate>header.blog</a></li>\n                <!--<li class=\"navitm\"><a href=\"#contact\" translate>header.contact<span></span></a></li>-->\n              </ul>\n            </nav>\n            <button class=\"btn-mobile btn-mobile-nav mobile-menu-btn\"><i class=\"rsicon rsicon-menu\"></i></button>\n          </div><!-- .nav-wrap -->\n        </div>\n\n      </div>\n    </div>\n  </div>\n</header>\n"

/***/ }),

/***/ "./src/app/components/header/header.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/header/header.component.ts ***!
  \*******************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/components/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/components/header/header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/components/mobilenav/mobilenav.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/mobilenav/mobilenav.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbW9iaWxlbmF2L21vYmlsZW5hdi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/mobilenav/mobilenav.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/mobilenav/mobilenav.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mobile-nav\">\n  <button class=\"btn-mobile mobile-nav-close\"><i class=\"rsicon rsicon-close\"></i></button>\n\n  <div class=\"mobile-nav-inner\">\n      <nav id=\"mobile-nav\" class=\"nav\">\n  <ul class=\"clearfix\">\n    <li ><a href=\"#about\" translate>header.about</a></li>\n    <li ><a href=\"#skills\" translate>header.skills</a></li>\n    <li ><a href=\"#experience\" translate>header.experience</a></li>\n    <li ><a href=\"#Projets\" translate>header.projects</a></li>\n    <li ><a href=\"#education\" translate>header.education</a></li>\n    <li><a href=\"#interests\" translate>header.activities</a></li>\n    <li><a href=\"/blog\" translate>header.blog</a></li>\n    <!--<li ><a href=\"#contact\" translate>header.contact<span></span></a></li>-->\n  </ul>\n</nav>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/mobilenav/mobilenav.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/mobilenav/mobilenav.component.ts ***!
  \*************************************************************/
/*! exports provided: MobilenavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobilenavComponent", function() { return MobilenavComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MobilenavComponent = /** @class */ (function () {
    function MobilenavComponent() {
    }
    MobilenavComponent.prototype.ngOnInit = function () {
    };
    MobilenavComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-mobilenav',
            template: __webpack_require__(/*! ./mobilenav.component.html */ "./src/app/components/mobilenav/mobilenav.component.html"),
            styles: [__webpack_require__(/*! ./mobilenav.component.css */ "./src/app/components/mobilenav/mobilenav.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MobilenavComponent);
    return MobilenavComponent;
}());



/***/ }),

/***/ "./src/app/components/portfolio/portfolio.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/portfolio/portfolio.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcG9ydGZvbGlvL3BvcnRmb2xpby5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/portfolio/portfolio.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/portfolio/portfolio.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"portfolio\" class=\"section section-portfolio\">\n  <div class=\"animate-up\">\n    <h2 class=\"section-title\">Portfolio</h2>\n\n    <div class=\"filter\">\n      <div class=\"filter-inner\">\n        <div class=\"filter-btn-group\">\n          <button data-filter=\"*\">All</button>\n          <button data-filter=\".photography\">Photography</button>\n          <button data-filter=\".nature\">Nature</button>\n        </div>\n        <div class=\"filter-bar\">\n          <span class=\"filter-bar-line\"></span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"grid\">\n      <div class=\"grid-sizer\"></div>\n      \n      <div class=\"grid-item size22 photography\">\n        <div class=\"grid-box\">\n          <figure class=\"portfolio-figure\">\n            <img src=\"assets/img/uploads/portfolio/portfolio-thumb-05-610x600.jpg\" alt=\"\"/>\n            <figcaption class=\"portfolio-caption\">\n              <div class=\"portfolio-caption-inner\">\n                <h3 class=\"portfolio-title\">Street Photography</h3>\n                <h4 class=\"portfolio-cat\">Photography</h4>\n\n                <div class=\"btn-group\">\n                  <a class=\"btn-link\" href=\"http://bit.ly/1YtB8he\" target=\"_blank\"><i class=\"rsicon rsicon-link\"></i></a>\n                  <a class=\"portfolioFancybox btn-zoom\" data-fancybox-group=\"portfolioFancybox1\" href=\"#portfolio1-inline1\"><i class=\"rsicon rsicon-eye\"></i></a>\n                  <a class=\"portfolioFancybox hidden\" data-fancybox-group=\"portfolioFancybox1\" href=\"#portfolio1-inline2\"></a>\n                  <a class=\"portfolioFancybox hidden\" data-fancybox-group=\"portfolioFancybox1\" href=\"#portfolio1-inline3\"></a>\n                </div>\n              </div>\n            </figcaption>\n          </figure>\n\n          <!-- Start: Portfolio Inline Boxes -->\n          <div id=\"portfolio1-inline1\" class=\"fancybox-inline-box\">\n                                <div class=\"inline-embed\" data-embed-type=\"image\" data-embed-url=\"assets/img/uploads/portfolio/portfolio-thumb-05-large.jpg\"></div>\n            <div class=\"inline-cont\">\n              <h2 class=\"inline-title\">Street photography is photography that features the chance encounters and random accidents within public places.</h2>\n              <div class=\"inline-text\">\n                <p>Street photography does not necessitate the presence of a street or even the urban environment. Though people usually feature directly, street photography might be absent of people and can be an object or environment where the image projects a decidedly human character in facsimile or aesthetic.</p>\n              </div>\n            </div>\n          </div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n          \n          <div id=\"portfolio1-inline2\" class=\"fancybox-inline-box\">\n                                <div class=\"inline-embed\" data-embed-type=\"image\" data-embed-url=\"assets/img/uploads/portfolio/portfolio-thumb-01-large.jpg\"></div>\n            <div class=\"inline-cont\">\n              <div class=\"inline-text\">\n                <h2 class=\"inline-title\">Framing and timing</h2>\n                <p>Framing and timing can be key aspects of the craft with the aim of some street photography being to create images at a decisive or poignant moment. Street photography can focus on emotions displayed, thereby also recording people's history from an emotional point of view.</p>\n              </div>\n            </div>\n          </div>\n          \n          <div id=\"portfolio1-inline3\" class=\"fancybox-inline-box\">\n                                <div class=\"inline-embed\" data-embed-type=\"iframe\" data-embed-url=\"https://player.vimeo.com/video/118244244\"></div>\n            <div class=\"inline-cont\">\n              <div class=\"inline-text\">\n                <h2 class=\"inline-title\">A Look Into Documenting Street Fashion Photography</h2>\n                <p>HB Nam is an internationally known street fashion photographer. In this Leica Camera Portrait, Nam explains how he started in photography and what photography means to him. For Nam, it's about documenting what's around him and the concentration required to achieve a good shot.</p>\n              </div>\n            </div>\n          </div>\n          <!-- End: Portfolio Inline Boxes -->\n        </div>\n      </div><!-- .grid-item -->\t\t\t\n    \n      <div class=\"grid-item size11 bridge\">\n        <div class=\"grid-box\">\n          <figure class=\"portfolio-figure\">\n            <img src=\"assets/img/uploads/portfolio/portfolio-thumb-11-289x281.jpg\" alt=\"\"/>\n            <figcaption class=\"portfolio-caption\">\n              <div class=\"portfolio-caption-inner\">\n                <h3 class=\"portfolio-title\">Suspension Bridge</h3>\n                <h4 class=\"portfolio-cat\">Bridge</h4>\n\n                <div class=\"btn-group\">\n                  <a class=\"btn-link\" href=\"http://bit.ly/1YtB8he\" target=\"_blank\"><i class=\"rsicon rsicon-link\"></i></a>\n                  <a class=\"portfolioFancybox btn-zoom\" data-fancybox-group=\"portfolioFancybox2\" href=\"#portfolio2-inline1\"><i class=\"rsicon rsicon-eye\"></i></a>\n                </div>\n              </div>\n            </figcaption>\n          </figure>\n          \n          <!-- Start: Portfolio Inline Boxes -->\n          <div id=\"portfolio2-inline1\" class=\"fancybox-inline-box\">\n            <div class=\"inline-cont\">\n              <h2 class=\"inline-title\">Suspension Bridges - Design Technology</h2>\n              <div class=\"inline-text\">\n                <p>Suspension bridges in their simplest form were originally made from rope and wood.\n                Modern suspension bridges use a box section roadway supported by high tensile strength cables. \n                In the early nineteenth century, suspension bridges used iron chains for cables. The high tensile cables used in most modern suspension \n                bridges were introduced in the late nineteenth century.<br/>\n                Today, the cables are made of thousands of individual steel wires bound tightly together. Steel, which is very strong under tension, is \n                an ideal material for cables; a single steel wire, only 0.1 inch thick, can support over half a ton without breaking.</p>\n                <p>Light, and strong, suspension bridges can span distances from 2,000 to 7,000 feet far longer than any other kind of bridge. They are \n                ideal for covering busy waterways.</p>\n                <p>With any bridge project the choice of materials and form usually comes down to cost.\n                Suspension bridges tend to be the most expensive to build. A suspension bridge suspends the roadway from huge main cables, which extend \n                from one end of the bridge to the other. These cables rest on top of high towers and have to be securely anchored into the bank at either \n                end of the bridge. The towers enable the main cables to be draped over long distances. Most of the weight or load of the bridge is \n                transferred by the cables to the anchorage systems. These are imbedded in either solid rock or huge concrete blocks. Inside the anchorages, \n                the cables are spread over a large area to evenly distribute the load and to prevent the cables from breaking free.</p>\n                <p>The Arthashastra of Kautilya mentions the construction of dams and bridges.A Mauryan bridge near Girnar was surveyed by James Princep. \n                The bridge was swept away during a flood, and later repaired by Puspagupta, the chief architect of emperor Chandragupta I. The bridge \n                also fell under the care of the Yavana Tushaspa, and the Satrap Rudra Daman. The use of stronger bridges using plaited bamboo and iron \n                chain was visible in India by about the 4th century. A number of bridges, both for military and commercial purposes, were constructed by \n                the Mughal administration in India.</p>\n              </div>\n            </div>\n          </div>\n          <!-- End: Portfolio Inline Boxes -->\n        </div>\n      </div><!-- .grid-item -->\n      \n      <div class=\"grid-item size11 nature photography\">\n        <div class=\"grid-box\">\n          <figure class=\"portfolio-figure\">\n            <img src=\"assets/img/uploads/portfolio/portfolio-thumb-08-289x281.jpg\" alt=\"\"/>\n            <figcaption class=\"portfolio-caption\">\n              <div class=\"portfolio-caption-inner\">\n                <h3 class=\"portfolio-title\">Rocky Mountains</h3>\n                <h4 class=\"portfolio-cat\">Nature, Photography</h4>\n\n                <div class=\"btn-group\">\n                  <a class=\"btn-link\" href=\"http://bit.ly/1YtB8he\" target=\"_blank\"><i class=\"rsicon rsicon-link\"></i></a>\n                  <a class=\"portfolioFancybox btn-zoom\" data-fancybox-group=\"portfolioFancybox3\" href=\"#portfolio3-inline1\"><i class=\"rsicon rsicon-eye\"></i></a>\n                  <a class=\"portfolioFancybox hidden\" data-fancybox-group=\"portfolioFancybox3\" href=\"#portfolio3-inline2\"></a>\n                  <a class=\"portfolioFancybox hidden\" data-fancybox-group=\"portfolioFancybox3\" href=\"#portfolio3-inline3\"></a>\n                </div>\n              </div>\n            </figcaption>\n          </figure>\n\n          <!-- Start: Portfolio Inline Boxes -->\n          <div id=\"portfolio3-inline1\" class=\"fancybox-inline-box\">\n                                <div class=\"inline-embed\" data-embed-type=\"image\" data-embed-url=\"assets/img/uploads/portfolio/portfolio-thumb-08-large.jpg\"></div>\n          </div>\n\n          <div id=\"portfolio3-inline2\" class=\"fancybox-inline-box\">\n                                <div class=\"inline-embed\" data-embed-type=\"image\" data-embed-url=\"assets/img/uploads/portfolio/portfolio-thumb-04-large.jpg\"></div>\n          </div>\n          \n          <div id=\"portfolio3-inline3\" class=\"fancybox-inline-box\">\n                                <div class=\"inline-embed\" data-embed-type=\"image\" data-embed-url=\"assets/img/uploads/portfolio/portfolio-thumb-02-large.jpg\"></div>\n          </div>\n          <!-- End: Portfolio Inline Boxes -->\n        </div>\n      </div><!-- .grid-item -->\n    </div>\n\n    <div class=\"grid-more\">\n      <span class=\"ajax-loader\"></span>\n      <button class=\"btn btn-border ripple\"><i class=\"rsicon rsicon-add\"></i></button>\n    </div>\n  </div>\t\n</section>"

/***/ }),

/***/ "./src/app/components/portfolio/portfolio.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/portfolio/portfolio.component.ts ***!
  \*************************************************************/
/*! exports provided: PortfolioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PortfolioComponent", function() { return PortfolioComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PortfolioComponent = /** @class */ (function () {
    function PortfolioComponent() {
    }
    PortfolioComponent.prototype.ngOnInit = function () {
    };
    PortfolioComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-portfolio',
            template: __webpack_require__(/*! ./portfolio.component.html */ "./src/app/components/portfolio/portfolio.component.html"),
            styles: [__webpack_require__(/*! ./portfolio.component.css */ "./src/app/components/portfolio/portfolio.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PortfolioComponent);
    return PortfolioComponent;
}());



/***/ }),

/***/ "./src/app/components/reference/reference.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/reference/reference.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcmVmZXJlbmNlL3JlZmVyZW5jZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/reference/reference.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/reference/reference.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "        \n  <section id=\"references\" class=\"section section-references\">\n    <div class=\"animate-up\">\n      <h2 class=\"section-title\">References</h2>\n      <div class=\"section-box\">\n        <ul class=\"ref-slider\">\n          <li>\n            <div class=\"ref-box\">\n              <div class=\"person-speech\">\n                <p>I confirm that I have dealt with New Company Ltd since 1998. Their work has been a major factor in our \n                website's success, helping it to become one of the most visited resources of its kind on the Internet.</p>\n              </div>\n              <div class=\"person-info clearfix\">\n                <img class=\"person-img\" src=\"assets/img/uploads/rs-avatar-60x60.jpg\" alt=\"Headshot\">\n                <div class=\"person-name-title\">\n                  <span class=\"person-name\">Alexander Jokovich</span>\n                  <span class=\"person-title\">Modern LLC , HR</span>\n                </div>\n              </div>\n            </div>\n          </li>\n          <li>\n            <div class=\"ref-box\">\n              <div class=\"person-speech\">\n                <p>I confirm that New Company Ltd has been a customer of ours since 1998, during which time they have always made payments reliably, \n                in full and on time.</p>\n              </div>\n              <div class=\"person-info clearfix\">\n                <img class=\"person-img\" src=\"assets/img/uploads/rs-avatar-60x60.jpg\" alt=\"Headshot\">\n                <div class=\"person-name-title\">\n                  <span class=\"person-name\">Alexander Jokovich</span>\n                  <span class=\"person-title\">Modern LLC , HR</span>\n                </div>\n              </div>\n            </div>\n          </li>\n          <li>\n            <div class=\"ref-box\">\n              <div class=\"person-speech\">\n                <p>I have known Robert Smith for 10 years as web developer. I can confirm that he is a man of great integrity, is extremely dedicated \n                to his family and work, and is entirely peace-loving.</p>\n              </div>\n              <div class=\"person-info clearfix\">\n                <img class=\"person-img\" src=\"assets/img/uploads/rs-avatar-60x60.jpg\" alt=\"Headshot\">\n                <div class=\"person-name-title\">\n                  <span class=\"person-name\">Alexander Jokovich</span>\n                  <span class=\"person-title\">Modern LLC , HR</span>\n                </div>\n              </div>\n            </div>\n          </li>\n        </ul>\n        <div class=\"ref-slider-nav\">\n          <span id=\"ref-slider-prev\" class=\"slider-prev\"></span>\n          <span id=\"ref-slider-next\" class=\"slider-next\"></span>\n        </div>\n      </div>\n    </div>\t\n  </section><!-- #references -->\n  "

/***/ }),

/***/ "./src/app/components/reference/reference.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/reference/reference.component.ts ***!
  \*************************************************************/
/*! exports provided: ReferenceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReferenceComponent", function() { return ReferenceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ReferenceComponent = /** @class */ (function () {
    function ReferenceComponent() {
    }
    ReferenceComponent.prototype.ngOnInit = function () {
    };
    ReferenceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reference',
            template: __webpack_require__(/*! ./reference.component.html */ "./src/app/components/reference/reference.component.html"),
            styles: [__webpack_require__(/*! ./reference.component.css */ "./src/app/components/reference/reference.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ReferenceComponent);
    return ReferenceComponent;
}());



/***/ }),

/***/ "./src/app/components/skills/skills.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/skills/skills.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2tpbGxzL3NraWxscy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/skills/skills.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/skills/skills.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"skills\" class=\"section section-skills\">\n  <div class=\"animate-up\">\n    <h2 class=\"section-title abt-title sect-title\" translate><span class=\"title-number\">02. </span>skills.title</h2>\n    <div class=\"section-box\">\n      <div class=\"row\">\n        <h3><b translate>skill.proglang</b></h3>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/java.png\" alt=\"{{ 'skill.java.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.java</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"87%\"></span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/javascript.png\"\n                                           alt=\"{{ 'skill.javascript.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.javascript</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"87%\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/python.png\" alt=\"{{ 'skill.python.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.python</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"64%\"></span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/php.png\" alt=\"{{ 'skill.php.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.php</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"75%\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/c.png\" alt=\"{{ 'skill.c.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.c</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"65%\"></span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/cpppng.png\" alt=\"{{ 'skill.cpp.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.cpp</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"64%\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/csharp.png\" alt=\"{{ 'skill.sharp.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.sharp</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"75%\"></span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/html.png\" alt=\"{{ 'skill.htmlcss.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.htmlcss</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"75%\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"section-box section-box-margin\">\n      <div class=\"row\">\n        <h3 translate><b translate>skill.frameworks</b></h3>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/angular.png\" alt=\"{{ 'skill.angular.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.angular</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"90%\"></span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/react.png\" alt=\"{{ 'skill.reactjs.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.reactjs</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"81%\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/vuejs.png\" alt=\"{{ 'skill.vuejs.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.vuejs</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"75%\"></span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/electron.png\"\n                                           alt=\"{{ 'skill.electron.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.electron</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"70%\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/spring.png\" alt=\"{{ 'skill.spring.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.spring</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"85%\"></span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/dotnet.png\" alt=\"{{ 'skill.asp.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.asp</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"65%\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/symfony.png\" alt=\"{{ 'skill.symfony.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.symfony</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"65%\"></span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/laravel.png\" alt=\"{{ 'skill.laravel.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.laravel</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"77%\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/node.png\"\n                                           alt=\"{{ 'skill.nodejs.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.nodejs</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"80%\"></span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/django.png\" alt=\"{{ 'skill.django.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.django</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"70%\"></span>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n    <div class=\"section-box section-box-margin\">\n      <div class=\"row\">\n        <h3 translate><b translate>skill.basededonne</b></h3>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/sql.png\" alt=\"{{ 'skill.sql.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.sql</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"90%\"></span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/Mongo.png\" alt=\"{{ 'skill.mongo.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.mongo</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"81%\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <h3 translate><b translate>skill.mobile</b></h3>\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/Android.png\" alt=\"{{ 'skill.android.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.android</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"75%\"></span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-sm-6\">\n          <div class=\"progress-bar\">\n            <div class=\"bar-data\">\n              <span class=\"bar-title\"><img src=\"assets/img/logo/ionic.png\"\n                                           alt=\"{{ 'skill.ionic.alt' | translate }}\"\n                                           class=\"skillicon\"><b translate>skill.ionic</b></span>\n            </div>\n            <div class=\"bar-line\">\n              <span class=\"bar-fill\" data-width=\"70%\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"section-box section-box-margin\">\n      <div class=\"row\">\n        <h3 translate><b translate>skill.autres</b></h3>\n        <div class=\"col-sm-12\" translate>\n          <b translate>skill.autretech</b> skill.autretech.names\n          <br>\n          <b translate>skill.methodologies</b>skill.methodologies.names\n          <br>\n          <b translate>skill.testing</b> skill.testing.names\n          <br>\n          <b translate>skill.outils</b> skill.outils.names\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/components/skills/skills.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/skills/skills.component.ts ***!
  \*******************************************************/
/*! exports provided: SkillsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillsComponent", function() { return SkillsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SkillsComponent = /** @class */ (function () {
    function SkillsComponent() {
    }
    SkillsComponent.prototype.ngOnInit = function () {
    };
    SkillsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-skills',
            template: __webpack_require__(/*! ./skills.component.html */ "./src/app/components/skills/skills.component.html"),
            styles: [__webpack_require__(/*! ./skills.component.css */ "./src/app/components/skills/skills.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SkillsComponent);
    return SkillsComponent;
}());



/***/ }),

/***/ "./src/app/routedComponents/main/main.component.css":
/*!**********************************************************!*\
  !*** ./src/app/routedComponents/main/main.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JvdXRlZENvbXBvbmVudHMvbWFpbi9tYWluLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/routedComponents/main/main.component.html":
/*!***********************************************************!*\
  !*** ./src/app/routedComponents/main/main.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-mobilenav></app-mobilenav>\n<div class=\"wrapper\">\n  <div class=\"social-line-cont hide-cont\">\n    <div>\n      <ul class=\"social-line\">\n        <li><a href=\"https://www.linkedin.com/in/salimify\" target=\"_blank\"\n               rel=\"nofollow noopener noreferrer\" aria-label=\"Linkedin\">\n          <i class=\"rsicon rsicon-linkedin\"></i>\n        </a></li>\n        <li><a href=\"https://github.com/Salimify\" target=\"_blank\"\n               rel=\"nofollow noopener noreferrer\" aria-label=\"Github\">\n          <i class=\"rsicon rsicon-github\"></i>\n        </a>\n        </li>\n        <li><a href=\"https://www.facebook.com/salimify\" target=\"_blank\"\n               rel=\"nofollow noopener noreferrer\" aria-label=\"facebook\">\n          <i class=\"rsicon rsicon-facebook\"></i>\n        </a>\n        </li>\n        <li><a href=\"https://www.twitter.com/salimify\" target=\"_blank\"\n               rel=\"nofollow noopener noreferrer\" aria-label=\"Twitter\">\n          <i class=\"rsicon rsicon-twitter\"></i>\n        </a></li>\n        <li><a href=\"https://instagram.com/salimify\" target=\"_blank\"\n               rel=\"nofollow noopener noreferrer\" aria-label=\"Instagram\">\n          <i class=\"rsicon rsicon-instagram\"></i>\n        </a></li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"social-line-right hide-cont\">\n    <div class=\"social-line\">\n      <a class=\"social-email\" href=\"mailto:salim.bnhassine@gmail.com\">salim.bnhassine@gmail.com</a>\n    </div>\n  </div>\n  <app-header></app-header>\n  <div class=\"content\">\n    <div class=\"container\">\n      <app-about></app-about>\n      <app-skills></app-skills>\n      <!--<app-portfolio></app-portfolio>-->\n      <app-experience></app-experience>\n      <app-education></app-education>\n      <app-activite></app-activite>\n    </div>\n  </div>\n  <app-footer></app-footer>\n</div>\n\n<a class=\"btn-scroll-top\" href=\"#\"><i class=\"rsicon rsicon-arrow-up\"></i></a>\n<div id=\"overlay\"></div>\n<div id=\"preloader\">\n  <div class=\"preload-icon\"><span></span><span></span></div>\n  <div class=\"preload-text\">Loading ...</div>\n</div>\n"

/***/ }),

/***/ "./src/app/routedComponents/main/main.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/routedComponents/main/main.component.ts ***!
  \*********************************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var MainComponent = /** @class */ (function () {
    function MainComponent(meta, title) {
        this.meta = meta;
        this.title = title;
        this.title.setTitle('Salim Ben Hassine | CV Ingénieur Développeur Web Full Stack Tunisie');
        // tslint:disable-next-line:max-line-length
        this.meta.updateTag({ name: 'description', content: 'CV ingénieur et développeur web front-end et back-end Tunisien, Freelance, étudiant a ESPRIT, dévloppement web full stack, maîtrise plusieurs technologies javascript: angular js, nodejs et vuejs et php: ajax, symfony et autre java ee, asp.net, android, ionic, mongoDB. motivé et actif' });
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-main',
            template: __webpack_require__(/*! ./main.component.html */ "./src/app/routedComponents/main/main.component.html"),
            styles: [__webpack_require__(/*! ./main.component.css */ "./src/app/routedComponents/main/main.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"]])
    ], MainComponent);
    return MainComponent;
}());



/***/ }),

/***/ "./src/app/routedComponents/routed-about/routed-about.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/routedComponents/routed-about/routed-about.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JvdXRlZENvbXBvbmVudHMvcm91dGVkLWFib3V0L3JvdXRlZC1hYm91dC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/routedComponents/routed-about/routed-about.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/routedComponents/routed-about/routed-about.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-mobilenav></app-mobilenav>\n<div class=\"wrapper\">\n  <div class=\"social-line-cont hide-cont\">\n    <div>\n      <ul class=\"social-line\">\n        <li><a href=\"https://www.linkedin.com/in/salimify\" target=\"_blank\"\n               rel=\"nofollow noopener noreferrer\" aria-label=\"Linkedin\">\n          <i class=\"rsicon rsicon-linkedin\"></i>\n        </a></li>\n        <li><a href=\"https://github.com/Salimify\" target=\"_blank\"\n               rel=\"nofollow noopener noreferrer\" aria-label=\"Github\">\n          <i class=\"rsicon rsicon-github\"></i>\n        </a>\n        </li>\n        <li><a href=\"https://www.facebook.com/salimify\" target=\"_blank\"\n               rel=\"nofollow noopener noreferrer\" aria-label=\"facebook\">\n          <i class=\"rsicon rsicon-facebook\"></i>\n        </a>\n        </li>\n        <li><a href=\"https://www.twitter.com/salimify\" target=\"_blank\"\n               rel=\"nofollow noopener noreferrer\" aria-label=\"Twitter\">\n          <i class=\"rsicon rsicon-twitter\"></i>\n        </a></li>\n        <li><a href=\"https://instagram.com/salimify\" target=\"_blank\"\n               rel=\"nofollow noopener noreferrer\" aria-label=\"Instagram\">\n          <i class=\"rsicon rsicon-instagram\"></i>\n        </a></li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"social-line-right hide-cont\">\n    <div class=\"social-line\">\n      <a class=\"social-email\" href=\"mailto:salim.bnhassine@gmail.com\">salim.bnhassine@gmail.com</a>\n    </div>\n  </div>\n  <app-header></app-header>\n  <div class=\"content\">\n    <div class=\"container\">\n      <app-about></app-about>\n    </div>\n  </div>\n  <app-footer></app-footer>\n</div>\n\n<a class=\"btn-scroll-top\" href=\"#\"><i class=\"rsicon rsicon-arrow-up\"></i></a>\n<div id=\"overlay\"></div>\n<div id=\"preloader\">\n  <div class=\"preload-icon\"><span></span><span></span></div>\n  <div class=\"preload-text\">Loading ...</div>\n</div>\n"

/***/ }),

/***/ "./src/app/routedComponents/routed-about/routed-about.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/routedComponents/routed-about/routed-about.component.ts ***!
  \*************************************************************************/
/*! exports provided: RoutedAboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoutedAboutComponent", function() { return RoutedAboutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var RoutedAboutComponent = /** @class */ (function () {
    function RoutedAboutComponent(meta, title) {
        this.meta = meta;
        this.title = title;
        this.title.setTitle('About');
    }
    RoutedAboutComponent.prototype.ngOnInit = function () {
    };
    RoutedAboutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-routed-about',
            template: __webpack_require__(/*! ./routed-about.component.html */ "./src/app/routedComponents/routed-about/routed-about.component.html"),
            styles: [__webpack_require__(/*! ./routed-about.component.css */ "./src/app/routedComponents/routed-about/routed-about.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"]])
    ], RoutedAboutComponent);
    return RoutedAboutComponent;
}());



/***/ }),

/***/ "./src/app/services/email.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/email.service.ts ***!
  \*******************************************/
/*! exports provided: EmailService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailService", function() { return EmailService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'application/json' })
};
var EmailService = /** @class */ (function () {
    function EmailService(http) {
        this.http = http;
    }
    EmailService.prototype.sendEmail = function (email) {
        var body = JSON.stringify(email);
        return this.http.post('/assets/scripts/email.php', body, httpOptions);
    };
    EmailService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], EmailService);
    return EmailService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/travis/build/Salimify/salimbenhassine.com/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map