import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConnectedFormDirective } from './directive/connected-form.directive';
import { GetAsFormArrayPipe } from './pipe/as-form-array.pipe';
import { StatusSelectorComponent } from './components/status-selector/status-selector.component';
import { EnumToSelectEntriesPipe } from './pipe/enum-to-select-entries.pipe';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { CommonStatusLabelComponent } from './components/common-status-label/common-status-label.component';
import {NzBadgeModule} from 'ng-zorro-antd/badge';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}

const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NzSelectModule,
  NzBadgeModule
];

const declarations = [
  ConnectedFormDirective,
  GetAsFormArrayPipe,
  StatusSelectorComponent,
  EnumToSelectEntriesPipe,
  CommonStatusLabelComponent
];

@NgModule({
  declarations: [
    ...declarations,
  ],
  imports: [
    ...sharedModules,
    TranslateModule.forRoot({
      defaultLanguage: 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    ...sharedModules,
    ...declarations,
    TranslateModule
  ]
})
export class SharedModule { }
