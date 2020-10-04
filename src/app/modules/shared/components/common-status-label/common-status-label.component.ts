import {Component, Input, OnInit} from '@angular/core';
import {CommonStatus} from '../../../../common/enum/common-status';

@Component({
  selector: 'app-common-status-label',
  templateUrl: './common-status-label.component.html',
  styleUrls: ['./common-status-label.component.less']
})
export class CommonStatusLabelComponent implements OnInit {
  @Input() status: CommonStatus;
  CommonStatus = CommonStatus;

  colorMap = {
    [CommonStatus.ACTIVE]: 'success',
    [CommonStatus.INACTIVE]: 'error'
  };
    // ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime'];

  constructor() { }

  ngOnInit(): void {
  }

}
