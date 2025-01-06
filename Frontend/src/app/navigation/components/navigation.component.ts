import {Component, OnInit} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import {HttpService} from 'src/app/shared/services/http/http.service';
import {NavigationService} from '../servies/navigation.service';
import {LanguageService} from '../../shared/services/language/language.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('sidenavExpand', [
      state('sidenav-collapsed', style({width: '67px'})),
      state('sidenav-expanded', style({width: '255px'})),
      state('content-collapsed', style({margin: '0 0 0 56px'})),
      state('content-expanded', style({margin: '0 0 0 255px'})),
      state('mobile-collapsed', style({width: '0'})),
      state('mobile-content-collapsed', style({margin: 0})),
      transition('sidenav-expanded <=> sidenav-collapsed', animate('.5s ease')),
      transition('content-expanded <=> content-collapsed', animate('.5s ease')),
      transition('sidenav-collapsed <=> mobile-collapsed', animate('.5s ease')),
      transition('content-collapsed <=> mobile-content-collapsed', animate('.5s ease'))
    ])
  ]
})
export class NavigationComponent implements OnInit {

  public categories: string[] = [];
  public title = '';
  public start = '';
  public result = '';
  public imprint = '';
  public policy = '';
  public sidenav = '';
  public content = '';
  public policyLanguage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public languageService: LanguageService,
    public navigationService: NavigationService,
  ) {
  }

  async ngOnInit() {
    await this.activatedRoute.paramMap.subscribe(async (params) => {
      let language = params.get('language');
      if (language !== null) {
        language = language[0].toLocaleUpperCase() + language.slice(1);
        await this.languageService.switchLanguage(language);
      }
      this.navigationService.initializeQuestions();
      await this.initialize();
      this.languageService.$language.subscribe((value) => {
        this.policyLanguage = value;
      });
    });
  }

  /**
   * Load active categories
   * Set default Navigation represenation
   */
  public async initialize() {
    await this.navigationService.getCategories();
    this.navigationService.categories$.subscribe(data => {
      this.categories = data.categories;
      this.title = data.title;
      this.start = data.start_text;
      this.result = data.result_text;
      this.imprint = data.imprint;
      this.policy = data.data_privacy;
    });

    if (window.innerWidth <= 768) {
      this.sidenav = 'mobile-collapsed';
      this.content = 'mobile-content-collapsed';
    } else {
      this.sidenav = 'sidenav-expanded';
      this.content = 'content-expanded';
    }
  }

  /**
   * Navigation animations/size based on screen size
   */
  public toggle() {
    switch (this.sidenav) {
      case 'sidenav-collapsed':
        if (window.innerWidth <= 768) {
          this.sidenav = 'mobile-collapsed';
          this.content = 'mobile-content-collapsed';
        } else {
          this.sidenav = 'sidenav-expanded';
          this.content = 'content-expanded';
        }
        break;
      case 'sidenav-expanded':
        this.sidenav = 'sidenav-collapsed';
        this.content = 'content-collapsed';
        break;
      case 'mobile-collapsed':
        this.sidenav = 'sidenav-collapsed';
        this.content = 'content-collapsed';
        break;
    }
  }

  /**
   * create RouterLinks for each element of the navigation
   * @param category Desired Category
   */
  public createRouterLink(category: string) {
    return '/' + this.languageService.getLanguage() + '/questions/' + category.replace(/ /g, '');
  }

}
