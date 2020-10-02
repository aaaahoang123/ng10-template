import {UseValidators} from '../../../common';
import {Validators} from '@angular/forms';

export class LoginForm {
  @UseValidators([Validators.required, Validators.minLength(0)])
  secret?: string = undefined;

  // tslint:disable-next-line:variable-name
  hashed_token?: string = undefined;
}
