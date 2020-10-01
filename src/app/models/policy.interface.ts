import {IAuthorizationScope} from './authorization-scope';
import {User} from './user.interface';

export interface IPolicy {
  id: number;
  name: string;
  status: PolicyStatus;

  authorization_scopes?: IAuthorizationScope[];
  members?: User[];
  authorization_scopes_count?: number;
  members_count?: number;

  isDeleting?: boolean;
}

export enum PolicyStatus {
  Active = 1,
  Inactive = -1
}
