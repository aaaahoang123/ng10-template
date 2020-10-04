import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {VoyageFormComponent} from './voyage-form/voyage-form.component';
import {RouterModule, Routes} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {IconsProviderModule} from '../../icons-provider.module';
import {ExportedRegionModule} from '../region/exported-region.module';
import {EffectsModule} from '@ngrx/effects';
import {VoyageEffects} from './voyage.effects';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {ReactiveComponentModule} from '@ngrx/component';
import {VoyageListComponent} from './voyage-list/voyage-list.component';
import {NavigateButton} from '../../core/navigate-button';
import {VoyageListSearchBarComponent} from './voyage-list/voyage-list-search-bar/voyage-list-search-bar.component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {VoyageChildrenViewComponent} from './voyage-list/voyage-children-view/voyage-children-view.component';
import {VoyageLabelComponent} from './voyage-label/voyage-label.component';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {RouterEnum} from '../../core';
import {VoyagePublishModule} from './voyage-publish.module';

const {voyages, list, create , edit} = RouterEnum;

const routes: Routes = [
  {
    path: list,
    component: VoyageListComponent,
    data: {
      title: 'DS tuyến đường',
      display: true,
      navigateButtons: [
        {
          title: 'Thêm tuyến đường',
          navigate: [voyages, create]
        } as NavigateButton
      ]
    }
  },
  {
    path: create,
    component: VoyageFormComponent,
    data: {
      title: 'Tạo tuyến đường',
      display: true
    }
  },
  {
    path: `${edit}/:id`,
    component: VoyageFormComponent,
    data: {
      title: 'Sửa tuyến đường',
      display: false
    }
  }
];

@NgModule({
  declarations: [VoyageFormComponent, VoyageListComponent, VoyageListSearchBarComponent, VoyageChildrenViewComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    DragDropModule,
    NzCardModule,
    NzLayoutModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    IconsProviderModule,
    ExportedRegionModule,
    NzSelectModule,
    NzTableModule,
    NzCollapseModule,
    NzPopconfirmModule,
    NzDividerModule,
    VoyagePublishModule,
    ReactiveComponentModule
  ]
})
export class VoyageModule { }
