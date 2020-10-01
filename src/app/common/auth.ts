import {environment} from '../../environments/environment';

export function getAuth(): any {
  return {
    authorization: localStorage.getItem(environment.authStorageKey) || '',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
}

export function logout(): void {
  localStorage.removeItem(environment.authStorageKey);
  location.href = `${environment.domain}/authentication`;
}

// export function userHasPermission(user: IUser, data: Data) {
//   if (!user) {
//     return false;
//   }
//   if (user.is_admin) {
//     return true;
//   }
//   if (!data || (!data.role && !data.roles)) {
//     return true;
//   }
//   if (!user.scopes) {
//     return false;
//   }
//   if (data.role) {
//     return user.scopes.includes(data.role);
//   } else if (data.roles) {
//     return data.roles.reduce((result, current) => result || user.scopes.includes(current), false);
//   }
//   return false;
// }
