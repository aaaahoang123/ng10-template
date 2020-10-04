import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './app.state';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store<AppState>,
    translateService: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('vi');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use('vi');
  }

  ngOnInit(): void {
  }
}
