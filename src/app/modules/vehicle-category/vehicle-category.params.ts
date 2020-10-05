import {CommonStatus} from '../../common/enum/common-status';

export class VehicleCategoryParams {
    page = 1;
    limit = 50;
    search = '';
    status = CommonStatus.ACTIVE;
}
