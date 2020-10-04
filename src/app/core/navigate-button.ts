import {NzButtonType} from 'ng-zorro-antd/button';

export interface NavigateButton {
  navigate: string[] | string;
  title: string;
  nzType: NzButtonType;
  icon: string;
}
