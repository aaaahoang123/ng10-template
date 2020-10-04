import {CommonStatus} from '../../common/enum/common-status';

export class VoyageParams {
    page = 1;
    limit = 40;
    status = CommonStatus.ACTIVE;
    // tslint:disable
    from_or_to: number = null;
}
